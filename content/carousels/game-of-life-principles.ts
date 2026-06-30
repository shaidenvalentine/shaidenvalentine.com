import type { Carousel } from "./types";

// Individual principle carousels from the ebook "The Game of Life."
// Each principle is its own focused, single-idea deep-dive:
//   cover (hook) → the principle → why it matters → a reframe → takeaway.
const TOPIC = "The Game of Life";

export const gameOfLifePrinciples: Carousel[] = [
  {
    slug: "play-your-own-game",
    title: "Play Your Own Game",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "If life is a game, the only way to lose is to spend it playing someone else's.",
    caption:
      "Most people never realize they're even free to play their own game. They chase a scoreboard they never chose. Here's the reframe that changed everything for me. Save it. 👇",
    hashtags: ["thegameoflife", "playyourowngame", "freedom", "purpose"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Play Your Own Game", subtitle: "There's only one way to actually lose." },
      { kind: "statement", eyebrow: "The principle", lead: "If life is a game, here's the only rule that matters.", text: "The only way to lose is to spend it playing someone else's.", emphasis: "playing someone else's" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Most people never realize they're free to play at all.", text: "So they chase a scoreboard they never chose — and call it ambition.", emphasis: "a scoreboard they never chose" },
      { kind: "quote", eyebrow: "Remember", text: "You're allowed to set down the dreams you inherited and write your own." },
      { kind: "cta", eyebrow: "Your turn", title: "Whose game are you playing?", body: "If the honest answer isn't 'mine' — that's the first thing to change.", handle: "@shaiden" },
    ],
  },
  {
    slug: "the-man-in-the-glass",
    title: "The Man in the Glass",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "You can fool the whole world, but you cannot fool the person in the glass.",
    caption:
      "You can fool everyone else. You can't fool the person staring back at you in the mirror — the one who knows exactly what you did when no one was watching. That's the only verdict that matters. 👇",
    hashtags: ["thegameoflife", "integrity", "selfrespect", "themanintheglass"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "The Man in the Glass", subtitle: "The one judge you can never fool." },
      { kind: "statement", eyebrow: "The principle", text: "You can fool the whole world, but you cannot fool the person in the glass.", emphasis: "cannot fool the person in the glass" },
      { kind: "statement", eyebrow: "Why it matters", lead: "There's one judge whose verdict actually counts.", text: "It's the one staring back at you in the mirror — and their opinion is the one you live inside every day.", emphasis: "the one you live inside" },
      { kind: "quote", eyebrow: "Remember", text: "They know exactly what you did when no one was watching. Live so you can meet their eyes." },
      { kind: "cta", eyebrow: "Your turn", title: "Can you meet your own eyes?", body: "Make the choice today that the person in the glass would respect tonight.", handle: "@shaiden" },
    ],
  },
  {
    slug: "integrity-is-alignment",
    title: "Integrity Is Alignment",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Integrity is closing the gap between who you know you are and how you actually live.",
    caption:
      "Integrity isn't about being a good person for other people. It's the gap between who you know you are and how you actually live. Every time you close it, you trust your own word a little more. 👇",
    hashtags: ["thegameoflife", "integrity", "discipline", "selftrust"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Integrity Is Alignment", subtitle: "It's a promise you keep to yourself." },
      { kind: "statement", eyebrow: "The principle", text: "Integrity is closing the gap between who you know you are and how you actually live.", emphasis: "who you know you are" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Every time you know you could do something and don't —", text: "you break a promise to yourself. Enough of those and you stop trusting your own word.", emphasis: "you break a promise to yourself" },
      { kind: "quote", eyebrow: "Remember", text: "Integrity becomes self-respect, then confidence, then a magnetism you cannot fake." },
      { kind: "cta", eyebrow: "Your turn", title: "Where's the gap?", body: "Name the one place your life and your standards don't line up — and close it this week.", handle: "@shaiden" },
    ],
  },
  {
    slug: "money-is-a-byproduct",
    title: "Money Is a Byproduct",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Money is the receipt for value delivered, not the prize.",
    caption:
      "Stop chasing the money. Money is the receipt for value you've already delivered — not the prize itself. Aim at the value, and the abundance becomes an echo. 👇",
    hashtags: ["thegameoflife", "money", "value", "wealthmindset"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Money Is a Byproduct", subtitle: "You've been aiming at the wrong target." },
      { kind: "statement", eyebrow: "The principle", lead: "You don't chase money.", text: "Money is the receipt for value delivered, not the prize.", emphasis: "the receipt for value delivered" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Create something genuinely valuable for real people —", text: "and money flows back as the natural echo. Aim at purpose; let the abundance follow.", emphasis: "the natural echo" },
      { kind: "quote", eyebrow: "Remember", text: "Chase money and it runs. Build value and it comes looking for you." },
      { kind: "cta", eyebrow: "Your turn", title: "What value are you creating?", body: "Stop counting the receipts and go make something worth paying for.", handle: "@shaiden" },
    ],
  },
  {
    slug: "inputs-decide-outputs",
    title: "Inputs Decide Outputs",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "You are largely the sum of your inputs — and most of them are yours to choose.",
    caption:
      "Willpower is overrated. You are largely the sum of your inputs — your people, your habits, the place you wake up in. Want better outputs? Don't grind harder. Upgrade the inputs. 👇",
    hashtags: ["thegameoflife", "environment", "habits", "selfimprovement"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Inputs Decide Outputs", subtitle: "Stop grinding on the wrong thing." },
      { kind: "statement", eyebrow: "The principle", text: "You are largely the sum of your inputs — and most of them are yours to choose.", emphasis: "the sum of your inputs" },
      { kind: "statement", eyebrow: "Why it matters", lead: "If you want better outputs, don't grind harder on the output.", text: "Upgrade the inputs. A well-chosen environment does the heavy lifting for you.", emphasis: "Upgrade the inputs." },
      { kind: "quote", eyebrow: "Remember", text: "Willpower is overrated. Environment is the quiet cheat code." },
      { kind: "cta", eyebrow: "Your turn", title: "Audit your inputs.", body: "People, feeds, rooms, routines. Cut one that drags you down — add one that lifts you.", handle: "@shaiden" },
    ],
  },
  {
    slug: "purpose-is-excavated",
    title: "Purpose Is Excavated",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Your purpose isn't invented, it's excavated. And the dig site is your own life.",
    caption:
      "You don't invent your purpose at a vision-board workshop. You excavate it — and the dig site is your own life. It lives where your deepest 'this shouldn't be this way' meets what you can do about it. 👇",
    hashtags: ["thegameoflife", "purpose", "findyourwhy", "meaning"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Purpose Is Excavated", subtitle: "You don't invent it. You dig it up." },
      { kind: "statement", eyebrow: "The principle", text: "Your purpose isn't invented, it's excavated. And the dig site is your own life.", emphasis: "it's excavated" },
      { kind: "statement", eyebrow: "Why it matters", lead: "We solve most powerfully what we've personally felt.", text: "Purpose lives where your deepest 'this shouldn't be this way' meets your ability to fix it.", emphasis: "this shouldn't be this way" },
      { kind: "quote", eyebrow: "Remember", text: "Stop searching the horizon. Start digging where you already stand." },
      { kind: "cta", eyebrow: "Your turn", title: "What can't you stop noticing?", body: "The thing that quietly bothers you is a clue. Follow it down.", handle: "@shaiden" },
    ],
  },
  {
    slug: "pain-is-an-assignment",
    title: "Pain Is an Assignment",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Your pain points aren't just wounds — they're assignments.",
    caption:
      "The things that hurt you aren't just wounds. They're assignments. The contrast you've lived handed you a private map of what's broken and what should exist instead. Don't run from it — study it. 👇",
    hashtags: ["thegameoflife", "purpose", "growth", "resilience"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Pain Is an Assignment", subtitle: "What hurt you is pointing somewhere." },
      { kind: "statement", eyebrow: "The principle", text: "Your pain points aren't just wounds — they're assignments.", emphasis: "they're assignments" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The contrast you've lived handed you a private map —", text: "of what's broken, and what should exist instead. You're uniquely equipped to build it.", emphasis: "a private map" },
      { kind: "quote", eyebrow: "Remember", text: "Don't run from what hurt you. Study it. It's pointing at your work." },
      { kind: "cta", eyebrow: "Your turn", title: "What broke you a little?", body: "That's not just your wound. It might be your assignment.", handle: "@shaiden" },
    ],
  },
  {
    slug: "magnetism",
    title: "Magnetism",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "When you live in your purpose and integrity, you stop chasing and start attracting.",
    caption:
      "Chasing repels. The moment you live in your purpose and integrity, you stop chasing and start attracting — because you've become someone worth being drawn to. Magnetism you can't fake. 👇",
    hashtags: ["thegameoflife", "selfactualization", "magnetism", "authenticity"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Magnetism", subtitle: "The thing chasing can never get you." },
      { kind: "statement", eyebrow: "The principle", text: "When you live in your purpose and integrity, you stop chasing and start attracting.", emphasis: "stop chasing and start attracting" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Integrity becomes self-respect, then confidence —", text: "then a magnetism you cannot fake. Self-actualization is the most generous signal you can send.", emphasis: "a magnetism you cannot fake" },
      { kind: "quote", eyebrow: "Remember", text: "Become someone worth being drawn to, and you'll never have to chase again." },
      { kind: "cta", eyebrow: "Your turn", title: "Stop chasing.", body: "Pour that energy into becoming. The right people and chances move toward who you're becoming.", handle: "@shaiden" },
    ],
  },
  {
    slug: "fulfillment-over-dopamine",
    title: "Fulfillment Over Dopamine",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "The fulfilled life isn't the one with the most pleasure — it's the one with the most meaning.",
    caption:
      "Pleasure is a sugar rush. Fulfillment is nourishment. Hedonism is a trap precisely because it imitates the real thing while delivering the opposite. Chase meaning, not the next hit. 👇",
    hashtags: ["thegameoflife", "fulfillment", "meaning", "dopamine"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Fulfillment Over Dopamine", subtitle: "Pleasure and meaning aren't the same thing." },
      { kind: "statement", eyebrow: "The principle", text: "The fulfilled life isn't the one with the most pleasure — it's the one with the most meaning.", emphasis: "the most meaning" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Pleasure is a sugar rush; fulfillment is nourishment.", text: "Hedonism is a trap because it imitates the real thing while delivering the opposite.", emphasis: "imitates the real thing" },
      { kind: "quote", eyebrow: "Remember", text: "The next hit fades by morning. Meaning is still there when you wake up." },
      { kind: "cta", eyebrow: "Your turn", title: "Trade up.", body: "Swap one cheap dopamine loop this week for one thing that actually means something.", handle: "@shaiden" },
    ],
  },
  {
    slug: "kill-the-shoulds",
    title: "Kill the Shoulds",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "A lot of what you think you should do is just someone else's fear wearing your name.",
    caption:
      "Half of your 'shoulds' aren't yours. They're someone else's fear — parents, teachers, culture, the algorithm — wearing your name. Keep the ones that survive scrutiny. Delete the rest. 👇",
    hashtags: ["thegameoflife", "freedom", "authenticity", "shoulds"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Kill the Shoulds", subtitle: "Whose voice is that, really?" },
      { kind: "statement", eyebrow: "The principle", text: "A lot of what you think you should do is just someone else's fear wearing your name.", emphasis: "someone else's fear wearing your name" },
      { kind: "statement", eyebrow: "Why it matters", lead: "You inherited a voice from parents, teachers, culture, algorithms.", text: "Keep the shoulds that survive scrutiny. Delete the rest. That freed space is your real life.", emphasis: "Delete the rest." },
      { kind: "quote", eyebrow: "Remember", text: "Most of your cage was handed to you unlocked." },
      { kind: "cta", eyebrow: "Your turn", title: "Put a should on trial.", body: "Pick one 'I should' and ask: is this mine, or inherited? Keep it or kill it.", handle: "@shaiden" },
    ],
  },
  {
    slug: "start-before-ready",
    title: "Start Before Ready",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Clarity is worthless until it touches the world. The bridge is a small, honest first step taken now.",
    caption:
      "Clarity is worthless until it touches the world. The gap between people who find themselves and people who live it is the willingness to start before they feel ready. Take the small, honest step. 👇",
    hashtags: ["thegameoflife", "action", "startbeforeready", "momentum"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Start Before Ready", subtitle: "You will never feel ready. Start anyway." },
      { kind: "statement", eyebrow: "The principle", lead: "Clarity is worthless until it touches the world.", text: "The bridge is a small, honest first step taken now.", emphasis: "a small, honest first step" },
      { kind: "statement", eyebrow: "Why it matters", lead: "A whole life is built on a stack of unqualified first steps.", text: "The only difference between dreamers and builders is the willingness to start unready.", emphasis: "the willingness to start unready" },
      { kind: "quote", eyebrow: "Remember", text: "Readiness is a feeling you earn by starting — not a permission you wait for." },
      { kind: "cta", eyebrow: "Your turn", title: "Take the small step.", body: "Name the smallest honest move you could make today. Then go make it.", handle: "@shaiden" },
    ],
  },
  {
    slug: "turn-up-the-volume",
    title: "Turn Up the Volume",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Self-actualization is turning up the volume on who you really are.",
    caption:
      "Every time you dim, shrink, or perform a smaller version of yourself to fit in, you make yourself harder to find. Turn up the volume on who you really are — and the right people reach you. 👇",
    hashtags: ["thegameoflife", "authenticity", "selfactualization", "beyourself"],
    slides: [
      { kind: "cover", eyebrow: "The Game of Life", title: "Turn Up the Volume", subtitle: "Fitting in is making you invisible." },
      { kind: "statement", eyebrow: "The principle", text: "Self-actualization is turning up the volume on who you really are.", emphasis: "turning up the volume" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Every time you shrink to fit in,", text: "you make yourself harder to find. Get louder and clearer, and your people can finally reach you.", emphasis: "harder to find" },
      { kind: "quote", eyebrow: "Remember", text: "The right people are looking for you. Don't make yourself impossible to spot." },
      { kind: "cta", eyebrow: "Your turn", title: "Where are you dimming?", body: "Find the one place you perform a smaller version of yourself — and turn it up.", handle: "@shaiden" },
    ],
  },
];
