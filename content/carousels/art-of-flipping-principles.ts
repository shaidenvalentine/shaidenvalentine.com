import type { Carousel } from "./types";

// Individual principle carousels from the ebook "The Art of Flipping."
// One focused idea per carousel, in a plain first-person voice.
const TOPIC = "The Art of Flipping";

export const artOfFlippingPrinciples: Carousel[] = [
  {
    slug: "create-the-margin",
    title: "Create the Margin",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Don't bet on the market. Create your profit the moment you buy.",
    caption:
      "I stopped hoping prices would go up and started buying low enough that it didn't matter if they didn't. Your profit gets made at the buy, not the sell.",
    hashtags: ["theartofflipping", "flipping", "reselling", "sidehustle"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Create the Margin", subtitle: "Profit gets made at the buy, not the sell." },
      { kind: "statement", eyebrow: "The idea", lead: "Don't count on the market to make you money.", text: "You create your profit the moment you buy.", emphasis: "the moment you buy" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Buy low enough that the margin already exists.", text: "The gap between your buy price and your sell price is the proof of your skill, not luck.", emphasis: "the proof of your skill" },
      { kind: "quote", eyebrow: "What I learned", text: "I stopped hoping prices would rise and started buying so it didn't matter if they didn't." },
      { kind: "cta", eyebrow: "Your turn", title: "Where's your margin?", body: "If a deal only works when the market cooperates, it isn't really a deal yet.", handle: "@shaiden" },
    ],
  },
  {
    slug: "knowledge-is-the-edge",
    title: "Knowledge Is the Edge",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "The magic happens when you know more than the seller.",
    caption:
      "Almost all my best margins came from one thing: knowing what the item was actually worth better than the person selling it. Ten minutes of research is the highest-paid work in flipping.",
    hashtags: ["theartofflipping", "flipping", "negotiation", "reselling"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Knowledge Is the Edge", subtitle: "The profit goes to whoever knows more." },
      { kind: "statement", eyebrow: "The idea", text: "The magic happens when you know more than the seller.", emphasis: "know more than the seller" },
      { kind: "statement", eyebrow: "Why it matters", lead: "My biggest margins come from deals where I'm the more informed one.", text: "The information gap is the whole edge — so close it on your side and leave it open on theirs.", emphasis: "The information gap is the whole edge" },
      { kind: "quote", eyebrow: "What I found", text: "Nearly every good flip came down to knowing the thing better than the person selling it." },
      { kind: "cta", eyebrow: "Your turn", title: "Do the homework.", body: "Ten minutes of research is the highest-paid work in flipping. Do it before you offer.", handle: "@shaiden" },
    ],
  },
  {
    slug: "dive-where-others-dont",
    title: "Dive Where Others Don't",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "The best deals are the ones everyone else scrolls past.",
    caption:
      "The vague listing with the terrible photo that scares everyone off is usually where I've doubled my money. The obvious deals are already gone.",
    hashtags: ["theartofflipping", "flipping", "deals", "reselling"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Dive Where Others Don't", subtitle: "The gold is where nobody's looking." },
      { kind: "statement", eyebrow: "The idea", text: "The best deals are the ones everyone else scrolls past.", emphasis: "everyone else scrolls past" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The vague listing with the bad photo scares off the normal buyers.", text: "That's usually exactly where I've doubled my money. Boldness plus a little research wins.", emphasis: "doubled my money" },
      { kind: "quote", eyebrow: "What I've learned", text: "The listings everyone ignores are the ones that have paid me the most." },
      { kind: "cta", eyebrow: "Your turn", title: "Look where others skip.", body: "The next bad photo you scroll past might be your best flip of the month.", handle: "@shaiden" },
    ],
  },
  {
    slug: "mis-marketed-gold",
    title: "Mis-Marketed Gold",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "A MacBook Pro listed as just a 'laptop' is money on the floor.",
    caption:
      "A lot of my best flips were things the seller didn't even know they had. The item's mislabeled, so it's underpriced, so it's yours. Search broad, not narrow.",
    hashtags: ["theartofflipping", "flipping", "deals", "reselling"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Mis-Marketed Gold", subtitle: "A seller's blind spot is your payday." },
      { kind: "statement", eyebrow: "The idea", text: "A MacBook Pro listed as just a 'laptop' is money on the floor.", emphasis: "money on the floor" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The best deals are mislabeled and underpriced,", text: "because the seller didn't know what they had. Search broad and you'll find the gems the filters hide.", emphasis: "the seller didn't know what they had" },
      { kind: "quote", eyebrow: "What I found", text: "So many of my best flips were things the person selling didn't realize they had." },
      { kind: "cta", eyebrow: "Your turn", title: "Search sideways.", body: "Look past the obvious keywords. The mispriced stuff hides in the wrong categories.", handle: "@shaiden" },
    ],
  },
  {
    slug: "immediacy-wins",
    title: "Immediacy Wins",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "I drop whatever I'm doing to go score a deal. Speed is the edge.",
    caption:
      "The deals never went to the best offer. They went to whoever showed up first. I'll drop what I'm doing to grab one — speed is half of why this worked for me.",
    hashtags: ["theartofflipping", "flipping", "speed", "reselling"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Immediacy Wins", subtitle: "An edge almost nobody actually uses." },
      { kind: "statement", eyebrow: "The idea", lead: "I'll drop whatever I'm doing to go score a deal.", text: "Speed is one of the biggest reasons this worked for me.", emphasis: "Speed" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Strike while it's hot.", text: "A fast reply gets your low offer accepted before the higher offers ever show up.", emphasis: "before the higher offers ever show up" },
      { kind: "quote", eyebrow: "What I found", text: "The deals didn't go to the best offer. They went to the one that showed up first." },
      { kind: "cta", eyebrow: "Your turn", title: "Move now.", body: "See a deal? Reply first, think second. The good ones don't sit around waiting.", handle: "@shaiden" },
    ],
  },
  {
    slug: "capital-snowballs",
    title: "Capital Snowballs",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Flipping isn't linear, it's exponential. People have flipped a paperclip into a house.",
    caption:
      "I started with candy money. Played right, it never stayed candy money — every flip funds a slightly bigger one. That's the whole engine.",
    hashtags: ["theartofflipping", "flipping", "compounding", "sidehustle"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Capital Snowballs", subtitle: "How candy money becomes a camper van." },
      { kind: "statement", eyebrow: "The idea", text: "Flipping isn't linear, it's exponential. People have flipped a paperclip into a house.", emphasis: "it's exponential" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Every flip grows your capital,", text: "and bigger capital unlocks bigger deals. A small, disciplined start can compound a long way.", emphasis: "bigger capital unlocks bigger deals" },
      { kind: "quote", eyebrow: "Looking back", text: "I started with candy money. Played right, it never stayed candy money." },
      { kind: "cta", eyebrow: "Your turn", title: "Start where you are.", body: "Flip something small this week, then roll the win into the next one. That's the engine.", handle: "@shaiden" },
    ],
  },
  {
    slug: "corner-the-niche",
    title: "Corner the Niche",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Everyone fights over iPhones. Become the seller of the thing nobody else is selling.",
    caption:
      "I've made more owning one weird little category than I ever did fighting over the popular stuff. Find your niche and quietly own it.",
    hashtags: ["theartofflipping", "flipping", "strategy", "reselling"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Corner the Niche", subtitle: "Stop competing. Start owning." },
      { kind: "statement", eyebrow: "The idea", lead: "Everyone's fighting over iPhones.", text: "Become the go-to seller of the thing nobody else is bothering with.", emphasis: "nobody else is bothering with" },
      { kind: "statement", eyebrow: "Why it matters", lead: "The mainstream stuff is crowded with sellers.", text: "Pick a niche and own it, and you cut your competition while quietly gaining pricing power.", emphasis: "gaining pricing power" },
      { kind: "quote", eyebrow: "What I've found", text: "I made more owning one weird little category than I ever did fighting over the popular stuff." },
      { kind: "cta", eyebrow: "Your turn", title: "Pick your lane.", body: "What could you become the obvious person to buy from? Go deep there instead of wide.", handle: "@shaiden" },
    ],
  },
  {
    slug: "sold-not-listed",
    title: "Sold, Not Listed",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Active listings are wishful thinking. Sold listings are the truth.",
    caption:
      "Asking prices are just wishes. I only ever trusted what things actually sold for. Check the solds before every offer and you'll basically never overpay.",
    hashtags: ["theartofflipping", "flipping", "valuation", "reselling"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Sold, Not Listed", subtitle: "The only price that tells the truth." },
      { kind: "statement", eyebrow: "The idea", text: "Active listings are wishful thinking. Sold listings are the truth.", emphasis: "Sold listings are the truth" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Real market value only lives in completed sales.", text: "Pull the sold comparables, set a conservative number off those, and you rarely overpay.", emphasis: "you rarely overpay" },
      { kind: "quote", eyebrow: "What I've learned", text: "Asking prices are wishes. I only ever trusted what things actually sold for." },
      { kind: "cta", eyebrow: "Your turn", title: "Check the solds.", body: "Before any offer, look at what actually sold — not what's hopefully sitting there listed.", handle: "@shaiden" },
    ],
  },
  {
    slug: "no-is-just-text",
    title: "No Is Just Text",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "The biggest roadblock in flipping is the fear of a 'no.' But it's just text.",
    caption:
      "The only offers that never worked were the ones I was too nervous to send. A no is just a word on a screen. Send it.",
    hashtags: ["theartofflipping", "flipping", "mindset", "negotiation"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "No Is Just Text", subtitle: "The only thing between you and the deal." },
      { kind: "statement", eyebrow: "The idea", lead: "The biggest roadblock in flipping is the fear of a 'no.'", text: "But it's just text. There's no real harm in asking.", emphasis: "it's just text" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Send the offer.", text: "A reasonable lowball can always be walked back — but the offer you never send is gone for sure.", emphasis: "the offer you never send" },
      { kind: "quote", eyebrow: "What I found", text: "The only offers that never worked were the ones I was too scared to send." },
      { kind: "cta", eyebrow: "Your turn", title: "Send the offer.", body: "Worst case is a word on a screen. Make the ask anyway.", handle: "@shaiden" },
    ],
  },
  {
    slug: "dress-down",
    title: "Dress Down",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Nobody gives a deal to the guy in a Tesla and a Rolex. Look like you need the discount.",
    caption:
      "Nobody ever cut me a deal when I looked like I didn't need one. In-person negotiation is mostly perception — dress for the discount, save the flex for after.",
    hashtags: ["theartofflipping", "flipping", "negotiation", "psychology"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Dress Down", subtitle: "Perception quietly sets the price." },
      { kind: "statement", eyebrow: "The idea", lead: "Nobody hands a discount to the guy in a Tesla and a Rolex.", text: "When you're negotiating in person, look like you actually need the discount.", emphasis: "look like you actually need the discount" },
      { kind: "statement", eyebrow: "Why it matters", lead: "People read your appearance and price you off it.", text: "In-person negotiation is mostly perception — don't broadcast that you can afford to overpay.", emphasis: "mostly perception" },
      { kind: "quote", eyebrow: "What I found", text: "Nobody ever cut me a deal when I showed up looking like I didn't need one." },
      { kind: "cta", eyebrow: "Your turn", title: "Blend in.", body: "Dress for the discount, not the flex. Save the flex for after the deal's done.", handle: "@shaiden" },
    ],
  },
  {
    slug: "read-the-urgency",
    title: "Read the Urgency",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Some sellers just need quick cash. Detect that urgency and you've found your edge.",
    caption:
      "Most of the time the price had nothing to do with the item and everything to do with the seller's week. Ask why they're selling — the leverage is hiding in the answer.",
    hashtags: ["theartofflipping", "flipping", "negotiation", "leverage"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Read the Urgency", subtitle: "Their reason for selling is your leverage." },
      { kind: "statement", eyebrow: "The idea", lead: "Some sellers just need quick cash.", text: "Pick up on that urgency and you've found your edge.", emphasis: "found your edge" },
      { kind: "statement", eyebrow: "Why it matters", lead: "Ask open, easy questions about why they're selling.", text: "It builds a little rapport and quietly hands you the leverage that ends up setting the price.", emphasis: "the leverage that ends up setting the price" },
      { kind: "quote", eyebrow: "What I've learned", text: "Most of the time the price had less to do with the item and more to do with their week." },
      { kind: "cta", eyebrow: "Your turn", title: "Ask why.", body: "Before you talk numbers, learn their story. The leverage is usually hiding in it.", handle: "@shaiden" },
    ],
  },
  {
    slug: "sell-the-perception",
    title: "Sell the Perception",
    topic: TOPIC,
    date: "2026-06-30",
    summary: "Most buyers never do the research. Price high and let them feel like they won.",
    caption:
      "People don't actually want the lowest price — they want to feel like they got a good one. Price a touch high, leave room to move, and let them walk away feeling like they won.",
    hashtags: ["theartofflipping", "flipping", "sales", "psychology"],
    slides: [
      { kind: "cover", eyebrow: TOPIC, title: "Sell the Perception", subtitle: "Let the buyer feel like they won." },
      { kind: "statement", eyebrow: "The idea", lead: "Most buyers never do the research.", text: "Price a little high, and let them feel like they won on the way down.", emphasis: "let them feel like they won" },
      { kind: "statement", eyebrow: "Why it matters", lead: "A small discount off a new item still feels like a 'deal.'", text: "Price just above market, leave room to negotiate, and everyone walks away happy.", emphasis: "everyone walks away happy" },
      { kind: "quote", eyebrow: "What I've learned", text: "People don't really want the lowest price. They want to feel like they got a good one." },
      { kind: "cta", eyebrow: "Your turn", title: "Sell the win.", body: "Give the buyer a story they feel good about. That's what closes — and what brings referrals.", handle: "@shaiden" },
    ],
  },
];
