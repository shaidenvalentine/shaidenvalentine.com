import type { Product } from "./types";

// Single product for v1. Buy links OUT to a hosted checkout (Gumroad /
// Lemon Squeezy) — no payment API on this site.
export const products: Product[] = [
  {
    title: "The Art of Flipping",
    blurb:
      "The exact playbook I used to turn attention and arbitrage into capital — the system, not the hype. Built for people who'd rather understand the machine than chase the trade.",
    price: "$—", // TODO: set price
    image: "/img/art-of-flipping.jpg",
    checkoutUrl: "https://shaidenvalentine.gumroad.com/l/art-of-flipping", // TODO: real checkout
  },
];
