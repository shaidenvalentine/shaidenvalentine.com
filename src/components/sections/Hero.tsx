"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@content/profile";
import { FlowGradient } from "@/components/ui/FlowGradient";
import { PortraitMedia } from "@/components/ui/PortraitMedia";
import { IntroPlayer } from "@/components/ui/IntroPlayer";
import { SaveContactButton } from "@/components/ui/SaveContactButton";

export function Hero() {
  const [playing, setPlaying] = useState(false);
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
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="label-mono mb-8"
        >
          {profile.location}
        </motion.span>

        {/* Portrait — the identity, front and center */}
        <motion.div style={{ y: portraitY }} className="relative">
          <motion.button
            onClick={() => setPlaying(true)}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative block aspect-[4/5] w-[min(72vw,20rem)] overflow-hidden rounded-[2rem] glass-strong"
            aria-label="Play intro"
          >
            <PortraitMedia video={profile.heroVideo} poster={profile.heroPoster} />
            {/* play affordance */}
            <span className="absolute inset-0 grid place-items-center opacity-90 transition group-hover:opacity-100">
              <span className="grid h-14 w-14 place-items-center rounded-full glass-strong backdrop-blur-md">
                <span className="ml-1 border-y-[9px] border-l-[14px] border-y-transparent border-l-[var(--color-ink)]" />
              </span>
            </span>
          </motion.button>
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

      <IntroPlayer
        open={playing}
        onClose={() => setPlaying(false)}
        video={profile.introVideo}
        poster={profile.introPoster}
      />
    </section>
  );
}
