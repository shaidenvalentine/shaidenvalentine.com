import { listRsvps, adventureRollup, isConfigured } from "@/lib/events";
import { THRESHOLD_SLUG } from "@content/threshold";
import { toCsv } from "../../util";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ACTIVE = ["invited", "rsvp_received", "deposit_paid", "paid_in_full", "confirmed"];

function fmtDay(iso: string | null) {
  if (!iso) return "Unspecified";
  try {
    return new Date(iso).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export default async function RollupsPage() {
  if (!isConfigured()) return <p className="body-sm">Database not connected.</p>;

  const [all, adventures] = await Promise.all([listRsvps(THRESHOLD_SLUG), adventureRollup(THRESHOLD_SLUG)]);
  const active = all.filter((r) => ACTIVE.includes(r.status));

  // Dietary (inner circle eats every meal)
  const dietary = active.filter((r) => r.tier === "inner" && r.dietary && r.dietary.trim() !== "");
  const dietaryCsv = toCsv(["name", "dietary"], dietary.map((r) => [r.name, r.dietary]));
  const dietaryHref = `data:text/csv;charset=utf-8,${encodeURIComponent(dietaryCsv)}`;

  // Transport — group inner arrivals by day
  const byDay = new Map<string, string[]>();
  for (const r of active.filter((r) => r.tier === "inner")) {
    const key = r.arrival ?? "";
    if (!byDay.has(key)) byDay.set(key, []);
    byDay.get(key)!.push(r.name);
  }
  const arrivalGroups = [...byDay.entries()].sort((a, b) => (a[0] || "9999").localeCompare(b[0] || "9999"));
  const transportCsv = toCsv(
    ["arrival", "name"],
    active.filter((r) => r.tier === "inner").map((r) => [r.arrival ?? "", r.name])
  );
  const transportHref = `data:text/csv;charset=utf-8,${encodeURIComponent(transportCsv)}`;

  return (
    <div className="flex flex-col gap-10">
      {/* Adventures */}
      <section className="rounded-3xl glass p-7">
        <h2 className="display-3 text-[var(--color-ink)]">Adventures</h2>
        <p className="body-sm mt-1">Interest per activity — for booking operators and grouping.</p>
        {adventures.length === 0 ? (
          <p className="body-sm mt-5">No adventure interest yet.</p>
        ) : (
          <ul className="mt-5 flex flex-col gap-px overflow-hidden rounded-2xl border border-[var(--color-line)]">
            {adventures.map((a) => (
              <li key={a.activity} className="grid grid-cols-[12rem_auto_1fr] items-baseline gap-4 bg-[var(--glass-fill)] p-4">
                <span className="text-sm text-[var(--color-ink)]">{a.activity}</span>
                <span className="rounded-full bg-[var(--color-brass)] px-2 py-0.5 text-xs font-medium text-[var(--color-bg)]">{a.names.length}</span>
                <span className="text-xs text-[var(--color-ink-muted)]">{a.names.join(", ")}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Dietary */}
      <section className="rounded-3xl glass p-7">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="display-3 text-[var(--color-ink)]">Dietary</h2>
            <p className="body-sm mt-1">For catering — inner circle.</p>
          </div>
          {dietary.length > 0 && (
            <a href={dietaryHref} download="threshold-dietary.csv" className="rounded-full glass px-4 py-2 text-xs text-[var(--color-ink)]">
              CSV ↓
            </a>
          )}
        </div>
        {dietary.length === 0 ? (
          <p className="body-sm mt-5">No dietary needs noted.</p>
        ) : (
          <ul className="mt-5 divide-y divide-[var(--color-line)]">
            {dietary.map((r) => (
              <li key={r.id} className="grid grid-cols-[12rem_1fr] gap-4 py-3">
                <span className="text-sm text-[var(--color-ink)]">{r.name}</span>
                <span className="text-sm text-[var(--color-ink-muted)]">{r.dietary}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Transport / arrival */}
      <section className="rounded-3xl glass p-7">
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="display-3 text-[var(--color-ink)]">Arrivals</h2>
            <p className="body-sm mt-1">Grouped by day — for shuttle planning.</p>
          </div>
          {arrivalGroups.length > 0 && (
            <a href={transportHref} download="threshold-transport.csv" className="rounded-full glass px-4 py-2 text-xs text-[var(--color-ink)]">
              CSV ↓
            </a>
          )}
        </div>
        {arrivalGroups.length === 0 ? (
          <p className="body-sm mt-5">No arrivals yet.</p>
        ) : (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {arrivalGroups.map(([day, names]) => (
              <div key={day || "unspecified"} className="rounded-2xl border border-[var(--color-line)] p-4">
                <div className="flex items-baseline justify-between">
                  <span className="label-mono text-[var(--color-brass)]">{fmtDay(day || null)}</span>
                  <span className="text-xs text-[var(--color-ink-muted)]">{names.length}</span>
                </div>
                <p className="mt-2 text-sm text-[var(--color-ink-muted)]">{names.join(", ")}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
