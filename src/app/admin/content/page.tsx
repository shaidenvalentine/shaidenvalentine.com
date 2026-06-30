import Link from "next/link";
import { listIdeas, isConfigured } from "@/lib/store";
import { carousels } from "@content/carousels";
import { SlideThumb } from "@/components/carousel/SlideThumb";
import { SaveToPhotos } from "@/components/carousel/SaveToPhotos";
import { IdeaForm, IdeaStatusPill, IdeaDelete, fmtDate } from "./IdeaInbox";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminCarousels() {
  const ideas = isConfigured() ? await listIdeas(500) : [];
  const open = ideas.filter((i) => i.status === "new" || i.status === "building").length;

  return (
    <div className="flex flex-col gap-14">
      <header>
        <span className="label-eyebrow">Content machine · {carousels.length} live</span>
        <h1 className="display-1 mt-3 max-w-[16ch] text-[var(--color-ink)]">Content.</h1>
        <p className="body-lg mt-3 max-w-[54ch] text-[var(--color-ink-muted)]">
          Drop ideas as they come. They land in the inbox below — then get shaped into designed,
          on-brand carousels and published to your public gallery.
        </p>
      </header>

      {/* ───── Idea inbox ───── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-3">
          <span className="label-eyebrow">Idea inbox</span>
          <span className="label-mono">{open} open</span>
        </div>

        <IdeaForm />

        {!isConfigured() ? (
          <p className="body-sm">
            Database not connected — ideas can&apos;t be saved yet. Set <code>POSTGRES_URL</code> in your
            Vercel project (the same one that powers Leads &amp; Applications) and this inbox goes live.
          </p>
        ) : ideas.length === 0 ? (
          <p className="body-sm">No ideas yet. Drop your first one above.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {ideas.map((idea) => (
              <div key={idea.id} className="flex flex-col gap-3 rounded-2xl glass p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="display-3 text-[var(--color-ink)]">{idea.title}</h3>
                    <span className="label-mono">{fmtDate(idea.created_at)}</span>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-2">
                    <IdeaStatusPill id={idea.id} status={idea.status} />
                    <IdeaDelete id={idea.id} />
                  </div>
                </div>
                <p className="body-base whitespace-pre-wrap text-[var(--color-ink-muted)]">{idea.idea}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ───── Published carousels ───── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-3">
          <span className="label-eyebrow">Published</span>
          <Link href="/carousels" target="_blank" className="label-mono link-underline">
            public gallery ↗
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {carousels.map((c) => (
            <div
              key={c.slug}
              className="flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)]"
            >
              <Link href={`/carousels/${c.slug}`} target="_blank" className="block">
                <SlideThumb slide={c.slides[0]} total={c.slides.length} series={c.title} />
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex items-center justify-between">
                  <span className="label-eyebrow">{c.topic}</span>
                  <span className="label-mono">{String(c.slides.length).padStart(2, "0")} slides</span>
                </div>
                <h3 className="display-3 text-[var(--color-ink)]">{c.title}</h3>
                <p className="body-sm text-[var(--color-ink-muted)]">{c.summary}</p>

                <div className="mt-2">
                  <SaveToPhotos slug={c.slug} count={c.slides.length} title={c.title} />
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--color-line)] pt-3 text-sm">
                  <Link href={`/carousels/${c.slug}`} target="_blank" className="link-underline text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                    View →
                  </Link>
                  <Link href={`/carousels/${c.slug}/export`} target="_blank" className="link-underline text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                    Export view ↗
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
