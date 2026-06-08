"use client";

import { useState } from "react";
import { coaching } from "@content/coaching";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeadModal } from "@/components/ui/LeadModal";

export function Coaching() {
  const [openIntent, setOpenIntent] = useState<string | null>(null);

  return (
    <Section id="coaching" eyebrow={coaching.eyebrow} index="08 — Coaching">
      <Reveal>
        <h2 className="display-2 max-w-[16ch]">{coaching.headline}</h2>
        <p className="body-lg mt-8 max-w-[56ch] text-[var(--color-ink-muted)]">{coaching.sub}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {coaching.offers.map((offer, i) => (
          <Reveal key={offer.title} delay={i * 0.08}>
            <div className="flex h-full flex-col rounded-3xl glass p-7 md:p-9">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="display-3 text-[var(--color-ink)]">{offer.title}</h3>
                <span className="label-mono whitespace-nowrap text-[var(--color-brass)]">
                  {offer.price}
                </span>
              </div>

              <p className="body-base mt-6 flex-1 text-[var(--color-ink-muted)]">{offer.blurb}</p>

              <button
                type="button"
                onClick={() => setOpenIntent(`Waitlist — ${offer.title}`)}
                className="mt-7 inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
              >
                {offer.ctaLabel}
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <LeadModal
        open={openIntent !== null}
        onClose={() => setOpenIntent(null)}
        intent={openIntent ?? ""}
        eyebrow="Waitlist"
        headline="Join the waitlist"
        blurb="Spots are limited and I take it seriously. Leave your details and I'll reach out personally when the next opening comes up."
        submitLabel="Join the waitlist"
      />
    </Section>
  );
}
