import "server-only";
import { carousels } from "@content/carousels";
import type { Carousel } from "@content/carousels/types";
import { listCarouselStates, type CarouselStatus } from "@/lib/store";

// Carousels are defined in code; their lifecycle status lives in the DB.
// Effective status = DB row ?? the carousel's code default ?? "posted".
// "posted" carousels are the only ones shown on the public gallery.

export const DEFAULT_STATUS: CarouselStatus = "posted";

export type CarouselWithStatus = Carousel & { status: CarouselStatus };

export async function carouselsWithStatus(): Promise<CarouselWithStatus[]> {
  const states = await listCarouselStates();
  return carousels.map((c) => ({
    ...c,
    status: states[c.slug] ?? c.status ?? DEFAULT_STATUS,
  }));
}

/** Public-facing carousels — only those marked posted. */
export async function postedCarousels(): Promise<CarouselWithStatus[]> {
  return (await carouselsWithStatus()).filter((c) => c.status === "posted");
}
