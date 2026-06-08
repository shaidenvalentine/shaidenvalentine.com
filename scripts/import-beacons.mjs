#!/usr/bin/env node
// One-off: import a Beacons audience CSV into the leads table.
// Usage:
//   node scripts/import-beacons.mjs /path/to/audience_list.csv
//
// Uses pg over TCP to the unpooled Neon endpoint (POSTGRES_URL_NON_POOLING
// or DATABASE_URL_UNPOOLED). Marks every row with intent
// "Imported from Beacons" + status "archived" so they don't drown the inbox.

import fs from "node:fs";
import path from "node:path";
import pg from "pg";
import dns from "node:dns";
// Some Neon endpoints resolve to IPv6 first; macOS often has no v6 route.
// Force IPv4.
dns.setDefaultResultOrder("ipv4first");

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/import-beacons.mjs <csv-path>");
  process.exit(1);
}

// Load env from .env.local
const envPath = path.resolve(".env.local");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^([A-Z_]+)=(.*)$/);
    if (m) process.env[m[1]] = m[2].replace(/^"|"$/g, "");
  }
}

const url =
  process.env.POSTGRES_URL_NON_POOLING ||
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL;
if (!url) {
  console.error("No Postgres URL in .env.local. Pull from Vercel:");
  console.error("  npx vercel@latest env pull .env.local");
  process.exit(1);
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') inQuotes = false;
      else cell += c;
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ",") { row.push(cell); cell = ""; }
      else if (c === "\n") { row.push(cell); rows.push(row); row = []; cell = ""; }
      else if (c === "\r") { /* skip */ }
      else cell += c;
    }
  }
  if (cell.length || row.length) { row.push(cell); rows.push(row); }
  return rows;
}

function pickColumn(headers, candidates) {
  const lower = headers.map((h) => h.toLowerCase().trim());
  for (const c of candidates) {
    const i = lower.indexOf(c);
    if (i !== -1) return i;
  }
  return -1;
}

const csv = fs.readFileSync(file, "utf8");
const rows = parseCsv(csv).filter((r) => r.some((c) => c && c.trim()));
if (rows.length < 2) {
  console.error("CSV looks empty.");
  process.exit(1);
}

const headers = rows[0];
console.log("Detected columns:", headers);

const iEmail = pickColumn(headers, ["email", "email address", "e-mail"]);
const iName = pickColumn(headers, ["name", "first name", "first_name", "full name"]);
const iLast = pickColumn(headers, ["last name", "last_name", "surname"]);
const iPhone = pickColumn(headers, ["phone", "phone number", "phone_number", "whatsapp", "mobile", "tel"]);
const iIg = pickColumn(headers, ["instagram", "ig", "handle"]);

if (iEmail === -1) {
  console.error("Could not find an email column. Headers were:", headers);
  process.exit(1);
}

// Parse URL and force IPv4 by passing a resolved A record as host (Neon uses SNI,
// so we still need to preserve the original hostname for SSL). Pass via servername.
const u = new URL(url);
const ipv4 = await new Promise((resolve, reject) => {
  dns.resolve4(u.hostname, (err, addrs) => (err ? reject(err) : resolve(addrs[0])));
});
console.log(`Resolved ${u.hostname} → ${ipv4} (IPv4)`);

const client = new pg.Client({
  host: ipv4,
  port: Number(u.port || 5432),
  database: u.pathname.replace(/^\//, ""),
  user: decodeURIComponent(u.username),
  password: decodeURIComponent(u.password),
  ssl: { rejectUnauthorized: false, servername: u.hostname },
});
await client.connect();

// Make sure the leads table has the columns we need (idempotent).
await client.query(`
  CREATE TABLE IF NOT EXISTS leads (
    id          SERIAL PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT NOT NULL,
    whatsapp    TEXT NOT NULL,
    instagram   TEXT,
    intent      TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'new',
    notes       TEXT,
    created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )
`);

let inserted = 0;
let skipped = 0;
for (const r of rows.slice(1)) {
  const email = (r[iEmail] || "").trim().toLowerCase();
  if (!email || !email.includes("@")) { skipped++; continue; }
  let name = iName !== -1 ? (r[iName] || "").trim() : "";
  const last = iLast !== -1 ? (r[iLast] || "").trim() : "";
  if (last) name = name ? `${name} ${last}` : last;
  if (!name) name = email.split("@")[0];

  const whatsapp = iPhone !== -1 ? (r[iPhone] || "").trim() : "";
  const instagram = iIg !== -1 ? (r[iIg] || "").trim() : "";

  try {
    const dup = await client.query(
      "SELECT 1 FROM leads WHERE email = $1 AND intent = 'Imported from Beacons' LIMIT 1",
      [email]
    );
    if (dup.rowCount > 0) { skipped++; continue; }
    await client.query(
      `INSERT INTO leads (name, email, whatsapp, instagram, intent, status)
       VALUES ($1, $2, $3, $4, 'Imported from Beacons', 'archived')`,
      [name, email, whatsapp || "", instagram || null]
    );
    inserted++;
  } catch (e) {
    console.warn("skip:", email, e?.message || e);
    skipped++;
  }
}

await client.end();
console.log(`\nDone. Imported ${inserted}, skipped ${skipped}.`);
