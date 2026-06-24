"use client";

import { useState, useTransition } from "react";
import type { RsvpRow } from "@/lib/events";
import {
  setStatusAction,
  recordPaymentAction,
  assignRoomAction,
  saveAdminNoteAction,
  markFlagAction,
  deleteRsvpAction,
} from "./actions";

// Client-safe copies (importing the value lists from @/lib/events would pull
// the Postgres client into the client bundle).
const STATUS_OPTIONS = [
  "invited",
  "rsvp_received",
  "deposit_paid",
  "paid_in_full",
  "confirmed",
  "waitlisted",
  "declined",
  "cancelled",
] as const;

function statusTone(s: string) {
  if (s === "confirmed" || s === "paid_in_full") return "bg-[var(--color-brass)] text-[var(--color-bg)]";
  if (s === "declined" || s === "cancelled")
    return "bg-transparent text-[var(--color-ink-whisper)] ring-1 ring-inset ring-[var(--color-line-strong)]";
  if (s === "waitlisted") return "bg-[var(--color-ember)] text-[var(--color-ink)]";
  return "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]";
}

const money = (n: number | null) => (n == null ? "—" : `$${n.toLocaleString("en-US")}`);

function fmt(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

export function GuestRow({ row, depositAmount }: { row: RsvpRow; depositAmount: number }) {
  const [open, setOpen] = useState(false);
  const [pending, start] = useTransition();
  const [room, setRoom] = useState(row.room_assignment ?? "");
  const [note, setNote] = useState(row.admin_note ?? "");
  const [customAmt, setCustomAmt] = useState("");
  const [confirmDel, setConfirmDel] = useState(false);

  const balance = (row.amount_due ?? 0) - (row.amount_paid ?? 0);
  const contact = row.email || row.whatsapp || "—";

  return (
    <tbody className="align-top">
      <tr className="border-t border-[var(--color-line)] hover:bg-[var(--glass-fill)]">
        <td className="p-3">
          <span className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider ${statusTone(row.status)}`}>
            {row.status.replace(/_/g, " ")}
          </span>
        </td>
        <td className="p-3 text-[var(--color-ink)]">{row.name}</td>
        <td className="p-3 text-[var(--color-brass)]">{row.tier === "inner" ? "Inner" : "Outer"}</td>
        <td className="p-3">
          {row.email ? (
            <a href={`mailto:${row.email}`} className="link-underline">{contact}</a>
          ) : (
            <span>{contact}</span>
          )}
        </td>
        <td className="whitespace-nowrap p-3 text-[var(--color-ink-muted)]">
          {money(row.amount_paid)} / {money(row.amount_due)}
        </td>
        <td className="p-3 text-[var(--color-ink-muted)]">{row.room_assignment || (row.bed_pref ?? "—")}</td>
        <td className="whitespace-nowrap p-3 text-[var(--color-ink-muted)]">{fmt(row.arrival)}</td>
        <td className="whitespace-nowrap p-3 text-[var(--color-ink-muted)]">{fmt(row.created_at)}</td>
        <td className="p-3 text-right">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)]"
          >
            {open ? "Close ▲" : "Manage ▾"}
          </button>
        </td>
      </tr>

      {open && (
        <tr className="border-t border-[var(--color-line)] bg-[var(--glass-fill)]">
          <td colSpan={9} className="p-5">
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Status + payments */}
              <div className="flex flex-col gap-4">
                <div>
                  <span className="label-mono mb-2 block">Status</span>
                  <select
                    value={row.status}
                    disabled={pending}
                    onChange={(e) => start(() => setStatusAction(row.id, e.target.value as RsvpRow["status"]))}
                    className="w-full appearance-none rounded-xl border border-[var(--color-line-strong)] bg-[var(--color-bg-elevated)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brass)]"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="label-mono mb-2 block">Record a payment</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => start(() => recordPaymentAction(row.id, "deposit", depositAmount))}
                      className="rounded-full bg-[var(--color-brass)] px-3 py-1.5 text-xs font-medium text-[var(--color-bg)] disabled:opacity-50"
                    >
                      + Deposit ${depositAmount}
                    </button>
                    <button
                      type="button"
                      disabled={pending || balance <= 0}
                      onClick={() => start(() => recordPaymentAction(row.id, "balance", balance))}
                      className="rounded-full bg-[var(--glass-fill-strong)] px-3 py-1.5 text-xs font-medium text-[var(--color-ink)] disabled:opacity-40"
                    >
                      + Balance {balance > 0 ? `$${balance}` : "(settled)"}
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      value={customAmt}
                      onChange={(e) => setCustomAmt(e.target.value)}
                      placeholder="Custom $"
                      className="w-24 rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-3 py-1.5 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brass)]"
                    />
                    <button
                      type="button"
                      disabled={pending || !customAmt}
                      onClick={() =>
                        start(async () => {
                          await recordPaymentAction(row.id, "balance", Number(customAmt));
                          setCustomAmt("");
                        })
                      }
                      className="rounded-full border border-[var(--color-line-strong)] px-3 py-1.5 text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)] disabled:opacity-40"
                    >
                      Log custom
                    </button>
                  </div>
                  <p className="body-sm mt-2">
                    Paid {money(row.amount_paid)} of {money(row.amount_due)}
                    {row.deposit_paid_at ? ` · deposit ${fmt(row.deposit_paid_at)}` : ""}
                    {row.balance_paid_at ? ` · balance ${fmt(row.balance_paid_at)}` : ""}
                  </p>
                </div>
              </div>

              {/* Accommodation + flags */}
              <div className="flex flex-col gap-4">
                <div>
                  <span className="label-mono mb-2 block">Room assignment (bed pref: {row.bed_pref ?? "—"})</span>
                  <div className="flex gap-2">
                    <input
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      placeholder="e.g. Seed — Room 3, or Villa Anyar"
                      className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-3 py-2 text-sm text-[var(--color-ink)] outline-none focus:border-[var(--color-brass)]"
                    />
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => start(() => assignRoomAction(row.id, room))}
                      className="rounded-full bg-[var(--color-brass)] px-3 py-2 text-xs font-medium text-[var(--color-bg)] disabled:opacity-50"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div>
                  <span className="label-mono mb-2 block">Comms</span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => start(() => markFlagAction(row.id, "details_sent", !row.details_sent_at))}
                      className={`rounded-full px-3 py-1.5 text-xs transition disabled:opacity-50 ${
                        row.details_sent_at
                          ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                          : "border border-[var(--color-line-strong)] text-[var(--color-ink-muted)]"
                      }`}
                    >
                      {row.details_sent_at ? "✓ Payment details sent" : "Mark details sent"}
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => start(() => markFlagAction(row.id, "reminder_sent", !row.reminder_sent_at))}
                      className={`rounded-full px-3 py-1.5 text-xs transition disabled:opacity-50 ${
                        row.reminder_sent_at
                          ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                          : "border border-[var(--color-line-strong)] text-[var(--color-ink-muted)]"
                      }`}
                    >
                      {row.reminder_sent_at ? "✓ Reminder sent" : "Mark reminder sent"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Guest detail + admin note */}
              <div className="flex flex-col gap-4">
                <dl className="grid grid-cols-[7rem_1fr] gap-x-3 gap-y-1.5 text-xs">
                  <dt className="text-[var(--color-ink-whisper)]">WhatsApp</dt>
                  <dd className="text-[var(--color-ink-muted)]">{row.whatsapp || "—"}</dd>
                  {row.tier === "outer" && (
                    <>
                      <dt className="text-[var(--color-ink-whisper)]">+1s</dt>
                      <dd className="text-[var(--color-ink-muted)]">{row.plus_ones}</dd>
                      <dt className="text-[var(--color-ink-whisper)]">Costume</dt>
                      <dd className="text-[var(--color-ink-muted)]">{row.costume_note || "—"}</dd>
                    </>
                  )}
                  {row.tier === "inner" && (
                    <>
                      <dt className="text-[var(--color-ink-whisper)]">Adventures</dt>
                      <dd className="text-[var(--color-ink-muted)]">{row.adventures?.length ? row.adventures.join(", ") : "—"}</dd>
                      <dt className="text-[var(--color-ink-whisper)]">Dietary</dt>
                      <dd className="text-[var(--color-ink-muted)]">{row.dietary || "—"}</dd>
                    </>
                  )}
                  <dt className="text-[var(--color-ink-whisper)]">Guest note</dt>
                  <dd className="text-[var(--color-ink-muted)]">{row.guest_note || "—"}</dd>
                </dl>

                <div>
                  <span className="label-mono mb-2 block">Internal note</span>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="Private — admin only."
                    className="w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-3 py-2 text-xs text-[var(--color-ink)] outline-none focus:border-[var(--color-brass)]"
                  />
                  <div className="mt-2 flex items-center justify-between">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => start(() => saveAdminNoteAction(row.id, note))}
                      className="rounded-full bg-[var(--glass-fill-strong)] px-3 py-1.5 text-xs text-[var(--color-ink)] disabled:opacity-50"
                    >
                      Save note
                    </button>
                    {confirmDel ? (
                      <span className="flex items-center gap-2 text-xs">
                        <button
                          type="button"
                          disabled={pending}
                          onClick={() => start(() => deleteRsvpAction(row.id))}
                          className="rounded-full bg-[var(--color-brass)] px-3 py-1.5 font-medium text-[var(--color-bg)]"
                        >
                          Confirm delete
                        </button>
                        <button type="button" onClick={() => setConfirmDel(false)} className="text-[var(--color-ink-muted)]">
                          Cancel
                        </button>
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDel(true)}
                        className="text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)]"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </tbody>
  );
}
