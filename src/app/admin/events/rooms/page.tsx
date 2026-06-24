import { getEvent, listRsvps, isConfigured } from "@/lib/events";
import { THRESHOLD_SEED, THRESHOLD_SLUG } from "@content/threshold";
import { RoomAssign } from "../RoomAssign";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ACTIVE = ["invited", "rsvp_received", "deposit_paid", "paid_in_full", "confirmed"];

function Stat({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="rounded-3xl glass p-6">
      <span className="label-mono">{label}</span>
      <div className="mt-2 display-2 text-[var(--color-ink)]">{value}</div>
      {sub && <span className="label-mono mt-1 block text-[var(--color-ink-muted)]">{sub}</span>}
    </div>
  );
}

export default async function RoomsPage() {
  if (!isConfigured()) return <p className="body-sm">Database not connected.</p>;

  const [ev, all] = await Promise.all([getEvent(THRESHOLD_SLUG), listRsvps(THRESHOLD_SLUG)]);
  const estateBeds = ev?.estate_beds ?? THRESHOLD_SEED.estateBeds;

  const inner = all.filter((r) => r.tier === "inner" && ACTIVE.includes(r.status));
  const assigned = inner.filter((r) => r.room_assignment && r.room_assignment.trim() !== "");
  const unassigned = inner.filter((r) => !r.room_assignment || r.room_assignment.trim() === "");
  const wantEstate = inner.filter((r) => r.bed_pref === "estate" || r.bed_pref === "either");

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-5 sm:grid-cols-4">
        <Stat label="Estate beds" value={estateBeds} sub="on-site capacity" />
        <Stat label="Assigned" value={assigned.length} sub="have a room" />
        <Stat label="Unassigned" value={unassigned.length} sub="need a bed" />
        <Stat label="Want estate" value={wantEstate.length} sub="pref estate / either" />
      </section>

      <p className="body-sm max-w-[68ch]">
        Estate beds are limited ({estateBeds} on-site); everyone else stays in nearby villas. Type a room into
        each guest below — anything with “Seed” reads as an estate bed in your head; the rest are nearby. Lock
        rooming by {ev?.rooming_by ? new Date(ev.rooming_by).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "10 Oct"}.
      </p>

      <section>
        <h2 className="display-3 mb-4 text-[var(--color-ink)]">Inner circle — bed allocation</h2>
        {inner.length === 0 ? (
          <p className="body-sm">No confirmed inner-circle guests yet.</p>
        ) : (
          <div className="overflow-x-auto rounded-3xl glass">
            <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
              <thead>
                <tr className="bg-[var(--glass-fill)]">
                  <th className="label-mono p-3">Name</th>
                  <th className="label-mono p-3">Bed pref</th>
                  <th className="label-mono p-3">Status</th>
                  <th className="label-mono p-3">Room assignment</th>
                </tr>
              </thead>
              <tbody>
                {inner.map((r) => (
                  <tr key={r.id} className="border-t border-[var(--color-line)]">
                    <td className="p-3 text-[var(--color-ink)]">{r.name}</td>
                    <td className="p-3 text-[var(--color-brass)]">{r.bed_pref ?? "—"}</td>
                    <td className="p-3 text-[var(--color-ink-muted)]">{r.status.replace(/_/g, " ")}</td>
                    <td className="p-3"><RoomAssign id={r.id} initial={r.room_assignment} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
