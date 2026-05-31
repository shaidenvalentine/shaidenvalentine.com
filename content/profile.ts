import type { Profile } from "./types";

export const profile: Profile = {
  name: "Shaiden Valentine",
  tagline:
    "I build self-sustaining companies, systems, and environments — architecture that compounds without me.",
  bio: [
    "I don't perform entrepreneurship — I build. Every problem is a design problem, and real leverage means it runs without you.",
    "Right now that takes three shapes: Orbit, an AI relationship ecosystem fixing the broken incentives of dating apps; Mothership, a luxury custom van brand; and Elysium, a fully-staffed co-living villa in Bali. Different surfaces, one thesis — design the system, not the grind.",
    "I'm building toward Bali, running everything remotely, and treating environment as a cognitive input rather than a preference. Authentic signal compounds. Performative content decays.",
  ],
  location: "Building toward Bali",
  // TODO: drop real files into /public/video and /public/img, then update paths.
  heroVideo: "/video/hero-portrait.mp4",
  heroPoster: "/img/hero-poster.jpg",
  introVideo: "/video/intro.mp4",
  introPoster: "/img/intro-poster.jpg",
  socials: [
    { label: "Instagram", href: "https://instagram.com/shaidenvalentine", handle: "@shaidenvalentine" },
    { label: "X", href: "https://x.com/shaidenvalentine", handle: "@shaidenvalentine" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shaidenvalentine", handle: "in/shaidenvalentine" },
    { label: "Email", href: "mailto:hello@shaidenvalentine.com", handle: "hello@shaidenvalentine.com" },
  ],
  vcard: {
    firstName: "Shaiden",
    lastName: "Valentine",
    org: "Orbit · Mothership · Elysium",
    title: "Founder",
    email: "hello@shaidenvalentine.com",
    // phone: "+1 000 000 0000", // add when ready
    url: "https://shaidenvalentine.com",
  },
};
