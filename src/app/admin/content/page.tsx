import Link from "next/link";
import { listIdeas, isConfigured, type CarouselStatus } from "@/lib/store";
import { carouselsWithStatus } from "@/lib/carouselStatus";
import { SlideThumb } from "@/components/carousel/SlideThumb";
import { SaveToPhotos } from "@/components/carousel/SaveToPhotos";
import { CaptionCopy } from "@/components/carousel/CaptionCopy";
import { IdeaForm, IdeaStatusPill, IdeaDelete, fmtDate } from "./IdeaInbox";
import { CarouselStatusPill, CarouselDelete, CarouselRestore } from "./CarouselActions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const TABS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "review", label: "Review" },
  { key: "posted", label: "Posted" },
  { key: "archived", label: "Archived" },
  { key: "deleted", label: "Deleted" },
];

export default async function AdminContent({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const sp = await searchParams;
  const tab = sp.status ?? "all";

  const ideas = isConfigured() ? await listIdeas(500) : [];
  const openIdeas = ideas.filter((i) => i.status === "new" || i.status === "building").length;

  const all = await carouselsWithStatus();
  const count = (s: CarouselStatus) => all.filter((c) => c.status === s).length;
  const live = all.filter((c) => c.status !== "deleted").length;

  const visible = all.filter((c) => {
    if (tab === "all") return c.status !== "deleted";
    return c.status === tab;
  });

  return (
    <div className="flex flex-col gap-14">
      <header>
        <span className="label-eyebrow">Content machine · {count("posted")} posted</span>
        <h1 className="display-1 mt-3 max-w-[16ch] text-[var(--color-ink)]">Content.</h1>
        <p className="body-lg mt-3 max-w-[54ch] text-[var(--color-ink-muted)]">
          Drop ideas as they come, shape them into designed carousels, and move each one through
          review → posted → archived. Only posted carousels show on your public gallery.
        </p>
      </header>

      {/* ───── Idea inbox ───── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-3">
          <span className="label-eyebrow">Idea inbox</span>
          <span className="label-mono">{openIdeas} open</span>
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

      {/* ───── Carousels ───── */}
      <section className="flex flex-col gap-5">
        <div className="flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-3">
          <span className="label-eyebrow">Carousels · {live}</span>
          <Link href="/carousels" target="_blank" className="label-mono link-underline">
            public gallery ↗
          </Link>
        </div>

        {/* filter tabs */}
        <div className="flex flex-wrap gap-2">
          {TABS.map((t) => {
            const active = t.key === tab;
            const n =
              t.key === "all" ? live : count(t.key as CarouselStatus);
            const href = t.key === "all" ? "/admin/content" : `/admin/content?status=${t.key}`;
            return (
              <Link
                key={t.key}
                href={href}
                className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition ${
                  active
                    ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                    : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {t.label} ({n})
              </Link>
            );
          })}
        </div>

        {visible.length === 0 ? (
          <p className="body-sm">Nothing here yet.</p>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {visible.map((c) => (
              <div
                key={c.slug}
                className="flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)]"
              >
                <Link href={`/carousels/${c.slug}`} target="_blank" className="block">
                  <SlideThumb slide={c.slides[0]} total={c.slides.length} series={c.title} />
                </Link>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="label-eyebrow">{c.topic}</span>
                    <CarouselStatusPill slug={c.slug} status={c.status} />
                  </div>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="display-3 text-[var(--color-ink)]">{c.title}</h3>
                    <span className="label-mono shrink-0">{String(c.slides.length).padStart(2, "0")} slides</span>
                  </div>
                  <p className="body-sm text-[var(--color-ink-muted)]">{c.summary}</p>

                  <div className="mt-1">
                    <SaveToPhotos slug={c.slug} count={c.slides.length} title={c.title} />
                  </div>

                  {c.caption && <CaptionCopy caption={c.caption} hashtags={c.hashtags} />}

                  <div className="mt-1 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[var(--color-line)] pt-3 text-sm">
                    <Link href={`/carousels/${c.slug}`} target="_blank" className="link-underline text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                      View →
                    </Link>
                    <Link href={`/carousels/${c.slug}/export`} target="_blank" className="link-underline text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
                      Export view ↗
                    </Link>
                    <span className="ml-auto">
                      {c.status === "deleted" ? <CarouselRestore slug={c.slug} /> : <CarouselDelete slug={c.slug} />}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
