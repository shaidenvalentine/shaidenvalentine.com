"use client";

import { useState, useTransition } from "react";
import { setCarouselStatusAction, deleteCarouselAction } from "./actions";
import type { CarouselStatus } from "@/lib/store";

const CYCLE: Record<CarouselStatus, CarouselStatus> = {
  review: "posted",
  posted: "archived",
  archived: "review",
  deleted: "review",
};

export function CarouselStatusPill({ slug, status }: { slug: string; status: CarouselStatus }) {
  const [pending, start] = useTransition();
  const safe = status in CYCLE ? status : "review";
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => setCarouselStatusAction(slug, CYCLE[safe]))}
      title="Click to cycle: review → posted → archived"
      className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider transition disabled:opacity-50 ${
        safe === "posted"
          ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
          : safe === "review"
            ? "bg-[var(--glass-fill-strong)] text-[var(--color-brass)] ring-1 ring-inset ring-[var(--color-brass-dim)]"
            : "bg-[var(--glass-fill-strong)] text-[var(--color-ink-muted)] ring-1 ring-inset ring-[var(--color-line-strong)]"
      }`}
    >
      {safe}
    </button>
  );
}

export function CarouselDelete({ slug }: { slug: string }) {
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-xs">
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => deleteCarouselAction(slug))}
          className="rounded-full bg-[var(--color-brass)] px-3 py-1 font-medium text-[var(--color-bg)] disabled:opacity-50"
        >
          {pending ? "…" : "Delete it"}
        </button>
        <button type="button" onClick={() => setConfirming(false)} className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
          Cancel
        </button>
      </span>
    );
  }
  return (
    <button type="button" onClick={() => setConfirming(true)} className="text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)]">
      Delete
    </button>
  );
}

export function CarouselRestore({ slug }: { slug: string }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => setCarouselStatusAction(slug, "review"))}
      className="text-xs text-[var(--color-brass)] transition hover:brightness-110 disabled:opacity-50"
    >
      {pending ? "…" : "Restore"}
    </button>
  );
}
