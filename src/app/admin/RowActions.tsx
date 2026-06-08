"use client";

import { useState, useTransition } from "react";
import { deleteAction, setStatusAction } from "./actions";

type Table = "leads" | "applications" | "feedback";
type Status = "new" | "replied" | "archived";

export function StatusPill({
  status,
  table,
  id,
}: {
  status: string;
  table: Table;
  id: number;
}) {
  const [pending, start] = useTransition();
  const next: Record<Status, Status> = { new: "replied", replied: "archived", archived: "new" };
  const safe = (status as Status) in next ? (status as Status) : "new";
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => setStatusAction(table, id, next[safe]))}
      title="Click to cycle: new → replied → archived → new"
      className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition disabled:opacity-50 ${
        safe === "new"
          ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
          : safe === "replied"
            ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]"
            : "bg-transparent text-[var(--color-ink-whisper)] ring-1 ring-inset ring-[var(--color-line-strong)]"
      }`}
    >
      {safe}
    </button>
  );
}

export function DeleteButton({ table, id, label = "Delete" }: { table: Table; id: number; label?: string }) {
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-xs">
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => deleteAction(table, id))}
          className="rounded-full bg-[var(--color-brass)] px-2.5 py-1 font-medium text-[var(--color-bg)] disabled:opacity-50"
        >
          {pending ? "…" : "Confirm"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
        >
          Cancel
        </button>
      </span>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)]"
    >
      {label}
    </button>
  );
}
