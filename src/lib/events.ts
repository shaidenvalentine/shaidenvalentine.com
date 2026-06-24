import { sql } from "@vercel/postgres";
import { THRESHOLD_SEED } from "@content/threshold";
import { THRESHOLD_TASKS } from "@content/thresholdTasks";

// ─────────────────────────────────────────────────────────────────────────
// Events module — a reusable, Postgres-backed store for gatherings (THRESHOLD
// first). Mirrors the pattern in store.ts: tables auto-create on first use, no
// migration step. The database is NEVER exposed to the client — the public
// page reads only aggregate counts via a server route, and every admin
// read/write runs server-side behind the existing /admin auth (middleware.ts).
// That is the Vercel-Postgres equivalent of the brief's Supabase RLS goals.
// ─────────────────────────────────────────────────────────────────────────

export type Tier = "inner" | "outer";

export const RSVP_STATUSES = [
  "invited",
  "rsvp_received",
  "deposit_paid",
  "paid_in_full",
  "confirmed",
  "waitlisted",
  "declined",
  "cancelled",
] as const;
export type RsvpStatus = (typeof RSVP_STATUSES)[number];

// Statuses that consume a slot (everything except the explicit exits + waitlist).
const ACTIVE_STATUSES: RsvpStatus[] = [
  "invited",
  "rsvp_received",
  "deposit_paid",
  "paid_in_full",
  "confirmed",
];

export function isConfigured(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
}

/**
 * Serialize a JS string array to a Postgres array literal (e.g. `{"a","b"}`)
 * so it can be bound as a primitive and cast with `::text[]`. The sql tagged
 * template only accepts primitives, not arrays. Returns null for empty input.
 */
function toPgTextArray(arr: string[] | null | undefined): string | null {
  if (!arr || arr.length === 0) return null;
  const esc = arr.map((s) => `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`);
  return `{${esc.join(",")}}`;
}

export interface EventRow {
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  venue: string | null;
  starts_on: string | null;
  ends_on: string | null;
  invite_word: string | null;
  inner_price: number;
  inner_cap: number;
  outer_price: number;
  outer_cap: number;
  deposit_amount: number;
  deposit_by: string | null;
  balance_by: string | null;
  rooming_by: string | null;
  estate_beds: number;
  payment_details: string | null;
  created_at: string;
  updated_at: string;
}

export interface RsvpRow {
  id: number;
  created_at: string;
  updated_at: string;
  event_slug: string;
  tier: Tier;
  name: string;
  email: string | null;
  whatsapp: string | null;
  plus_ones: number;
  bed_pref: string | null;
  room_assignment: string | null;
  arrival: string | null;
  departure: string | null;
  adventures: string[] | null;
  dietary: string | null;
  costume_note: string | null;
  guest_note: string | null;
  admin_note: string | null;
  status: RsvpStatus;
  amount_due: number | null;
  amount_paid: number;
  deposit_paid_at: string | null;
  balance_paid_at: string | null;
  details_sent_at: string | null;
  reminder_sent_at: string | null;
}

let ensured = false;
async function ensureTables() {
  if (ensured) return;

  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS events (
      id              SERIAL PRIMARY KEY,
      slug            TEXT UNIQUE NOT NULL,
      name            TEXT NOT NULL,
      subtitle        TEXT,
      venue           TEXT,
      starts_on       DATE,
      ends_on         DATE,
      invite_word     TEXT,
      inner_price     INT NOT NULL DEFAULT 0,
      inner_cap       INT NOT NULL DEFAULT 0,
      outer_price     INT NOT NULL DEFAULT 0,
      outer_cap       INT NOT NULL DEFAULT 0,
      deposit_amount  INT NOT NULL DEFAULT 0,
      deposit_by      DATE,
      balance_by      DATE,
      rooming_by      DATE,
      estate_beds     INT NOT NULL DEFAULT 0,
      payment_details TEXT,
      created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS event_rsvps (
      id               SERIAL PRIMARY KEY,
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      event_slug       TEXT NOT NULL,
      tier             TEXT NOT NULL DEFAULT 'inner',
      name             TEXT NOT NULL,
      email            TEXT,
      whatsapp         TEXT,
      plus_ones        INT NOT NULL DEFAULT 0,
      bed_pref         TEXT,
      room_assignment  TEXT,
      arrival          DATE,
      departure        DATE,
      adventures       TEXT[],
      dietary          TEXT,
      costume_note     TEXT,
      guest_note       TEXT,
      admin_note       TEXT,
      status           TEXT NOT NULL DEFAULT 'rsvp_received',
      amount_due       INT,
      amount_paid      INT NOT NULL DEFAULT 0,
      deposit_paid_at  TIMESTAMPTZ,
      balance_paid_at  TIMESTAMPTZ,
      details_sent_at  TIMESTAMPTZ,
      reminder_sent_at TIMESTAMPTZ
    )
  `;
  await sql/* sql */`CREATE INDEX IF NOT EXISTS event_rsvps_slug_idx ON event_rsvps (event_slug)`;

  // Production plan / to-do checklist. Seeded once per event (guarded by
  // events.tasks_seeded) so clearing the list doesn't re-spawn the defaults.
  await sql/* sql */`ALTER TABLE events ADD COLUMN IF NOT EXISTS tasks_seeded BOOLEAN NOT NULL DEFAULT FALSE`;
  await sql/* sql */`
    CREATE TABLE IF NOT EXISTS event_tasks (
      id          SERIAL PRIMARY KEY,
      event_slug  TEXT NOT NULL,
      title       TEXT NOT NULL,
      category    TEXT NOT NULL DEFAULT 'General',
      due_on      DATE,
      status      TEXT NOT NULL DEFAULT 'todo',
      notes       TEXT,
      sort        INT NOT NULL DEFAULT 0,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  await sql/* sql */`CREATE INDEX IF NOT EXISTS event_tasks_slug_idx ON event_tasks (event_slug)`;

  ensured = true;
}

// ───── event config (single source of truth, editable from admin) ─────────

/** Seed THRESHOLD on first touch; never overwrites edits made in admin. */
async function seedThreshold() {
  const s = THRESHOLD_SEED;
  await sql/* sql */`
    INSERT INTO events (
      slug, name, subtitle, venue, starts_on, ends_on, invite_word,
      inner_price, inner_cap, outer_price, outer_cap,
      deposit_amount, deposit_by, balance_by, rooming_by, estate_beds, payment_details
    )
    VALUES (
      ${s.slug}, ${s.name}, ${s.subtitle}, ${s.venue}, ${s.startsOn}, ${s.endsOn}, ${s.inviteWord},
      ${s.innerPrice}, ${s.innerCap}, ${s.outerPrice}, ${s.outerCap},
      ${s.depositAmount}, ${s.depositBy}, ${s.balanceBy}, ${s.roomingBy}, ${s.estateBeds}, ${s.paymentDetails}
    )
    ON CONFLICT (slug) DO NOTHING
  `;
}

export async function getEvent(slug: string): Promise<EventRow | null> {
  if (!isConfigured()) return null;
  await ensureTables();
  if (slug === THRESHOLD_SEED.slug) await seedThreshold();
  const { rows } = await sql<EventRow>/* sql */`
    SELECT * FROM events WHERE slug = ${slug} LIMIT 1
  `;
  return rows[0] ?? null;
}

export interface EventConfigInput {
  name: string;
  subtitle: string;
  venue: string;
  starts_on: string;
  ends_on: string;
  invite_word: string;
  inner_price: number;
  inner_cap: number;
  outer_price: number;
  outer_cap: number;
  deposit_amount: number;
  deposit_by: string;
  balance_by: string;
  rooming_by: string;
  estate_beds: number;
  payment_details: string;
}

export async function updateEventConfig(slug: string, c: EventConfigInput) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`
    UPDATE events SET
      name = ${c.name},
      subtitle = ${c.subtitle},
      venue = ${c.venue},
      starts_on = ${c.starts_on || null},
      ends_on = ${c.ends_on || null},
      invite_word = ${c.invite_word},
      inner_price = ${c.inner_price},
      inner_cap = ${c.inner_cap},
      outer_price = ${c.outer_price},
      outer_cap = ${c.outer_cap},
      deposit_amount = ${c.deposit_amount},
      deposit_by = ${c.deposit_by || null},
      balance_by = ${c.balance_by || null},
      rooming_by = ${c.rooming_by || null},
      estate_beds = ${c.estate_beds},
      payment_details = ${c.payment_details},
      updated_at = NOW()
    WHERE slug = ${slug}
  `;
}

// ───── capacity (aggregates only — safe for the public page) ──────────────

export interface Capacity {
  inner: { taken: number; cap: number; remaining: number; full: boolean };
  outer: { taken: number; cap: number; remaining: number; full: boolean };
}

export async function capacity(slug: string): Promise<Capacity> {
  const ev = await getEvent(slug);
  const innerCap = ev?.inner_cap ?? 0;
  const outerCap = ev?.outer_cap ?? 0;

  let innerTaken = 0;
  let outerTaken = 0;
  if (isConfigured()) {
    await ensureTables();
    // Count per (tier, status) then sum the slot-consuming statuses in JS — the
    // sql tagged template only binds primitives, so no array param for ANY().
    const { rows } = await sql<{ tier: Tier; status: RsvpStatus; n: number }>/* sql */`
      SELECT tier, status, COUNT(*)::int AS n
      FROM event_rsvps
      WHERE event_slug = ${slug}
      GROUP BY tier, status
    `;
    for (const r of rows) {
      if (!ACTIVE_STATUSES.includes(r.status)) continue;
      if (r.tier === "inner") innerTaken += r.n;
      else if (r.tier === "outer") outerTaken += r.n;
    }
  }

  const mk = (taken: number, cap: number) => ({
    taken,
    cap,
    remaining: Math.max(0, cap - taken),
    full: cap > 0 && taken >= cap,
  });
  return { inner: mk(innerTaken, innerCap), outer: mk(outerTaken, outerCap) };
}

// ───── RSVPs ──────────────────────────────────────────────────────────────

export interface RsvpInput {
  event_slug: string;
  tier: Tier;
  name: string;
  email?: string;
  whatsapp?: string;
  plus_ones?: number;
  bed_pref?: string;
  arrival?: string;
  adventures?: string[];
  dietary?: string;
  costume_note?: string;
  guest_note?: string;
}

/**
 * Insert an RSVP. Capacity is enforced softly: if the tier is full the row is
 * stored as `waitlisted` rather than rejected. Returns the resulting status so
 * the form can show the right confirmation copy.
 */
export async function insertRsvp(
  input: RsvpInput
): Promise<{ ok: boolean; status?: RsvpStatus; message: string }> {
  if (!isConfigured()) return { ok: false, message: "DB not configured." };
  try {
    await ensureTables();
    const ev = await getEvent(input.event_slug);
    if (!ev) return { ok: false, message: "Unknown event." };

    const cap = await capacity(input.event_slug);
    const full = input.tier === "inner" ? cap.inner.full : cap.outer.full;
    const status: RsvpStatus = full ? "waitlisted" : "rsvp_received";
    const amountDue = input.tier === "inner" ? ev.inner_price : ev.outer_price;
    const adventures = toPgTextArray(input.adventures);

    await sql/* sql */`
      INSERT INTO event_rsvps (
        event_slug, tier, name, email, whatsapp, plus_ones, bed_pref,
        arrival, adventures, dietary, costume_note, guest_note, status, amount_due
      )
      VALUES (
        ${input.event_slug}, ${input.tier}, ${input.name}, ${input.email || null},
        ${input.whatsapp || null}, ${input.plus_ones ?? 0}, ${input.bed_pref || null},
        ${input.arrival || null}, ${adventures}::text[],
        ${input.dietary || null}, ${input.costume_note || null}, ${input.guest_note || null},
        ${status}, ${amountDue}
      )
    `;
    return { ok: true, status, message: "Saved." };
  } catch {
    return { ok: false, message: "Couldn't save right now." };
  }
}

export async function listRsvps(slug: string, limit = 1000): Promise<RsvpRow[]> {
  if (!isConfigured()) return [];
  await ensureTables();
  const { rows } = await sql<RsvpRow>/* sql */`
    SELECT * FROM event_rsvps
    WHERE event_slug = ${slug}
    ORDER BY created_at DESC
    LIMIT ${limit}
  `;
  return rows;
}

export async function getRsvp(id: number): Promise<RsvpRow | null> {
  if (!isConfigured()) return null;
  await ensureTables();
  const { rows } = await sql<RsvpRow>/* sql */`SELECT * FROM event_rsvps WHERE id = ${id} LIMIT 1`;
  return rows[0] ?? null;
}

// ───── admin mutations ─────────────────────────────────────────────────────

export async function updateRsvpStatus(id: number, status: RsvpStatus) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`UPDATE event_rsvps SET status = ${status}, updated_at = NOW() WHERE id = ${id}`;
}

/**
 * Record a manual payment (deposit or balance). Adds to amount_paid and stamps
 * the matching timestamp; auto-advances status as money lands.
 */
export async function recordPayment(id: number, kind: "deposit" | "balance", amount: number) {
  if (!isConfigured()) return;
  await ensureTables();
  const row = await getRsvp(id);
  if (!row) return;

  const paid = (row.amount_paid ?? 0) + amount;
  const due = row.amount_due ?? 0;

  // Don't downgrade a confirmed/declined/cancelled row automatically.
  const fixed: RsvpStatus[] = ["confirmed", "declined", "cancelled"];
  let nextStatus = row.status;
  if (!fixed.includes(row.status)) {
    if (due > 0 && paid >= due) nextStatus = "paid_in_full";
    else if (paid > 0) nextStatus = "deposit_paid";
  }

  if (kind === "deposit") {
    await sql/* sql */`
      UPDATE event_rsvps
      SET amount_paid = ${paid}, deposit_paid_at = NOW(), status = ${nextStatus}, updated_at = NOW()
      WHERE id = ${id}
    `;
  } else {
    await sql/* sql */`
      UPDATE event_rsvps
      SET amount_paid = ${paid}, balance_paid_at = NOW(), status = ${nextStatus}, updated_at = NOW()
      WHERE id = ${id}
    `;
  }
}

export async function assignRoom(id: number, room: string) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`UPDATE event_rsvps SET room_assignment = ${room || null}, updated_at = NOW() WHERE id = ${id}`;
}

export async function updateAdminNote(id: number, note: string) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`UPDATE event_rsvps SET admin_note = ${note || null}, updated_at = NOW() WHERE id = ${id}`;
}

export async function markFlag(id: number, flag: "details_sent" | "reminder_sent", on: boolean) {
  if (!isConfigured()) return;
  await ensureTables();
  if (flag === "details_sent") {
    if (on) await sql/* sql */`UPDATE event_rsvps SET details_sent_at = NOW(), updated_at = NOW() WHERE id = ${id}`;
    else await sql/* sql */`UPDATE event_rsvps SET details_sent_at = NULL, updated_at = NOW() WHERE id = ${id}`;
  } else {
    if (on) await sql/* sql */`UPDATE event_rsvps SET reminder_sent_at = NOW(), updated_at = NOW() WHERE id = ${id}`;
    else await sql/* sql */`UPDATE event_rsvps SET reminder_sent_at = NULL, updated_at = NOW() WHERE id = ${id}`;
  }
}

export async function deleteRsvp(id: number) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`DELETE FROM event_rsvps WHERE id = ${id}`;
}

// ───── dashboard rollups ────────────────────────────────────────────────────

export interface EventStats {
  inner: { count: number; cap: number; remaining: number };
  outer: { count: number; cap: number; remaining: number };
  waitlisted: number;
  committed: number; // sum of amount_due for active rows
  collected: number; // sum of amount_paid
  outstanding: number; // committed - collected
  unpaidPastDeposit: number; // active inner rows with nothing paid
  unassignedBeds: number; // inner rows preferring/needing estate beds without a room
  overCapacity: boolean;
}

export async function eventStats(slug: string): Promise<EventStats> {
  const ev = await getEvent(slug);
  const rows = await listRsvps(slug);
  const innerCap = ev?.inner_cap ?? 0;
  const outerCap = ev?.outer_cap ?? 0;

  const active = (r: RsvpRow) => ACTIVE_STATUSES.includes(r.status);
  const inner = rows.filter((r) => r.tier === "inner" && active(r));
  const outer = rows.filter((r) => r.tier === "outer" && active(r));

  const committed = [...inner, ...outer].reduce((s, r) => s + (r.amount_due ?? 0), 0);
  const collected = rows.reduce((s, r) => s + (r.amount_paid ?? 0), 0);

  return {
    inner: { count: inner.length, cap: innerCap, remaining: Math.max(0, innerCap - inner.length) },
    outer: { count: outer.length, cap: outerCap, remaining: Math.max(0, outerCap - outer.length) },
    waitlisted: rows.filter((r) => r.status === "waitlisted").length,
    committed,
    collected,
    outstanding: Math.max(0, committed - collected),
    unpaidPastDeposit: inner.filter((r) => (r.amount_paid ?? 0) <= 0).length,
    unassignedBeds: inner.filter(
      (r) => (r.bed_pref === "estate" || r.bed_pref === "either") && !r.room_assignment
    ).length,
    overCapacity: inner.length > innerCap || outer.length > outerCap,
  };
}

// ───── production plan / to-do checklist ────────────────────────────────────

export type TaskStatus = "todo" | "doing" | "done";

export interface TaskRow {
  id: number;
  event_slug: string;
  title: string;
  category: string;
  due_on: string | null;
  status: TaskStatus;
  notes: string | null;
  sort: number;
  created_at: string;
  updated_at: string;
}

/** Seed the default checklist once (guarded by events.tasks_seeded). */
async function seedTasks(slug: string) {
  if (slug !== THRESHOLD_SEED.slug) return;
  const { rows } = await sql<{ tasks_seeded: boolean }>/* sql */`
    SELECT tasks_seeded FROM events WHERE slug = ${slug} LIMIT 1
  `;
  if (!rows[0] || rows[0].tasks_seeded) return;

  // Insert all defaults; `sort` preserves the authored order within a date.
  for (let i = 0; i < THRESHOLD_TASKS.length; i++) {
    const t = THRESHOLD_TASKS[i];
    await sql/* sql */`
      INSERT INTO event_tasks (event_slug, title, category, due_on, notes, sort)
      VALUES (${slug}, ${t.title}, ${t.category}, ${t.due || null}, ${t.notes || null}, ${i})
    `;
  }
  await sql/* sql */`UPDATE events SET tasks_seeded = TRUE WHERE slug = ${slug}`;
}

export async function listTasks(slug: string): Promise<TaskRow[]> {
  if (!isConfigured()) return [];
  await ensureTables();
  await getEvent(slug); // ensures the event row exists before seeding
  await seedTasks(slug);
  const { rows } = await sql<TaskRow>/* sql */`
    SELECT * FROM event_tasks
    WHERE event_slug = ${slug}
    ORDER BY due_on ASC NULLS LAST, sort ASC, id ASC
  `;
  return rows;
}

export async function addTask(input: {
  event_slug: string;
  title: string;
  category: string;
  due_on?: string;
  notes?: string;
}) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`
    INSERT INTO event_tasks (event_slug, title, category, due_on, notes)
    VALUES (${input.event_slug}, ${input.title}, ${input.category}, ${input.due_on || null}, ${input.notes || null})
  `;
}

export async function updateTask(
  id: number,
  fields: { title?: string; category?: string; due_on?: string | null; notes?: string }
) {
  if (!isConfigured()) return;
  await ensureTables();
  const cur = (await sql<TaskRow>/* sql */`SELECT * FROM event_tasks WHERE id = ${id} LIMIT 1`).rows[0];
  if (!cur) return;
  const title = fields.title ?? cur.title;
  const category = fields.category ?? cur.category;
  const due = fields.due_on === undefined ? cur.due_on : fields.due_on || null;
  const notes = fields.notes === undefined ? cur.notes : fields.notes || null;
  await sql/* sql */`
    UPDATE event_tasks
    SET title = ${title}, category = ${category}, due_on = ${due}, notes = ${notes}, updated_at = NOW()
    WHERE id = ${id}
  `;
}

export async function setTaskStatus(id: number, status: TaskStatus) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`UPDATE event_tasks SET status = ${status}, updated_at = NOW() WHERE id = ${id}`;
}

export async function deleteTask(id: number) {
  if (!isConfigured()) return;
  await ensureTables();
  await sql/* sql */`DELETE FROM event_tasks WHERE id = ${id}`;
}

export interface PlanSummary {
  total: number;
  done: number;
  overdue: number;
  nextDue: { title: string; due_on: string } | null;
}

export async function planSummary(slug: string): Promise<PlanSummary> {
  const tasks = await listTasks(slug);
  const now = Date.now();
  const done = tasks.filter((t) => t.status === "done").length;
  const open = tasks.filter((t) => t.status !== "done");
  const overdue = open.filter((t) => t.due_on && new Date(t.due_on).getTime() < now).length;
  const upcoming = open
    .filter((t) => t.due_on && new Date(t.due_on).getTime() >= now)
    .sort((a, b) => (a.due_on! < b.due_on! ? -1 : 1))[0];
  return {
    total: tasks.length,
    done,
    overdue,
    nextDue: upcoming ? { title: upcoming.title, due_on: upcoming.due_on! } : null,
  };
}

/** Adventure tally with the names interested in each, for booking operators. */
export async function adventureRollup(slug: string): Promise<{ activity: string; names: string[] }[]> {
  const rows = await listRsvps(slug);
  const map = new Map<string, string[]>();
  for (const r of rows) {
    if (r.status === "declined" || r.status === "cancelled") continue;
    for (const a of r.adventures ?? []) {
      if (!map.has(a)) map.set(a, []);
      map.get(a)!.push(r.name);
    }
  }
  return [...map.entries()]
    .map(([activity, names]) => ({ activity, names }))
    .sort((a, b) => b.names.length - a.names.length);
}
