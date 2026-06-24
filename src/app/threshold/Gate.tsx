"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { PublicEvent } from "./page";
import type { Capacity } from "@/lib/events";
import type { ThresholdCopy } from "@content/threshold";
import { ThresholdExperience } from "./ThresholdExperience";

// Light-touch invite gate. The unlock lives in component state ONLY — no
// localStorage / sessionStorage — so a refresh re-locks. This is a curtain,
// not real auth; the real protection is that the guest list is never exposed.
export function Gate({
  event,
  initialCapacity,
  copy,
}: {
  event: PublicEvent;
  initialCapacity: Capacity;
  copy: ThresholdCopy;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [word, setWord] = useState("");
  const [error, setError] = useState(false);
  const reduce = useReducedMotion();

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (word.trim().toLowerCase() === event.inviteWord.trim().toLowerCase()) {
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (unlocked) {
    return <ThresholdExperience event={event} initialCapacity={initialCapacity} copy={copy} />;
  }

  return (
    <main className="bg-grad-volcanic grain relative grid min-h-[100svh] place-items-center overflow-hidden px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(201,168,116,0.12) 0%, transparent 65%)",
        }}
      />
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md text-center"
      >
        <span className="label-eyebrow">By invitation</span>
        <h1 className="display-1 mt-5 text-[var(--color-ink)]">{event.name}</h1>
        <p className="body-base mt-5 text-[var(--color-ink-muted)]">
          This page is held for invited guests. Speak the word from your invitation to cross.
        </p>

        <form onSubmit={submit} className="mt-9 flex flex-col gap-3">
          <label htmlFor="invite-word" className="sr-only">
            Invite word
          </label>
          <input
            id="invite-word"
            type="text"
            autoFocus
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            value={word}
            onChange={(e) => {
              setWord(e.target.value);
              if (error) setError(false);
            }}
            placeholder="The word"
            aria-invalid={error}
            className="w-full rounded-full border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-6 py-4 text-center text-lg tracking-wide text-[var(--color-ink)] placeholder:text-[var(--color-ink-whisper)] outline-none transition focus:border-[var(--color-brass)] focus:bg-[var(--glass-fill-strong)]"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-7 py-3.5 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
          >
            Cross the threshold
          </button>
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="body-sm text-[var(--color-brass)]"
              >
                Not quite. Check your invitation and try again.
              </motion.p>
            )}
          </AnimatePresence>
        </form>

        <p className="label-mono mt-10 text-[var(--color-ink-whisper)]">
          {event.venue}
        </p>
      </motion.div>
    </main>
  );
}
