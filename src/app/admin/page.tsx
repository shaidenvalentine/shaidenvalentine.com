import Link from "next/link";
import { counts, isConfigured, listLeads, listApplications, listFeedback } from "@/lib/store";
import { fmtDate } from "./util";

function Stat({ n, label, href, hint }: { n: number; label: string; href: string; hint?: string }) {
  return (
    <Link href={href} className="rounded-2xl glass p-5 transition hover:bg-[var(--glass-fill-strong)]">
      <div className="label-mono">{label}</div>
      <div className="mt-2 flex items-baseline gap-3">
        <span className="display-3 text-[var(--color-ink)]">{n}</span>
        {hint && <span className="label-mono text-[var(--color-brass)]">{hint}</span>}
      </div>
    </Link>
  );
}

export default async function AdminOverview() {
  if (!isConfigured()) {
    return (
      <div className="rounded-2xl border border-[var(--color-line)] p-6">
        <h1 className="display-3 mb-3">Database not connected</h1>
        <p className="body-sm max-w-[64ch]">
          In Vercel → your <code>shaidenvalentine</code> project → <strong>Storage</strong> →
          <em> Create database</em> → <strong>Postgres (Neon)</strong>. Vercel sets <code>POSTGRES_URL</code>
          automatically and redeploys. Then this dashboard fills in.
        </p>
      </div>
    );
  }

  const [c, leads, apps, fb] = await Promise.all([
    counts(),
    listLeads(5),
    listApplications(5),
    listFeedback(5),
  ]);

  return (
    <div className="flex flex-col gap-10">
      <header>
        <h1 className="display-2">Overview</h1>
        <p className="body-sm mt-2">Everything that's hit the site, in one place.</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Stat n={c.leads} label="Leads" href="/admin/leads" hint={c.newLeads ? `${c.newLeads} new` : undefined} />
        <Stat n={c.applications} label="Applications" href="/admin/applications" hint={c.newApps ? `${c.newApps} new` : undefined} />
        <Stat n={c.feedback} label="Feedback" href="/admin/feedback" />
      </div>

      <section>
        <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-3">
          <h2 className="display-3">Recent leads</h2>
          <Link href="/admin/leads" className="label-mono link-underline">View all →</Link>
        </div>
        {leads.length === 0 ? (
          <p className="body-sm mt-4">No leads yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
            {leads.map((l) => (
              <li key={l.id} className="grid grid-cols-[1fr_auto] gap-4 p-4">
                <div className="min-w-0">
                  <div className="truncate text-sm text-[var(--color-ink)]">{l.name}</div>
                  <div className="truncate text-xs text-[var(--color-brass)]">{l.intent}</div>
                </div>
                <div className="text-right text-xs text-[var(--color-ink-muted)]">{fmtDate(l.created_at)}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-3">
          <h2 className="display-3">Recent applications</h2>
          <Link href="/admin/applications" className="label-mono link-underline">View all →</Link>
        </div>
        {apps.length === 0 ? (
          <p className="body-sm mt-4">No applications yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
            {apps.map((a) => (
              <li key={a.id} className="grid grid-cols-[1fr_auto] gap-4 p-4">
                <div className="min-w-0">
                  <div className="truncate text-sm text-[var(--color-ink)]">{a.name}</div>
                  <div className="truncate text-xs text-[var(--color-brass)]">{a.role}</div>
                </div>
                <div className="text-right text-xs text-[var(--color-ink-muted)]">{fmtDate(a.created_at)}</div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-3">
          <h2 className="display-3">Recent feedback</h2>
          <Link href="/admin/feedback" className="label-mono link-underline">View all →</Link>
        </div>
        {fb.length === 0 ? (
          <p className="body-sm mt-4">No feedback yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-[var(--color-line)] overflow-hidden rounded-2xl border border-[var(--color-line)]">
            {fb.map((f) => (
              <li key={f.id} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <span className="label-mono text-[var(--color-brass)]">{f.topic ?? "General"}</span>
                  <span className="text-xs text-[var(--color-ink-muted)]">{fmtDate(f.created_at)}</span>
                </div>
                <p className="body-sm mt-2 line-clamp-2 text-[var(--color-ink)]">{f.message}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
