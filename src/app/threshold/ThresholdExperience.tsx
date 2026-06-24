"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PublicEvent } from "./page";
import type { Capacity } from "@/lib/events";
import type { ThresholdCopy } from "@content/threshold";
import { Reveal } from "@/components/ui/Reveal";
import { Label, Input, Textarea, Select, SubmitButton, Honeypot } from "@/components/ui/fields";

type Tier = "inner" | "outer";

export function ThresholdExperience({
  event,
  initialCapacity,
  copy,
}: {
  event: PublicEvent;
  initialCapacity: Capacity;
  copy: ThresholdCopy;
}) {
  const [cap, setCap] = useState<Capacity>(initialCapacity);

  async function refreshCapacity() {
    try {
      const res = await fetch("/api/threshold/capacity", { cache: "no-store" });
      if (res.ok) setCap(await res.json());
    } catch {
      /* non-fatal — counts just stay as they were */
    }
  }

  return (
    <main className="bg-grad-volcanic grain relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[40rem] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -8%, rgba(201,168,116,0.10) 0%, transparent 60%)",
        }}
      />
      <div className="relative z-10">
        <Hero event={event} copy={copy} />
        <Invitation copy={copy} />
        <Container copy={copy} />
        <Arc copy={copy} />
        <Circles event={event} cap={cap} copy={copy} />
        <Accommodation copy={copy} />
        <Adventures copy={copy} />
        <GettingThere copy={copy} />
        <Rsvp event={event} cap={cap} copy={copy} onSubmitted={refreshCapacity} />
        <Payment event={event} copy={copy} />
        <Faq copy={copy} />
        <Footer event={event} />
      </div>
    </main>
  );
}

// ───── section shell ────────────────────────────────────────────────────────

function Shell({
  id,
  eyebrow,
  children,
}: {
  id?: string;
  eyebrow?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-16 py-20 md:py-28">
      <div className="container-page">
        {eyebrow && (
          <div className="mb-10 border-b border-[var(--color-line)] pb-4">
            <span className="label-eyebrow">{eyebrow}</span>
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

// ───── hero ──────────────────────────────────────────────────────────────────

function Hero({ event, copy }: { event: PublicEvent; copy: ThresholdCopy }) {
  return (
    <section className="relative grid min-h-[88svh] place-items-center px-6 py-24 text-center">
      <Reveal>
        <span className="label-eyebrow">{copy.hero.eyebrow}</span>
        <h1 className="display-1 mt-6 text-[var(--color-ink)]">{event.name}</h1>
        <p className="display-sig mt-7 text-[var(--color-brass)]">{copy.hero.sub}</p>
        <p className="body-lg mx-auto mt-7 max-w-[46ch] text-[var(--color-ink-muted)]">
          {copy.hero.blurb}
        </p>
        <p className="label-mono mt-8 text-[var(--color-ink-whisper)]">{copy.hero.kicker}</p>
        <div className="mt-10">
          <a
            href="#rsvp"
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-8 py-3.5 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
          >
            {copy.hero.cta}
          </a>
        </div>
      </Reveal>
    </section>
  );
}

// ───── invitation ────────────────────────────────────────────────────────────

function Invitation({ copy }: { copy: ThresholdCopy }) {
  const c = copy.invitation;
  return (
    <Shell id="invitation" eyebrow={c.eyebrow}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
        <Reveal>
          <h2 className="display-2 max-w-[12ch] text-[var(--color-ink)]">{c.headline}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-5">
            {c.body.map((p, i) => (
              <p key={i} className="body-lg text-[var(--color-ink-muted)]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

// ───── container / inclusions ────────────────────────────────────────────────

function Container({ copy }: { copy: ThresholdCopy }) {
  const c = copy.container;
  return (
    <Shell id="container" eyebrow={c.eyebrow}>
      <Reveal>
        <h2 className="display-2 max-w-[16ch] text-[var(--color-ink)]">{c.headline}</h2>
        <p className="body-lg mt-5 max-w-[52ch] text-[var(--color-ink-muted)]">{c.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {c.inclusions.map((it, i) => (
          <Reveal key={it.title} delay={0.05 * i}>
            <div className="h-full rounded-3xl glass p-6">
              <h3 className="display-3 text-[var(--color-ink)]">{it.title}</h3>
              <p className="body-base mt-3 text-[var(--color-ink-muted)]">{it.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Shell>
  );
}

// ───── the arc ────────────────────────────────────────────────────────────────

function Arc({ copy }: { copy: ThresholdCopy }) {
  const c = copy.arc;
  return (
    <Shell id="arc" eyebrow={c.eyebrow}>
      <Reveal>
        <h2 className="display-2 max-w-[16ch] text-[var(--color-ink)]">{c.headline}</h2>
        <p className="body-lg mt-5 max-w-[52ch] text-[var(--color-ink-muted)]">{c.sub}</p>
      </Reveal>
      <ol className="mt-12 flex flex-col gap-px overflow-hidden rounded-3xl glass">
        {c.days.map((d, i) => (
          <Reveal as="li" key={d.day} delay={0.05 * i}>
            <div className="grid gap-3 p-6 md:grid-cols-[14rem_1fr] md:gap-8 md:p-8">
              <div>
                <span className="label-mono text-[var(--color-brass)]">{d.day}</span>
                <h3 className="display-3 mt-1 text-[var(--color-ink)]">{d.title}</h3>
              </div>
              <p className="body-lg text-[var(--color-ink-muted)] md:pt-1">{d.body}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Shell>
  );
}

// ───── two circles (live counts) ─────────────────────────────────────────────

function CircleCard({
  name,
  what,
  note,
  price,
  remaining,
  total,
  full,
  unit,
}: {
  name: string;
  what: string;
  note: string;
  price: number;
  remaining: number;
  total: number;
  full: boolean;
  unit: string;
}) {
  return (
    <div className="flex h-full flex-col rounded-3xl glass-strong p-7 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="display-3 text-[var(--color-ink)]">{name}</h3>
        <span className="label-mono text-[var(--color-brass)]">${price}</span>
      </div>
      <p className="body-base mt-4 text-[var(--color-ink-muted)]">{what}</p>
      <p className="body-sm mt-2">{note}</p>
      <div className="mt-auto pt-8">
        {full ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-[var(--glass-fill-strong)] px-4 py-1.5 text-xs uppercase tracking-wider text-[var(--color-ink)] ring-1 ring-inset ring-[var(--color-line-strong)]">
            Full — waitlist open
          </span>
        ) : (
          <span className="label-mono text-[var(--color-ink)]">
            <strong className="text-[var(--color-brass)]">{remaining}</strong> of {total} {unit} left
          </span>
        )}
      </div>
    </div>
  );
}

function Circles({
  event,
  cap,
  copy,
}: {
  event: PublicEvent;
  cap: Capacity;
  copy: ThresholdCopy;
}) {
  const c = copy.circles;
  return (
    <Shell id="circles" eyebrow={c.eyebrow}>
      <Reveal>
        <h2 className="display-2 max-w-[14ch] text-[var(--color-ink)]">{c.headline}</h2>
        <p className="body-lg mt-5 max-w-[40ch] text-[var(--color-ink-muted)]">{c.sub}</p>
      </Reveal>
      <div className="mt-12 grid gap-5 md:grid-cols-2">
        <Reveal>
          <CircleCard
            name={c.inner.name}
            what={c.inner.what}
            note={c.inner.note}
            price={event.innerPrice}
            remaining={cap.inner.remaining}
            total={event.innerCap}
            full={cap.inner.full}
            unit={c.inner.capLabel}
          />
        </Reveal>
        <Reveal delay={0.1}>
          <CircleCard
            name={c.outer.name}
            what={c.outer.what}
            note={c.outer.note}
            price={event.outerPrice}
            remaining={cap.outer.remaining}
            total={event.outerCap}
            full={cap.outer.full}
            unit={c.outer.capLabel}
          />
        </Reveal>
      </div>
    </Shell>
  );
}

// ───── accommodation ──────────────────────────────────────────────────────────

function Accommodation({ copy }: { copy: ThresholdCopy }) {
  const c = copy.accommodation;
  return (
    <Shell id="accommodation" eyebrow={c.eyebrow}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
        <Reveal>
          <h2 className="display-2 max-w-[14ch] text-[var(--color-ink)]">{c.headline}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-5">
            {c.body.map((p, i) => (
              <p key={i} className="body-lg text-[var(--color-ink-muted)]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

// ───── adventures ──────────────────────────────────────────────────────────────

function Adventures({ copy }: { copy: ThresholdCopy }) {
  const c = copy.adventures;
  return (
    <Shell id="adventures" eyebrow={c.eyebrow}>
      <Reveal>
        <h2 className="display-2 max-w-[16ch] text-[var(--color-ink)]">{c.headline}</h2>
        <p className="body-lg mt-5 max-w-[52ch] text-[var(--color-ink-muted)]">{c.sub}</p>
      </Reveal>
      <ul className="mt-10 flex flex-wrap gap-3">
        {c.options.map((o, i) => (
          <Reveal as="li" key={o} delay={0.03 * i}>
            <span className="inline-flex rounded-full glass px-5 py-2.5 text-sm text-[var(--color-ink)]">
              {o}
            </span>
          </Reveal>
        ))}
      </ul>
    </Shell>
  );
}

// ───── getting there + ethos ─────────────────────────────────────────────────

function GettingThere({ copy }: { copy: ThresholdCopy }) {
  const c = copy.gettingThere;
  return (
    <Shell id="getting-there" eyebrow={c.eyebrow}>
      <div className="grid gap-12 md:grid-cols-[1fr_1.2fr] md:items-start">
        <Reveal>
          <h2 className="display-2 max-w-[12ch] text-[var(--color-ink)]">{c.headline}</h2>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex flex-col gap-5">
            {c.body.map((p, i) => (
              <p key={i} className="body-lg text-[var(--color-ink-muted)]">
                {p}
              </p>
            ))}
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

// ───── RSVP (two flows) ────────────────────────────────────────────────────────

type SubmitState = "idle" | "loading" | "done" | "error";

function Rsvp({
  event,
  cap,
  copy,
  onSubmitted,
}: {
  event: PublicEvent;
  cap: Capacity;
  copy: ThresholdCopy;
  onSubmitted: () => void;
}) {
  const c = copy.rsvp;
  const [tier, setTier] = useState<Tier>("inner");
  const full = tier === "inner" ? cap.inner.full : cap.outer.full;

  return (
    <Shell id="rsvp" eyebrow={c.eyebrow}>
      <div className="grid gap-10 md:grid-cols-[1fr_1.3fr] md:items-start">
        <Reveal>
          <h2 className="display-2 max-w-[14ch] text-[var(--color-ink)]">{c.headline}</h2>
          <p className="body-lg mt-5 max-w-[40ch] text-[var(--color-ink-muted)]">{c.sub}</p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Choose your circle">
            {(["inner", "outer"] as Tier[]).map((t) => {
              const active = tier === t;
              const label = t === "inner" ? c.inner.label : c.outer.label;
              return (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTier(t)}
                  className={`rounded-full px-5 py-2.5 text-sm transition ${
                    active
                      ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                      : "glass text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl glass p-6 md:p-8">
            {full && (
              <p className="body-sm mb-6 rounded-2xl bg-[var(--glass-fill-strong)] px-5 py-4 text-[var(--color-ink)]">
                {c.waitlistNote}
              </p>
            )}
            {tier === "inner" ? (
              <InnerForm event={event} copy={copy} waitlist={full} onSubmitted={onSubmitted} />
            ) : (
              <OuterForm copy={copy} waitlist={full} onSubmitted={onSubmitted} />
            )}
          </div>
        </Reveal>
      </div>
    </Shell>
  );
}

function Confirmation({ title, body }: { title: string; body: string }) {
  return (
    <motion.div
      key="done"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="py-8 text-center"
    >
      <h3 className="display-3 text-[var(--color-ink)]">{title}</h3>
      <p className="body-base mx-auto mt-4 max-w-[40ch] text-[var(--color-ink-muted)]">{body}</p>
    </motion.div>
  );
}

function useRsvpSubmit(onSubmitted: () => void) {
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const [resultStatus, setResultStatus] = useState<string>("");

  async function submit(payload: Record<string, unknown>) {
    setState("loading");
    setError("");
    try {
      const res = await fetch("/api/threshold/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        setState("error");
        return;
      }
      setResultStatus(String(data.status ?? ""));
      setState("done");
      onSubmitted();
    } catch {
      setError("Network error — try again.");
      setState("error");
    }
  }

  return { state, error, resultStatus, submit };
}

function InnerForm({
  event,
  copy,
  waitlist,
  onSubmitted,
}: {
  event: PublicEvent;
  copy: ThresholdCopy;
  waitlist: boolean;
  onSubmitted: () => void;
}) {
  const c = copy.rsvp;
  const { state, error, resultStatus, submit } = useRsvpSubmit(onSubmitted);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    bed_pref: c.inner.bedOptions[0].value,
    arrival: "",
    dietary: "",
    guest_note: "",
    company: "",
  });
  const [adventures, setAdventures] = useState<string[]>([]);
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function toggleAdventure(a: string) {
    setAdventures((prev) => (prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ tier: "inner", ...form, adventures });
  }

  if (state === "done") {
    const wl = resultStatus === "waitlisted";
    return (
      <Confirmation
        title={wl ? c.successWaitlistTitle : c.successInnerTitle}
        body={wl ? c.successWaitlistBody : c.successInnerBody}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5">
      <Honeypot value={form.company} onChange={set("company")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input required value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@email.com" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>WhatsApp</Label>
          <Input type="tel" value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} placeholder="+62…" />
        </div>
        <div>
          <Label>Bed preference</Label>
          <Select value={form.bed_pref} onChange={(e) => set("bed_pref")(e.target.value)}>
            {c.inner.bedOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label>Arrival date</Label>
        <Input type="date" value={form.arrival} onChange={(e) => set("arrival")(e.target.value)} />
      </div>
      <div>
        <Label>Adventures you're curious about (optional)</Label>
        <div className="flex flex-wrap gap-2">
          {copy.adventures.options.map((a) => {
            const on = adventures.includes(a);
            return (
              <button
                key={a}
                type="button"
                aria-pressed={on}
                onClick={() => toggleAdventure(a)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  on
                    ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                    : "border border-[var(--color-line-strong)] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <Label>Dietary needs (optional)</Label>
        <Input value={form.dietary} onChange={(e) => set("dietary")(e.target.value)} placeholder="Vegetarian, allergies, etc." />
      </div>
      <div>
        <Label>Anything else (optional)</Label>
        <Textarea value={form.guest_note} onChange={(e) => set("guest_note")(e.target.value)} placeholder="A note for me." />
      </div>
      {state === "error" && <p className="body-sm text-[var(--color-brass)]">{error}</p>}
      <div className="flex items-center gap-4">
        <SubmitButton loading={state === "loading"}>{waitlist ? "Join the waitlist" : "Request my place"}</SubmitButton>
        <span className="body-sm">{event.paymentDetails}</span>
      </div>
    </form>
  );
}

function OuterForm({
  copy,
  waitlist,
  onSubmitted,
}: {
  copy: ThresholdCopy;
  waitlist: boolean;
  onSubmitted: () => void;
}) {
  const c = copy.rsvp;
  const { state, error, resultStatus, submit } = useRsvpSubmit(onSubmitted);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    plus_ones: "0",
    costume_note: "",
    guest_note: "",
    company: "",
  });
  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit({ tier: "outer", ...form, plus_ones: Number(form.plus_ones) || 0 });
  }

  if (state === "done") {
    const wl = resultStatus === "waitlisted";
    return (
      <Confirmation
        title={wl ? c.successWaitlistTitle : c.successOuterTitle}
        body={wl ? c.successWaitlistBody : c.successOuterBody}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="relative flex flex-col gap-5">
      <Honeypot value={form.company} onChange={set("company")} />
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>Name</Label>
          <Input required value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Your name" />
        </div>
        <div>
          <Label>Email or WhatsApp</Label>
          <Input value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="you@email.com" />
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label>WhatsApp (if not above)</Label>
          <Input type="tel" value={form.whatsapp} onChange={(e) => set("whatsapp")(e.target.value)} placeholder="+62…" />
        </div>
        <div>
          <Label>Bringing anyone?</Label>
          <Select value={form.plus_ones} onChange={(e) => set("plus_ones")(e.target.value)}>
            {["0", "1", "2", "3", "4"].map((n) => (
              <option key={n} value={n}>
                {n === "0" ? "Just me" : `+${n}`}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div>
        <Label>Costume idea (optional)</Label>
        <Input value={form.costume_note} onChange={(e) => set("costume_note")(e.target.value)} placeholder="What are you coming as?" />
      </div>
      <div>
        <Label>Anything else (optional)</Label>
        <Textarea value={form.guest_note} onChange={(e) => set("guest_note")(e.target.value)} placeholder="A note for me." />
      </div>
      {state === "error" && <p className="body-sm text-[var(--color-brass)]">{error}</p>}
      <div className="flex items-center gap-4">
        <SubmitButton loading={state === "loading"}>{waitlist ? "Join the waitlist" : "Count me in"}</SubmitButton>
      </div>
    </form>
  );
}

// ───── payment & deadlines ────────────────────────────────────────────────────

function Payment({ event, copy }: { event: PublicEvent; copy: ThresholdCopy }) {
  const c = copy.payment;
  return (
    <Shell id="payment" eyebrow={c.eyebrow}>
      <Reveal>
        <h2 className="display-2 max-w-[16ch] text-[var(--color-ink)]">{c.headline}</h2>
        <p className="body-lg mt-5 max-w-[52ch] text-[var(--color-ink-muted)]">{c.sub}</p>
      </Reveal>
      <ol className="mt-12 flex flex-col gap-px overflow-hidden rounded-3xl glass">
        {c.stages.map((s, i) => (
          <Reveal as="li" key={s.when} delay={0.05 * i}>
            <div className="grid gap-2 p-6 md:grid-cols-[14rem_1fr] md:gap-8 md:p-7">
              <span className="label-mono text-[var(--color-brass)]">{s.when}</span>
              <p className="body-lg text-[var(--color-ink)]">{s.what}</p>
            </div>
          </Reveal>
        ))}
      </ol>
      <p className="body-sm mt-6">{event.paymentDetails || c.footnote}</p>
    </Shell>
  );
}

// ───── FAQ ─────────────────────────────────────────────────────────────────────

function Faq({ copy }: { copy: ThresholdCopy }) {
  const c = copy.faq;
  const [open, setOpen] = useState<number | null>(0);
  return (
    <Shell id="faq" eyebrow={c.eyebrow}>
      <Reveal>
        <h2 className="display-2 max-w-[16ch] text-[var(--color-ink)]">{c.headline}</h2>
      </Reveal>
      <div className="mt-10 flex flex-col gap-px overflow-hidden rounded-3xl glass">
        {c.items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={it.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 p-6 text-left transition hover:bg-[var(--glass-fill)] md:p-7"
              >
                <span className="display-3 text-[var(--color-ink)]">{it.q}</span>
                <span aria-hidden className="text-[var(--color-brass)]">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="body-lg px-6 pb-7 text-[var(--color-ink-muted)] md:px-7">{it.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

function Footer({ event }: { event: PublicEvent }) {
  return (
    <footer className="border-t border-[var(--color-line)] py-10">
      <div className="container-page flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <span className="label-mono">{event.name} · {event.venue}</span>
        <a href="#rsvp" className="label-mono link-underline">
          request your place ↑
        </a>
      </div>
    </footer>
  );
}
