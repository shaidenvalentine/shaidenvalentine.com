import { notFound } from "next/navigation";
import { carousels, getCarousel } from "@content/carousels";
import { Slide } from "@/components/carousel/Slide";

// Bare render of every slide at full 1080×1350 — no site chrome. This is the
// surface the Playwright exporter (scripts/export-carousels.mjs) screenshots,
// one .slide-canvas at a time. Also handy for a manual right-click → save.
export const dynamic = "force-static";

export function generateStaticParams() {
  return carousels.map((c) => ({ slug: c.slug }));
}

export default async function ExportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const carousel = getCarousel(slug);
  if (!carousel) notFound();
  const total = carousel.slides.length;

  return (
    <div data-export-root style={{ background: "#000", minHeight: "100vh", padding: 24 }}>
      <div
        data-export-meta
        style={{ maxWidth: 1080, margin: "0 auto 24px", color: "#9A958C", fontFamily: "monospace", fontSize: 13 }}
      >
        {carousel.title} — {total} slides · 1080×1350 · right-click any slide to save, or run{" "}
        <code>npm run carousels:export</code>
      </div>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        {carousel.slides.map((slide, i) => (
          <div key={i} data-export-slide={i}>
            <Slide slide={slide} index={i} total={total} series={carousel.title} />
          </div>
        ))}
      </div>
    </div>
  );
}
