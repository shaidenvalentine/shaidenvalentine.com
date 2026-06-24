// THRESHOLD — Shaiden's 30th. All front-facing copy + the seed facts that
// populate the editable `events` row on first load. Caps, prices, the invite
// word and dates live in the DB (editable from /admin/events/config) — these
// seed values are only used the very first time the row is created. Everything
// else here (sections, the day-by-day arc, adventures, FAQ) is pure copy:
// edit → commit → redeploy.
//
// NOTE: the brief references a /reference/threshold.html as the copy source of
// truth; it is not present in the repo. This copy is derived from the brief
// itself and is meant to be swapped/refined against the real design when it
// lands.

export const THRESHOLD_SEED = {
  slug: "threshold",
  name: "THRESHOLD",
  subtitle: "Shaiden's 30th — a private 3-day gathering + Halloween celebration",
  venue: "The Seed, Candidasa, East Bali",
  startsOn: "2026-10-30", // Fri 30 Oct
  endsOn: "2026-11-02", // Mon 2 Nov (depart morning)
  inviteWord: "samhain",
  innerPrice: 500,
  innerCap: 50,
  outerPrice: 50, // PLACEHOLDER — confirm before launch
  outerCap: 250,
  depositAmount: 200,
  depositBy: "2026-08-15",
  balanceBy: "2026-10-01",
  roomingBy: "2026-10-10",
  estateBeds: 21,
  paymentDetails:
    "Payment is a manual bank / Wise transfer — no cards, nothing captured on this site. Once your place is held, transfer details will be sent to you personally.",
} as const;

// The slug the public route resolves. Change here to re-point /threshold.
export const THRESHOLD_SLUG = THRESHOLD_SEED.slug;

export const threshold = {
  hero: {
    eyebrow: "By invitation",
    kicker: "The Seed · Candidasa · East Bali",
    title: "THRESHOLD",
    sub: "Thirty years. Three days. One crossing.",
    blurb:
      "A private gathering to mark a turning — and a Halloween night to end it. Friday 30 October to Monday 2 November, 2026, on the east coast of Bali.",
    cta: "Request your place",
  },

  invitation: {
    eyebrow: "The invitation",
    headline: "Cross with me.",
    body: [
      "Thirty has been creeping up like a tide, and I'd rather meet it surrounded than alone. So I'm gathering the people who've shaped the first arc of my life for three days on the coast — to mark the threshold properly.",
      "This isn't a party with a price tag. It's not-for-profit: your contribution funds the experience — the house, the food, the ceremony, the night — and I underwrite the rest. Nobody profits. We just get to be together, fully, for three days.",
      "It's also a clean event — no alcohol, no drugs. The high is the people and the place. If that sounds like exactly your kind of thing, read on.",
    ],
  },

  container: {
    eyebrow: "What the weekend holds",
    headline: "The container.",
    sub: "For the inner circle — the full three days, all of it included once you're in.",
    inclusions: [
      { title: "A house on the water", body: "Three nights at The Seed and the villas around it, minutes from the sea." },
      { title: "Every meal", body: "Shared tables, morning to night — local, considered, all dietary needs held." },
      { title: "Workshops & ceremony", body: "Daytime sessions and a threshold ceremony built around the turning." },
      { title: "The Halloween night", body: "Saturday peaks with a costume celebration that runs late." },
      { title: "Adventure, if you want it", body: "Optional ocean and mountain trips you can opt into — arranged, not required." },
      { title: "Nothing to manage", body: "Once you're in, it's handled. Show up and be here." },
    ],
  },

  arc: {
    eyebrow: "The arc",
    headline: "Three days, one motion.",
    sub: "Arrival, peak, integration, departure — the weekend is built to rise and land.",
    days: [
      {
        day: "Friday 30 Oct",
        title: "Arrival",
        body: "Land through the afternoon, settle into the house, first shared meal as the sun goes down. A slow, warm open — no agenda but landing.",
      },
      {
        day: "Saturday 31 Oct",
        title: "Peak + the night",
        body: "Workshops and ceremony by day, then Halloween proper after dark — costumes, music, the celebration the whole weekend points toward.",
      },
      {
        day: "Sunday 1 Nov",
        title: "Integration",
        body: "A softer day to come back down — water, rest, longer conversations, an unhurried closing circle.",
      },
      {
        day: "Monday 2 Nov",
        title: "Departure",
        body: "Breakfast together and a morning goodbye. Carry it home.",
      },
    ],
  },

  circles: {
    eyebrow: "Two circles",
    headline: "Two ways in.",
    sub: "The full crossing, or the night itself.",
    inner: {
      name: "Inner Circle",
      tier: "inner" as const,
      what: "The full weekend — accommodation, every meal, workshops, ceremony, and the Halloween night.",
      note: "Three nights, all in.",
      capLabel: "places",
    },
    outer: {
      name: "Outer Circle",
      tier: "outer" as const,
      what: "Halloween night only — Saturday 31 October. Come for the celebration.",
      note: "One night, the party itself.",
      capLabel: "spots",
    },
  },

  accommodation: {
    eyebrow: "Where you'll sleep",
    headline: "On the estate, or a few minutes away.",
    body: [
      "The Seed sleeps around twenty-one on-site. The rest of the inner circle stays in villas and hotels a few minutes away — still part of everything, just a short hop from the main house.",
      "Estate beds are limited and go to the earliest yeses. Tell me your preference when you RSVP — on the estate, nearby, or either — and I'll assign rooming as places fill, locked by 10 October.",
    ],
  },

  adventures: {
    eyebrow: "Adventures",
    headline: "If you want more than the house.",
    sub: "Optional trips, arranged for the group — opt in when you RSVP. These aren't paid on site; I'll coordinate and share costs with the people who want in.",
    options: [
      "Diving",
      "Snorkelling",
      "White-water rafting",
      "Dirt-bike",
      "Horseback",
      "Jet-ski / wakesurf",
    ],
  },

  gettingThere: {
    eyebrow: "Getting there + ethos",
    headline: "How to arrive.",
    body: [
      "The Seed is in Candidasa on Bali's east coast — roughly 2.5 to 3 hours from Denpasar (DPS). I'll organise a group shuttle from the airport so you don't have to think about it; tell me your arrival when you RSVP.",
      "One more time, because it matters: this is a clean event. No alcohol, no drugs. Not-for-profit — contributions cover the experience and I cover the gap. Come as you are, fully present.",
    ],
  },

  rsvp: {
    eyebrow: "RSVP",
    headline: "Request your place.",
    sub: "Pick your circle. I'll hold your place and send payment details personally.",
    inner: {
      label: "Inner Circle — full weekend",
      bedOptions: [
        { value: "estate", label: "On the estate (limited)" },
        { value: "nearby", label: "A villa nearby" },
        { value: "either", label: "Either — surprise me" },
      ],
    },
    outer: {
      label: "Outer Circle — Halloween night",
    },
    waitlistNote:
      "This circle is full — but plans shift. Add yourself to the waitlist and I'll reach out the moment a place opens.",
    successInnerTitle: "You're in the circle.",
    successInnerBody:
      "Your place is held. I'll send bank / Wise transfer details to you personally — a $200 deposit holds your place and bed, with the balance due closer to the date. Can't wait to cross this with you.",
    successOuterTitle: "You're on the list for the night.",
    successOuterBody:
      "Saturday 31 October — you're in. I'll send the details and the contribution info to you personally. Bring a costume.",
    successWaitlistTitle: "You're on the waitlist.",
    successWaitlistBody:
      "This circle filled up, but places do open. You're on the list and I'll reach out personally the moment one does.",
  },

  payment: {
    eyebrow: "Payment & deadlines",
    headline: "How contributions work.",
    sub: "Manual transfer only — no cards, nothing captured here. Staged so nothing's due all at once.",
    stages: [
      { when: "By 15 Aug 2026", what: "$200 deposit — holds your place and your bed." },
      { when: "By 1 Oct 2026", what: "$300 balance — completes your inner-circle contribution." },
      { when: "10 Oct 2026", what: "Rooming and final headcount locked." },
    ],
    footnote: "Transfer details will be sent to you personally once your place is held.",
  },

  faq: {
    eyebrow: "FAQ",
    headline: "The fine print, plainly.",
    items: [
      {
        q: "Is this really alcohol- and drug-free?",
        a: "Yes. It's a clean event by design — the energy comes from the people and the place. Come ready for that.",
      },
      {
        q: "Where does my money go?",
        a: "Straight into the experience — the house, the food, the ceremony, the night. It's not-for-profit; I underwrite whatever contributions don't cover. Nobody makes money on this.",
      },
      {
        q: "How do I pay?",
        a: "Manual bank or Wise transfer. There's no card field on this site. Once your place is held I'll send transfer details to you personally.",
      },
      {
        q: "Can I come for just the Halloween night?",
        a: "Absolutely — that's the Outer Circle. Saturday 31 October, the celebration only, a lighter contribution.",
      },
      {
        q: "What if the circle I want is full?",
        a: "You'll go on the waitlist instead of hitting a wall. Plans shift and places open — I'll reach out the moment one does.",
      },
      {
        q: "Can I bring someone?",
        a: "Outer Circle, yes — note your +1 when you RSVP. Inner Circle is more intimate; message me if there's someone you'd want there.",
      },
    ],
  },
};

export type ThresholdCopy = typeof threshold;
