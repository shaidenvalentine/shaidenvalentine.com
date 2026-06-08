import type { NowItem } from "./types";

// The In-Motion feed. Newest first. One line each — this is what makes the
// site read as alive vs. static. Keep it short (3-4 items max) — anything
// older belongs in the Story timeline.
export const now: NowItem[] = [
  { date: "Now", line: "Turning 30 in Bali. Laying the foundation for the next decade." },
  { date: "This month", line: "Onboarding the first Orbit cohort." },
  { date: "This quarter", line: "Moving Elysium from design into the build-team formation." },
];
