"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Carousel } from "@content/carousels/types";
import { SLIDE_W, SLIDE_H } from "@content/carousels/types";
import { Slide } from "./Slide";

// The on-site carousel reader. Scales the fixed 1080×1350 canvas to fit the
// viewport, lays the slides out in a snap track, and gives swipe / arrow /
// dot navigation — the same slides Instagram will get, previewed in place.
export function CarouselViewer({ carousel }: { carousel: Carousel }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [scale, setScale] = useState(0.3);
  const [active, setActive] = useState(0);
  const total = carousel.slides.length;
  const series = carousel.title;

  // Fit a single slide inside the stage, leaving a little air.
  useLayoutEffect(() => {
    const measure = () => {
      const el = stageRef.current;
      if (!el) return;
      const availW = el.clientWidth;
      const availH = el.clientHeight;
      const s = Math.min(availW / SLIDE_W, availH / SLIDE_H) * 0.94;
      setScale(s > 0 ? s : 0.3);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, []);

  // Track which slide is centered.
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            const i = Number((e.target as HTMLElement).dataset.i);
            if (!Number.isNaN(i)) setActive(i);
          }
        });
      },
      { root, threshold: [0.55, 0.8] }
    );
    slideRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [total]);

  const goTo = useCallback((i: number) => {
    const next = Math.max(0, Math.min(total - 1, i));
    slideRefs.current[next]?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(active + 1);
      if (e.key === "ArrowLeft") goTo(active - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  return (
    <div className="flex flex-col gap-5">
      {/* stage */}
      <div ref={stageRef} className="relative h-[72svh] min-h-[420px] w-full">
        <div
          ref={trackRef}
          className="swipe-track flex h-full snap-x snap-mandatory items-center gap-[3vw] overflow-x-auto overflow-y-hidden scroll-smooth"
          style={{ paddingInline: `max(16px, calc((100% - ${SLIDE_W * scale}px) / 2))` }}
        >
          {carousel.slides.map((slide, i) => (
            <div
              key={i}
              data-i={i}
              ref={(el) => { slideRefs.current[i] = el; }}
              className="slide-scale snap-center"
              style={
                {
                  "--slide-scale": scale,
                  borderRadius: 24 * scale,
                  overflow: "hidden",
                  boxShadow: "0 40px 100px -30px rgba(0,0,0,0.8)",
                } as React.CSSProperties
              }
            >
              <Slide slide={slide} index={i} total={total} series={series} />
            </div>
          ))}
        </div>

        {/* prev / next */}
        <button
          aria-label="Previous slide"
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full glass px-4 py-3 text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)] disabled:opacity-0 sm:left-4"
        >
          ←
        </button>
        <button
          aria-label="Next slide"
          onClick={() => goTo(active + 1)}
          disabled={active === total - 1}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full glass px-4 py-3 text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)] disabled:opacity-0 sm:right-4"
        >
          →
        </button>
      </div>

      {/* dots */}
      <div className="flex items-center justify-center gap-2">
        {carousel.slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i)}
            className="h-2 rounded-full transition-all"
            style={{
              width: i === active ? 28 : 8,
              background: i === active ? "var(--color-brass)" : "rgba(244,241,234,0.22)",
            }}
          />
        ))}
        <span className="ml-3 font-mono text-xs text-[var(--color-ink-muted)]">
          {String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
