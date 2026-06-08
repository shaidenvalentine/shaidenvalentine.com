import { sql } from "@vercel/postgres";

// Lightweight Postgres-backed inbox for leads, applications, and feedback.
// All three tables auto-create on first write — no migration step.

export function isConfigured(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
}

let ensured = false;
async function ensureTables() {
  if (ensured) return;
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS leads (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      whatsapp    TEXT NOT NULL,
      instagram   TEXT,
      intent      TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'new',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // status migration for older rows (idempotent)
  await sql/* sql */`ALTER TABLE leads ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'new'`;
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS applications (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      role        TEXT NOT NULL,
      link        TEXT,
      message     TEXT NOT NULL,
      status      TEXT NOT NULL DEFAULT 'new',
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  // Anonymous feedback — by design no name/email/IP is stored.
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS feedback (
      id          SERIAL PRIMARY KEY,
      topic       TEXT,
      message     TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  ensured = true;
}

// ───── leads ─────────────────────────────────────────────────────────────

export interface LeadRow {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  instagram: string | null;
  intent: string;
  status: string;
  created_at: string;
}

export async function insertLead(input: {
  name: string;
  email: string;
  whatsapp: string;
  instagram?: string;
  intent: string;
}): Promise<{ ok: boolean; message: string }> {
  if (!isConfigured()) return { ok: false, message: "DB not configured." };
  try {
    await ensureTables();
    await sql/* sql */`
      INSERT INTO leads (name, email, whatsapp, instagram, intent)
      VALUES (${input.name}, ${input.email}, ${input.whatsapp}, ${input.instagram || null}, ${input.intent})
    `;
    return { ok: true, message: "Saved." };
  } catch {
    return { ok: false, message: "Couldn't save right now." };
  }
}

export async function listLeads(limit = 500): Promise<LeadRow[]> {
  if (!isConfigured()) return [];
  await ensureTables();
  const { rows } = await sql<LeadRow>/* sql */`
    SELECT id, name, email, whatsapp, instagram, intent, status, created_at
    FROM leads ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows;
}

// ───── applications ──────────────────────────────────────────────────────

export interface ApplicationRow {
  id: number;
  name: string;
  email: string;
  role: string;
  link: string | null;
  message: string;
  status: string;
  created_at: string;
}

export async function insertApplication(input: {
  name: string;
  email: string;
  role: string;
  link?: string;
  message: string;
}): Promise<{ ok: boolean; message: string }> {
  if (!isConfigured()) return { ok: false, message: "DB not configured." };
  try {
    await ensureTables();
    await sql/* sql */`
      INSERT INTO applications (name, email, role, link, message)
      VALUES (${input.name}, ${input.email}, ${input.role}, ${input.link || null}, ${input.message})
    `;
    return { ok: true, message: "Saved." };
  } catch {
    return { ok: false, message: "Couldn't save right now." };
  }
}

export async function listApplications(limit = 500): Promise<ApplicationRow[]> {
  if (!isConfigured()) return [];
  await ensureTables();
  const { rows } = await sql<ApplicationRow>/* sql */`
    SELECT id, name, email, role, link, message, status, created_at
    FROM applications ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows;
}

// ───── feedback (anonymous — no PII) ─────────────────────────────────────

export interface FeedbackRow {
  id: number;
  topic: string | null;
  message: string;
  created_at: string;
}

export async function insertFeedback(input: {
  topic?: string;
  message: string;
}): Promise<{ ok: boolean; message: string }> {
  if (!isConfigured()) return { ok: false, message: "DB not configured." };
  try {
    await ensureTables();
    await sql/* sql */`
      INSERT INTO feedback (topic, message)
      VALUES (${input.topic || null}, ${input.message})
    `;
    return { ok: true, message: "Saved." };
  } catch {
    return { ok: false, message: "Couldn't save right now." };
  }
}

export async function listFeedback(limit = 500): Promise<FeedbackRow[]> {
  if (!isConfigured()) return [];
  await ensureTables();
  const { rows } = await sql<FeedbackRow>/* sql */`
    SELECT id, topic, message, created_at
    FROM feedback ORDER BY created_at DESC LIMIT ${limit}
  `;
  return rows;
}

// ───── counts (cheap, for the overview) ──────────────────────────────────

export async function counts(): Promise<{
  leads: number;
  applications: number;
  feedback: number;
  newLeads: number;
  newApps: number;
}> {
  if (!isConfigured()) return { leads: 0, applications: 0, feedback: 0, newLeads: 0, newApps: 0 };
  await ensureTables();
  const [l, a, f, nl, na] = await Promise.all([
    sql`SELECT COUNT(*)::int AS n FROM leads`,
    sql`SELECT COUNT(*)::int AS n FROM applications`,
    sql`SELECT COUNT(*)::int AS n FROM feedback`,
    sql`SELECT COUNT(*)::int AS n FROM leads WHERE status = 'new'`,
    sql`SELECT COUNT(*)::int AS n FROM applications WHERE status = 'new'`,
  ]);
  return {
    leads: (l.rows[0] as { n: number }).n,
    applications: (a.rows[0] as { n: number }).n,
    feedback: (f.rows[0] as { n: number }).n,
    newLeads: (nl.rows[0] as { n: number }).n,
    newApps: (na.rows[0] as { n: number }).n,
  };
}

// ───── mutations used by admin actions ───────────────────────────────────

type Table = "leads" | "applications" | "feedback";
type AllowedStatus = "new" | "replied" | "archived";

export async function updateStatus(table: Table, id: number, status: AllowedStatus) {
  if (!isConfigured()) return;
  if (table === "leads") await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
  else if (table === "applications") await sql`UPDATE applications SET status = ${status} WHERE id = ${id}`;
}

export async function deleteRow(table: Table, id: number) {
  if (!isConfigured()) return;
  if (table === "leads") await sql`DELETE FROM leads WHERE id = ${id}`;
  else if (table === "applications") await sql`DELETE FROM applications WHERE id = ${id}`;
  else if (table === "feedback") await sql`DELETE FROM feedback WHERE id = ${id}`;
}
