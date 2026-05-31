"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { collab } from "@content/collab";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Label, Input, Textarea, Select, SubmitButton, Honeypot } from "@/components/ui/fields";

const c = collab.work;

export function WorkWithMe() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: c.roles[0],
    link: "",
    message: "",
    company: "", // honeypot
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        setStatus("error");
        return;
      }
      track("apply_submit", { role: form.role });
      setStatus("done");
    } catch {
      setError("Network error — try again.");
      setStatus("error");
    }
  }

  return (
    <Section id="work" eyebrow={c.eyebrow} index="09 — Collaborate">
      <div className="grid gap-12 md:grid-cols-[1fr_1.1fr] md:items-start">
        <Reveal>
          <h2 className="display-2 max-w-[16ch]">{c.headline}</h2>
          <p className="body-lg mt-5 max-w-[46ch] text-[var(--color-ink-muted)]">{c.sub}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-3xl glass p-6 md:p-8">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-8 text-center"
                >
                  <h3 className="display-3 text-[var(--color-ink)]">{c.successTitle}</h3>
                  <p className="body-base mx-auto mt-3 max-w-[34ch] text-[var(--color-ink-muted)]">
                    {c.successBody}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex flex-col gap-5"
                >
                  <Honeypot value={form.company} onChange={set("company")} />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label>Name</Label>
                      <Input
                        required
                        value={form.name}
                        onChange={(e) => set("name")(e.target.value)}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => set("email")(e.target.value)}
                        placeholder="you@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label>Reaching out as</Label>
                      <Select value={form.role} onChange={(e) => set("role")(e.target.value)}>
                        {c.roles.map((r) => (
                          <option key={r} value={r}>
                            {r}
                          </option>
                        ))}
                      </Select>
                    </div>
                    <div>
                      <Label>Link (optional)</Label>
                      <Input
                        value={form.link}
                        onChange={(e) => set("link")(e.target.value)}
                        placeholder="Portfolio, LinkedIn, site…"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Why us — and what you bring</Label>
                    <Textarea
                      required
                      value={form.message}
                      onChange={(e) => set("message")(e.target.value)}
                      placeholder="Make the case. What's the angle, and what do you bring to it?"
                    />
                  </div>

                  {status === "error" && (
                    <p className="body-sm text-[var(--color-brass)]">{error}</p>
                  )}

                  <div className="flex items-center gap-4">
                    <SubmitButton loading={status === "loading"}>Send application</SubmitButton>
                    <span className="body-sm">Serious applications only.</span>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
