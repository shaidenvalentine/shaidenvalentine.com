"use client";

import { useState, useTransition } from "react";
import { saveNotesAction, markAllReadAction } from "./actions";

export function Notes({
  table,
  id,
  initial,
}: {
  table: "leads" | "applications";
  id: number;
  initial: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [v, setV] = useState(initial ?? "");
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  function save() {
    start(async () => {
      await saveNotesAction(table, id, v.trim());
      setSaved(true);
      setTimeout(() => setSaved(false), 1200);
    });
  }

  if (!open && !initial) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)]"
      >
        + Add note
      </button>
    );
  }

  if (!open && initial) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block max-w-[40ch] truncate text-left text-xs italic text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
        title="Click to edit"
      >
        {initial}
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        autoFocus
        value={v}
        onChange={(e) => setV(e.target.value)}
        rows={3}
        placeholder="Private note — only visible in admin."
        className="w-full max-w-[40rem] rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-3 py-2 text-xs text-[var(--color-ink)] placeholder:text-[var(--color-ink-whisper)] outline-none transition focus:border-[var(--color-brass)]"
      />
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={save}
          disabled={pending}
          className="rounded-full bg-[var(--color-brass)] px-3 py-1 text-xs font-medium text-[var(--color-bg)] disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            setV(initial ?? "");
          }}
          className="text-xs text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          Cancel
        </button>
        {saved && <span className="text-xs text-[var(--color-brass)]">Saved</span>}
      </div>
    </div>
  );
}

export function MarkAllReadButton({ table }: { table: "leads" | "applications" }) {
  const [pending, start] = useTransition();
  return (
    <button
      type="button"
      onClick={() => start(() => markAllReadAction(table))}
      disabled={pending}
      className="rounded-full glass px-5 py-2.5 text-sm text-[var(--color-ink)] transition hover:bg-[var(--glass-fill-strong)] disabled:opacity-50"
    >
      {pending ? "Marking…" : "Mark all new as replied"}
    </button>
  );
}
