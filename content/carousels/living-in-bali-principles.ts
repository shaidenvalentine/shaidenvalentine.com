import type { Carousel } from "./types";

// Individual principle carousels from the ebook "Living in Bali."
// Plain, first-person voice — one idea per carousel.
const TOPIC = "Living in Bali";

export const livingInBaliPrinciples: Carousel[] = [
  {
    slug: "choose-your-inputs",
    title: "Choose Your Inputs",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Bali was the single biggest input I ever changed on purpose.",
    caption:
      "I didn't get more disciplined when I moved to Bali. I just stopped fighting my environment. You're mostly the sum of your inputs — and where you live is the biggest one.",
    hashtags: ["livinginbali", "environment", "bali", "intentionalliving"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Choose Your Inputs", subtitle: "The biggest lever most people never touch." },
      { kind: "statement", eyebrow: "The idea", text: "Bali was the single biggest input I ever changed on purpose.", emphasis: "the single biggest input" },
      { kind: "statement", eyebrow: "Why it matters", lead: "You're mostly the sum of your inputs — your people, your habits, the place you wake up in.", text: "Change the place and the whole default day changes with it. A year of that changes you.", emphasis: "the whole default day changes" },
      { kind: "quote", eyebrow: "What I found", text: "I didn't become more disciplined here. I just stopped fighting my environment." },
      { kind: "cta", eyebrow: "Your turn", title: "Change one input.", body: "You can't out-willpower a place that drains you. Pick the biggest lever you've got and move it.", handle: "@shaiden" },
    ],
  },
  {
    slug: "build-dont-flee",
    title: "Build, Don't Flee",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Bali rewards people who come to build a life, and quietly punishes people who come to run from one.",
    caption:
      "Paradise doesn't fix you. It amplifies whatever you brought with you. The people who thrive here came to build something — not to escape something.",
    hashtags: ["livinginbali", "bali", "lifestyle", "purpose"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Build, Don't Flee", subtitle: "The island can tell which one you are." },
      { kind: "statement", eyebrow: "The idea", text: "Bali rewards people who come to build a life, and quietly punishes people who come to run from one.", emphasis: "come to build a life" },
      { kind: "statement", eyebrow: "Why it matters", lead: "It sells itself as an endless holiday.", text: "But the ones who last treat it as a base to do real work and live well. Come to build, not to escape.", emphasis: "a base to do real work" },
      { kind: "quote", eyebrow: "What I've seen", text: "Paradise doesn't fix you. It just amplifies whatever you showed up with." },
      { kind: "cta", eyebrow: "Your turn", title: "Bring something to build.", body: "Wherever you land next, arrive with a reason to be there — not just a thing you're leaving behind.", handle: "@shaiden" },
    ],
  },
  {
    slug: "buy-back-time",
    title: "Buy Back Time",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "A low cost of living that buys back your time is the whole game.",
    caption:
      "Cheap living was never about being cheap. It was about not having to sell off my hours just to survive — so I could spend them on the things I actually came here for.",
    hashtags: ["livinginbali", "freedom", "costofliving", "timefreedom"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Buy Back Time", subtitle: "It was never really about the money." },
      { kind: "statement", eyebrow: "The idea", text: "A low cost of living that buys back your time is the whole game.", emphasis: "buys back your time" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Living cheaply isn't about being cheap.", text: "It's about not having to sell off the hours most people trade away just to get by.", emphasis: "sell off the hours" },
      { kind: "quote", eyebrow: "What I found", text: "Lowering what I needed to earn gave me back more than any raise ever could." },
      { kind: "cta", eyebrow: "Your turn", title: "What would the time buy you?", body: "Drop your burn rate and you buy back the one thing you can't make more of.", handle: "@shaiden" },
    ],
  },
  {
    slug: "test-dont-tattoo",
    title: "Test, Don't Tattoo",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Treat your first stint as a test, not a tattoo.",
    caption:
      "Anywhere feels like magic for two weeks. Before you sign a lease or move your life, live somewhere on a normal, boring Tuesday. That's the real test.",
    hashtags: ["livinginbali", "bali", "movingabroad", "expatlife"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Test, Don't Tattoo", subtitle: "Don't commit from the honeymoon high." },
      { kind: "statement", eyebrow: "The idea", text: "Treat your first stint as a test, not a tattoo.", emphasis: "a test, not a tattoo" },
      { kind: "statement", eyebrow: "Why it matters", lead: "A place sells itself on the two-week version of itself.", text: "You want to know how it feels on a normal Tuesday, work and all. Live it first, then commit.", emphasis: "a normal Tuesday" },
      { kind: "quote", eyebrow: "What I'd say", text: "Anywhere is magic for two weeks. Judge a place by an ordinary day in it." },
      { kind: "cta", eyebrow: "Your turn", title: "Live it before you lock it in.", body: "Before the lease, the visa, the move — spend a boring week there. Then decide.", handle: "@shaiden" },
    ],
  },
  {
    slug: "go-deep-not-numb",
    title: "Go Deep, Not Numb",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Bali is a place to calm your nervous system and go inward — not to chase the next hit.",
    caption:
      "The party and the bottomless brunch, you can find anywhere. I came here to slow down and go inward. When I skipped the noise, the place reached something the beach club never could.",
    hashtags: ["livinginbali", "bali", "wellness", "slowliving"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Go Deep, Not Numb", subtitle: "You didn't come here for the beach club." },
      { kind: "statement", eyebrow: "The idea", text: "Bali is a place to calm your nervous system and go inward — not to chase the next hit of dopamine.", emphasis: "go inward" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The endless party you can find in any city on earth.", text: "Skip it here, and the place reaches something the beach club never could.", emphasis: "the place reaches something" },
      { kind: "quote", eyebrow: "What I found", text: "Numbing out is available everywhere. Depth is the part worth traveling for." },
      { kind: "cta", eyebrow: "Your turn", title: "Let it actually reach you.", body: "Trade one loud night for one quiet morning. That's usually where the real trip is.", handle: "@shaiden" },
    ],
  },
  {
    slug: "where-you-wake-up",
    title: "Where You Wake Up",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Where you live is the input that colors every day. Not the island — the street.",
    caption:
      "People pick the country, then wonder why they're not happy. It's not the island, it's the street. Calm and chaos here can be a ten-minute ride apart.",
    hashtags: ["livinginbali", "bali", "environment", "movingabroad"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Where You Wake Up", subtitle: "Not the island — the street." },
      { kind: "statement", eyebrow: "The idea", text: "Where you live is the input that colors every day.", emphasis: "colors every day" },
      { kind: "statement", eyebrow: "Why it matters", lead: "It's not the country or even the city.", text: "Find the exact corner you want to wake up on before you commit a year to it. Calm and chaos are minutes apart.", emphasis: "the exact corner you want to wake up on" },
      { kind: "quote", eyebrow: "What I'd say", text: "The right city on the wrong street is still the wrong day, every day." },
      { kind: "cta", eyebrow: "Your turn", title: "Zoom all the way in.", body: "Past the country, past the city — your real life is decided by the block you're on.", handle: "@shaiden" },
    ],
  },
  {
    slug: "consistency-wins",
    title: "Consistency Wins",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Pick three anchors and just keep showing up. The same faces become your people.",
    caption:
      "I didn't network my way into a community here. I picked a gym, a co-working spot and a break, and kept showing up. The same faces became my people within weeks.",
    hashtags: ["livinginbali", "bali", "community", "friendship"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Consistency Wins", subtitle: "How I actually found my people." },
      { kind: "statement", eyebrow: "The idea", lead: "Pick three anchors — a gym, a co-working spot, one sport —", text: "and just keep showing up.", emphasis: "keep showing up" },
      { kind: "statement", eyebrow: "Why it matters", lead: "You don't network your way into a community.", text: "You anchor into one. Show up to the same places and the same faces slowly become your people.", emphasis: "the same faces slowly become your people" },
      { kind: "quote", eyebrow: "What I found", text: "Community didn't come from events. It came from showing up to the same place twice." },
      { kind: "cta", eyebrow: "Your turn", title: "Just become a regular.", body: "Pick three places and go often enough that people know your name. The rest takes care of itself.", handle: "@shaiden" },
    ],
  },
  {
    slug: "not-a-backdrop",
    title: "Not a Backdrop",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "This place is not a backdrop for your highlight reel.",
    caption:
      "The culture is the whole reason the island feels the way it does. You're a guest inside something people treat as sacred — move through it with a bit of humility and give the warmth back.",
    hashtags: ["livinginbali", "bali", "respect", "culture"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Not a Backdrop", subtitle: "You're a guest, not a tourist in a photo." },
      { kind: "statement", eyebrow: "The idea", text: "This place is not a backdrop for your highlight reel.", emphasis: "not a backdrop" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The culture is the entire reason the island feels the way it does.", text: "You're a guest inside a living, daily devotion. Move through it with humility, not entitlement.", emphasis: "with humility, not entitlement" },
      { kind: "quote", eyebrow: "What I believe", text: "The places worth visiting are the ones somebody else still treats as sacred." },
      { kind: "cta", eyebrow: "Your turn", title: "Give the warmth back.", body: "Respect the culture that makes the place magic. You're borrowing it, not owning it.", handle: "@shaiden" },
    ],
  },
  {
    slug: "learn-five-words",
    title: "Learn Five Words",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Learn five words of the local language and watch how differently the island treats you.",
    caption:
      "Hello, thank you, please, sorry, beautiful. Learning even five words of the local language changed how the whole island treated me. Respect, offered first, is the cheat code.",
    hashtags: ["livinginbali", "bali", "respect", "travel"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Learn Five Words", subtitle: "The smallest effort, the biggest return." },
      { kind: "statement", eyebrow: "The idea", text: "Learn even five words of the local language, and watch how differently the island treats you.", emphasis: "how differently the island treats you" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The smallest effort to meet people where they are", text: "changes everything that comes back to you. Respect, offered first, is the cheat code.", emphasis: "Respect, offered first" },
      { kind: "quote", eyebrow: "What I found", text: "Say hello in someone's own language and the whole country opens a little wider." },
      { kind: "cta", eyebrow: "Your turn", title: "Learn the five words.", body: "Hello, thank you, please, sorry, beautiful. Then watch the place soften toward you.", handle: "@shaiden" },
    ],
  },
  {
    slug: "closer-than-you-think",
    title: "Closer Than You Think",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "The life you want is usually closer — and simpler to reach — than you think.",
    caption:
      "The whole thing feels like a wall of red tape until someone lays it out for you. Then it turns out to be a handful of things, done once, in the right order — and you're free.",
    hashtags: ["livinginbali", "bali", "freedom", "movingabroad"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Closer Than You Think", subtitle: "The wall of red tape is mostly in your head." },
      { kind: "statement", eyebrow: "The idea", text: "The life you want is usually closer — and simpler to reach — than you think.", emphasis: "closer — and simpler to reach" },
      { kind: "statement", eyebrow: "Why it matters", lead: "It feels overwhelming until someone lays the whole thing out.", text: "Then it's just a handful of things, done once, in the right order — and you're free.", emphasis: "a handful of things, done once" },
      { kind: "quote", eyebrow: "What I found", text: "Most of my overwhelm was just a checklist nobody had written down yet." },
      { kind: "cta", eyebrow: "Your turn", title: "Write the whole list once.", body: "Get it all on one page. The impossible thing usually turns out to be a to-do list.", handle: "@shaiden" },
    ],
  },
];
