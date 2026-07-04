import Link from "next/link";
import { getEvent, eventStats, listRsvps, planSummary, isConfigured } from "@/lib/events";
import { THRESHOLD_SLUG } from "@content/threshold";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

function fmtDay(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  } catch {
    return iso;
  }
}

function StatCard({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="@container rounded-3xl glass p-6">
      <span className="label-mono">{label}</span>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="display-stat text-[var(--color-ink)]">{value}</span>
      </div>
      {sub && <span className="label-mono mt-2 block text-[var(--color-ink-muted)]">{sub}</span>}
    </div>
  );
}

function Flag({ n, label, href }: { n: number; label: string; href: string }) {
  const active = n > 0;
  return (
    <Link
      href={href}
      className={`flex items-center justify-between gap-4 rounded-2xl px-5 py-4 transition ${
        active
          ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-brass)]/40 hover:brightness-110"
          : "glass text-[var(--color-ink-muted)]"
      }`}
    >
      <span className="text-sm">{label}</span>
      <span
        className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
          active ? "bg-[var(--color-brass)] text-[var(--color-bg)]" : "text-[var(--color-ink-whisper)]"
        }`}
      >
        {n}
      </span>
    </Link>
  );
}

export default async function EventDashboard() {
  if (!isConfigured()) {
    return (
      <div className="rounded-3xl glass p-7">
        <h2 className="display-3 mb-3 text-[var(--color-ink)]">Database not connected</h2>
        <p className="body-sm max-w-[64ch]">
          Add a Postgres (Neon) database in Vercel → <strong>Storage</strong>. Once <code>POSTGRES_URL</code> is set,
          the THRESHOLD row seeds automatically and this dashboard fills in.
        </p>
      </div>
    );
  }

  const [ev, stats, rsvps, plan] = await Promise.all([
    getEvent(THRESHOLD_SLUG),
    eventStats(THRESHOLD_SLUG),
    listRsvps(THRESHOLD_SLUG),
    planSummary(THRESHOLD_SLUG),
  ]);
  const planPct = plan.total ? Math.round((plan.done / plan.total) * 100) : 0;

  const now = Date.now();
  const past = (iso: string | null) => (iso ? new Date(iso).getTime() < now : false);
  const activeInner = rsvps.filter(
    (r) => r.tier === "inner" && !["declined", "cancelled", "waitlisted"].includes(r.status)
  );

  const behindDeposit = past(ev?.deposit_by ?? null)
    ? activeInner.filter((r) => (r.amount_paid ?? 0) <= 0).length
    : 0;
  const behindBalance = past(ev?.balance_by ?? null)
    ? activeInner.filter((r) => (r.amount_paid ?? 0) < (r.amount_due ?? 0)).length
    : 0;

  return (
    <div className="flex flex-col gap-10">
      {/* Tier counts */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Inner Circle" value={`${stats.inner.count}/${stats.inner.cap}`} sub={`${stats.inner.remaining} places left`} />
        <StatCard label="Outer Circle" value={`${stats.outer.count}/${stats.outer.cap}`} sub={`${stats.outer.remaining} spots left`} />
        <StatCard label="Waitlisted" value={String(stats.waitlisted)} sub="across both tiers" />
        <StatCard label="Total RSVPs" value={String(rsvps.length)} sub="all statuses" />
      </section>

      {/* Production plan */}
      <section>
        <Link
          href="/admin/events/plan"
          className="group flex flex-col gap-4 rounded-3xl glass p-7 transition hover:bg-[var(--glass-fill-strong)] sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <span className="label-mono text-[var(--color-brass)]">Production plan</span>
            <h2 className="display-3 mt-1 text-[var(--color-ink)]">
              {plan.done}/{plan.total} done · {planPct}%
            </h2>
            <p className="body-sm mt-1">
              {plan.overdue > 0 ? `${plan.overdue} overdue · ` : ""}
              {plan.nextDue ? `next: ${plan.nextDue.title} (${fmtDay(plan.nextDue.due_on)})` : "all scheduled work complete"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-1.5 w-40 overflow-hidden rounded-full bg-[var(--glass-fill-strong)]">
              <div className="h-full rounded-full bg-[var(--color-brass)]" style={{ width: `${planPct}%` }} />
            </div>
            <span className="label-mono text-[var(--color-ink-muted)] transition group-hover:text-[var(--color-ink)]">Open plan →</span>
          </div>
        </Link>
      </section>

      {/* Money */}
      <section className="grid gap-5 sm:grid-cols-3">
        <StatCard label="Committed" value={money(stats.committed)} sub="sum of amounts due (active)" />
        <StatCard label="Collected" value={money(stats.collected)} sub="payments logged" />
        <StatCard label="Outstanding" value={money(stats.outstanding)} sub="still to come in" />
      </section>

      {/* Deadlines */}
      <section className="rounded-3xl glass p-7">
        <h2 className="display-3 text-[var(--color-ink)]">Deadline tracker</h2>
        <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)]">
          <li className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-[var(--glass-fill)] p-4">
            <span className="label-mono">Deposit ($200)</span>
            <span className="text-sm text-[var(--color-ink-muted)]">{fmtDay(ev?.deposit_by ?? null)}</span>
            <span className={`text-xs ${behindDeposit ? "text-[var(--color-brass)]" : "text-[var(--color-ink-whisper)]"}`}>
              {behindDeposit ? `${behindDeposit} behind` : "on track"}
            </span>
          </li>
          <li className="grid grid-cols-[1fr_auto_auto] items-center gap-4 p-4">
            <span className="label-mono">Balance ($300)</span>
            <span className="text-sm text-[var(--color-ink-muted)]">{fmtDay(ev?.balance_by ?? null)}</span>
            <span className={`text-xs ${behindBalance ? "text-[var(--color-brass)]" : "text-[var(--color-ink-whisper)]"}`}>
              {behindBalance ? `${behindBalance} behind` : "on track"}
            </span>
          </li>
          <li className="grid grid-cols-[1fr_auto_auto] items-center gap-4 bg-[var(--glass-fill)] p-4">
            <span className="label-mono">Rooming locked</span>
            <span className="text-sm text-[var(--color-ink-muted)]">{fmtDay(ev?.rooming_by ?? null)}</span>
            <span className={`text-xs ${stats.unassignedBeds ? "text-[var(--color-brass)]" : "text-[var(--color-ink-whisper)]"}`}>
              {stats.unassignedBeds ? `${stats.unassignedBeds} unassigned` : "all set"}
            </span>
          </li>
        </ul>
      </section>

      {/* Flags */}
      <section>
        <h2 className="display-3 mb-5 text-[var(--color-ink)]">Needs attention</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Flag n={stats.overCapacity ? 1 : 0} label="Over capacity" href="/admin/events/guests" />
          <Flag n={behindDeposit + behindBalance} label="Unpaid past deadline" href="/admin/events/guests?status=rsvp_received" />
          <Flag n={stats.unassignedBeds} label="Unassigned estate beds" href="/admin/events/rooms" />
          <Flag n={stats.waitlisted} label="On the waitlist" href="/admin/events/guests?status=waitlisted" />
        </div>
      </section>
    </div>
  );
}
