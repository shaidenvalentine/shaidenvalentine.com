"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@content/profile";
import { SaveContactButton } from "@/components/ui/SaveContactButton";

export function Hero() {
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 700], [0, -60]);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center overflow-hidden bg-black"
    >
      {/* Portrait — flush to the top edge of the viewport, full bleed on mobile.
          Direct child of the section (no container-page wrapper) so width truly
          equals 100vw and there are no left/right or top offsets. */}
      <motion.div
        style={{ y: portraitY }}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="hero-portrait relative aspect-[4/5] w-full sm:mt-12 sm:w-[min(96vw,42rem)]"
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

      <div className="container-page relative z-10 flex flex-col items-center pb-24 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="display-sig mt-14 text-[var(--color-ink)]"
        >
          {profile.name}
        </motion.h1>

        {/* Identifier line — the four-word "who I am" */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="body-lg mt-14 font-medium tracking-tight text-[var(--color-ink)]"
        >
          {profile.tagline}
        </motion.p>

        {/* Continuation — the longer mission statement */}
        {profile.taglineSub && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="body-base mt-6 max-w-[52ch] text-[var(--color-ink-muted)]"
          >
            {profile.taglineSub}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-3 sm:flex-row"
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
