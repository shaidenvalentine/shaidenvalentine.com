// Investing — the other half of how Shaiden operates: backing founders, not
// just building. Edit the portfolio + tags freely.

export interface PortfolioCo {
  name: string;
  /** Short, editable descriptor. TODO: confirm exact wording with Shaiden. */
  tag: string;
  href?: string;
}

export const investing = {
  eyebrow: "Investing",
  headline: "I back the future I want to live in.",
  sub: "Beyond what I build, I invest in founders solving real problems for the long term — health, frontier tech, and the systems we'll all live inside. If you're building something I should see, pitch me.",
  portfolio: [
    { name: "Next Life Sciences", tag: "Rewriting reproductive choice", href: "https://nextlifesciences.com" },
    { name: "Space Campers", tag: "Frontier living, untethered", href: "https://spacecampers.com" },
  ] as PortfolioCo[],
  note: "+ a few more, and some I can't name yet.",
  ctaLabel: "Pitch me an idea",
  ctaHref: "#work",
};
