import type { Carousel } from "./types";

// "The Launch" — building wealth as a rocket launch. Gravity is your burn rate;
// the launchpad is where everyone quits; you never beat gravity, you out-
// momentum it. A save-and-share think piece that earns the follow.
const TOPIC = "Concept";

export const wealthRocketLaunch: Carousel = {
  slug: "wealth-rocket-launch",
  title: "The Launch",
  topic: TOPIC,
  status: "review",
  date: "2026-07-04",
  summary:
    "Building wealth is a rocket launch — and almost everyone quits on the launchpad. The physics nobody tells you: your gravity is your burn rate.",
  caption:
    "Building wealth is a rocket launch, and almost everyone quits on the launchpad.\n\n" +
    "Here's the physics nobody tells you: your gravity is your burn rate. Spend everything you make and you're bolted to the ground forever — because every bit of thrust falls straight back into the pull.\n\n" +
    "So in the beginning I did the opposite of impressive. Staircase. Rice and beans. Killed my gravity, maxed my thrust. Not forever — just long enough to break free.\n\n" +
    "And here's the part that keeps people grounded for life: it's not money, it's ego. Buying status (especially on credit) doesn't just waste fuel — it digs your gravity well deeper, permanently.\n\n" +
    "Then it flips. You stop being a brute-force engine and start using leverage — other people's time, capital, systems. You don't beat gravity. You out-momentum it.\n\n" +
    "The rocket was never the goal. Choosing your payload was.\n\n" +
    "Save this one. Which slide hit hardest? 👇",
  hashtags: [
    "wealthbuilding",
    "financialfreedom",
    "mindsetshift",
    "buildwealth",
    "foundermindset",
    "leverage",
    "delayedgratification",
    "moneymindset",
    "lifestyledesign",
    "firemovement",
  ],
  slides: [
    {
      kind: "cover",
      eyebrow: TOPIC,
      title: "The Launch",
      glyph: "↑",
      subtitle:
        "Building wealth is exactly like launching a rocket — and the part nobody survives is the first ten feet off the ground.",
    },
    {
      kind: "statement",
      eyebrow: "The map",
      lead: "Gravity pulls you down. Thrust pushes you up. Momentum carries you once you're moving.",
      text: "The ground is the hardest place to be. Orbit is the goal.",
      emphasis: "Orbit is the goal.",
    },
    {
      kind: "principle",
      eyebrow: "The reframe",
      text: "Your gravity is your burn rate.",
      emphasis: "your burn rate.",
      elaboration:
        "Spend 100% of what you make and you're bolted to the launchpad forever — every dollar of thrust falls straight back into the pull.",
    },
    {
      kind: "statement",
      eyebrow: "Step one",
      lead: "The first thing you do isn't earn more.",
      text: "It's measure your gravity.",
      emphasis: "measure your gravity.",
      footnote:
        "Most people are flying a rocket with no reading on the one force pulling them down.",
    },
    {
      kind: "statement",
      eyebrow: "Year one",
      lead: "In the beginning you have one engine: raw effort.",
      text: "I slept under a staircase. Lived on rice and beans. Minimum gravity, maximum thrust.",
      emphasis: "Minimum gravity, maximum thrust.",
      footnote:
        "Not because it's noble — because momentum compounds, and I wanted out fast.",
    },
    {
      kind: "statement",
      eyebrow: "The trap",
      lead: "The thing that keeps most people grounded isn't money. It's ego.",
      text: "They perform an altitude they haven't reached — and faking your position guarantees you never reach it.",
      emphasis: "faking your position guarantees you never reach it.",
    },
    {
      kind: "principle",
      eyebrow: "The status trap",
      text: "Buying status on credit doesn't add weight to your rocket. It digs your gravity well deeper.",
      emphasis: "deeper.",
      elaboration:
        "That payment is part of your burn forever. The test: does this move the rocket, or just make the launchpad look nicer?",
    },
    {
      kind: "statement",
      eyebrow: "The turn",
      lead: "Then something flips.",
      text: "You stop being a brute-force engine. You swap in better ones — teams, capital, code, brand. Other people's time.",
      emphasis: "Other people's time.",
      footnote: "Same altitude, a fraction of the effort.",
    },
    {
      kind: "statement",
      eyebrow: "The truth",
      lead: "You never actually beat gravity. At orbit, it's still 90% as strong.",
      text: "You just built enough momentum that it can't bring you down anymore.",
      emphasis: "it can't bring you down anymore.",
      footnote:
        "The game didn't get easier. You got faster, lighter, and stopped carrying dead weight.",
    },
    {
      kind: "cta",
      eyebrow: "The payload",
      title: "The rocket was never the point.",
      body:
        "The point is earning the right to choose what it carries. Piano. Travel. The people you love. Forever, without checking the fuel gauge. Save this for the launch.",
      handle: "@shaiden",
    },
  ],
};
