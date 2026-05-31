"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@content/profile";
import { FlowGradient } from "@/components/ui/FlowGradient";
import { SaveContactButton } from "@/components/ui/SaveContactButton";

export function Hero() {
  const { scrollY } = useScroll();

  // Gentle parallax — portrait drifts up, content fades as you leave the hero.
  const portraitY = useTransform(scrollY, [0, 700], [0, -60]);
  const contentOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      className="relative grid min-h-[100svh] place-items-center overflow-hidden grain py-24"
    >
      <FlowGradient />

      <motion.div
        style={{ opacity: contentOpacity }}
        className="container-page relative z-10 flex flex-col items-center text-center"
      >
        {/* Portrait — held inside a liquid-glass amorphism frame.
            The frame's specular edge highlight + soft shadow give the photo
            a deliberate, premium border that matches the site's glass language. */}
        <motion.div
          style={{ y: portraitY }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-square w-[min(94vw,44rem)] overflow-hidden rounded-[2.25rem] glass-strong"
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
          className="display-sig mt-8 text-[var(--color-ink)]"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="body-lg mt-4 max-w-[46ch] text-[var(--color-ink-muted)]"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
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
      </motion.div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <span className="label-mono">scroll</span>
      </motion.div>
    </section>
  );
}
