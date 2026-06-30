import type { Metadata } from "next";
import Link from "next/link";
import { carousels } from "@content/carousels";
import { SlideThumb } from "@/components/carousel/SlideThumb";

export const metadata: Metadata = {
  title: "Carousels",
  description:
    "Concepts, principles, and ideas worth sharing — designed as carousels. The thinking behind Shaiden Valentine.",
};

export default function CarouselsIndex() {
  return (
    <main className="bg-grad-volcanic min-h-screen">
      <div className="container-page py-24 md:py-32">
        {/* header */}
        <div className="mb-16 max-w-3xl">
          <div className="mb-8 flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-4">
            <span className="label-eyebrow">The thinking</span>
            <Link href="/" className="label-mono link-underline">
              ← shaidenvalentine.com
            </Link>
          </div>
          <h1 className="display-1">Carousels.</h1>
          <p className="body-lg mt-8 max-w-[54ch] text-[var(--color-ink-muted)]">
            The concepts and principles I keep coming back to — the ideas that shaped how I build, invest,
            and live. Each one designed to be read, saved, and shared.
          </p>
        </div>

        {/* grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {carousels.map((c) => (
            <Link
              key={c.slug}
              href={`/carousels/${c.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] transition hover:border-[var(--color-line-strong)]"
            >
              <div className="relative overflow-hidden">
                <div className="transition-transform duration-700 group-hover:scale-[1.03]">
                  <SlideThumb slide={c.slides[0]} total={c.slides.length} series={c.title} />
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-2 p-6">
                <div className="flex items-center justify-between">
                  <span className="label-eyebrow">{c.topic}</span>
                  <span className="label-mono">{String(c.slides.length).padStart(2, "0")} slides</span>
                </div>
                <h2 className="display-3 mt-1">{c.title}</h2>
                <p className="body-sm mt-1 line-clamp-3 text-[var(--color-ink-muted)]">{c.summary}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-brass)]">
                  Read the carousel
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
