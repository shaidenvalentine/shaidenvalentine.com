import Link from "next/link";
import {
  counts,
  isConfigured,
  listLeads,
  listApplications,
  listFeedback,
  dailyActivity,
  intentBreakdown,
  roleBreakdown,
  statusBreakdown,
} from "@/lib/store";
import { fmtDate } from "./util";
import { DailyChart, Sparkline, BarList, StatusDonut } from "./charts";

const BRASS = "#C9A874";
const INK_SOFT = "rgba(244,241,234,0.55)";
const INK_FAINT = "rgba(244,241,234,0.25)";

function StatCard({
  label,
  n,
  newCount,
  series,
  color,
  href,
}: {
  label: string;
  n: number;
  newCount?: number;
  series: number[];
  color: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group @container relative flex flex-col gap-4 overflow-hidden rounded-3xl glass p-6 transition hover:bg-[var(--glass-fill-strong)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full opacity-25 blur-3xl transition group-hover:opacity-50"
        style={{ background: color }}
      />
      <div className="relative z-10 flex items-center justify-between">
        <span className="label-mono">{label}</span>
        {newCount ? (
          <span className="rounded-full bg-[var(--color-brass)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-[var(--color-bg)]">
            {newCount} new
          </span>
        ) : null}
      </div>
      <div className="relative z-10 flex items-baseline gap-3">
        <span className="display-stat text-[var(--color-ink)]">{n}</span>
        <span className="label-mono text-[var(--color-ink-muted)]">all-time</span>
      </div>
      <div className="relative z-10">
        <Sparkline values={series} color={color} />
        <span className="label-mono mt-2 block text-[var(--color-ink-muted)]">last 30 days</span>
      </div>
    </Link>
  );
}

export default async function AdminOverview() {
  if (!isConfigured()) {
    return (
      <div className="rounded-3xl glass p-7">
        <h1 className="display-3 mb-3 text-[var(--color-ink)]">Database not connected</h1>
        <p className="body-sm max-w-[64ch]">
          In Vercel → your <code>shaidenvalentine</code> project → <strong>Storage</strong> → <em>Create database</em> →
          <strong> Postgres (Neon)</strong>. Vercel sets <code>POSTGRES_URL</code> automatically and redeploys.
          Then this dashboard fills in.
        </p>
      </div>
    );
  }

  const [c, leads, apps, fb, daily, intents, roles, leadStatus, appStatus] = await Promise.all([
    counts(),
    listLeads(6),
    listApplications(6),
    listFeedback(6),
    dailyActivity(30),
    intentBreakdown(6),
    roleBreakdown(6),
    statusBreakdown("leads"),
    statusBreakdown("applications"),
  ]);

  const sparkL = daily.map((d) => d.leads);
  const sparkA = daily.map((d) => d.applications);
  const sparkF = daily.map((d) => d.feedback);

  return (
    <div className="flex flex-col gap-12">
      <header>
        <span className="label-eyebrow">Command center</span>
        <h1 className="display-1 mt-3 max-w-[14ch] text-[var(--color-ink)]">Today, in motion.</h1>
        <p className="body-lg mt-4 max-w-[52ch] text-[var(--color-ink-muted)]">
          Everything flowing into the site — waitlists, applications, feedback — visualized in one place.
        </p>
      </header>

      {/* Stat cards */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Leads"
          n={c.leads}
          newCount={c.newLeads}
          series={sparkL}
          color={BRASS}
          href="/admin/leads"
        />
        <StatCard
          label="Applications"
          n={c.applications}
          newCount={c.newApps}
          series={sparkA}
          color={INK_SOFT}
          href="/admin/applications"
        />
        <StatCard
          label="Feedback"
          n={c.feedback}
          series={sparkF}
          color={INK_FAINT}
          href="/admin/feedback"
        />
      </section>

      {/* Daily activity chart */}
      <section className="rounded-3xl glass p-7 md:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-4">
          <div>
            <span className="label-mono text-[var(--color-brass)]">Activity</span>
            <h2 className="display-3 mt-1 text-[var(--color-ink)]">Last 30 days</h2>
          </div>
          <ul className="flex flex-wrap gap-4 text-xs">
            {[
              { label: "Leads", color: BRASS },
              { label: "Applications", color: INK_SOFT },
              { label: "Feedback", color: INK_FAINT },
            ].map((s) => (
              <li key={s.label} className="flex items-center gap-2">
                <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="text-[var(--color-ink-muted)]">{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-5">
          <DailyChart
            data={daily}
            series={[
              { key: "leads", label: "Leads", color: BRASS },
              { key: "applications", label: "Applications", color: INK_SOFT },
              { key: "feedback", label: "Feedback", color: INK_FAINT },
            ]}
          />
        </div>
      </section>

      {/* Breakdowns */}
      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl glass p-7">
          <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-4">
            <div>
              <span className="label-mono text-[var(--color-brass)]">Leads</span>
              <h2 className="display-3 mt-1 text-[var(--color-ink)]">By interest</h2>
            </div>
            <Link href="/admin/leads" className="label-mono link-underline">All →</Link>
          </div>
          <div className="mt-5">
            <BarList rows={intents.map((i) => ({ label: i.intent, n: i.n }))} />
          </div>
        </div>

        <div className="rounded-3xl glass p-7">
          <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-4">
            <div>
              <span className="label-mono text-[var(--color-brass)]">Applications</span>
              <h2 className="display-3 mt-1 text-[var(--color-ink)]">By role</h2>
            </div>
            <Link href="/admin/applications" className="label-mono link-underline">All →</Link>
          </div>
          <div className="mt-5">
            <BarList rows={roles.map((r) => ({ label: r.role, n: r.n }))} />
          </div>
        </div>
      </section>

      {/* Status donuts */}
      <section className="grid gap-5 md:grid-cols-2">
        <div className="rounded-3xl glass p-7">
          <span className="label-mono text-[var(--color-brass)]">Leads</span>
          <h2 className="display-3 mt-1 text-[var(--color-ink)]">Status</h2>
          <div className="mt-5">
            <StatusDonut rows={leadStatus} total={c.leads} />
          </div>
        </div>
        <div className="rounded-3xl glass p-7">
          <span className="label-mono text-[var(--color-brass)]">Applications</span>
          <h2 className="display-3 mt-1 text-[var(--color-ink)]">Status</h2>
          <div className="mt-5">
            <StatusDonut rows={appStatus} total={c.applications} />
          </div>
        </div>
      </section>

      {/* Recent activity */}
      <section className="grid gap-5 md:grid-cols-3">
        <RecentList title="Recent leads" href="/admin/leads" items={leads.map((l) => ({
          id: l.id,
          when: l.created_at,
          title: l.name,
          sub: l.intent,
        }))} />
        <RecentList title="Recent applications" href="/admin/applications" items={apps.map((a) => ({
          id: a.id,
          when: a.created_at,
          title: a.name,
          sub: a.role,
        }))} />
        <RecentList title="Recent feedback" href="/admin/feedback" items={fb.map((f) => ({
          id: f.id,
          when: f.created_at,
          title: f.topic ?? "General",
          sub: f.message,
        }))} />
      </section>
    </div>
  );
}

function RecentList({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { id: number; when: string; title: string; sub: string }[];
}) {
  return (
    <div className="rounded-3xl glass p-6">
      <div className="flex items-baseline justify-between border-b border-[var(--color-line)] pb-4">
        <h3 className="display-3 text-[var(--color-ink)]">{title}</h3>
        <Link href={href} className="label-mono link-underline">All →</Link>
      </div>
      {items.length === 0 ? (
        <p className="body-sm mt-4">Nothing yet.</p>
      ) : (
        <ul className="mt-4 divide-y divide-[var(--color-line)]">
          {items.map((it) => (
            <li key={it.id} className="grid gap-1 py-3">
              <div className="flex items-baseline justify-between gap-3">
                <span className="truncate text-sm text-[var(--color-ink)]">{it.title}</span>
                <span className="whitespace-nowrap text-[10px] text-[var(--color-ink-muted)]">
                  {fmtDate(it.when)}
                </span>
              </div>
              <p className="line-clamp-2 text-xs text-[var(--color-brass)]">{it.sub}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
