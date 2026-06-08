"use client";

import { useState } from "react";
import { Label, Input, SubmitButton } from "@/components/ui/fields";

export function LoginForm({ next }: { next: string }) {
  const [pw, setPw] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, next }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || "Wrong password.");
        setStatus("error");
        return;
      }
      window.location.href = data.next || next || "/admin";
    } catch {
      setError("Network error — try again.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-4">
      <div>
        <Label>Password</Label>
        <Input
          autoFocus
          required
          type="password"
          autoComplete="current-password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          placeholder="••••••••"
        />
      </div>
      {status === "error" && <p className="body-sm text-[var(--color-brass)]">{error}</p>}
      <SubmitButton loading={status === "loading"} className="w-full">
        Sign in
      </SubmitButton>
    </form>
  );
}
