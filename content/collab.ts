// Copy + options for the Work-With-Me and Feedback sections.
// Edit here → commit → redeploy. Where submissions land is set by env
// (CONTACT_EMAIL); see .env.example.

export const collab = {
  work: {
    eyebrow: "Work With Me",
    headline: "Think we should be building together?",
    sub: "If you have a skill set, a network, or capital that could move one of these projects forward — or you just see an angle I'm missing — make the case. Serious applications only. I read every one.",
    // What the person is reaching out as. First option is the default prompt.
    roles: [
      "Operator / talent",
      "Investor / capital",
      "Partner / collaborator",
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
    sub: "Everyone has opinions of each other; almost no one gets a space to voice them. This is that space. Fully anonymous — no name, no email, nothing tracked. If you think I'm off-center, or you see something I can't, say it.",
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
