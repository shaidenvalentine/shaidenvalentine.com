// Copy + options for the Work-With-Me and Feedback sections.
// Edit here → commit → redeploy. Where submissions land is set by env
// (CONTACT_EMAIL); see .env.example.

export const collab = {
  work: {
    eyebrow: "Work With Me",
    headline: "Want to build together — or have something I should back?",
    sub: "If you have a skill set, a network, or capital that moves one of my projects forward — or you're a founder with an idea I should invest in — make the case. Serious inquiries only. I read every one.",
    // What the person is reaching out as. First option is the default prompt.
    roles: [
      "Operator / talent",
      "Founder pitching an idea",
      "Investment opportunity",
      "Investor / capital",
      "Partner / collaborator",
      "Purpose / Ikigai coaching",
      "Advisor / expertise",
      "Something else",
    ],
    successTitle: "Got it.",
    successBody:
      "Your application is in front of me. If there's a fit, you'll hear from me directly.",
  },
  feedback: {
    eyebrow: "Anonymous Feedback",
    headline: "Tell me what I need to hear.",
    sub: "I believe deeply that the fastest way to evolve into the best version of myself is honest feedback from the people around me — and that you'll only ever get it if it's truly safe to give. So this is that space. Fully anonymous — no name, no email, nothing tracked. Literally anything goes; you will not offend me. Tell me my blind spots, where I'm off-center, what you see that I can't. I'm reading every word with an open mind.",
    // Optional framing for what the note is about.
    topics: [
      "General",
      "A blind spot",
      "Something I'm doing well",
      "Constructive criticism",
      "A hard truth",
    ],
    successTitle: "Heard.",
    successBody: "Thank you for taking the time. I'm reading it with an open mind.",
  },
};
