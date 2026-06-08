"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { track } from "@vercel/analytics";

// Site-wide collapsible section. Shows just an eyebrow + headline + 1-line
// preview by default so the page reads as a clean table of contents; user
// taps to expand the full content. Click again to collapse.

export function Collapsible({
  id,
  eyebrow,
  index,
  headline,
  preview,
  defaultOpen = false,
  children,
}: {
  id: string;
  eyebrow: string;
  index?: string;
  headline: string;
  /** 1-line teaser visible while collapsed. */
  preview: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const sectionRef = useRef<HTMLElement>(null);

  // If the URL hash points at this section, auto-open and scroll to it.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (hash === id) {
      setOpen(true);
      // give Framer a tick to expand, then scroll
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [id]);

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) track("section_expand", { section: id });
  }

  return (
    <section
      ref={sectionRef}
      id={id}
      className="scroll-mt-16 border-t border-[var(--color-line)]"
    >
      <div className="container-page py-12 md:py-16">
        <button
          type="button"
          onClick={toggle}
          aria-expanded={open}
          aria-controls={`${id}-body`}
          className="group block w-full text-left"
        >
          <div className="flex items-baseline justify-between gap-4">
            <span className="label-eyebrow">{eyebrow}</span>
            {index && <span className="label-mono">{index}</span>}
          </div>

          <div className="mt-6 flex items-start justify-between gap-6">
            <div className="min-w-0 flex-1">
              <h2 className="display-2 max-w-[18ch] text-[var(--color-ink)]">{headline}</h2>
              <p className="body-lg mt-14 max-w-[52ch] text-[var(--color-ink-muted)]">{preview}</p>
            </div>
            <span
              aria-hidden
              className={`mt-2 inline-grid h-12 w-12 shrink-0 place-items-center rounded-full glass text-[var(--color-brass)] transition-transform duration-500 ${
                open ? "rotate-45" : "group-hover:scale-110"
              }`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={`${id}-body`}
              key="body"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-10">{children}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
