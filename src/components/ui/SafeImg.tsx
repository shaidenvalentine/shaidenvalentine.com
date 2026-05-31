"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

// Plain <img> that quietly hides itself if the source is missing.
// Lets us ship asset placeholders that degrade to the gradient behind them.
export function SafeImg({
  src,
  alt = "",
  className,
}: {
  src?: string;
  alt?: string;
  className?: string;
}) {
  const [hidden, setHidden] = useState(false);
  if (!src || hidden) return null;
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt={alt}
      className={cn(className)}
      onError={() => setHidden(true)}
    />
  );
}
