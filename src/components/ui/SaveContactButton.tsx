"use client";

import { profile } from "@content/profile";
import { buildVCard, downloadVCard } from "@/lib/vcard";
import { cn } from "@/lib/cn";

export function SaveContactButton({
  variant = "solid",
  className,
  children = "Save my contact",
}: {
  variant?: "solid" | "glass";
  className?: string;
  children?: React.ReactNode;
}) {
  const handle = () => {
    const vcf = buildVCard(profile.vcard, profile.socials);
    downloadVCard(vcf);
  };

  return (
    <button
      onClick={handle}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition duration-300",
        variant === "solid"
          ? "bg-[var(--color-brass)] text-[var(--color-bg)] hover:brightness-110"
          : "glass text-[var(--color-ink)] hover:bg-[var(--glass-fill-strong)]",
        className
      )}
    >
      {children}
    </button>
  );
}
