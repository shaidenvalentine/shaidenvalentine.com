import type { Metadata } from "next";
import { site } from "@content/site";
import { listLeads, isConfigured } from "@/lib/leads";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Always render fresh; never cache the leads table.
export const dynamic = "force-dynamic";
export const revalidate = 0;

const EVENTS: { name: string; when: string }[] = [
  { name: "venture_click", when: "A venture card is opened" },
  { name: "save_contact", when: "Someone downloads the vCard" },
  { name: "apply_submit", when: "Work-With-Me / pitch form submitted" },
  { name: "feedback_submit", when: "Anonymous feedback submitted" },
  { name: "waitlist_join", when: "Coaching or course waitlist joined (includes intent)" },
  { name: "ebook_download", when: "Free ebook download requested (includes which book)" },
];

const QUICK_LINKS = [
  { label: "Live site", href: "/" },
  { label: "Work / pitch form", href: "/#work" },
];

function fmt(iso: string) {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short", day: "numeric", year: "numeric",
      hour: "numeric", minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default async function AdminPage() {
  const configured = isConfigured();
  const leads = configured ? await listLeads(500) : [];

  // CSV string for "Export" download — built inline so no extra route needed.
  const csvLines = [
    "id,created_at,intent,name,email,whatsapp,instagram",
    ...leads.map((l) =>
      [l.id, l.created_at, l.intent, l.name, l.email, l.whatsapp, l.instagram ?? ""]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    ),
  ].join("\n");
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csvLines)}`;

  return (
    <main className="container-page min-h-[100svh] py-20">
      <span className="label-eyebrow">Private · {site.domain}</span>
      <h1 className="display-2 mt-3">Admin</h1>
      <p className="body-lg mt-4 max-w-[56ch] text-[var(--color-ink-muted)]">
        Captured leads from waitlists and ebook downloads, plus the analytics
        dashboard and tracked events.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <a
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:brightness-110"
        >
          Open Vercel Analytics ↗
        </a>
        {leads.length > 0 && (
          <a
            href={csvHref}
            download={`leads-${new Date().toISOString().slice(0, 10)}.csv`}
            className="inline-flex items-center justify-center rounded-full glass px-6 py-3 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
          >
            Export CSV ↓
          </a>
        )}
        {QUICK_LINKS.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="inline-flex items-center justify-center rounded-full glass px-6 py-3 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Leads table */}
      <section className="mt-14">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-3">
          <h2 className="display-3">Leads</h2>
          <span className="label-mono">
            {configured ? `${leads.length} total` : "not configured"}
          </span>
        </div>

        {!configured ? (
          <div className="mt-6 rounded-2xl border border-[var(--color-line)] p-6">
            <p className="body-base text-[var(--color-ink)]">
              The lead database isn&apos;t connected yet.
            </p>
            <p className="body-sm mt-3 max-w-[64ch]">
              In Vercel → your <code>shaidenvalentine</code> project → <strong>Storage</strong> →
              <em> Create database</em> → <strong>Postgres (Neon)</strong>. Vercel will set
              the <code>POSTGRES_URL</code> env var automatically and redeploy. Then this page
              starts filling up. Until that&apos;s set, leads fall back to email if
              <code> RESEND_API_KEY</code> is configured.
            </p>
          </div>
        ) : leads.length === 0 ? (
          <p className="body-sm mt-6">No leads yet. They&apos;ll show up here as people sign up.</p>
        ) : (
          <div className="mt-6 overflow-x-auto rounded-2xl border border-[var(--color-line)]">
            <table className="w-full min-w-[60rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--color-line)] bg-[var(--glass-fill)]">
                  <th className="label-mono p-4">When</th>
                  <th className="label-mono p-4">Interest</th>
                  <th className="label-mono p-4">Name</th>
                  <th className="label-mono p-4">Email</th>
                  <th className="label-mono p-4">WhatsApp</th>
                  <th className="label-mono p-4">Instagram</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l, i) => (
                  <tr key={l.id} className={i > 0 ? "border-t border-[var(--color-line)]" : ""}>
                    <td className="p-4 align-top text-[var(--color-ink-muted)]">{fmt(l.created_at)}</td>
                    <td className="p-4 align-top text-[var(--color-brass)]">{l.intent}</td>
                    <td className="p-4 align-top text-[var(--color-ink)]">{l.name}</td>
                    <td className="p-4 align-top">
                      <a href={`mailto:${l.email}`} className="link-underline">{l.email}</a>
                    </td>
                    <td className="p-4 align-top">
                      <a
                        href={`https://wa.me/${l.whatsapp.replace(/[^\d]/g, "")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="link-underline"
                      >
                        {l.whatsapp}
                      </a>
                    </td>
                    <td className="p-4 align-top">
                      {l.instagram ? (
                        <a
                          href={`https://instagram.com/${l.instagram.replace(/^@/, "")}`}
                          target="_blank"
                          rel="noreferrer"
                          className="link-underline"
                        >
                          {l.instagram}
                        </a>
                      ) : (
                        <span className="text-[var(--color-ink-whisper)]">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Tracked events */}
      <section className="mt-14">
        <h2 className="label-eyebrow">Tracked events</h2>
        <ul className="mt-5 overflow-hidden rounded-2xl border border-[var(--color-line)]">
          {EVENTS.map((e, i) => (
            <li
              key={e.name}
              className={`grid grid-cols-[14rem_1fr] gap-4 p-5 ${
                i > 0 ? "border-t border-[var(--color-line)]" : ""
              }`}
            >
              <code className="text-sm text-[var(--color-brass)]">{e.name}</code>
              <span className="body-sm">{e.when}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
