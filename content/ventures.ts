import type { Venture } from "./types";

// Ventures stay federated — these link OUT to their own domains.
// Add/remove a venture = add/remove one object in this array.
export const ventures: Venture[] = [
  {
    id: "orbit",
    name: "Orbit",
    blurb:
      "An AI relationship ecosystem rebuilding the broken incentives of dating apps. Not built to be deleted — a relationship OS that stays with you after the match.",
    status: "TestFlight live · onboarding early users",
    href: "https://orbitdating.ai",
    accent: "#C9A874",
  },
  {
    id: "mothership",
    name: "Mothership",
    blurb:
      "A luxury custom van brand — 3D-printed, electric, built to a standard nobody else is touching. The cash-flow engine of the architecture.",
    status: "Phase 1 build shipped · taking first orders",
    href: "https://mothershipvans.com",
    accent: "#9A958C",
  },
  {
    id: "elysium",
    name: "Elysium",
    blurb:
      "A fully-staffed luxury co-living villa in Bali. Nine suites, application-only, the best months of your year — designed as an environment, not a rental.",
    status: "Land acquired · design phase · opens 2028",
    href: "https://elysium.house",
    accent: "#7A6647",
  },
];
