import type { Carousel } from "./types";
import { ikigai } from "./ikigai";
import { valueFirst } from "./value-first";

// The registry. Newest first — this order drives the /carousels gallery.
// Add a new file, import it, and drop it at the top.
export const carousels: Carousel[] = [ikigai, valueFirst];

export function getCarousel(slug: string): Carousel | undefined {
  return carousels.find((c) => c.slug === slug);
}

export * from "./types";
