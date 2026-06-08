import { sql } from "@vercel/postgres";

// Lightweight leads store backed by Vercel Postgres (Neon).
// Provision a Postgres database in Vercel → Storage → Create database.
// That sets POSTGRES_URL automatically; no code change needed.

export interface LeadRow {
  id: number;
  name: string;
  email: string;
  whatsapp: string;
  instagram: string | null;
  intent: string;
  created_at: string;
}

let ensured = false;
async function ensureTable() {
  if (ensured) return;
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS leads (
      id          SERIAL PRIMARY KEY,
      name        TEXT NOT NULL,
      email       TEXT NOT NULL,
      whatsapp    TEXT NOT NULL,
      instagram   TEXT,
      intent      TEXT NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  ensured = true;
}

export function isConfigured(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
}

export async function insertLead(input: {
  name: string;
  email: string;
  whatsapp: string;
  instagram?: string;
  intent: string;
}): Promise<{ ok: boolean; message: string }> {
  if (!isConfigured()) {
    return {
      ok: false,
      message: "Lead store isn't configured. Add a Vercel Postgres database in Vercel → Storage.",
    };
  }
  try {
    await ensureTable();
    await sql/* sql */`
      INSERT INTO leads (name, email, whatsapp, instagram, intent)
      VALUES (${input.name}, ${input.email}, ${input.whatsapp}, ${input.instagram || null}, ${input.intent})
    `;
    return { ok: true, message: "Saved." };
  } catch {
    return { ok: false, message: "Couldn't save right now. Try again in a moment." };
  }
}

export async function listLeads(limit = 500): Promise<LeadRow[]> {
  if (!isConfigured()) return [];
  await ensureTable();
  const { rows } = await sql<LeadRow>/* sql */`
    SELECT id, name, email, whatsapp, instagram, intent, created_at
    FROM leads
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows;
}
