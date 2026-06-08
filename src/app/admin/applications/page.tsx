import { listApplications, isConfigured } from "@/lib/store";
import { fmtDate, toCsv } from "../util";
import { StatusPill, DeleteButton } from "../RowActions";
import { Search } from "../Search";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ApplicationsPage({ searchParams }: { searchParams: Promise<{ q?: string; status?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").toLowerCase().trim();
  const statusFilter = sp.status ?? "all";

  if (!isConfigured()) {
    return <p className="body-sm">Database not connected.</p>;
  }

  const all = await listApplications(500);
  const filtered = all.filter((a) => {
    if (statusFilter !== "all" && a.status !== statusFilter) return false;
    if (!q) return true;
    return [a.name, a.email, a.role, a.link, a.message]
      .map((v) => String(v ?? "").toLowerCase())
      .some((v) => v.includes(q));
  });

  const csv = toCsv(
    ["id", "created_at", "status", "role", "name", "email", "link", "message"],
    filtered.map((a) => [a.id, a.created_at, a.status, a.role, a.name, a.email, a.link, a.message])
  );
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  const tabs: { key: string; label: string }[] = [
    { key: "all", label: `All (${all.length})` },
    { key: "new", label: `New (${all.filter((a) => a.status === "new").length})` },
    { key: "replied", label: "Replied" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="display-2">Applications</h1>
        <p className="body-sm mt-2">Work-With-Me submissions, founder pitches, and investment opportunities.</p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <Search placeholder="Search name, email, message…" />
        <a
          href={csvHref}
          download={`applications-${new Date().toISOString().slice(0, 10)}.csv`}
          className="rounded-full glass px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
        >
          Export CSV ↓
        </a>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[var(--color-line)] pb-4">
        {tabs.map((t) => {
          const active = t.key === statusFilter;
          const href = t.key === "all" ? "/admin/applications" : `/admin/applications?status=${t.key}`;
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
        <ul className="flex flex-col gap-3">
          {filtered.map((a) => (
            <li key={a.id} className="rounded-2xl border border-[var(--color-line)] p-5 transition hover:bg-[var(--glass-fill)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--color-line)] pb-3">
                <div className="flex flex-wrap items-center gap-3">
                  <StatusPill status={a.status} table="applications" id={a.id} />
                  <span className="label-mono text-[var(--color-brass)]">{a.role}</span>
                  <span className="text-sm text-[var(--color-ink)]">{a.name}</span>
                </div>
                <span className="text-xs text-[var(--color-ink-muted)]">{fmtDate(a.created_at)}</span>
              </div>
              <p className="body-base mt-3 whitespace-pre-wrap text-[var(--color-ink)]">{a.message}</p>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--color-line)] pt-3 text-xs">
                <div className="flex flex-wrap gap-4">
                  <a href={`mailto:${a.email}`} className="link-underline">{a.email}</a>
                  {a.link && <a href={a.link} target="_blank" rel="noreferrer" className="link-underline">{a.link}</a>}
                </div>
                <DeleteButton table="applications" id={a.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
