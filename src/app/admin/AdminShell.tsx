"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTransition } from "react";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/feedback", label: "Feedback" },
  { href: "/admin/settings", label: "Settings" },
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
    <div className="min-h-[100svh]">
      <div className="container-page grid gap-10 py-12 md:grid-cols-[14rem_1fr]">
        <aside className="md:sticky md:top-12 md:self-start">
          <div className="mb-8">
            <Link href="/admin" className="label-eyebrow">Shaiden · Admin</Link>
          </div>
          <nav className="flex flex-wrap gap-2 md:flex-col">
            {NAV.map((n) => {
              const active = n.href === "/admin" ? path === "/admin" : path?.startsWith(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={`rounded-xl px-4 py-2.5 text-sm transition ${
                    active
                      ? "bg-[var(--glass-fill-strong)] text-[var(--color-ink)]"
                      : "text-[var(--color-ink-muted)] hover:bg-[var(--glass-fill)] hover:text-[var(--color-ink)]"
                  }`}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-10 flex flex-col gap-2 border-t border-[var(--color-line)] pt-6 text-xs text-[var(--color-ink-muted)]">
            <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer" className="link-underline">Vercel Analytics ↗</a>
            <a href="/" className="link-underline">Back to site →</a>
            <button
              type="button"
              onClick={logout}
              disabled={pending}
              className="self-start text-left text-xs text-[var(--color-ink-muted)] transition hover:text-[var(--color-brass)] disabled:opacity-50"
            >
              {pending ? "Signing out…" : "Sign out ↗"}
            </button>
          </div>
        </aside>
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
