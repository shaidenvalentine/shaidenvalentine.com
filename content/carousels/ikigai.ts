import type { Carousel } from "./types";

// "Ikigai" — the first concept post. The four circles, why the overlap is the
// whole point, and a reflection prompt to send people inward.
export const ikigai: Carousel = {
  slug: "ikigai",
  title: "Ikigai",
  topic: "Concept",
  date: "2026-06-30",
  summary:
    "The Japanese concept for a reason to get up in the morning — and why the magic lives in the overlap, not any single circle.",
  caption:
    "Ikigai (生き甲斐) — \"a reason for being.\" Most people chase one circle: do what you love, or chase what pays. The whole point is the center, where all four meet. Swipe through, then ask yourself the four questions. Save this one. Which circle are you missing right now? 👇",
  hashtags: ["ikigai", "purpose", "ikigaidiagram", "findyourwhy", "intentionalliving"],
  slides: [
    {
      kind: "cover",
      eyebrow: "Concept · 01",
      title: "Ikigai",
      glyph: "生",
      subtitle: "生き甲斐 — a reason to get up in the morning.",
    },
    {
      kind: "statement",
      eyebrow: "The idea",
      lead: "There's a Japanese word for the thing most people spend their whole lives circling.",
      text: "Ikigai is the reason you get out of bed. Not your job. Not your hobby. The overlap.",
      emphasis: "The overlap.",
    },
    {
      kind: "ikigai",
      eyebrow: "The map",
      title: "Four circles.",
      caption: "Where all four meet is your ikigai.",
    },
    {
      kind: "list",
      eyebrow: "Ask yourself",
      title: "The four questions.",
      numbered: true,
      items: [
        { label: "What do you love?", body: "The work you'd do whether or not anyone paid you." },
        { label: "What are you good at?", body: "The thing that comes easier to you than to the people around you." },
        { label: "What does the world need?", body: "The problem you can't stop noticing." },
        { label: "What can you be paid for?", body: "Where real value changes hands." },
      ],
    },
    {
      kind: "statement",
      eyebrow: "Why it matters",
      lead: "Most people get stuck living inside one circle.",
      text: "Love without skill is a hobby. Skill without need is a craft no one buys. Need without love burns you out. The center is the only place that holds.",
      emphasis: "The center is the only place that holds.",
    },
    {
      kind: "list",
      eyebrow: "The overlaps",
      title: "What each pair becomes.",
      items: [
        { label: "Passion", body: "Love + good at — but does the world need it?" },
        { label: "Mission", body: "Love + needed — but can you do it well?" },
        { label: "Vocation", body: "Needed + paid — but do you love it?" },
        { label: "Profession", body: "Good at + paid — but does it move you?" },
      ],
    },
    {
      kind: "quote",
      eyebrow: "What I've found",
      text: "Mine didn't arrive all at once. It came together slowly, one honest answer at a time.",
    },
    {
      kind: "cta",
      eyebrow: "Your turn",
      title: "Which circle are you missing?",
      body: "Sit with the four questions. Save this, and come back to it when the path feels foggy.",
      handle: "@shaiden",
    },
  ],
};
