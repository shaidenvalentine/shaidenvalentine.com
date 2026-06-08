"use client";

import { track } from "@vercel/analytics";
import { coaching } from "@content/coaching";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Coaching() {
  return (
    <Section id="coaching" eyebrow={coaching.eyebrow} index="08 — Coaching">
      <Reveal>
        <h2 className="display-2 max-w-[16ch]">{coaching.headline}</h2>
        <p className="body-lg mt-5 max-w-[56ch] text-[var(--color-ink-muted)]">{coaching.sub}</p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-2">
        {coaching.offers.map((offer, i) => {
          const external = offer.href.startsWith("http");
          return (
            <Reveal key={offer.title} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl glass p-7 md:p-9">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display-3 text-[var(--color-ink)]">{offer.title}</h3>
                  <span className="label-mono whitespace-nowrap text-[var(--color-brass)]">
                    {offer.price}
                  </span>
                </div>

                <p className="body-base mt-4 flex-1 text-[var(--color-ink-muted)]">{offer.blurb}</p>

                {offer.href === "#" ? (
                  <span className="mt-7 inline-flex w-fit items-center justify-center rounded-full glass px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-ink-muted)]">
                    Coming soon
                  </span>
                ) : (
                  <a
                    href={offer.href}
                    target={external ? "_blank" : undefined}
                    rel="noreferrer"
                    onClick={() => track("coaching_cta", { offer: offer.title })}
                    className="mt-7 inline-flex w-fit items-center justify-center rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
                  >
                    {offer.ctaLabel}
                  </a>
                )}
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
