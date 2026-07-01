import type { Carousel } from "./types";
import { gameOfLifePrinciples } from "./game-of-life-principles";
import { artOfFlippingPrinciples } from "./art-of-flipping-principles";
import { livingInBaliPrinciples } from "./living-in-bali-principles";
import { ikigai } from "./ikigai";
import { valueFirst } from "./value-first";

// The registry. This order drives the /carousels gallery.
// Carousels are individual principles — one focused idea per carousel.
export const carousels: Carousel[] = [
  ...gameOfLifePrinciples,
  ...artOfFlippingPrinciples,
  ...livingInBaliPrinciples,
  ikigai,
  valueFirst,
];

export function getCarousel(slug: string): Carousel | undefined {
  return carousels.find((c) => c.slug === slug);
}

export * from "./types";
