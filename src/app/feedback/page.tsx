import type { Metadata } from "next";
import Link from "next/link";
import { Feedback } from "@/components/sections/Feedback";
import { collab } from "@content/collab";
import { profile } from "@content/profile";

const c = collab.feedback;

// Standalone, shareable feedback page — the same anonymous form that lives on
// the homepage, but on its own URL (shaidenvalentine.com/feedback) so it can be
// dropped straight into a story or DM. noindex: it's meant to be shared by link,
// not found in search.
export const metadata: Metadata = {
  title: "Anonymous Feedback",
  description:
    "Tell me what you really think — fully anonymous. No name, no email, nothing tracked.",
  robots: { index: false, follow: true },
};

export default function FeedbackPage() {
  return (
    <main className="flex min-h-[100svh] flex-col bg-black">
      <header className="container-page flex items-center justify-between py-6">
        <Link
          href="/"
          className="text-sm font-medium tracking-tight text-[var(--color-ink)] transition hover:opacity-80"
        >
          {profile.name}
        </Link>
        <Link href="/" className="label-mono link-underline">
          ← back to site
        </Link>
      </header>

      <div className="flex flex-1 flex-col items-center justify-center px-5 py-16">
        <div className="w-full max-w-2xl text-center">
          <span className="label-eyebrow">{c.eyebrow}</span>
          <h1 className="display-2 mt-4">{c.headline}</h1>
          <p className="body-lg mx-auto mt-8 max-w-[50ch] text-[var(--color-ink-muted)]">
            {c.sub}
          </p>
        </div>

        <div className="mt-10 w-full">
          <Feedback bare />
        </div>
      </div>
    </main>
  );
}
