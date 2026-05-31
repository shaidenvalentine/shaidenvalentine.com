"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@content/profile";
import { useWebGL } from "@/lib/useWebGL";
import { PortraitMedia } from "@/components/ui/PortraitMedia";
import { IntroPlayer } from "@/components/ui/IntroPlayer";
import { SaveContactButton } from "@/components/ui/SaveContactButton";

// R3F canvas is client-only + lazy so it never blocks first paint.
const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export function Hero() {
  const webgl = useWebGL();
  const [playing, setPlaying] = useState(false);
  const { scrollY } = useScroll();

  // Glass + portrait refract / drift as you scroll away from the hero.
  const y = useTransform(scrollY, [0, 600], [0, 80]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.08]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section
      id="top"
      className="relative grid min-h-[100svh] place-items-center overflow-hidden bg-grad-volcanic grain"
    >
      {/* Ambient WebGL ember field, or a static volcanic frame */}
      <motion.div style={{ scale }} className="absolute inset-0">
        {webgl ? <HeroCanvas /> : <div className="absolute inset-0 bg-grad-ember" />}
      </motion.div>

      {/* Portrait behind glass */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-x-0 top-0 mx-auto h-full w-full max-w-3xl"
      >
        <div className="relative mx-auto h-full w-full max-w-md">
          <PortraitMedia video={profile.heroVideo} poster={profile.heroPoster} />
        </div>
      </motion.div>

      {/* Foreground content */}
      <motion.div
        style={{ opacity }}
        className="container-page relative z-10 flex flex-col items-center text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="label-mono mb-6"
        >
          {profile.location}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="display-1 max-w-[14ch]"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="body-lg mt-6 max-w-[46ch] text-[var(--color-ink-muted)]"
        >
          {profile.tagline}
        </motion.p>

        {/* Tap-to-play intro */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          onClick={() => setPlaying(true)}
          className="mt-8 inline-flex items-center gap-3 text-sm text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
        >
          <span className="grid h-10 w-10 place-items-center rounded-full glass">
            <span className="ml-0.5 border-y-[6px] border-l-[10px] border-y-transparent border-l-[var(--color-ink)]" />
          </span>
          Watch the intro
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col items-center gap-3 sm:flex-row"
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

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
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
