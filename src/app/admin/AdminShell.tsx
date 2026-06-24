"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

const NAV: { href: string; label: string; glyph: string }[] = [
  { href: "/admin", label: "Overview", glyph: "◐" },
  { href: "/admin/leads", label: "Leads", glyph: "◇" },
  { href: "/admin/applications", label: "Applications", glyph: "✦" },
  { href: "/admin/feedback", label: "Feedback", glyph: "◌" },
  { href: "/admin/events", label: "Events", glyph: "✶" },
  { href: "/admin/settings", label: "Settings", glyph: "⚙" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [pending, start] = useTransition();

  // Login page renders without the dashboard shell.
  if (path === "/admin/login") return <>{children}</>;

  function logout() {
    start(async () => {
      await fetch("/api/admin/login", { method: "DELETE" });
      window.location.href = "/admin/login";
    });
  }

  return (
    <div className="relative min-h-[100svh] overflow-hidden bg-grad-volcanic">
      {/* ambient atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-70"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(201,168,116,0.10) 0%, transparent 65%)",
        }}
      />
      <div className="container-page grid gap-10 py-12 md:grid-cols-[16rem_1fr]">
        <aside className="md:sticky md:top-12 md:self-start">
          {/* signature mark */}
          <Link href="/admin" className="block">
            <span className="label-eyebrow">Private Console</span>
            <h2 className="signature mt-2 text-3xl text-[var(--color-ink)]">Shaiden</h2>
            <span className="label-mono mt-1 block text-[var(--color-brass)]">Admin</span>
          </Link>

          <nav className="mt-10 flex flex-wrap gap-1.5 md:flex-col">
            {NAV.map((n) => {
              const active = n.href === "/admin" ? path === "/admin" : path?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm transition ${
                    active
                      ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]"
                      : "text-[var(--color-ink-muted)] hover:bg-[var(--glass-fill)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`inline-grid h-7 w-7 place-items-center rounded-lg text-sm transition ${
                      active
                        ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                        : "bg-[var(--glass-fill)] text-[var(--color-brass)] group-hover:bg-[var(--glass-fill-strong)]"
                    }`}
                  >
                    {n.glyph}
                  </span>
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-xs">
            <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="link-underline text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
              Vercel Analytics ↗
            </a>
            <a href="/" className="link-underline text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]">
              Back to site →
            </a>
            <button
              type="button"
              onClick={logout}
              disabled={pending}
              className="mt-2 self-start text-left text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)] disabled:opacity-50"
            >
              {pending ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </aside>

        <section className="relative min-w-0">{children}</section>
      </div>
    </div>
  );
}
