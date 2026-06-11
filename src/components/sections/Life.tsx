"use client";

import { useState } from "react";
import { life } from "@content/personal";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SafeImg } from "@/components/ui/SafeImg";
import { LeadModal } from "@/components/ui/LeadModal";

export function Life({ bare = false }: { bare?: boolean } = {}) {
  const [waitlistIntent, setWaitlistIntent] = useState<string | null>(null);

  const gallery = (
    <div className="grid grid-cols-2 gap-3">
      {life.gallery.map((g, i) => (
        <div
          key={i}
          className={`relative overflow-hidden rounded-2xl glass ${
            i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-square"
          }`}
        >
          <div className="absolute inset-0 bg-grad-ember" />
          <SafeImg src={g.src} alt={g.caption} className="relative h-full w-full object-cover" />
          <span className="label-mono absolute bottom-3 left-3 z-10">{g.caption}</span>
        </div>
      ))}
    </div>
  );

  const ctas = (
    <div className="mt-8 flex flex-wrap gap-3">
      {life.ctas?.map((c) => {
        const isLead = c.href.startsWith("lead:");
        const isExternal = c.href.startsWith("http");
        const className =
          c.kind === "primary"
            ? "inline-flex items-center gap-2 rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
            : "inline-flex items-center gap-2 rounded-full glass px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]";
        const arrow = isLead ? "→" : isExternal ? "↗" : "→";

        if (isLead) {
          const intent = c.href.replace(/^lead:/, "");
          return (
            <button
              key={c.label}
              type="button"
              onClick={() => setWaitlistIntent(intent)}
              className={className}
            >
              {c.label}
              <span aria-hidden>{arrow}</span>
            </button>
          );
        }
        return (
          <a
            key={c.label}
            href={c.href}
            target={isExternal ? "_blank" : undefined}
            rel="noreferrer"
            className={className}
          >
            {c.label}
            <span aria-hidden>{arrow}</span>
          </a>
        );
      })}
    </div>
  );

  const modal = (
    <LeadModal
      open={waitlistIntent !== null}
      onClose={() => setWaitlistIntent(null)}
      intent={waitlistIntent ?? ""}
      eyebrow="The Guide"
      headline="Get the Living in Bali guide"
      blurb="The guide is in the works — everything I'd tell a friend moving here: which area, the rhythm, the community, the rentals, the surf, the food. Leave your details and I'll send it your way when it's ready."
      submitLabel="Send it to me"
    />
  );

  if (bare) {
    return (
      <>
        <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
          <Reveal>
            <p className="body-lg max-w-[46ch] text-[var(--color-ink-muted)]">{life.sub}</p>
            {ctas}
          </Reveal>
          <Reveal delay={0.1}>{gallery}</Reveal>
        </div>
        {modal}
      </>
    );
  }

  return (
    <Section id="life" eyebrow={life.eyebrow} index="07 — Life">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-center">
        <Reveal>
          <h2 className="display-2 max-w-[12ch]">{life.headline}</h2>
          <p className="body-lg mt-16 max-w-[46ch] text-[var(--color-ink-muted)]">{life.sub}</p>
          {ctas}
        </Reveal>

        <Reveal delay={0.1}>{gallery}</Reveal>
      </div>
      {modal}
    </Section>
  );
}
