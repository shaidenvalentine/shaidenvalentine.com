// The Course — a paywalled video series sold on this site as a storefront.
// Videos + payment + access are hosted on an external platform (Gumroad,
// Podia, Teachable, Stan, Whop, etc.). This site markets it and links out.
//
// TODO: set price + checkoutUrl once the course is uploaded to your platform.
// Module titles/blurbs are a starting draft — edit freely.

export interface CourseModule {
  n: string;
  title: string;
  blurb: string;
}

export const course = {
  eyebrow: "The Course",
  title: "Find Your Purpose",
  subtitle:
    "A 10-part video series on discovering what you were put on this earth to do — and building a life that actually runs on it. The framework I used to go from no degree, no job, and near-homeless to free.",
  price: "$—", // TODO set price
  checkoutUrl: "#", // TODO hosted course / checkout link
  ctaLabel: "Get the course",
  note: "Lifetime access · watch at your own pace",
  outcomes: [
    "Get brutally clear on your ikigai — your reason for being.",
    "Separate your real purpose from the expectations you inherited.",
    "Turn that clarity into work and a life that compounds without you.",
  ],
  modules: [
    { n: "01", title: "The Lie You Were Sold", blurb: "Why the default path leaves so many people successful and empty — and how to see it clearly." },
    { n: "02", title: "Your Origin Signal", blurb: "Mining your own history for the thread that points at what you're actually here to do." },
    { n: "03", title: "The Ikigai Map", blurb: "Where what you love, what you're great at, what the world needs, and what pays all intersect." },
    { n: "04", title: "Killing the Shoulds", blurb: "Separating your true purpose from the expectations handed to you by family, school, and culture." },
    { n: "05", title: "Environment as Input", blurb: "Designing the place, people, and rhythm that make the right work almost inevitable." },
    { n: "06", title: "The Leverage Lens", blurb: "Turning purpose into something that compounds instead of something you trade hours for." },
    { n: "07", title: "From Vision to Reality", blurb: "The bridge most people never cross — taking the thing you see and actually building it." },
    { n: "08", title: "Building Without Permission", blurb: "No degree, no job, no gatekeepers. How to start before you feel ready." },
    { n: "09", title: "Money as Fuel, Not Master", blurb: "Funding the mission and buying your freedom without selling out the purpose." },
    { n: "10", title: "The Compounding Life", blurb: "Putting it together into a life of leverage, creativity, and impact that runs without you." },
  ] as CourseModule[],
};
