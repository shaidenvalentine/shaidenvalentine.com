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
    era: "Left school early",
    title: "80 countries before most people pick a major.",
    body: "Top of my class, then gone two years early. My mom flew for an airline, so the world was almost free — I just had to figure out where to sleep. Eighty countries of backpacking, couch-surfing, stretches near-homeless, flipping anything to stay on the road. No degree, no job, ever.",
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
  eyebrow: "How I Think",
  headline: "The lens behind everything.",
  sub: "I'm not performing entrepreneurship — I'm building. These are the ideas the work runs on.",
  principles: [
    {
      title: "Every problem is a design problem.",
      body: "Money, relationships, focus, a company — they're all systems with inputs and incentives. Redesign the system and the symptom disappears.",
    },
    {
      title: "Real leverage means it runs without you.",
      body: "If it needs me in the room, it's a job, not an asset. I build for the version where I've stepped back and it still compounds.",
    },
    {
      title: "Environment is a cognitive input.",
      body: "Where and how you live isn't a lifestyle preference — it's an input to how you think. I treat it like one and design it on purpose.",
    },
    {
      title: "Authentic signal compounds.",
      body: "Performative content decays the moment you stop feeding it. Real signal — built things, honest words — keeps paying out. So I only build the real thing.",
    },
  ] as Principle[],
};

export const life = {
  eyebrow: "Life",
  headline: "I live in Bali.",
  sub: "Mornings in the water, afternoons deep in the work, evenings with the right people. Surf, piano, long dinners, real conversations, room to think. This is the life everything else is built to protect — proof that it's all meant to be enjoyed, not just won.",
  // Drop real photos into /public/img and list them here; the grid adapts.
  gallery: [
    { src: "/img/life-1.jpg", caption: "The coast" },
    { src: "/img/life-2.jpg", caption: "The jungle" },
    { src: "/img/life-3.jpg", caption: "The surf" },
  ],
};
