import type { NowItem } from "./types";

// The In-Motion feed. Newest first. One line each — this is what makes the
// site read as alive vs. static. Hardcoded; edit + commit to update.
export const now: NowItem[] = [
  { date: "May 2026", line: "Shipped Mothership Phase 1 — first builds in motion, taking orders." },
  { date: "Apr 2026", line: "Orbit onboarding its first cohort of users off TestFlight." },
  { date: "Mar 2026", line: "Elysium land secured in Bali — moving into the design phase." },
  { date: "Feb 2026", line: "Rebuilt my entire operating system around Founder OS." },
  { date: "Jan 2026", line: "Set the year's thesis: architecture that runs without me." },
];
