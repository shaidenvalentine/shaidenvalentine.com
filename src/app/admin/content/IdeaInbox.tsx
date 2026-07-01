"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setIdeaStatusAction, deleteIdeaAction } from "./actions";
import type { IdeaStatus } from "@/lib/store";
import { fmtDate } from "../util";

// The capture box: drop a raw idea, it's saved to the inbox below. Posts to a
// stable API endpoint (not a Server Action) so it can't 404 across deploys.
export function IdeaForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const title = String(fd.get("title") ?? "").trim();
    const idea = String(fd.get("idea") ?? "").trim();
    if (!title || !idea) return;

    setPending(true);
    setNote(null);
    try {
      const res = await fetch("/api/admin/idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, idea }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; message?: string };
      if (res.ok && data.ok) {
        formRef.current?.reset();
        setNote({ ok: true, text: "Saved to the inbox ✓" });
        router.refresh();
        setTimeout(() => setNote(null), 2600);
      } else {
        setNote({ ok: false, text: data.message || "Couldn't save — is the database connected?" });
      }
    } catch {
      setNote({ ok: false, text: "Couldn't save right now. Try again." });
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="flex flex-col gap-3 rounded-3xl glass p-6"
    >
      <input
        name="title"
        required
        placeholder="Title"
        className="w-full rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brass)]"
      />
      <textarea
        name="idea"
        required
        rows={5}
        placeholder="What's the idea?"
        className="w-full resize-y rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brass)]"
      />
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-brass)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Drop the idea"}
          <span aria-hidden>↵</span>
        </button>
        {note && (
          <span className={`body-sm ${note.ok ? "text-[var(--color-brass)]" : "text-[var(--color-ink-muted)]"}`}>
            {note.text}
          </span>
        )}
      </div>
    </form>
  );
}

const STATUS_LABEL: Record<string, string> = {
  new: "new",
  building: "building",
  published: "published",
  archived: "archived",
};

export function IdeaStatusPill({ id, status }: { id: number; status: string }) {
  const [pending, start] = useTransition();
  const next: Record<IdeaStatus, IdeaStatus> = {
    new: "building",
    building: "published",
    published: "archived",
    archived: "new",
  };
  const safe = (status as IdeaStatus) in next ? (status as IdeaStatus) : "new";
  return (
    <button
      type="button"
      disabled={pending}
      onClick={() => start(() => setIdeaStatusAction(id, next[safe]))}
      title="Click to cycle: new → building → published → archived"
      className={`rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wider transition disabled:opacity-50 ${
        safe === "new"
          ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
          : safe === "building"
            ? "bg-[var(--glass-fill-strong)] text-[var(--color-brass)] ring-1 ring-inset ring-[var(--color-brass-dim)]"
            : safe === "published"
              ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]"
              : "bg-transparent text-[var(--color-ink-whisper)] ring-1 ring-inset ring-[var(--color-line-strong)]"
      }`}
    >
      {STATUS_LABEL[safe]}
    </button>
  );
}

export function IdeaDelete({ id }: { id: number }) {
  const [pending, start] = useTransition();
  const [confirming, setConfirming] = useState(false);
  if (confirming) {
    return (
      <span className="inline-flex items-center gap-2 text-xs">
        <button
          type="button"
          disabled={pending}
          onClick={() => start(() => deleteIdeaAction(id))}
          className="rounded-full bg-[var(--color-brass)] px-2.5 py-1 font-medium text-[var(--color-bg)] disabled:opacity-50"
        >
          {pending ? "…" : "Confirm"}
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

export { fmtDate };
