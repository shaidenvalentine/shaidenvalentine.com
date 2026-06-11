// The personal layer — who Shaiden is beyond the work. Edit freely.

export interface Principle {
  title: string;
  body: string;
}

export interface Chapter {
  era: string;       // year or year range
  title: string;     // short headline
  body: string;      // 1–2 sentences
}

// The life arc — chapters that frame how he got here. Rendered as a timeline
// inside the Story section.
export const chapters: Chapter[] = [
  {
    era: "Mountain town",
    title: "Raised in the mountains of Southern California.",
    body: "A small mountain town, ski instructor and racer as a kid. Learned early that environment is a choice — and that the people who choose where they live get to choose how they think.",
  },
  {
    era: "17 →",
    title: "Burning Man, the first time.",
    body: "Since seventeen. The place that taught me to see a layer over reality that doesn't yet exist — and to treat that vision as the actual starting point for what to build.",
  },
  {
    era: "My 20s",
    title: "80 countries before I turned 30.",
    body: "Left school two years early, top of my class, and just went. My mom flew for an airline, so the world was almost free — I just had to figure out where to sleep. Eighty countries through my twenties: backpacking, couch-surfing, stretches near-homeless, flipping anything to stay on the road. No degree, no job, ever — just the world as my classroom.",
  },
  {
    era: "2020",
    title: "Built a van in lockdown. It went viral.",
    body: "When COVID hit I converted my first van and documented it online. The accident became a company — Mothership Vehicles. Fifteen vans and one million-dollar business later, I had my proof.",
  },
  {
    era: "16 → 28",
    title: "San Diego home base.",
    body: "Building, shipping, traveling out from here. The decade where the architecture started taking shape.",
  },
  {
    era: "28",
    title: "Moved to Bali.",
    body: "Not as an escape — as the environment I wanted the rest of the architecture designed around. The base from which everything else now runs.",
  },
  {
    era: "Now · 30",
    title: "Living the life I always pictured.",
    body: "No formal education. Building Orbit and Elysium. Investing in startups like Next Life Sciences and Space Campers. Traveling freely. Out of the matrix that tells you the path has to look a certain way.",
  },
  {
    era: "Next",
    title: "Foundation for the rest of it.",
    body: "Financial freedom, creative impact, a better future for humanity. The next decade is laying foundation — for the kind of leverage that compounds for the long run.",
  },
];

export const ethos = {
  eyebrow: "Principles",
  headline: "Principles I live by.",
  sub: "The core ideas from The Game of Life — the principles the rest of the architecture runs on.",
  principles: [
    {
      title: "Only play moves you actually want to make.",
      body: "Life is a game, but most people are playing someone else's by accident — the shoulds handed down by family, school, and culture. The whole point is to choose your own moves on purpose.",
    },
    {
      title: "Integrity is the cheat code.",
      body: "When your words, beliefs, and actions all line up, you earn your own respect. Self-respect compounds into self-esteem, confidence, magnetism, and almost everything else worth having.",
    },
    {
      title: "Environment is an input, not a preference.",
      body: "Where and how you live shapes how you think — the people you see, the air you breathe, the pace of your days. Design it on purpose, or someone else's defaults run you.",
    },
    {
      title: "Money is the byproduct, not the score.",
      body: "Get genuinely good at the thing you were put here to do, and the money follows. Chasing the score is how people end up successful and empty — winning a game they didn't choose to play.",
    },
  ] as Principle[],
  ctaLabel: "Read The Game of Life",
  ctaHref: "#shop",
};

export const life = {
  eyebrow: "Life",
  headline: "I live in Bali.",
  sub: "I chose Bali on purpose. World-class surf out my front door, deep jungle and waterfalls an hour any direction, and a global community of builders, founders, healers, and adventurers magnetized to the same edge. This isn't the cliché digital-nomad Bali — it's the one where the right people show up because the environment selects for it. Mornings in the water, afternoons deep in the work, evenings around long dinners with real conversations. Cheap enough to live light, hard to leave once you taste it. This is the life everything else is built to protect.",
  ctas: [
    {
      label: "Find your place to live",
      href: "https://findyourplace.app",
      kind: "primary" as const,
    },
    {
      label: "Get the Living in Bali guide",
      href: "lead:Living in Bali guide",
      kind: "secondary" as const,
    },
  ],
  // Drop real photos into /public/img and list them here; the grid adapts.
  gallery: [
    { src: "/img/life-1.jpg", caption: "The coast" },
    { src: "/img/life-2.jpg", caption: "The jungle" },
    { src: "/img/life-3.jpg", caption: "The surf" },
  ],
};
