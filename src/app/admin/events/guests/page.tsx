import { getEvent, listRsvps, isConfigured, type RsvpRow } from "@/lib/events";
import { THRESHOLD_SEED, THRESHOLD_SLUG } from "@content/threshold";
import { toCsv } from "../../util";
import { GuestRow } from "../GuestRow";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type SP = { q?: string; tier?: string; status?: string; sort?: string };

export default async function GuestsPage({ searchParams }: { searchParams: Promise<SP> }) {
  if (!isConfigured()) return <p className="body-sm">Database not connected.</p>;

  const sp = await searchParams;
  const q = (sp.q ?? "").toLowerCase().trim();
  const tierFilter = sp.tier ?? "all";
  const statusFilter = sp.status ?? "all";
  const sort = sp.sort ?? "recent";

  const [ev, all] = await Promise.all([getEvent(THRESHOLD_SLUG), listRsvps(THRESHOLD_SLUG)]);
  const depositAmount = ev?.deposit_amount ?? THRESHOLD_SEED.depositAmount;

  let rows = all.filter((r) => {
    if (tierFilter !== "all" && r.tier !== tierFilter) return false;
    if (statusFilter !== "all" && r.status !== statusFilter) return false;
    if (!q) return true;
    return [r.name, r.email, r.whatsapp, r.dietary, r.guest_note, (r.adventures ?? []).join(" ")]
      .map((v) => String(v ?? "").toLowerCase())
      .some((v) => v.includes(q));
  });

  rows = [...rows].sort((a, b) => {
    if (sort === "name") return a.name.localeCompare(b.name);
    if (sort === "arrival") return (a.arrival ?? "9999").localeCompare(b.arrival ?? "9999");
    if (sort === "owed") return (b.amount_due ?? 0) - (b.amount_paid ?? 0) - ((a.amount_due ?? 0) - (a.amount_paid ?? 0));
    return b.created_at.localeCompare(a.created_at); // recent
  });

  const csv = toCsv(
    ["id", "rsvp_date", "tier", "status", "name", "email", "whatsapp", "amount_due", "amount_paid", "bed_pref", "room", "arrival", "adventures", "dietary", "guest_note"],
    rows.map((r: RsvpRow) => [
      r.id, r.created_at, r.tier, r.status, r.name, r.email, r.whatsapp,
      r.amount_due, r.amount_paid, r.bed_pref, r.room_assignment, r.arrival,
      (r.adventures ?? []).join("; "), r.dietary, r.guest_note,
    ])
  );
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  const tierTabs = [
    { key: "all", label: `All (${all.length})` },
    { key: "inner", label: `Inner (${all.filter((r) => r.tier === "inner").length})` },
    { key: "outer", label: `Outer (${all.filter((r) => r.tier === "outer").length})` },
  ];
  const sorts = [
    { key: "recent", label: "Recent" },
    { key: "name", label: "Name" },
    { key: "arrival", label: "Arrival" },
    { key: "owed", label: "Amount owed" },
  ];

  const buildHref = (patch: Partial<SP>) => {
    const next = { tier: tierFilter, status: statusFilter, sort, q, ...patch };
    const params = new URLSearchParams();
    if (next.tier !== "all") params.set("tier", next.tier);
    if (next.status !== "all") params.set("status", next.status);
    if (next.sort !== "recent") params.set("sort", next.sort);
    if (next.q) params.set("q", next.q);
    const qs = params.toString();
    return qs ? `/admin/events/guests?${qs}` : "/admin/events/guests";
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <form method="get" className="flex flex-wrap items-center gap-2">
          {tierFilter !== "all" && <input type="hidden" name="tier" value={tierFilter} />}
          {statusFilter !== "all" && <input type="hidden" name="status" value={statusFilter} />}
          {sort !== "recent" && <input type="hidden" name="sort" value={sort} />}
          <input
            name="q"
            defaultValue={q}
            placeholder="Search name, email, note…"
            className="w-64 rounded-full border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-4 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brass)]"
          />
          <button type="submit" className="rounded-full glass px-4 py-2 text-sm text-[var(--color-ink)]">Search</button>
        </form>
        <a
          href={csvHref}
          download={`threshold-guests-${new Date().toISOString().slice(0, 10)}.csv`}
          className="rounded-full glass px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
        >
          Export CSV ↓
        </a>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2">
          {tierTabs.map((t) => (
            <a
              key={t.key}
              href={buildHref({ tier: t.key })}
              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition ${
                t.key === tierFilter ? "bg-[var(--color-brass)] text-[var(--color-bg)]" : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {t.label}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="label-mono">Sort</span>
          {sorts.map((s) => (
            <a
              key={s.key}
              href={buildHref({ sort: s.key })}
              className={`rounded-full px-3 py-1 text-xs transition ${
                s.key === sort ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]" : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {statusFilter !== "all" && (
        <div>
          <a href={buildHref({ status: "all" })} className="label-mono text-[var(--color-brass)]">
            Filtered by status: {statusFilter.replace(/_/g, " ")} ✕
          </a>
        </div>
      )}

      {rows.length === 0 ? (
        <p className="body-sm">No matches.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl glass">
          <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
            <thead>
              <tr className="bg-[var(--glass-fill)] text-left">
                <th className="label-mono p-3">Status</th>
                <th className="label-mono p-3">Name</th>
                <th className="label-mono p-3">Tier</th>
                <th className="label-mono p-3">Contact</th>
                <th className="label-mono p-3">Paid / Due</th>
                <th className="label-mono p-3">Bed / Room</th>
                <th className="label-mono p-3">Arrival</th>
                <th className="label-mono p-3">RSVP</th>
                <th className="label-mono p-3 text-right">Manage</th>
              </tr>
            </thead>
            {rows.map((r) => (
              <GuestRow key={r.id} row={r} depositAmount={depositAmount} />
            ))}
          </table>
        </div>
      )}
    </div>
  );
}
