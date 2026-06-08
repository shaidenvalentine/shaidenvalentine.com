"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Curated jump targets — scroll order. Lenis (SmoothScroll) intercepts these
// #anchor clicks and smooth-scrolls automatically.
const ITEMS: { id: string; label: string }[] = [
  { id: "mission", label: "Mission" },
  { id: "ventures", label: "Ventures" },
  { id: "investing", label: "Investing" },
  { id: "now", label: "In Motion" },
  { id: "story", label: "Story" },
  { id: "life", label: "Life" },
  { id: "coaching", label: "Work With Me" },
  { id: "shop", label: "Shop" },
  { id: "connect", label: "Connect" },
];

export function JumpNav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);

  // Show the nav only after the user scrolls past most of the hero.
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view → highlight it in the menu.
  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter(
      (el): el is HTMLElement => !!el
    );
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (top?.target.id) setActive(top.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-end"
          >
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label="Jump to a section"
              className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
            >
              Explore
              <span
                className={`text-[var(--color-brass)] transition-transform duration-300 ${
                  open ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            <AnimatePresence>
              {open && (
                <motion.nav
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-strong mt-2 w-52 origin-top-right overflow-hidden rounded-2xl p-1.5"
                >
                  {ITEMS.map((item) => {
                    const isActive = active === item.id;
                    return (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition ${
                          isActive
                            ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]"
                            : "text-[var(--color-ink-muted)] hover:bg-[var(--glass-fill)] hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {item.label}
                        {isActive && (
                          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-brass)]" />
                        )}
                      </a>
                    );
                  })}
                </motion.nav>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
