import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { carousels, getCarousel } from "@content/carousels";
import { CarouselViewer } from "@/components/carousel/CarouselViewer";
import { CaptionCopy } from "@/components/carousel/CaptionCopy";
import { SaveToPhotos } from "@/components/carousel/SaveToPhotos";

export function generateStaticParams() {
  return carousels.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCarousel(slug);
  if (!c) return {};
  return { title: c.title, description: c.summary };
}

export default async function CarouselPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const carousel = getCarousel(slug);
  if (!carousel) notFound();

  return (
    <main className="bg-grad-volcanic min-h-screen">
      <div className="container-page pt-12 pb-24">
        {/* breadcrumb */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <Link href="/carousels" className="label-mono link-underline">← All carousels</Link>
          <span className="label-eyebrow">{carousel.topic}</span>
        </div>

        <CarouselViewer carousel={carousel} />

        {/* meta + caption for posting */}
        <div className="mx-auto mt-14 max-w-2xl">
          <h1 className="display-3">{carousel.title}</h1>
          <p className="body-base mt-3 text-[var(--color-ink-muted)]">{carousel.summary}</p>

          <div className="mt-8">
            <SaveToPhotos slug={carousel.slug} count={carousel.slides.length} title={carousel.title} />
          </div>

          {carousel.caption && <CaptionCopy caption={carousel.caption} hashtags={carousel.hashtags} />}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={`/carousels/${carousel.slug}/export`}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line-strong)] px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill)]"
            >
              Open export view
              <span aria-hidden>↗</span>
            </Link>
            <span className="body-sm">
              {carousel.slides.length} slides · Instagram 4:5 (1080×1350)
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
