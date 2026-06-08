// Investing — the other half of how Shaiden operates: backing founders, not
// just building. Edit the portfolio + tags freely.

export interface PortfolioCo {
  name: string;
  /** Short, editable descriptor. TODO: confirm exact wording with Shaiden. */
  tag: string;
  href?: string;
}

export const investing = {
  eyebrow: "Investments",
  headline: "My investments.",
  sub: "Beyond what I build, I back the future I want to live in — founders and companies solving real problems for the long term, from health to frontier tech to the systems we'll all live inside. If you're building something I should see, pitch me.",
  portfolio: [
    { name: "Tesla", tag: "The energy + transportation rewrite", href: "https://tesla.com" },
    { name: "Next Life Sciences", tag: "Rewriting reproductive choice", href: "https://nextlifesciences.com" },
    { name: "Space Campers", tag: "Frontier living, untethered", href: "https://spacecampers.com" },
  ] as PortfolioCo[],
  note: "+ a few more, and some I can't name yet.",
  ctaLabel: "Pitch me an idea",
  ctaHref: "#work",
};
