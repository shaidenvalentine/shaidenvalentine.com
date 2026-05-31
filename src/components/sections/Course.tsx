"use client";

import { track } from "@vercel/analytics";
import { course } from "@content/course";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Course() {
  const external = course.checkoutUrl.startsWith("http");

  return (
    <Section id="course" eyebrow={course.eyebrow} index="09 — Course">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Pitch + buy */}
        <Reveal>
          <div className="lg:sticky lg:top-24">
            <span className="label-mono">10-part video series</span>
            <h2 className="display-2 mt-3 max-w-[12ch]">{course.title}</h2>
            <p className="body-lg mt-5 max-w-[48ch] text-[var(--color-ink-muted)]">
              {course.subtitle}
            </p>

            <ul className="mt-7 flex flex-col gap-3">
              {course.outcomes.map((o, i) => (
                <li key={i} className="flex items-start gap-3 body-base text-[var(--color-ink)]">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-brass)]" />
                  {o}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <a
                href={course.checkoutUrl}
                target={external ? "_blank" : undefined}
                rel="noreferrer"
                onClick={() => track("course_cta")}
                className="inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
              >
                {course.ctaLabel} · {course.price}
              </a>
              <span className="label-mono">{course.note}</span>
            </div>
          </div>
        </Reveal>

        {/* Curriculum */}
        <Reveal delay={0.1}>
          <ul className="overflow-hidden rounded-3xl border border-[var(--color-line)]">
            {course.modules.map((m, i) => (
              <li
                key={m.n}
                className={`flex items-start gap-5 p-5 md:p-6 ${
                  i > 0 ? "border-t border-[var(--color-line)]" : ""
                }`}
              >
                <span className="font-mono text-sm text-[var(--color-brass)]">{m.n}</span>
                <div className="flex-1">
                  <h3 className="text-base font-medium text-[var(--color-ink)]">{m.title}</h3>
                  <p className="body-sm mt-1">{m.blurb}</p>
                </div>
                {/* lock glyph — signals the paywall */}
                <span aria-hidden className="mt-0.5 text-[var(--color-ink-whisper)]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
