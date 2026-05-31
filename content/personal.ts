// The personal layer — who Shaiden is beyond the work. Edit freely.

export interface Principle {
  title: string;
  body: string;
}

export const ethos = {
  eyebrow: "How I Think",
  headline: "The lens behind everything.",
  sub: "I'm not performing entrepreneurship — I'm building. These are the ideas the work runs on.",
  principles: [
    {
      title: "Every problem is a design problem.",
      body: "Money, relationships, focus, a company — they're all systems with inputs and incentives. Redesign the system and the symptom disappears.",
    },
    {
      title: "Real leverage means it runs without you.",
      body: "If it needs me in the room, it's a job, not an asset. I build for the version where I've stepped back and it still compounds.",
    },
    {
      title: "Environment is a cognitive input.",
      body: "Where and how you live isn't a lifestyle preference — it's an input to how you think. I treat it like one and design it on purpose.",
    },
    {
      title: "Authentic signal compounds.",
      body: "Performative content decays the moment you stop feeding it. Real signal — built things, honest words — keeps paying out. So I only build the real thing.",
    },
  ] as Principle[],
};

export const life = {
  eyebrow: "Life",
  headline: "I live in Bali.",
  sub: "Bali is home base — not an escape, but the environment the rest of the architecture is designed around. I run everything from here: sun, deep work, the right people, and a pace that lets the long game actually play out.",
  // Drop real photos into /public/img and list them here; the grid adapts.
  gallery: [
    { src: "/img/life-1.jpg", caption: "The build" },
    { src: "/img/life-2.jpg", caption: "Bali" },
    { src: "/img/life-3.jpg", caption: "The rhythm" },
  ],
};
