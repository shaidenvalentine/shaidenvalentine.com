"use client";

import { useState } from "react";

// The ready-to-post Instagram caption + hashtags, one click to copy.
export function CaptionCopy({ caption, hashtags }: { caption: string; hashtags?: string[] }) {
  const [copied, setCopied] = useState(false);
  const tags = hashtags?.length ? "\n\n" + hashtags.map((h) => `#${h}`).join(" ") : "";
  const full = caption + tags;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the text is selectable below */
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg-elevated)] p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="label-eyebrow">Suggested caption</span>
        <button
          onClick={copy}
          className="rounded-full bg-[var(--color-brass)] px-4 py-1.5 text-xs font-medium text-[var(--color-bg)] transition hover:brightness-110"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
      </div>
      <p className="body-sm whitespace-pre-wrap text-[var(--color-ink)]">{caption}</p>
      {tags && <p className="body-sm mt-3 text-[var(--color-brass)]">{tags.trim()}</p>}
    </div>
  );
}
