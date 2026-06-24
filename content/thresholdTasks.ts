// THRESHOLD — production plan. A comprehensive, ordered run-of-show checklist
// that seeds the admin "Plan" tab once (after that it's fully editable in the
// portal). Dates are deadlines, derived from the event window
// (Fri 30 Oct → Mon 2 Nov 2026) working backwards. Edit freely — these are
// just the starting defaults; reschedule/add/remove from /admin/events/plan.

export const TASK_CATEGORIES = [
  "Venue",
  "Guests",
  "Payments",
  "Activities",
  "Entertainment",
  "Content",
  "Food",
  "Production",
  "Logistics",
  "Post-event",
] as const;

export type TaskCategory = (typeof TASK_CATEGORIES)[number];

export interface SeedTask {
  title: string;
  category: TaskCategory;
  due: string; // ISO date — the deadline
  notes?: string;
}

// Ordered by deadline. The plan view groups these by month automatically.
export const THRESHOLD_TASKS: SeedTask[] = [
  // ───── Now: lock the venue ────────────────────────────────────────────────
  {
    title: "Book a site-visit meeting with The Seed",
    category: "Venue",
    due: "2026-06-28",
    notes:
      "Walk the property, confirm the 30 Oct–2 Nov hold, and open the pricing conversation in person before anything else moves.",
  },
  {
    title: "Pitch The Seed the content-exchange deal",
    category: "Venue",
    due: "2026-07-01",
    notes:
      "Ask for ~50% off the base rate in exchange for exposure: ~150 guests, a combined 5–10M+ following, everyone tagging @theseed all weekend, plus your own page + a videographer-made after-movie. Frame it as a marketing partnership, not just a discount.",
  },
  {
    title: "Finalize the inner-circle invite list (target 50)",
    category: "Guests",
    due: "2026-06-30",
    notes: "Lock who gets the full-weekend invite. Keep a reserve list for declines.",
  },
  {
    title: "Draft inner-circle invite copy + visuals",
    category: "Content",
    due: "2026-07-02",
    notes: "The personal note + the link to /threshold (invite word: samhain).",
  },
  {
    title: "Sign venue agreement + pay venue deposit",
    category: "Venue",
    due: "2026-07-07",
    notes: "Once pricing + content-exchange terms are agreed, get it in writing and secure the dates.",
  },

  // ───── July: send invites, source every vendor ────────────────────────────
  {
    title: "Send inner-circle invitations",
    category: "Guests",
    due: "2026-07-05",
    notes: "Share the /threshold link with the invite word. Track RSVPs in the Guests tab.",
  },
  {
    title: "Book the videographer for the full weekend",
    category: "Content",
    due: "2026-07-10",
    notes:
      "Must cover arrival → ceremony → Halloween night → departure, and deliver a cinematic after-movie. This is the centerpiece of the content exchange with the venue.",
  },
  {
    title: "Book a photographer",
    category: "Content",
    due: "2026-07-12",
    notes: "Stills for guests, the venue, and recap posts.",
  },
  {
    title: "Get catering quotes (all meals, 3 days)",
    category: "Food",
    due: "2026-07-15",
    notes: "Every meal for the inner circle + party food for Halloween night. Account for dietary needs (see Rollups).",
  },
  {
    title: "Source DJ(s) for the Halloween party",
    category: "Entertainment",
    due: "2026-07-15",
    notes: "Get availability + quotes for the 31 Oct night. Clean event — energy comes from music + people.",
  },
  {
    title: "Source fire dancers",
    category: "Entertainment",
    due: "2026-07-18",
    notes: "For the Saturday night peak. Confirm they carry their own safety kit + insurance.",
  },
  {
    title: "Source exotic snakes / animal handler",
    category: "Entertainment",
    due: "2026-07-18",
    notes:
      "Check legality, permits, and animal-welfare standards in Bali first. Use a licensed handler with insurance — non-negotiable.",
  },
  {
    title: "Get lighting + sound/PA quotes",
    category: "Production",
    due: "2026-07-20",
    notes: "Party lighting, stage/DJ sound, ambient lighting for the grounds and ceremony space.",
  },
  {
    title: "Open inner-circle deposits ($200)",
    category: "Payments",
    due: "2026-07-20",
    notes: "Send personal transfer details (bank/Wise) to confirmed RSVPs. Mark 'details sent' in each guest's drawer.",
  },
  {
    title: "Get activity-operator quotes + availability",
    category: "Activities",
    due: "2026-07-22",
    notes:
      "Jet-ski / wakesurf, snorkelling, diving, horseback, white-water rafting, dirt-bike. Pull interest counts from the Adventures rollup to size each booking.",
  },
  {
    title: "Decide party (outer-circle) pricing model",
    category: "Payments",
    due: "2026-07-25",
    notes: "Free vs a contribution — depends on total budget once vendor costs land. Set the final number in Config.",
  },
  {
    title: "Build the tagging / exposure plan",
    category: "Content",
    due: "2026-07-25",
    notes:
      "The deliverable you owe The Seed: hashtags, the @theseed handle, which guests tag what, and a simple brief so 150 people actually tag consistently.",
  },

  // ───── August: confirm + deposit the key vendors ──────────────────────────
  {
    title: "Inner-circle deposit deadline ($200 holds bed)",
    category: "Payments",
    due: "2026-08-15",
    notes: "Chase anyone unpaid. Estate beds go to earliest paid yeses.",
  },
  {
    title: "Confirm + deposit the caterer",
    category: "Food",
    due: "2026-08-15",
    notes: "Lock the menu direction and secure the date.",
  },
  {
    title: "Confirm + deposit the DJ(s)",
    category: "Entertainment",
    due: "2026-08-15",
  },
  {
    title: "Confirm videographer contract + after-movie brief",
    category: "Content",
    due: "2026-08-20",
    notes: "Shot list, key moments (ceremony, fire show, party), drone, and the after-movie delivery date + style.",
  },
  {
    title: "Confirm lighting + sound vendor",
    category: "Production",
    due: "2026-08-22",
  },
  {
    title: "Confirm fire dancers + safety plan",
    category: "Entertainment",
    due: "2026-08-22",
    notes: "Fire safety zone, distance from guests, extinguisher on hand, venue sign-off.",
  },
  {
    title: "Confirm animal handler + permits",
    category: "Entertainment",
    due: "2026-08-22",
    notes: "Paperwork in hand; agree the controlled window + handler-supervised interaction rules.",
  },
  {
    title: "Tentatively book activity operators",
    category: "Activities",
    due: "2026-08-25",
    notes: "Hold dates/slots based on opt-in interest; final numbers confirmed in October.",
  },
  {
    title: "Send Halloween party (outer-circle) invites",
    category: "Guests",
    due: "2026-08-25",
    notes: "Lighter invite — Saturday night only. Same /threshold page, Outer Circle flow.",
  },
  {
    title: "Plan the airport shuttle (DPS ↔ Candidasa)",
    category: "Logistics",
    due: "2026-08-31",
    notes: "2.5–3h transfer. Group runs by arrival day — pull arrivals from the Rollups tab.",
  },

  // ───── September: finalize the details ────────────────────────────────────
  {
    title: "Send costume theme / guidance",
    category: "Guests",
    due: "2026-09-05",
    notes: "Set the tone for the Halloween night so costumes land.",
  },
  {
    title: "Finalize the menu with the caterer",
    category: "Food",
    due: "2026-09-10",
    notes: "Lock every meal + party food against the dietary list.",
  },
  {
    title: "Lock decor + staging plan",
    category: "Production",
    due: "2026-09-12",
    notes: "Ceremony space / altar, party zone, lighting design, entrance moment, signage.",
  },
  {
    title: "Confirm activity headcounts + pay operator deposits",
    category: "Activities",
    due: "2026-09-15",
  },
  {
    title: "Confirm videographer schedule + key-moment list",
    category: "Content",
    due: "2026-09-20",
    notes: "Align call-times with the run-of-show (ceremony, fire show, snake window, party peak, drone).",
  },
  {
    title: "Confirm transport schedule + drivers",
    category: "Logistics",
    due: "2026-09-25",
  },
  {
    title: "Send inner-circle balance reminders",
    category: "Payments",
    due: "2026-09-25",
    notes: "Nudge anyone with an outstanding balance before the 1 Oct deadline.",
  },

  // ───── October: the run-up ────────────────────────────────────────────────
  {
    title: "Inner-circle balance deadline ($300)",
    category: "Payments",
    due: "2026-10-01",
    notes: "Full $500 contribution in. Flag anyone behind on the dashboard.",
  },
  {
    title: "Close the inner-circle list",
    category: "Guests",
    due: "2026-10-01",
    notes: "Move remaining unpaid to waitlist; promote waitlisted guests into any freed places.",
  },
  {
    title: "Close the party (outer-circle) list",
    category: "Guests",
    due: "2026-10-10",
  },
  {
    title: "Lock rooming + final headcount",
    category: "Logistics",
    due: "2026-10-10",
    notes: "Assign every bed in the Accommodation tab — estate beds first, then nearby villas.",
  },
  {
    title: "Final headcount to the caterer",
    category: "Food",
    due: "2026-10-12",
  },
  {
    title: "Final activity bookings + waivers",
    category: "Activities",
    due: "2026-10-15",
    notes: "Confirm exact numbers, pay balances, collect signed waivers from participants.",
  },
  {
    title: "Lock the Halloween-night run-of-show",
    category: "Entertainment",
    due: "2026-10-18",
    notes: "Set times: DJ sets, fire-dancer slot, snake/handler window, any speeches or ceremony beats.",
  },
  {
    title: "Confirm lights/sound load-in time",
    category: "Production",
    due: "2026-10-20",
  },
  {
    title: "Finalize the transport manifest",
    category: "Logistics",
    due: "2026-10-22",
    notes: "Who's on which shuttle, by arrival day. Share driver contacts with guests.",
  },
  {
    title: "Final venue walkthrough with The Seed",
    category: "Venue",
    due: "2026-10-28",
    notes: "Confirm layout, power, fire-safety, animal logistics, vendor access, and the tagging plan.",
  },
  {
    title: "Confirm videographer call-time + shot list",
    category: "Content",
    due: "2026-10-28",
  },
  {
    title: "Brief guests on tagging @theseed at welcome",
    category: "Content",
    due: "2026-10-30",
    notes: "The exposure you promised the venue only happens if people actually tag — remind them on arrival.",
  },

  // ───── Event weekend ──────────────────────────────────────────────────────
  {
    title: "Friday — arrivals, shuttles, welcome dinner",
    category: "Logistics",
    due: "2026-10-30",
  },
  {
    title: "Saturday — workshops/ceremony by day, Halloween party by night",
    category: "Entertainment",
    due: "2026-10-31",
    notes: "DJ, fire dancers, snakes, lights — the peak. Make sure the videographer captures it all.",
  },
  {
    title: "Sunday — integration / recovery day",
    category: "Logistics",
    due: "2026-11-01",
  },
  {
    title: "Monday — departures + checkout",
    category: "Logistics",
    due: "2026-11-02",
  },

  // ───── Post-event ─────────────────────────────────────────────────────────
  {
    title: "Collect all footage + brief the after-movie edit",
    category: "Post-event",
    due: "2026-11-05",
    notes: "Get raw files from videographer/photographer; lock the after-movie direction.",
  },
  {
    title: "Post recap content + tag The Seed and guests",
    category: "Post-event",
    due: "2026-11-09",
    notes: "Deliver on the exposure side of the venue deal while it's fresh.",
  },
  {
    title: "Reconcile final costs vs contributions",
    category: "Payments",
    due: "2026-11-15",
    notes: "Not-for-profit — confirm what contributions covered and what you underwrote.",
  },
  {
    title: "Send The Seed the tagged-content package",
    category: "Post-event",
    due: "2026-11-15",
    notes: "Proof of the exposure delivered — keeps the relationship warm for the next event.",
  },
  {
    title: "Deliver the after-movie",
    category: "Post-event",
    due: "2026-11-30",
    notes: "The keepsake of the whole weekend.",
  },
];
