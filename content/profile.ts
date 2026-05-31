import type { Profile } from "./types";

export const profile: Profile = {
  name: "Shaiden Valentine",
  tagline:
    "I see what's possible — then build it, back it, and bring the teams and capital to make it real.",
  mission:
    "My gift is to see opportunities — and to think strategically about how to bring them into reality: the right idea, the right team, the right capital. I build companies, and I invest in the ones building tomorrow. The throughline is simple — leave humanity better than I found it.",
  bio: [
    "I'm an entrepreneur and investor based in Bali. I don't perform entrepreneurship — I build, and I back others who are building. Every problem is a design problem; real leverage means it runs without you.",
    "What I do best is see an opportunity, think through how it becomes real, then assemble the teams and capital to get it there. Some of those become my own companies — Orbit, Mothership, Elysium. Others are bets on founders building the future: Next Life Sciences, Space Campers, and more.",
    "The throughline is simple: I'm here to push the world forward and build a better future for humanity. This page is my digital reputation — the clearest signal of what I'm building and who I am.",
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
