import { listFeedback, isConfigured } from "@/lib/store";
import { fmtDate, toCsv } from "../util";
import { DeleteButton } from "../RowActions";
import { Search } from "../Search";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FeedbackPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q ?? "").toLowerCase().trim();

  if (!isConfigured()) {
    return <p className="body-sm">Database not connected.</p>;
  }

  const all = await listFeedback(500);
  const filtered = all.filter((f) =>
    !q ? true : [f.topic, f.message].map((v) => String(v ?? "").toLowerCase()).some((v) => v.includes(q))
  );

  const csv = toCsv(
    ["id", "created_at", "topic", "message"],
    filtered.map((f) => [f.id, f.created_at, f.topic, f.message])
  );
  const csvHref = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

  return (
    <div className="flex flex-col gap-6">
      <header>
        <span className="label-eyebrow">Inbox · {all.length}</span>
        <h1 className="display-1 mt-3 max-w-[14ch] text-[var(--color-ink)]">Feedback.</h1>
        <p className="body-lg mt-3 max-w-[60ch] text-[var(--color-ink-muted)]">
          Anonymous by design — no name, email, or IP is captured, only topic and message. The space exists so
          people can say the things they wouldn&apos;t otherwise.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <Search placeholder="Search feedback…" />
        <a
          href={csvHref}
          download={`feedback-${new Date().toISOString().slice(0, 10)}.csv`}
          className="rounded-full glass px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
        >
          Export CSV ↓
        </a>
      </div>

      {filtered.length === 0 ? (
        <p className="body-sm">No feedback yet.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {filtered.map((f) => (
            <li key={f.id} className="rounded-3xl glass p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="label-mono text-[var(--color-brass)]">{f.topic ?? "General"}</span>
                <span className="text-xs text-[var(--color-ink-muted)]">{fmtDate(f.created_at)}</span>
              </div>
              <p className="body-base mt-3 whitespace-pre-wrap text-[var(--color-ink)]">{f.message}</p>
              <div className="mt-4 flex items-center justify-end border-t border-[var(--color-line)] pt-3">
                <DeleteButton table="feedback" id={f.id} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
