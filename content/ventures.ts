import type { Venture } from "./types";

// Ventures stay federated — these link OUT to their own domains.
// Add/remove a venture = add/remove one object in this array.
// Display order is the array order.
export const ventures: Venture[] = [
  {
    id: "elysium",
    name: "Elysium",
    blurb:
      "A fully-staffed luxury co-living villa in Bali. Nine suites, application-only, the best months of your year — designed as an environment, not a rental.",
    status: "Land acquired · design phase · opens 2028",
    href: "https://elysium.house",
    accent: "#7A6647",
  },
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
      "A luxury custom van brand — 3D-printed, electric, built to a standard nobody else is touching. Fifteen of the finest vans in the world already built; now taking orders for fully custom builds.",
    status: "Taking custom orders · $350K–500K builds",
    href: "https://mothershipvans.com",
    accent: "#9A958C",
  },
  {
    id: "findyourplace",
    name: "Find Your Place",
    blurb:
      "A city-matching engine that finds where you'll actually thrive — scored to your life and values, not someone else's rankings. The world is big; most people never find their place in it.",
    status: "In private beta",
    href: "https://findyourplace.app",
    accent: "#8A6A3A",
  },
  {
    id: "pristinebali",
    name: "Pristine Bali",
    blurb:
      "A movement that funds verified cleanups across Bali — every dollar pulls about three kilograms of trash from its beaches, rivers, and roadsides. Local crews, real-time impact, no charity theater.",
    status: "Just getting started",
    href: "https://pristine-zeta.vercel.app",
    accent: "#1F4A50",
  },
];
