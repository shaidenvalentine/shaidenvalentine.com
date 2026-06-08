import type { Product } from "./types";

// Single product for v1. Buy links OUT to a hosted checkout (Gumroad /
// Lemon Squeezy) — no payment API on this site.
export const products: Product[] = [
  {
    title: "Living in Bali",
    blurb:
      "The complete field guide to moving to the island — visas and KITAS, PT PMA companies, HGB land and leases, opening a BCA account, the IMEI trap, buying a bike, SIM A & C licenses, insurance, where to live, gyms, and my actual favorite spots. Everything I wish I'd known, in one honest map.",
    price: "Free", // free download for now; add a checkout later
    image: "/img/living-in-bali.png",
    checkoutUrl: "https://shaidenvalentine.gumroad.com/l/living-in-bali", // TODO: real checkout later
    downloadUrl: "/living-in-bali.pdf",
  },
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
