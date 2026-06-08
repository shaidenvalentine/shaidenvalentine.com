"use client";

import { useState } from "react";
import { site } from "@content/site";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { LeadModal } from "@/components/ui/LeadModal";

export function Newsletter() {
  const [open, setOpen] = useState(false);

  return (
    <Section id="newsletter" eyebrow="Newsletter" index="11 — Subscribe">
      <Reveal>
        <div className="mx-auto max-w-2xl rounded-3xl glass-strong p-8 text-center md:p-12">
          <h2 className="display-2">{site.newsletterHeadline}</h2>
          <p className="body-lg mx-auto mt-10 max-w-[48ch] text-[var(--color-ink-muted)]">
            {site.newsletterSub}
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-brass)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
            >
              Get on the list
              <span aria-hidden>→</span>
            </button>
            <span className="label-mono">Occasional · no noise</span>
          </div>
        </div>
      </Reveal>

      <LeadModal
        open={open}
        onClose={() => setOpen(false)}
        intent="Newsletter — Notes from the build"
        eyebrow="Newsletter"
        headline="Get on the list"
        blurb="Occasional notes from the build — the systems, the leverage, the in-progress thinking behind everything I'm making. I only send when there's something real to share."
        submitLabel="Subscribe"
      />
    </Section>
  );
}
