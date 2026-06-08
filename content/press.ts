// Press / Featured-in — outside signal that this isn't talk, it's traction.
// Articles, podcast episodes, video features, social moments — anywhere
// someone else covered you or the work.
//
// TODO: replace placeholders with the real items. Mothership going viral
// almost certainly produced posts/videos/coverage worth surfacing.

export interface PressItem {
  /** Outlet name — e.g. "Forbes", "My First Million", "TikTok". */
  outlet: string;
  /** Article / episode / video title. */
  title: string;
  /** Outbound link. */
  href: string;
  /** Human label — "May 2025", "2024", etc. */
  date?: string;
  /** Optional kind hint shown as a chip. */
  kind?: "Article" | "Podcast" | "Video" | "Mention" | "Social";
}

export const press = {
  eyebrow: "Press",
  headline: "Outside signal.",
  sub: "Where the work shows up beyond me — articles, podcasts, features, viral moments.",
  // Empty for launch → the Press section hides itself until real items exist.
  // To turn it on, add entries like:
  //   { outlet: "My First Million", title: "How a viral van became Mothership",
  //     href: "https://…", date: "2025", kind: "Podcast" },
  items: [] as PressItem[],
};
