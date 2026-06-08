// Typed content model. Everything the site renders comes from /content.
// Update a field here → commit → Vercel redeploys. That is the whole CMS.

export interface SocialLink {
  label: string;
  href: string;
  handle?: string;
}

export interface Profile {
  name: string;
  /** Top headline under the name — a tight identifier line. */
  tagline: string;
  /** Optional supporting line below the tagline (the longer mission/gift statement). */
  taglineSub?: string;
  /** Quick at-a-glance bio shown right under the tagline on the hero. */
  quickBio: string;
  /** Short mantra-style mission headline shown in the Mission section. */
  mission: string;
  /** Optional supporting tagline below the mission headline. */
  missionSub?: string;
  /** Short bio paragraph(s) for the Story section. */
  bio: string[];
  location: string;
  /** Real-time current location shown as a pulsing pill at the top of the hero. */
  currentLocation?: string;
  /** Ambient hero portrait loop. Put a real .mp4 at /public/video/. */
  heroVideo: string;
  /** Poster / fallback still shown before play and when WebGL is off. */
  heroPoster: string;
  /** Full intro film triggered by tap-to-play. */
  introVideo: string;
  introPoster: string;
  socials: SocialLink[];
  /** Fields used to build the downloadable vCard. */
  vcard: {
    firstName: string;
    lastName: string;
    org: string;
    title: string;
    email: string;
    phone?: string;
    url: string;
  };
}

export interface Venture {
  id: string;
  name: string;
  /** One-paragraph description. */
  blurb: string;
  /** A single current status line — the "in motion" signal. */
  status: string;
  /** Outbound link to the venture's own federated domain. */
  href: string;
  /** Optional logo/mark in /public/img. Falls back to a typographic mark. */
  logo?: string;
  /** Accent used for the orbital glow / mark. */
  accent: string;
}

export interface NowItem {
  date: string; // human label, e.g. "May 2026"
  line: string;
}

export interface Product {
  title: string;
  blurb: string;
  price: string;
  image?: string;
  /** Hosted checkout (Gumroad / Lemon Squeezy). Link out, no payment API. */
  checkoutUrl: string;
  /** If set, the product is a free direct download (e.g. a PDF in /public).
   *  Takes priority over checkout — renders a "Download free" button. */
  downloadUrl?: string;
}

export interface SiteConfig {
  domain: string;
  baseUrl: string;
  seoTitle: string;
  seoDescription: string;
  ogImage: string;
  /** beehiiv embed URL (the src of their <iframe>). The one external dep. */
  beehiivEmbedUrl: string;
  newsletterHeadline: string;
  newsletterSub: string;
}
