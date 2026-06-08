import { listLeads, isConfigured } from "@/lib/store";
import { fmtDate, toCsv } from "../util";
import { StatusPill, DeleteButton } from "../RowActions";
import { Notes, MarkAllReadButton } from "../Notes";
import { Search } from "../Search";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function LeadsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").toLowerCase().trim();
  const statusFilter = sp.status ?? "all";

  if (!isConfigured()) {
    return <p className="body-sm">Database not connected.</p>;
  }

  const all = await listLeads(500);
  const filtered = all.filter((l) => {
    if (statusFilter !== "all" && l.status !== statusFilter) return false;
    if (!q) return true;
    return [l.name, l.email, l.whatsapp, l.instagram, l.intent]
      .map((v) => String(v ?? "").toLowerCase())
      .some((v) => v.includes(q));
  });

  const csv = toCsv(
    ["id", "created_at", "intent", "status", "name", "email", "whatsapp", "instagram"],
    filtered.map((l) => [l.id, l.created_at, l.intent, l.status, l.name, l.email, l.whatsapp, l.instagram])
  );
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  const tabs: { key: string; label: string }[] = [
    { key: "all", label: `All (${all.length})` },
    { key: "new", label: `New (${all.filter((l) => l.status === "new").length})` },
    { key: "replied", label: "Replied" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <span className="label-eyebrow">Inbox · {all.length}</span>
        <h1 className="display-1 mt-3 max-w-[14ch] text-[var(--color-ink)]">Leads.</h1>
        <p className="body-lg mt-3 max-w-[52ch] text-[var(--color-ink-muted)]">
          Waitlist signups (coaching, course) and ebook downloads.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <Search placeholder="Search name, email, intent…" />
        <MarkAllReadButton table="leads" />
        <a
          href={csvHref}
          download={`leads-${new Date().toISOString().slice(0, 10)}.csv`}
          className="rounded-full glass px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
        >
          Export CSV ↓
        </a>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[var(--color-line)] pb-4">
        {tabs.map((t) => {
          const active = t.key === statusFilter;
          const href = t.key === "all" ? "/admin/leads" : `/admin/leads?status=${t.key}`;
          return (
            <a
              key={t.key}
              href={href}
              className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition ${
                active
                  ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                  : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
              }`}
            >
              {t.label}
            </a>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="body-sm">No matches.</p>
      ) : (
        <div className="overflow-x-auto rounded-3xl glass">
          <table className="w-full min-w-[64rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--color-line)] bg-[var(--glass-fill)]">
                <th className="label-mono p-4">Status</th>
                <th className="label-mono p-4">When</th>
                <th className="label-mono p-4">Interest</th>
                <th className="label-mono p-4">Name</th>
                <th className="label-mono p-4">Email</th>
                <th className="label-mono p-4">WhatsApp</th>
                <th className="label-mono p-4">Instagram</th>
                <th className="label-mono p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l, i) => (
                <tr key={l.id} className={i > 0 ? "border-t border-[var(--color-line)]" : ""}>
                  <td className="p-4 align-top"><StatusPill status={l.status} table="leads" id={l.id} /></td>
                  <td className="whitespace-nowrap p-4 align-top text-[var(--color-ink-muted)]">{fmtDate(l.created_at)}</td>
                  <td className="p-4 align-top text-[var(--color-brass)]">{l.intent}</td>
                  <td className="p-4 align-top text-[var(--color-ink)]">{l.name}</td>
                  <td className="p-4 align-top"><a href={`mailto:${l.email}`} className="link-underline">{l.email}</a></td>
                  <td className="whitespace-nowrap p-4 align-top">
                    <a href={`https://wa.me/${l.whatsapp.replace(/[^\d]/g, "")}`} target="_blank" rel="noreferrer" className="link-underline">{l.whatsapp}</a>
                  </td>
                  <td className="p-4 align-top">
                    {l.instagram ? (
                      <a href={`https://instagram.com/${l.instagram.replace(/^@/, "")}`} target="_blank" rel="noreferrer" className="link-underline">{l.instagram}</a>
                    ) : <span className="text-[var(--color-ink-whisper)]">—</span>}
                  </td>
                  <td className="p-4 align-top text-right">
                    <div className="flex flex-col items-end gap-2">
                      <Notes table="leads" id={l.id} initial={l.notes} />
                      <DeleteButton table="leads" id={l.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
