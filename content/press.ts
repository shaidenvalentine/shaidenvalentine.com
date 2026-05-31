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
  items: [
    {
      outlet: "TODO — outlet",
      title: "TODO — the headline or episode title goes here.",
      href: "#",
      date: "—",
      kind: "Article",
    },
    {
      outlet: "TODO — podcast name",
      title: "TODO — episode title or theme.",
      href: "#",
      date: "—",
      kind: "Podcast",
    },
    {
      outlet: "TODO — outlet",
      title: "TODO — the Mothership viral moment lives here.",
      href: "#",
      date: "—",
      kind: "Video",
    },
  ] as PressItem[],
};
