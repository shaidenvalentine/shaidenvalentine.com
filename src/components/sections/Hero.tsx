"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@content/profile";
import { SaveContactButton } from "@/components/ui/SaveContactButton";

export function Hero() {
  const { scrollY } = useScroll();

  // Gentle parallax — portrait drifts up as you scroll. No opacity fade on
  // the text; the bio sits at the bottom of the hero and needs to remain
  // readable while the user scrolls down to it.
  const portraitY = useTransform(scrollY, [0, 700], [0, -60]);

  return (
    <section
      id="top"
      className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-black py-24"
    >
      <div className="container-page relative z-10 flex flex-col items-center text-center">
        {/* Portrait — no border, edges fade gradually into the dark page
            backdrop via a soft radial mask. */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="hero-portrait relative aspect-[4/5] w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] sm:w-[min(96vw,42rem)] sm:ml-0 sm:mr-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={profile.heroPoster}
            alt={profile.name}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </motion.div>

        {/* Signature name */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="display-sig mt-10 text-[var(--color-ink)]"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="body-lg mt-7 max-w-[46ch] text-[var(--color-ink)]"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="body-base mt-5 max-w-[52ch] text-[var(--color-ink-muted)]"
        >
          {profile.quickBio}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
        >
          <SaveContactButton variant="solid" />
          <a
            href="#newsletter"
            className="inline-flex items-center justify-center rounded-full glass px-6 py-3 text-sm font-medium tracking-wide text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)]"
          >
            Subscribe
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <span className="label-mono">scroll</span>
      </div>
    </section>
  );
}
