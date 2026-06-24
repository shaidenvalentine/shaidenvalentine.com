"use client";

import { useState, useTransition } from "react";
import type { EventConfigInput } from "@/lib/events";
import { saveConfigAction } from "../actions";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="label-mono">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-4 py-2.5 text-sm text-[var(--color-ink)] outline-none transition focus:border-[var(--color-brass)] focus:bg-[var(--glass-fill-strong)]";

export function ConfigForm({ initial }: { initial: EventConfigInput }) {
  const [c, setC] = useState<EventConfigInput>(initial);
  const [pending, start] = useTransition();
  const [saved, setSaved] = useState(false);

  const set = <K extends keyof EventConfigInput>(k: K, v: EventConfigInput[K]) => {
    setC((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  };
  const num = (k: keyof EventConfigInput) => (e: React.ChangeEvent<HTMLInputElement>) =>
    set(k, (Number(e.target.value) || 0) as EventConfigInput[typeof k]);
  const str = (k: keyof EventConfigInput) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    set(k, e.target.value as EventConfigInput[typeof k]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    start(async () => {
      await saveConfigAction(c);
      setSaved(true);
    });
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8">
      <section className="rounded-3xl glass p-7">
        <h2 className="display-3 mb-5 text-[var(--color-ink)]">Identity</h2>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Name"><input className={inputCls} value={c.name} onChange={str("name")} /></Field>
          <Field label="Venue"><input className={inputCls} value={c.venue} onChange={str("venue")} /></Field>
          <Field label="Subtitle"><input className={inputCls} value={c.subtitle} onChange={str("subtitle")} /></Field>
          <Field label="Invite word"><input className={inputCls} value={c.invite_word} onChange={str("invite_word")} /></Field>
          <Field label="Starts on"><input type="date" className={inputCls} value={c.starts_on} onChange={str("starts_on")} /></Field>
          <Field label="Ends on"><input type="date" className={inputCls} value={c.ends_on} onChange={str("ends_on")} /></Field>
        </div>
      </section>

      <section className="rounded-3xl glass p-7">
        <h2 className="display-3 mb-5 text-[var(--color-ink)]">Tiers & capacity</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Inner price ($)"><input type="number" className={inputCls} value={c.inner_price} onChange={num("inner_price")} /></Field>
          <Field label="Inner cap"><input type="number" className={inputCls} value={c.inner_cap} onChange={num("inner_cap")} /></Field>
          <Field label="Outer price ($)"><input type="number" className={inputCls} value={c.outer_price} onChange={num("outer_price")} /></Field>
          <Field label="Outer cap"><input type="number" className={inputCls} value={c.outer_cap} onChange={num("outer_cap")} /></Field>
          <Field label="Estate beds"><input type="number" className={inputCls} value={c.estate_beds} onChange={num("estate_beds")} /></Field>
        </div>
      </section>

      <section className="rounded-3xl glass p-7">
        <h2 className="display-3 mb-5 text-[var(--color-ink)]">Payment & deadlines</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <Field label="Deposit ($)"><input type="number" className={inputCls} value={c.deposit_amount} onChange={num("deposit_amount")} /></Field>
          <Field label="Deposit by"><input type="date" className={inputCls} value={c.deposit_by} onChange={str("deposit_by")} /></Field>
          <Field label="Balance by"><input type="date" className={inputCls} value={c.balance_by} onChange={str("balance_by")} /></Field>
          <Field label="Rooming by"><input type="date" className={inputCls} value={c.rooming_by} onChange={str("rooming_by")} /></Field>
        </div>
        <div className="mt-5">
          <Field label="Payment details copy (shown on the public page)">
            <textarea className={`${inputCls} min-h-24 resize-y`} value={c.payment_details} onChange={str("payment_details")} />
          </Field>
        </div>
      </section>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110 disabled:opacity-60"
        >
          {pending ? "Saving…" : "Save config"}
        </button>
        {saved && <span className="body-sm text-[var(--color-brass)]">Saved — the public page updates on next load.</span>}
      </div>
    </form>
  );
}
