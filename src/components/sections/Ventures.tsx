"use client";

import { track } from "@vercel/analytics";
import { ventures } from "@content/ventures";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Ventures() {
  return (
    <Section id="ventures" eyebrow="The Orbit" index="04 — Ventures">
      <Reveal>
        <h2 className="display-2 max-w-[18ch]">
          Three companies, one thesis.
        </h2>
        <p className="body-lg mt-5 max-w-[52ch] text-[var(--color-ink-muted)]">
          Different surfaces — software, hardware, environments — each designed
          to run without me. Tap in.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {ventures.map((v, i) => (
          <Reveal key={v.id} delay={i * 0.08}>
            <a
              href={v.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("venture_click", { venture: v.id })}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition duration-500 hover:-translate-y-1"
            >
              {/* orbital glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full opacity-30 blur-3xl transition duration-700 group-hover:opacity-60"
                style={{ background: v.accent }}
              />
              <div className="relative z-10 flex flex-1 flex-col">
                <div className="flex items-center gap-3">
                  <span
                    className="grid h-9 w-9 place-items-center rounded-full text-sm font-medium"
                    style={{ background: "var(--glass-fill-strong)", color: v.accent }}
                  >
                    {v.name[0]}
                  </span>
                  <h3 className="display-3 text-[var(--color-ink)]">{v.name}</h3>
                </div>

                <p className="body-base mt-5 flex-1 text-[var(--color-ink-muted)]">
                  {v.blurb}
                </p>

                <div className="mt-6 border-t border-[var(--color-line)] pt-4">
                  <span className="label-mono block text-[var(--color-brass)]">
                    {v.status}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-ink)]">
                    Enter {v.name}
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
