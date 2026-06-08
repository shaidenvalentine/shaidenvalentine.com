"use client";

import { track } from "@vercel/analytics";
import { ventures } from "@content/ventures";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Ventures() {
  return (
    <Section id="ventures" eyebrow="Companies" index="01 — Building">
      <Reveal>
        <h2 className="display-2 max-w-[18ch]">My companies.</h2>
        <p className="body-lg mt-16 max-w-[52ch] text-[var(--color-ink-muted)]">
          Different surfaces — software, hardware, environments — each designed
          to run without me. Tap in.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {ventures.map((v, i) => {
          const live = v.href.startsWith("http");
          const inner = (
            <>
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

                <p className="body-base mt-10 flex-1 text-[var(--color-ink-muted)]">{v.blurb}</p>

                <div className="mt-6 border-t border-[var(--color-line)] pt-4">
                  <span className="label-mono block text-[var(--color-brass)]">{v.status}</span>
                  {live ? (
                    <span className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--color-ink)]">
                      Enter {v.name}
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  ) : (
                    <span className="mt-4 inline-flex text-sm text-[var(--color-ink-muted)]">
                      Coming soon
                    </span>
                  )}
                </div>
              </div>
            </>
          );

          const cls =
            "group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition duration-500";

          return (
            <Reveal key={v.id} delay={(i % 3) * 0.08}>
              {live ? (
                <a
                  href={v.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => track("venture_click", { venture: v.id })}
                  className={`${cls} hover:-translate-y-1`}
                >
                  {inner}
                </a>
              ) : (
                <div className={cls}>{inner}</div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
