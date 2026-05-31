import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Standard section shell — consistent vertical rhythm + optional eyebrow.
export function Section({
  id,
  eyebrow,
  index,
  children,
  className,
  contained = true,
}: {
  id?: string;
  eyebrow?: string;
  index?: string;
  children: ReactNode;
  className?: string;
  contained?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-16 py-24 md:py-32", className)}
    >
      <div className={cn(contained && "container-page")}>
        {eyebrow && (
          <div className="mb-10 flex items-baseline justify-between gap-4 border-b border-[var(--color-line)] pb-4">
            <span className="label-eyebrow">{eyebrow}</span>
            {index && <span className="label-mono">{index}</span>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
