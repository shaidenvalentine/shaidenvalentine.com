"use client";

import { useState } from "react";
import { profile } from "@content/profile";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IntroPlayer } from "@/components/ui/IntroPlayer";

export function Story() {
  const [playing, setPlaying] = useState(false);

  return (
    <Section id="story" eyebrow="Story" index="01 — Who">
      <Reveal>
        <blockquote className="mb-16 md:mb-24">
          <span className="signature text-3xl text-[var(--color-brass)]">My mission</span>
          <p className="display-3 mt-4 max-w-[34ch] !leading-[1.35] text-[var(--color-ink)]">
            {profile.mission}
          </p>
        </blockquote>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-[1.1fr_1fr] md:items-center">
        <Reveal>
          <h2 className="display-2 max-w-[14ch]">The arc.</h2>
          <div className="mt-6 flex flex-col gap-5">
            {profile.bio.map((para, i) => (
              <p key={i} className="body-lg text-[var(--color-ink-muted)]">
                {para}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <button
            onClick={() => setPlaying(true)}
            className="group relative aspect-[4/5] w-full overflow-hidden rounded-3xl glass"
            aria-label="Play intro film"
          >
            {/* poster */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={profile.introPoster}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = "none")}
            />
            <div className="absolute inset-0 bg-grad-ember opacity-50" />
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid h-16 w-16 place-items-center rounded-full glass-strong">
                <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-[var(--color-ink)]" />
              </span>
            </div>
            <span className="label-mono absolute bottom-5 left-5">Play intro · 0:45</span>
          </button>
        </Reveal>
      </div>

      <IntroPlayer
        open={playing}
        onClose={() => setPlaying(false)}
        video={profile.introVideo}
        poster={profile.introPoster}
      />
    </Section>
  );
}
