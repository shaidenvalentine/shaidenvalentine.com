"use client";

import { useState } from "react";
import { profile } from "@content/profile";
import { chapters } from "@content/personal";
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

      {/* Chapters timeline — the life arc as a vertical sequence */}
      <Reveal>
        <div className="mt-24 md:mt-32">
          <span className="signature text-3xl text-[var(--color-brass)]">Chapters</span>
          <h3 className="display-3 mt-3 max-w-[20ch] text-[var(--color-ink)]">
            How I got here.
          </h3>
        </div>
      </Reveal>

      <ol className="relative mt-12 flex flex-col gap-10 border-l border-[var(--color-line-strong)] pl-6 md:gap-12 md:pl-10">
        {chapters.map((c, i) => (
          <Reveal as="li" key={i} delay={Math.min(i, 4) * 0.06}>
            <div className="relative">
              {/* node */}
              <span
                aria-hidden
                className="absolute -left-[1.85rem] top-2 grid h-3 w-3 place-items-center rounded-full bg-[var(--color-brass)] ring-4 ring-[var(--color-bg)] md:-left-[2.85rem]"
              />
              <span className="label-mono">{c.era}</span>
              <h4 className="display-3 mt-2 max-w-[28ch] text-[var(--color-ink)]">{c.title}</h4>
              <p className="body-base mt-3 max-w-[56ch] text-[var(--color-ink-muted)]">{c.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>

      <IntroPlayer
        open={playing}
        onClose={() => setPlaying(false)}
        video={profile.introVideo}
        poster={profile.introPoster}
      />
    </Section>
  );
}
