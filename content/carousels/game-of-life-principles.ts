import type { Carousel } from "./types";

// Individual principle carousels from the ebook "The Game of Life."
// One focused idea per carousel, in a plain first-person voice:
//   cover (hook) → the principle → why it matters → a real reflection → takeaway.
const TOPIC = "The Game of Life";

export const gameOfLifePrinciples: Carousel[] = [
  {
    slug: "play-your-own-game",
    title: "Play Your Own Game",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "If life is a game, the only way to lose is to spend it playing someone else's.",
    caption:
      "It took me a long time to notice I was chasing a scoreboard I never actually chose. Most people never do. You're allowed to set down the game you inherited and play your own.",
    hashtags: ["thegameoflife", "playyourowngame", "freedom", "purpose"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Play Your Own Game", subtitle: "There's really only one way to lose." },
      { kind: "statement", eyebrow: "The idea", lead: "If life is a game, here's the part most people miss.", text: "The only way to lose is to spend it playing someone else's.", emphasis: "playing someone else's" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Most people never stop to ask if the game is even theirs.", text: "So they chase a scoreboard they never chose, and call it ambition.", emphasis: "a scoreboard they never chose" },
      { kind: "quote", eyebrow: "Looking back", text: "It took me years to realize I was winning a game I never actually wanted to play." },
      { kind: "cta", eyebrow: "Your turn", title: "Whose game are you playing?", body: "If the honest answer isn't 'mine,' that's probably the first thing worth changing.", handle: "@shaiden" },
    ],
  },
  {
    slug: "the-man-in-the-glass",
    title: "The Man in the Glass",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "You can fool the whole world, but you can't fool the person in the mirror.",
    caption:
      "There's a poem from 1934 — 'The Guy in the Glass' by Dale Wimbrow — I've carried since I was young. The whole thing comes down to this: you can fool everyone but the person in the mirror. Here's what it taught me.",
    hashtags: ["thegameoflife", "integrity", "themanintheglass", "selfrespect"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "The Man in the Glass", subtitle: "The one judge you can never fool." },
      { kind: "statement", eyebrow: "Where it's from", lead: "There's a poem from 1934 — 'The Guy in the Glass' by Dale Wimbrow — I've carried for years.", text: "You can fool the whole world, but you can't fool the person staring back at you.", emphasis: "you can't fool the person staring back" },
      { kind: "statement", eyebrow: "The heart of it", lead: "It's not your parents, your partner, or the crowd whose verdict you have to live with.", text: "It's the one in the mirror — the one who knows exactly what you did when no one was watching.", emphasis: "when no one was watching" },
      { kind: "statement", eyebrow: "My take", lead: "I read it young and it never left me.", text: "Now, when something's tempting but off, I just picture him — and ask if he'll respect me tonight.", emphasis: "ask if he'll respect me tonight" },
      { kind: "cta", eyebrow: "Your turn", title: "Can you meet your own eyes?", body: "Make the call today that the person in the glass would quietly nod at tonight.", handle: "@shaiden" },
    ],
  },
  {
    slug: "integrity-is-alignment",
    title: "Integrity Is Alignment",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Integrity is closing the gap between who you know you are and how you actually live.",
    caption:
      "Integrity was never about being good for other people. It's the gap between who I know I am and how I actually live. Every time I know I could do something and don't, I trust my own word a little less.",
    hashtags: ["thegameoflife", "integrity", "discipline", "selftrust"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Integrity Is Alignment", subtitle: "It's a promise you're keeping to yourself." },
      { kind: "statement", eyebrow: "The idea", text: "Integrity is closing the gap between who you know you are and how you actually live.", emphasis: "who you know you are" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Every time you know you could do something and don't,", text: "you break a small promise to yourself. Enough of those and you stop trusting your own word.", emphasis: "you break a small promise to yourself" },
      { kind: "quote", eyebrow: "What I've found", text: "Every promise I actually kept to myself made the next one easier to keep." },
      { kind: "cta", eyebrow: "Your turn", title: "Where's the gap?", body: "Name the one place your life and your standards don't line up — and start closing it.", handle: "@shaiden" },
    ],
  },
  {
    slug: "money-is-a-byproduct",
    title: "Money Is a Byproduct",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Money is the receipt for value delivered, not the prize.",
    caption:
      "The years I spent chasing money were my worst ones. It only really showed up when I stopped aiming at it and started making things people actually needed.",
    hashtags: ["thegameoflife", "money", "value", "wealthmindset"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Money Is a Byproduct", subtitle: "You might be aiming at the wrong thing." },
      { kind: "statement", eyebrow: "The idea", lead: "You don't really chase money.", text: "Money is the receipt for value you've already delivered — not the prize.", emphasis: "the receipt for value" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Make something genuinely useful for real people,", text: "and money tends to find its way back to you. Aim at the value and let the rest follow.", emphasis: "aim at the value" },
      { kind: "quote", eyebrow: "Looking back", text: "My worst years were the ones I chased money. It showed up when I stopped." },
      { kind: "cta", eyebrow: "Your turn", title: "What are you actually building?", body: "Stop counting the receipts for a while and go make something worth paying for.", handle: "@shaiden" },
    ],
  },
  {
    slug: "inputs-decide-outputs",
    title: "Inputs Decide Outputs",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "You are largely the sum of your inputs — and most of them are yours to choose.",
    caption:
      "I stopped trying to white-knuckle my way to discipline and just changed what was around me — the people, the feeds, the room I work in. That did more than any amount of willpower.",
    hashtags: ["thegameoflife", "environment", "habits", "discipline"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Inputs Decide Outputs", subtitle: "You might be grinding on the wrong thing." },
      { kind: "statement", eyebrow: "The idea", text: "You are largely the sum of your inputs — and most of them are yours to choose.", emphasis: "the sum of your inputs" },
      { kind: "statement", eyebrow: "Why it matters", lead: "If you want a better output, don't just grind harder on the output.", text: "Change the inputs. A good environment quietly does a lot of the work for you.", emphasis: "Change the inputs." },
      { kind: "quote", eyebrow: "What worked for me", text: "I stopped trying to be more disciplined and started changing what surrounded me." },
      { kind: "cta", eyebrow: "Your turn", title: "Look at your inputs.", body: "The people, the feeds, the rooms, the routines. Cut one that drags you. Add one that lifts you.", handle: "@shaiden" },
    ],
  },
  {
    slug: "purpose-is-excavated",
    title: "Purpose Is Excavated",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Your purpose isn't invented, it's excavated — and the dig site is your own life.",
    caption:
      "I didn't find my purpose on a vision board. I dug it out of the things I'd actually lived through — the stuff I couldn't stop caring about was pointing at it the whole time.",
    hashtags: ["thegameoflife", "purpose", "findyourwhy", "meaning"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Purpose Is Excavated", subtitle: "You don't invent it. You dig it up." },
      { kind: "statement", eyebrow: "The idea", text: "Your purpose isn't invented, it's excavated — and the dig site is your own life.", emphasis: "it's excavated" },
      { kind: "statement", eyebrow: "Why it matters", lead: "We tend to solve most powerfully the things we've personally felt.", text: "Purpose usually sits where your deepest 'this shouldn't be this way' meets what you can actually do about it.", emphasis: "this shouldn't be this way" },
      { kind: "quote", eyebrow: "What I found", text: "Mine was hiding in the things I'd lived through, not in anything I went out searching for." },
      { kind: "cta", eyebrow: "Your turn", title: "What can't you stop noticing?", body: "The thing that quietly bothers you is usually a clue. Follow it down a little.", handle: "@shaiden" },
    ],
  },
  {
    slug: "pain-is-an-assignment",
    title: "Pain Is an Assignment",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Your pain points aren't just wounds — they're assignments.",
    caption:
      "The thing that hurt me the most turned out to be the thing I was probably here to work on. The contrast you've lived is a map of what's broken and what should exist instead.",
    hashtags: ["thegameoflife", "purpose", "growth", "resilience"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Pain Is an Assignment", subtitle: "What hurt you is pointing somewhere." },
      { kind: "statement", eyebrow: "The idea", text: "Your pain points aren't just wounds — they're assignments.", emphasis: "they're assignments" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The contrast you've lived handed you a private map —", text: "of what's broken, and what should exist instead. You're oddly well-equipped to build it.", emphasis: "a private map" },
      { kind: "quote", eyebrow: "What I've found", text: "The thing that hurt me most turned out to be the thing I was here to work on." },
      { kind: "cta", eyebrow: "Your turn", title: "What broke you a little?", body: "Don't just nurse it. Sit with it. It might be pointing straight at your work.", handle: "@shaiden" },
    ],
  },
  {
    slug: "magnetism",
    title: "Magnetism",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "When you live in your purpose and integrity, you stop chasing and start attracting.",
    caption:
      "The moment I stopped chasing and started actually building something I believed in, the right people and opportunities started showing up on their own. You can't fake that.",
    hashtags: ["thegameoflife", "selfactualization", "magnetism", "authenticity"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Magnetism", subtitle: "The thing chasing can never get you." },
      { kind: "statement", eyebrow: "The idea", text: "When you live in your purpose and integrity, you stop chasing and start attracting.", emphasis: "stop chasing and start attracting" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Integrity turns into self-respect, and self-respect is hard to hide.", text: "It becomes a kind of pull you can't manufacture — and can't fake, either.", emphasis: "a kind of pull you can't manufacture" },
      { kind: "quote", eyebrow: "What I found", text: "When I stopped chasing and started building, the right people just started showing up." },
      { kind: "cta", eyebrow: "Your turn", title: "Stop chasing for a bit.", body: "Pour that energy into becoming. Most of what you want moves toward who you're becoming.", handle: "@shaiden" },
    ],
  },
  {
    slug: "fulfillment-over-dopamine",
    title: "Fulfillment Over Dopamine",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "The fulfilled life isn't the one with the most pleasure — it's the one with the most meaning.",
    caption:
      "Pleasure is a sugar rush. Meaning is a meal. I kept mistaking one for the other for years — the cheap stuff never once made it past the morning.",
    hashtags: ["thegameoflife", "fulfillment", "meaning", "dopamine"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Fulfillment Over Dopamine", subtitle: "Pleasure and meaning aren't the same thing." },
      { kind: "statement", eyebrow: "The idea", text: "The fulfilled life isn't the one with the most pleasure — it's the one with the most meaning.", emphasis: "the most meaning" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Pleasure is a sugar rush; fulfillment is a meal.", text: "The trap is that cheap pleasure imitates the real thing while quietly delivering the opposite.", emphasis: "imitates the real thing" },
      { kind: "quote", eyebrow: "What I noticed", text: "The cheap stuff never lasted past the morning. The meaningful stuff was still there." },
      { kind: "cta", eyebrow: "Your turn", title: "Trade one up.", body: "Swap a single cheap dopamine loop this week for one thing that actually means something.", handle: "@shaiden" },
    ],
  },
  {
    slug: "kill-the-shoulds",
    title: "Kill the Shoulds",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "A lot of what you think you should do is just someone else's fear wearing your name.",
    caption:
      "Half the rules I was living by, I'd never actually agreed to — I'd just absorbed them from parents, school, culture, the feed. Keep the ones that survive a second look. Drop the rest.",
    hashtags: ["thegameoflife", "freedom", "authenticity", "conditioning"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Kill the Shoulds", subtitle: "Whose voice is that, really?" },
      { kind: "statement", eyebrow: "The idea", text: "A lot of what you think you should do is just someone else's fear wearing your name.", emphasis: "someone else's fear wearing your name" },
      { kind: "statement", eyebrow: "Why it matters", lead: "You picked up a voice from parents, teachers, culture, the algorithm.", text: "Keep the shoulds that survive a second look. Drop the rest. What's left is where your real life goes.", emphasis: "Drop the rest." },
      { kind: "quote", eyebrow: "What I realized", text: "Half the rules I was living by, I'd never once actually agreed to." },
      { kind: "cta", eyebrow: "Your turn", title: "Put a 'should' on trial.", body: "Pick one and ask honestly: is this mine, or did I just inherit it? Then keep it or kill it.", handle: "@shaiden" },
    ],
  },
  {
    slug: "start-before-ready",
    title: "Start Before Ready",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Clarity is worthless until it touches the world. The bridge is a small, honest first step.",
    caption:
      "I've never once felt ready. Not for any of it. You start with a small, honest step and the readiness catches up on the way — that's pretty much the whole secret.",
    hashtags: ["thegameoflife", "action", "startbeforeready", "momentum"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Start Before Ready", subtitle: "You'll never quite feel ready. Start anyway." },
      { kind: "statement", eyebrow: "The idea", lead: "Clarity is basically worthless until it touches the world.", text: "The bridge is a small, honest first step, taken now.", emphasis: "a small, honest first step" },
      { kind: "statement", eyebrow: "Why it matters", lead: "A whole life gets built on a stack of unqualified first steps.", text: "The only real difference between the people who dream and the people who do is starting before they're ready.", emphasis: "starting before they're ready" },
      { kind: "quote", eyebrow: "Honestly", text: "I never felt ready for any of it. I just started, and the readiness caught up." },
      { kind: "cta", eyebrow: "Your turn", title: "Take the small step.", body: "What's the smallest honest move you could make today? Go make that one.", handle: "@shaiden" },
    ],
  },
  {
    slug: "turn-up-the-volume",
    title: "Turn Up the Volume",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Self-actualization is turning up the volume on who you really are.",
    caption:
      "Every time I shrank myself to fit in, the people I actually wanted in my life couldn't find me. The louder and clearer you get about who you are, the easier you are to reach.",
    hashtags: ["thegameoflife", "authenticity", "selfactualization", "beyourself"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Turn Up the Volume", subtitle: "Fitting in might be making you invisible." },
      { kind: "statement", eyebrow: "The idea", text: "Self-actualization is turning up the volume on who you really are.", emphasis: "turning up the volume" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Every time you shrink to fit in,", text: "you get a little harder to find. Get clearer and louder, and the right people can finally reach you.", emphasis: "a little harder to find" },
      { kind: "quote", eyebrow: "What I found", text: "Every time I dimmed myself to fit in, the people I actually wanted couldn't find me." },
      { kind: "cta", eyebrow: "Your turn", title: "Where are you dimming?", body: "Find the one place you play a smaller version of yourself — and turn it back up.", handle: "@shaiden" },
    ],
  },
];
