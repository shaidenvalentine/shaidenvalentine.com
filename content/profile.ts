import type { Profile } from "./types";

export const profile: Profile = {
  name: "Shaiden Valentine",
  tagline:
    "I see what's possible — then build it, back it, and bring the teams and capital to make it real.",
  mission:
    "My gift is to see opportunities — and to think strategically about how to bring them into reality: the right idea, the right team, the right capital. I build companies, and I invest in the ones building tomorrow. The throughline is simple — leave humanity better than I found it.",
  bio: [
    "I grew up in a small mountain town in Southern California — teaching skiing and racing as a kid, learning early that the people who choose where they live get to choose how they think. I left school two years early to travel. By the time I was twenty-something I'd been to eighty countries, doing whatever it took to make it work.",
    "Then COVID hit and I built my first van — a single conversion I documented online. It went viral. That accident became Mothership Vehicles. Fifteen vans later, that build was a million-dollar business and I had my proof: I could see an opportunity nobody else saw, turn it into a company, and run it without being inside it.",
    "San Diego was home base from sixteen to twenty-eight. Then I moved to Bali — not as an escape, but as the environment I wanted the rest of my architecture designed around. I'm turning thirty here, no formal education, building Orbit and Elysium, investing in startups like Next Life Sciences and Space Campers, traveling freely, broken out of the matrix that tells you the path has to look a certain way.",
    "Burning Man has been part of me since seventeen — that's where I learned to see a layer over reality that doesn't exist yet, and treat that vision as the actual starting point for what to build. Looking forward, I'm laying the foundation of a life of financial freedom, creative impact, and a better future for humanity. This page is the clearest signal of what I'm building and who I am — my digital reputation.",
  ],
  location: "Builder & investor · Bali",
  // TODO: drop real files into /public/video and /public/img, then update paths.
  heroVideo: "/video/hero-portrait.mp4",
  heroPoster: "/img/hero-poster.jpg",
  introVideo: "/video/intro.mp4",
  introPoster: "/img/intro-poster.jpg",
  socials: [
    { label: "Instagram", href: "https://instagram.com/shaidenvalentine", handle: "@shaidenvalentine" },
    { label: "X", href: "https://x.com/shaidenvalentine", handle: "@shaidenvalentine" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shaidenvalentine", handle: "in/shaidenvalentine" },
    { label: "WhatsApp", href: "https://wa.me/17604021716", handle: "+1 760 402 1716" },
    { label: "Email", href: "mailto:shaidenvalentine@gmail.com", handle: "shaidenvalentine@gmail.com" },
  ],
  vcard: {
    firstName: "Shaiden",
    lastName: "Valentine",
    org: "Orbit · Mothership · Elysium",
    title: "Founder",
    email: "shaidenvalentine@gmail.com",
    phone: "+17604021716",
    url: "https://shaidenvalentine.com",
  },
};
