// THRESHOLD — planning roster (from the 2026-06-24 export). Loaded into the
// admin Guests list once via a seed-once guard (events.roster_seeded), so it
// auto-populates in production without a migration step. Everything here is
// PLANNING intent — nobody's invited or paid yet — so guests import as
// `invited` (host pair `confirmed`+comped, maybes `waitlisted`). Edit/advance
// each in the Guests tab as invites actually go out.
//
// The export carries no email/WhatsApp, so contact + sex/region/flags ride in
// the admin note until real RSVPs come in through /threshold.

export interface RosterGuest {
  name: string;
  status: "invited" | "confirmed" | "waitlisted";
  comp?: boolean;
  note: string;
}

export const THRESHOLD_ROSTER: RosterGuest[] = [
  // ── US group ──
  { name: "Isaac Hetzroni", status: "invited", note: "M · US" },
  { name: "Dacoda Longhair", status: "invited", note: "M · US" },
  { name: "Anthony Senzamici", status: "invited", note: "M · US · DJ (aka 'Senzo')" },
  { name: "Evan Nicolini", status: "invited", note: "M · US" },
  { name: "Briana Waddell", status: "invited", note: "F · US" },
  { name: "Zach Fleishman", status: "invited", note: "M · US" },
  { name: "Preston Johnson", status: "invited", note: "M · US · has +1 (Nathalia)" },
  { name: "Nathalia", status: "invited", note: "F · US · Preston's +1 · surname needed" },
  // ── Bali crew ──
  { name: "Jianna Capri", status: "invited", note: "F · Bali · (early voice mishearing 'Gianni' — corrected)" },
  { name: "Isaiah English", status: "invited", note: "M · Bali · DJ · housemate" },
  { name: "Sasha Juliard", status: "invited", note: "M · Bali · (corrected from 'Safa')" },
  { name: "Henn Zakai", status: "invited", note: "F · Bali" },
  { name: "Christian LeBlanc", status: "invited", note: "M · Bali" },
  { name: "Ruby Rojas", status: "invited", note: "F · Bali" },
  { name: "Kyle Good", status: "invited", note: "M · Bali" },
  { name: "Roma Tabone", status: "invited", note: "M · Bali" },
  { name: "Arlin Moore", status: "invited", note: "M · Bali" },
  { name: "Lee Hutchinson", status: "invited", note: "M · Bali" },
  { name: "Dean White", status: "invited", note: "M · Bali" },
  // ── Region TBD ──
  { name: "Felix Hutti", status: "invited", note: "M · region TBD · has +1 (Alva)" },
  { name: "Alva Burvall", status: "invited", note: "F · region TBD · Felix's +1" },
  { name: "Ludwig von Frank", status: "invited", note: "M · region TBD" },
  { name: "Mikka Hendra", status: "invited", note: "F · region TBD" },
  { name: "Siraj", status: "invited", note: "M · region TBD · has +1 (Sabrina) · surname needed" },
  { name: "Sabrina", status: "invited", note: "F · region TBD · Siraj's +1 · surname needed" },
  { name: "Alex Ikonn", status: "invited", note: "M · region TBD · has +1 · Ibiza summit with him inspired the format" },
  { name: "Alex Ikonn's +1", status: "invited", note: "region TBD · name & sex TBD" },
  { name: "Toby", status: "invited", note: "M · region TBD · has +1 (Sarah) · surname needed" },
  { name: "Sarah", status: "invited", note: "F · region TBD · Toby's +1 · surname needed" },
  { name: "Tom Strickland", status: "invited", note: "M · region TBD" },
  { name: "Jenn", status: "invited", note: "F · region TBD · has +1 (Anton) · surname needed" },
  { name: "Anton", status: "invited", note: "M · region TBD · Jenn's +1 · surname needed" },
  { name: "Erika", status: "invited", note: "F · region TBD · surname needed" },
  { name: "Sol Kim", status: "invited", note: "M · region TBD · DJ" },
  { name: "Sydney Symons", status: "invited", note: "F · region TBD" },
  { name: "Chelsea Yamase", status: "invited", note: "F · region TBD" },
  { name: "Sam Kolder", status: "invited", note: "M · region TBD" },
  { name: "Maddy Chapman", status: "invited", note: "F · region TBD" },
  { name: "Roy Maximus", status: "invited", note: "M · region TBD" },
  { name: "Keenan Hock", status: "invited", note: "M · region TBD" },
  { name: "Bernardo", status: "invited", note: "M · region TBD · surname needed" },
  { name: "Lana Setunova", status: "invited", note: "F · region TBD · DJ" },
  // ── Host pair (comped) ──
  { name: "Shaiden Valentine", status: "confirmed", comp: true, note: "HOST — comped" },
  { name: "Shaiden's +1", status: "confirmed", comp: true, note: "F · Bali · host's +1 — comped · name TBD" },
  // ── Maybes (tentative → waitlisted so they don't consume a paid slot) ──
  { name: "Rina", status: "waitlisted", note: "MAYBE — tentative · F · region TBD · surname needed" },
  { name: "Lukas", status: "waitlisted", note: "MAYBE — tentative · M · region TBD · has +1 (Victoria) · surname needed" },
  { name: "Victoria", status: "waitlisted", note: "MAYBE — tentative · F · region TBD · Lukas's +1 · surname needed" },
];

// Roster-specific open items from the export, added to the production Plan.
export interface RosterTask {
  title: string;
  category: string;
  due: string;
  notes?: string;
}

export const THRESHOLD_ROSTER_TASKS: RosterTask[] = [
  {
    title: "Fill the remaining inner-circle paying places (42/50)",
    category: "Guests",
    due: "2026-07-31",
    notes: "8 more paying guests to hit the 50 target ($25k of the $30k budget).",
  },
  {
    title: "Collect missing surnames",
    category: "Guests",
    due: "2026-07-10",
    notes: "Siraj, Bernardo, Toby, Jenn, Anton, Erika; +1 surnames: Nathalia, Sabrina, Sarah.",
  },
  {
    title: "Get Alex Ikonn's +1 — name & sex",
    category: "Guests",
    due: "2026-07-10",
  },
  {
    title: "Resolve the maybes — Rina; Lukas & Victoria",
    category: "Guests",
    due: "2026-07-15",
  },
  {
    title: "Get The Seed's actual buyout quote",
    category: "Venue",
    due: "2026-07-01",
    notes: "Budget assumes ~$10k discounted. Confirm against a real quote at the site visit.",
  },
  {
    title: "Confirm rooming for ~52 across Seed + nearby villas",
    category: "Logistics",
    due: "2026-08-01",
    notes: "21 sleep on-site. Clarify whether the host pair sits within or on top of the 50 cap.",
  },
  {
    title: "Decide jet-ski rotation — inside the $5k activities budget or a-la-carte",
    category: "Activities",
    due: "2026-07-22",
    notes: "~5 skis on a rotating sign-up; top-up a-la-carte if demand is high.",
  },
  {
    title: "Decide checkout — Sunday night vs Monday morning",
    category: "Logistics",
    due: "2026-09-01",
    notes: "Optional budget lever on accommodation.",
  },
  {
    title: "Drive the Outer Circle to ~60% female",
    category: "Guests",
    due: "2026-08-25",
    notes: "Party ratio target. Inner circle is currently ~36% female — weight party invites accordingly.",
  },
];

// Facts the export pins down — reconciled onto the live event row once.
export const THRESHOLD_ROSTER_CONFIG = {
  outerCap: 150, // party-only capacity (export), was a 250 placeholder
  venue: "The Seed · Candidasa · Karangasem, East Bali",
};
