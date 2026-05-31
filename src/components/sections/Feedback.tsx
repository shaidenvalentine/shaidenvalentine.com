"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { collab } from "@content/collab";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Label, Textarea, Select, SubmitButton, Honeypot } from "@/components/ui/fields";

const c = collab.feedback;

export function Feedback() {
  const [topic, setTopic] = useState(c.topics[0]);
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, message, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        setStatus("error");
        return;
      }
      track("feedback_submit");
      setStatus("done");
    } catch {
      setError("Network error — try again.");
      setStatus("error");
    }
  }

  return (
    <Section id="feedback" eyebrow={c.eyebrow} index="12 — Anonymous">
      <Reveal>
        <div className="mx-auto max-w-2xl rounded-3xl glass-strong p-8 md:p-12">
          <div className="text-center">
            <h2 className="display-2">{c.headline}</h2>
            <p className="body-lg mx-auto mt-4 max-w-[50ch] text-[var(--color-ink-muted)]">{c.sub}</p>
          </div>

          <AnimatePresence mode="wait">
            {status === "done" ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-10 text-center"
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
                className="relative mt-8 flex flex-col gap-5"
              >
                <Honeypot value={company} onChange={setCompany} />

                <div>
                  <Label>This is about (optional)</Label>
                  <Select value={topic} onChange={(e) => setTopic(e.target.value)}>
                    {c.topics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </Select>
                </div>

                <div>
                  <Label>Your honest take</Label>
                  <Textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Say the thing. No filter needed — I won't know who you are."
                    className="min-h-40"
                  />
                </div>

                {status === "error" && <p className="body-sm text-[var(--color-brass)]">{error}</p>}

                <div className="flex items-center gap-4">
                  <SubmitButton loading={status === "loading"}>Send anonymously</SubmitButton>
                  <span className="body-sm">No name · no email · nothing tracked.</span>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </Section>
  );
}
