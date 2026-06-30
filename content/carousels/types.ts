// ─────────────────────────────────────────────────────────────────────────
// The Shadin content machine.
//
// Drop an idea here as a typed `Carousel` → it renders as branded, swipeable
// slides at /carousels/<slug> → the export script screenshots each slide to a
// 1080×1350 PNG for Instagram. One visual language across the site + the feed.
//
// Every slide is a member of the `Slide` discriminated union below. Add a new
// `kind` here and a matching branch in <Slide> to grow the design vocabulary.
// ─────────────────────────────────────────────────────────────────────────

/** Instagram 4:5 portrait — the canvas every slide is composed on. */
export const SLIDE_W = 1080;
export const SLIDE_H = 1350;

/** The four poles of the ikigai. Used to optionally spotlight one circle. */
export type IkigaiKey = "love" | "good" | "world" | "paid";

/** Opening slide — topic eyebrow, the big idea, your signed name. */
export interface CoverSlide {
  kind: "cover";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Oversized faint backdrop glyph. Defaults to the title's initial. */
  glyph?: string;
}

/** One large idea. `lead` is set in muted ink, `text` is the punch line. */
export interface StatementSlide {
  kind: "statement";
  eyebrow?: string;
  lead?: string;
  text: string;
  /** A phrase inside `text` to paint brass. Must match exactly. */
  emphasis?: string;
  footnote?: string;
}

/** A titled list — the four questions, a set of principles, steps. */
export interface ListSlide {
  kind: "list";
  eyebrow?: string;
  title: string;
  items: { label: string; body?: string }[];
  /** Numbered 01, 02… vs. brass bullet. */
  numbered?: boolean;
}

/** The ikigai Venn diagram, optionally spotlighting one circle. */
export interface IkigaiSlide {
  kind: "ikigai";
  eyebrow?: string;
  title?: string;
  caption?: string;
  spotlight?: IkigaiKey;
}

/** A single principle — oversized index, punchy statement, short elaboration.
 *  The workhorse slide for the ebook principle series. */
export interface PrincipleSlide {
  kind: "principle";
  /** Big faint backdrop numeral, e.g. "01". */
  n?: string;
  /** Theme or source, e.g. "The Game of Life". */
  eyebrow?: string;
  text: string;
  /** Exact substring of `text` to paint brass. */
  emphasis?: string;
  elaboration?: string;
}

/** A pull quote. */
export interface QuoteSlide {
  kind: "quote";
  eyebrow?: string;
  text: string;
  attribution?: string;
}

/** Closing slide — the ask + where to find you. */
export interface CtaSlide {
  kind: "cta";
  eyebrow?: string;
  title: string;
  body?: string;
  handle?: string;
  url?: string;
}

export type Slide =
  | CoverSlide
  | StatementSlide
  | PrincipleSlide
  | ListSlide
  | IkigaiSlide
  | QuoteSlide
  | CtaSlide;

export interface Carousel {
  /** URL slug + export folder name. */
  slug: string;
  /** Gallery title. */
  title: string;
  /** Category eyebrow, e.g. "Concept", "Principle". */
  topic: string;
  /** One line for the gallery card + the suggested IG caption opener. */
  summary: string;
  /** Optional longer caption draft for the Instagram post. */
  caption?: string;
  hashtags?: string[];
  /** ISO date the idea was captured. */
  date?: string;
  slides: Slide[];
}
