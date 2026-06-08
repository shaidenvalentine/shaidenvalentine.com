"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { track } from "@vercel/analytics";
import { Label, Input, SubmitButton, Honeypot } from "@/components/ui/fields";

function startDownload(url: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = "";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export function LeadModal({
  open,
  onClose,
  intent,
  eyebrow,
  headline,
  blurb,
  submitLabel = "Join the waitlist",
  successTitle = "You're on the list.",
  successBody = "I'll reach out personally when it's ready. Talk soon.",
  downloadUrl,
}: {
  open: boolean;
  onClose: () => void;
  intent: string;
  eyebrow?: string;
  headline: string;
  blurb?: string;
  submitLabel?: string;
  successTitle?: string;
  successBody?: string;
  /** If set, this is a gated download — submit captures the lead, then the file downloads. */
  downloadUrl?: string;
}) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", instagram: "", company: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [error, setError] = useState("");

  const set = (k: keyof typeof form) => (v: string) => setForm((f) => ({ ...f, [k]: v }));

  // Reset to a clean form each time it opens; lock body scroll while open.
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setError("");
      setForm({ name: "", email: "", whatsapp: "", instagram: "", company: "" });
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, intent }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Something went wrong.");
        setStatus("error");
        return;
      }
      track(downloadUrl ? "ebook_download" : "waitlist_join", { intent });
      setStatus("done");
      if (downloadUrl) setTimeout(() => startDownload(downloadUrl), 300);
    } catch {
      setError("Network error — try again.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass-strong relative z-10 w-full max-w-md rounded-3xl p-7 md:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute right-5 top-5 text-[var(--color-ink-muted)] transition hover:text-[var(--color-ink)]"
            >
              ✕
            </button>

            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="py-6 text-center"
                >
                  <h3 className="display-3 text-[var(--color-ink)]">
                    {downloadUrl ? "Enjoy the read." : successTitle}
                  </h3>
                  <p className="body-base mx-auto mt-3 max-w-[32ch] text-[var(--color-ink-muted)]">
                    {downloadUrl
                      ? "Your download is starting. If it doesn't, tap below."
                      : successBody}
                  </p>
                  {downloadUrl && (
                    <a
                      href={downloadUrl}
                      download
                      className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110"
                    >
                      Download again
                    </a>
                  )}
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex flex-col gap-4"
                >
                  {eyebrow && <span className="label-eyebrow">{eyebrow}</span>}
                  <h3 className="display-3 text-[var(--color-ink)]">{headline}</h3>
                  {blurb && <p className="body-sm -mt-1">{blurb}</p>}

                  <Honeypot value={form.company} onChange={set("company")} />

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
                  <div>
                    <Label>WhatsApp</Label>
                    <Input
                      required
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => set("whatsapp")(e.target.value)}
                      placeholder="+1 760 402 1716"
                    />
                  </div>
                  <div>
                    <Label>Instagram (optional)</Label>
                    <Input
                      value={form.instagram}
                      onChange={(e) => set("instagram")(e.target.value)}
                      placeholder="@yourhandle"
                    />
                  </div>

                  {status === "error" && (
                    <p className="body-sm text-[var(--color-brass)]">{error}</p>
                  )}

                  <SubmitButton loading={status === "loading"} className="mt-1 w-full">
                    {downloadUrl ? "Get the download" : submitLabel}
                  </SubmitButton>
                  <p className="body-sm text-center text-[var(--color-ink-whisper)]">
                    No spam. I&apos;ll only reach out about this.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
