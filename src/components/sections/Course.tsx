"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { course } from "@content/course";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeadModal } from "@/components/ui/LeadModal";

export function Course() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);

  return (
    <Section id="course" eyebrow={course.eyebrow} index="09 — Course">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <span className="label-mono">10-part video series</span>
          <h2 className="display-2 mt-3 mx-auto max-w-[16ch] text-[var(--color-ink)]">
            {course.title}
          </h2>
          <p className="body-lg mx-auto mt-16 max-w-[44ch] text-[var(--color-ink-muted)]">
            {course.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => setWaitlistOpen(true)}
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
            >
              {course.ctaLabel}
            </button>
            <span className="label-mono">In production · join early</span>
          </div>

          {/* curriculum reveal — quiet link that opens the full 10 modules */}
          <button
            type="button"
            onClick={() => setShowCurriculum((s) => !s)}
            aria-expanded={showCurriculum}
            className="mx-auto mt-10 inline-flex items-center gap-2 text-sm text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
          >
            {showCurriculum ? "Hide the curriculum" : "See the curriculum"}
            <span
              aria-hidden
              className={`text-[var(--color-brass)] transition-transform duration-300 ${
                showCurriculum ? "rotate-180" : ""
              }`}
            >
              ▾
            </span>
          </button>
        </Reveal>
      </div>

      <AnimatePresence initial={false}>
        {showCurriculum && (
          <motion.div
            key="curriculum"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <ul className="mx-auto mt-10 grid max-w-3xl gap-px overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2">
              {course.modules.map((m) => (
                <li key={m.n} className="flex items-start gap-4 bg-[var(--color-bg)] p-5">
                  <span className="font-mono text-sm text-[var(--color-brass)]">{m.n}</span>
                  <div className="flex-1">
                    <h3 className="text-base font-medium text-[var(--color-ink)]">{m.title}</h3>
                    <p className="body-sm mt-1">{m.blurb}</p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <LeadModal
        open={waitlistOpen}
        onClose={() => setWaitlistOpen(false)}
        intent="Waitlist — Find Your Purpose course"
        eyebrow="Waitlist"
        headline="Get early access"
        blurb="The series is in production. Leave your details and you'll be first to know — and first in line — when it drops."
        submitLabel="Join the waitlist"
      />
    </Section>
  );
}
