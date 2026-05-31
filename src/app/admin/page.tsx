import type { Metadata } from "next";
import { site } from "@content/site";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

// Private hub (Basic Auth via middleware). Vercel Web Analytics holds the full
// dashboard on vercel.com; this page is the jump-off + a legend of the custom
// events being tracked. An embedded on-site dashboard (Umami/Plausible) can be
// dropped in here later via iframe if wanted.

const EVENTS: { name: string; when: string }[] = [
  { name: "venture_click", when: "A venture card is opened (Orbit / Mothership / Elysium)" },
  { name: "save_contact", when: "Someone downloads the vCard" },
  { name: "apply_submit", when: "Work-With-Me / pitch form submitted (includes role)" },
  { name: "feedback_submit", when: "Anonymous feedback submitted" },
  { name: "pitch_cta", when: "‘Pitch me an idea’ button clicked" },
];

const QUICK_LINKS = [
  { label: "Live site", href: "/" },
  { label: "Newsletter section", href: "/#newsletter" },
  { label: "Work / pitch form", href: "/#work" },
];

export default function AdminPage() {
  return (
    <main className="container-page min-h-[100svh] py-20">
      <span className="label-eyebrow">Private · {site.domain}</span>
      <h1 className="display-2 mt-3">Admin</h1>
      <p className="body-lg mt-4 max-w-[52ch] text-[var(--color-ink-muted)]">
        Traffic, sources, and engagement run on Vercel Web Analytics. Open the full
        dashboard below; the events this site fires are listed underneath.
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

      <section className="mt-14">
        <h2 className="label-eyebrow">Tracked events</h2>
        <ul className="mt-5 overflow-hidden rounded-2xl border border-[var(--color-line)]">
          {EVENTS.map((e, i) => (
            <li
              key={e.name}
              className={`grid grid-cols-[12rem_1fr] gap-4 p-5 ${
                i > 0 ? "border-t border-[var(--color-line)]" : ""
              }`}
            >
              <code className="text-sm text-[var(--color-brass)]">{e.name}</code>
              <span className="body-sm">{e.when}</span>
            </li>
          ))}
        </ul>
        <p className="body-sm mt-6 max-w-[56ch]">
          Want the dashboard embedded right here instead of on vercel.com? We can swap in
          Umami or Plausible (both offer an embeddable shared dashboard) without changing
          anything else.
        </p>
      </section>
    </main>
  );
}
