// Coaching / advisory offer — booking Shaiden's time. Two tiers:
// a 1:1 hourly advisory, and a guided purpose/ikigai program.
//
// TODO: set the real hourly rate and the booking link (Cal.com / Calendly).

export interface CoachingOffer {
  title: string;
  /** Price label — e.g. "$250 / hour", "By application". */
  price: string;
  blurb: string;
  ctaLabel: string;
  /** Booking link (Cal.com etc.) or "#work" to route into the application form. */
  href: string;
}

export const coaching = {
  eyebrow: "Work With My Mind",
  headline: "Find what you were put here to do.",
  sub: "I went from no degree, no job, and years near-homeless to building companies and living the life I pictured — by getting brutally clear on purpose and designing a life around it. When I have the bandwidth, I open up a bit of my time to help others do the same.",
  offers: [
    {
      title: "1:1 Advisory",
      price: "By the hour",
      blurb:
        "Book my time to think through a venture, a decision, a pivot — or just get unstuck. Most people leave clearer on their next move and why it matters.",
      ctaLabel: "Reach out",
      href: "#",
    },
    {
      title: "Purpose & Ikigai Coaching",
      price: "1:1",
      blurb:
        "A guided program to find what you were put on this earth to do — your ikigai — and design a life that actually runs on it. For people serious about the work.",
      ctaLabel: "Reach out",
      href: "#",
    },
  ] as CoachingOffer[],
};
