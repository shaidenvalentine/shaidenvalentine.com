"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS: { href: string; label: string }[] = [
  { href: "/admin/events", label: "Overview" },
  { href: "/admin/events/guests", label: "Guests" },
  { href: "/admin/events/rooms", label: "Accommodation" },
  { href: "/admin/events/rollups", label: "Rollups" },
  { href: "/admin/events/config", label: "Config" },
];

export function EventNav() {
  const path = usePathname();
  return (
    <nav className="flex flex-wrap gap-2 border-b border-[var(--color-line)] pb-4">
      {TABS.map((t) => {
        const active = t.href === "/admin/events" ? path === "/admin/events" : path?.startsWith(t.href);
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`rounded-full px-4 py-1.5 text-xs uppercase tracking-wider transition ${
              active
                ? "bg-[var(--color-brass)] text-[var(--color-bg)]"
                : "text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
