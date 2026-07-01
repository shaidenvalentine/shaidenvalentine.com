import type { Carousel } from "./types";

// "Value First" — a core operating principle. Give before you ask; the asking
// takes care of itself.
export const valueFirst: Carousel = {
  slug: "value-first",
  title: "Value First",
  topic: "Principle",
  date: "2026-06-30",
  summary:
    "The compounding move almost nobody makes: give real value before you ever ask for anything back.",
  caption:
    "Value first. The most underpriced move in business and in life. Everyone's optimizing the ask — the leverage is in the give. Swipe through. Who could you over-deliver for this week, with zero expectation? 👇",
  hashtags: ["valuefirst", "givefirst", "leverage", "reciprocity", "playlongterm"],
  slides: [
    {
      kind: "cover",
      eyebrow: "Principle · 01",
      title: "Value First",
      subtitle: "Give before you ask. Always.",
    },
    {
      kind: "statement",
      eyebrow: "The idea",
      lead: "Everyone is optimizing the ask. The pitch, the close, the follow-up.",
      text: "The real leverage was never in the ask. It's in the give.",
      emphasis: "It's in the give.",
    },
    {
      kind: "list",
      eyebrow: "Why it works",
      title: "Giving first compounds.",
      numbered: true,
      items: [
        { label: "It builds trust no pitch can buy.", body: "People remember how you made them feel before you needed anything." },
        { label: "It removes the resistance.", body: "Nobody braces against someone who's only ever added to their life." },
        { label: "It compounds quietly.", body: "Every honest give is an investment that pays back when you least expect it." },
      ],
    },
    {
      kind: "statement",
      eyebrow: "The trap",
      lead: "Most people keep a ledger. They give exactly enough to feel owed.",
      text: "Keep score and you've already lost. Give like it's free — because to the right people, it always comes back.",
      emphasis: "Give like it's free.",
    },
    {
      kind: "quote",
      eyebrow: "What I've found",
      text: "Every time I gave without keeping score, it came back around — just never how I'd planned.",
    },
    {
      kind: "cta",
      eyebrow: "Your turn",
      title: "Who can you over-deliver for?",
      body: "Pick one person this week. Give them something real, expect nothing, and watch what it sets in motion.",
      handle: "@shaiden",
    },
  ],
};
