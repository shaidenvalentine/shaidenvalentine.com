import { isConfigured } from "@/lib/store";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function Status({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span
        aria-hidden
        className={`inline-block h-2.5 w-2.5 rounded-full ${
          ok ? "bg-[var(--color-brass)]" : "bg-[var(--color-ink-whisper)]"
        }`}
      />
      <span className={ok ? "text-[var(--color-ink)]" : "text-[var(--color-ink-muted)]"}>
        {label} — {ok ? "configured" : "not set"}
      </span>
    </span>
  );
}

const EVENTS: { name: string; when: string }[] = [
  { name: "venture_click", when: "A venture card is opened" },
  { name: "save_contact", when: "Someone downloads the vCard" },
  { name: "apply_submit", when: "Work-With-Me / pitch form submitted" },
  { name: "feedback_submit", when: "Anonymous feedback submitted" },
  { name: "waitlist_join", when: "Coaching or course waitlist joined" },
  { name: "ebook_download", when: "Free ebook download requested" },
];

export default async function SettingsPage() {
  const db = isConfigured();
  const resend = Boolean(process.env.RESEND_API_KEY);
  const contact = Boolean(process.env.CONTACT_EMAIL);
  const adminPwSet = Boolean(process.env.ADMIN_PASSWORD);

  return (
    <div className="flex flex-col gap-10">
      <header>
        <span className="label-eyebrow">Configuration</span>
        <h1 className="display-1 mt-3 max-w-[14ch] text-[var(--color-ink)]">Settings.</h1>
        <p className="body-lg mt-3 max-w-[52ch] text-[var(--color-ink-muted)]">
          System health, the admin password, and the analytics events the site is firing.
        </p>
      </header>

      <section className="rounded-3xl glass p-7">
        <h2 className="display-3">System status</h2>
        <div className="mt-5 flex flex-col gap-3">
          <Status ok={db} label="Database (Postgres / Neon)" />
          <Status ok={resend} label="Email backup (Resend)" />
          <Status ok={contact} label="CONTACT_EMAIL" />
          <Status ok={adminPwSet} label={`Admin password (${adminPwSet ? "custom" : "default 'password'"})`} />
        </div>
        <p className="body-sm mt-5 max-w-[64ch]">
          Everything green means submissions persist to the database, email backups go out, and your
          admin password isn&apos;t the default. Anything grey is an opportunity to harden.
        </p>
      </section>

      <section className="rounded-3xl glass p-7">
        <h2 className="display-3">Change the admin password</h2>
        <ol className="mt-4 list-decimal pl-5 text-sm leading-7 text-[var(--color-ink-muted)]">
          <li>Vercel → <code>shaidenvalentine</code> project → <strong>Settings</strong> → <strong>Environment Variables</strong>.</li>
          <li>Add <code>ADMIN_PASSWORD</code> with your new password (Production · Preview · Development).</li>
          <li>Redeploy (the env-var save triggers it automatically).</li>
        </ol>
        <p className="body-sm mt-3">Default if unset: <code>password</code>. Set it for real before you share this URL.</p>
      </section>

      <section className="rounded-3xl glass p-7">
        <h2 className="display-3">Tracked analytics events</h2>
        <ul className="mt-5 overflow-hidden rounded-xl border border-[var(--color-line)]">
          {EVENTS.map((e, i) => (
            <li
              key={e.name}
              className={`grid grid-cols-[12rem_1fr] gap-4 p-4 ${
                i > 0 ? "border-t border-[var(--color-line)]" : ""
              }`}
            >
              <code className="text-sm text-[var(--color-brass)]">{e.name}</code>
              <span className="body-sm">{e.when}</span>
            </li>
          ))}
        </ul>
        <p className="body-sm mt-4">
          Full traffic + event dashboard:{" "}
          <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="link-underline">
            open Vercel Analytics ↗
          </a>
        </p>
      </section>
    </div>
  );
}
