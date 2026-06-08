import type { Profile } from "./types";

export const profile: Profile = {
  name: "Shaiden Valentine",
  tagline:
    "Entrepreneur, traveler, investor, dreamer. I see the potential in people and ideas earlier than most — and my gift is bringing the right people together to build a better future for all of us.",
  /** Quick at-a-glance bio shown right under the tagline on the hero. */
  quickBio:
    "I live in Bali. I love starting companies, surfing, playing piano, and connecting people. I see a version of reality before it exists, then help make it real — and I'm set on living this one all the way.",
  mission: "Life is a game — and I'm playing mine all the way to the edges.",
  missionSub: "For connection, purpose, and fun, lived to the absolute maximum.",
  bio: [
    "I was raised in a small mountain town in Southern California by a photographer dad and a flight attendant mom — and looking back, that's the whole blueprint. From my dad I got the eye: how to frame a thing and find the story inside it. From my mom I got the world: I could fly almost anywhere on earth for next to nothing, I just had to figure out where I'd sleep once I landed. A creative lens and a passport with no edges. Naturally, that made me who I am.",
    "So I left school early and went to use both. No degree, no job, ever — just the world as my classroom and whatever I could build to stay in it. One van I converted in lockdown went viral and became a million-dollar company, and that was my proof: I could see an opportunity nobody else saw, turn it into something real, and let it run without me. Today I build and back companies from Bali, still chasing the next thing worth making. The timeline tells the rest.",
  ],
  location: "Builder & investor · Bali",
  // TODO: drop real files into /public/video and /public/img, then update paths.
  heroVideo: "/video/hero-portrait.mp4",
  heroPoster: "/img/hero-poster.jpg",
  introVideo: "/video/intro.mp4",
  introPoster: "/img/intro-poster.jpg",
  socials: [
    { label: "Instagram", href: "https://instagram.com/shaiden", handle: "@shaiden" },
    { label: "X", href: "https://x.com/shaidenvalentine", handle: "@shaidenvalentine" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shaidenvalentine", handle: "in/shaidenvalentine" },
    { label: "WhatsApp", href: "https://wa.me/17604021716", handle: "+1 760 402 1716" },
    { label: "Email", href: "mailto:shaidenvalentine@gmail.com", handle: "shaidenvalentine@gmail.com" },
  ],
  vcard: {
    firstName: "Shaiden",
    lastName: "Valentine",
    org: "Orbit · Mothership · Elysium",
    title: "Founder & Investor",
    email: "shaidenvalentine@gmail.com",
    phone: "+17604021716",
    url: "https://shaidenvalentine.com",
  },
};
