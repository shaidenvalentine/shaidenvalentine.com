"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/applications", label: "Applications" },
  { href: "/admin/feedback", label: "Feedback" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();

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
          </div>
        </aside>
        <section className="min-w-0">{children}</section>
      </div>
    </div>
  );
}
