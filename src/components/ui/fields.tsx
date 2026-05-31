"use client";

import { cn } from "@/lib/cn";

const base =
  "w-full rounded-xl border border-[var(--color-line-strong)] bg-[var(--glass-fill)] px-4 py-3 text-[var(--color-ink)] placeholder:text-[var(--color-ink-whisper)] outline-none transition focus:border-[var(--color-brass)] focus:bg-[var(--glass-fill-strong)]";

export function Label({ children }: { children: React.ReactNode }) {
  return <span className="label-mono mb-2 block">{children}</span>;
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={cn(base, props.className)} />;
}

export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={cn(base, "min-h-32 resize-y", props.className)} />;
}

export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(base, "appearance-none bg-[var(--color-bg-elevated)]", props.className)}
    />
  );
}

// Hidden honeypot — bots fill it, humans never see it.
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-[-9999px] h-0 w-0 overflow-hidden">
      <label>
        Company
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
    </div>
  );
}

export function SubmitButton({
  loading,
  children,
  className,
}: {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-brass)] px-7 py-3 text-sm font-medium tracking-wide text-[var(--color-bg)] transition hover:brightness-110 disabled:opacity-60",
        className
      )}
    >
      {loading ? "Sending…" : children}
    </button>
  );
}
