"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export function Search({ placeholder }: { placeholder: string }) {
  const router = useRouter();
  const path = usePathname();
  const params = useSearchParams();
  const [v, setV] = useState(params?.get("q") ?? "");

  useEffect(() => {
    const t = setTimeout(() => {
      const q = v.trim();
      const sp = new URLSearchParams(params?.toString() ?? "");
      if (q) sp.set("q", q);
      else sp.delete("q");
      router.replace(`${path}${sp.toString() ? `?${sp}` : ""}`);
    }, 200);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [v]);

  return (
    <input
      type="search"
      value={v}
      onChange={(e) => setV(e.target.value)}
      placeholder={placeholder}
      className="w-full max-w-sm rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-4 py-2.5 text-sm text-[var(--color-ink)] placeholder:text-[var(--color-ink-whisper)] outline-none transition focus:border-[var(--color-brass)] focus:bg-[var(--glass-fill-strong)]"
    />
  );
}
