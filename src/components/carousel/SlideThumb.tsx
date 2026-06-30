"use client";

import { useLayoutEffect, useRef, useState } from "react";
import type { Slide as SlideT } from "@content/carousels/types";
import { SLIDE_W } from "@content/carousels/types";
import { Slide } from "./Slide";

// A single slide scaled to fill its container's width — for gallery covers.
export function SlideThumb({
  slide,
  total,
  series,
  index = 0,
}: {
  slide: SlideT;
  total: number;
  series: string;
  index?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.33);

  useLayoutEffect(() => {
    const measure = () => {
      const w = ref.current?.clientWidth ?? 0;
      if (w) setScale(w / SLIDE_W);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full overflow-hidden">
      <div className="slide-scale" style={{ "--slide-scale": scale } as React.CSSProperties}>
        <Slide slide={slide} index={index} total={total} series={series} />
      </div>
    </div>
  );
}
