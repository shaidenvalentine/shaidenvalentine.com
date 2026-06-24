"use client";

import { useState, useTransition } from "react";
import { assignRoomAction } from "./actions";

export function RoomAssign({ id, initial }: { id: number; initial: string | null }) {
  const [room, setRoom] = useState(initial ?? "");
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <input
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
          setSaved(false);
        }}
        placeholder="Unassigned"
        className="w-full max-w-[16rem] rounded-lg border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-3 py-1.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brass)]"
      />
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            await assignRoomAction(id, room);
            setSaved(true);
          })
        }
        className="rounded-full bg-[var(--glass-fill-strong)] px-3 py-1.5 text-xs text-[var(--color-ink)] disabled:opacity-50"
      >
        {pending ? "…" : saved ? "✓" : "Save"}
      </button>
    </div>
  );
}
