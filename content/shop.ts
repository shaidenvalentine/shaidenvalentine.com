import type { Product } from "./types";

// Single product for v1. Buy links OUT to a hosted checkout (Gumroad /
// Lemon Squeezy) — no payment API on this site.
export const products: Product[] = [
  {
    title: "The Art of Flipping",
    blurb:
      "The exact playbook I used to turn attention and arbitrage into capital — the system, not the hype. Built for people who'd rather understand the machine than chase the trade.",
    price: "Free", // free download for now; add a checkout later
    image: "/img/art-of-flipping.png",
    checkoutUrl: "https://shaidenvalentine.gumroad.com/l/art-of-flipping", // TODO: real checkout later
    downloadUrl: "/the-art-of-flipping.pdf",
  },
  {
    title: "The Game of Life",
    blurb:
      "My ebook on how I actually play life — purpose, ikigai, integrity, travel, love, and money as a byproduct. A clear, no-fluff field guide (with exercises) to living life on your own terms. Read it in an afternoon; use it for years.",
    price: "Free", // free download for now; add a checkout later
    image: "/img/game-of-life.png",
    checkoutUrl: "https://shaidenvalentine.gumroad.com/l/the-game-of-life", // TODO: real checkout later
    downloadUrl: "/the-game-of-life.pdf",
  },
];
