"use client";

import { track } from "@vercel/analytics";
import { investing } from "@content/investing";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Investing() {
  return (
    <Section id="investing" eyebrow={investing.eyebrow} index="02 — Investments">
      <div className="grid gap-12 md:grid-cols-[1fr_1fr] md:items-start">
        <Reveal>
          <h2 className="display-2 max-w-[14ch]">{investing.headline}</h2>
          <p className="body-lg mt-10 max-w-[46ch] text-[var(--color-ink-muted)]">{investing.sub}</p>
          <a
            href={investing.ctaHref}
            onClick={() => track("pitch_cta")}
            className="mt-8 inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
          >
            {investing.ctaLabel}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-3">
            {investing.portfolio.map((co) => (
              <li key={co.name}>
                <a
                  href={co.href ?? undefined}
                  target={co.href ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-4 rounded-2xl glass px-6 py-5 transition hover:-translate-y-0.5"
                >
                  <div className="flex flex-col">
                    <span className="display-3 text-[var(--color-ink)]">{co.name}</span>
                    <span className="body-sm mt-1">{co.tag}</span>
                  </div>
                  {co.href && (
                    <span className="text-[var(--color-ink-muted)] transition-transform duration-300 group-hover:translate-x-1">
                      ↗
                    </span>
                  )}
                </a>
              </li>
            ))}
            <li className="px-6 pt-2">
              <span className="label-mono">{investing.note}</span>
            </li>
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
