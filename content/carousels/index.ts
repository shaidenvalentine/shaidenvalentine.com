import type { Carousel } from "./types";
import { gameOfLife1 } from "./game-of-life-1";
import { gameOfLife2 } from "./game-of-life-2";
import { artOfFlipping1 } from "./art-of-flipping-1";
import { artOfFlipping2 } from "./art-of-flipping-2";
import { livingInBali } from "./living-in-bali";
import { ikigai } from "./ikigai";
import { valueFirst } from "./value-first";

// The registry. This order drives the /carousels gallery.
// Add a new file, import it, and drop it where you want it to appear.
export const carousels: Carousel[] = [
  gameOfLife1,
  gameOfLife2,
  artOfFlipping1,
  artOfFlipping2,
  livingInBali,
  ikigai,
  valueFirst,
];

export function getCarousel(slug: string): Carousel | undefined {
  return carousels.find((c) => c.slug === slug);
}

export * from "./types";
