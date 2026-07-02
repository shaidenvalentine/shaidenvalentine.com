"use client";

import { useState } from "react";

export function GateForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/crew/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.ok) {
        window.location.href = "/carlisle-vs-steven";
        return;
      }
      setError(data.message || "Wrong password.");
    } catch {
      setError("Something broke. Try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-6 flex flex-col gap-3">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
        autoComplete="off"
        className="w-full rounded-2xl bg-white/10 px-4 py-3 text-center text-lg outline-none ring-2 ring-transparent focus:ring-teal-400"
      />
      <button
        type="submit"
        disabled={busy || !password}
        className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-teal-400 py-3 text-lg font-bold text-[#04263b] disabled:opacity-50"
      >
        {busy ? "Checking…" : "Let me in 🦀"}
      </button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  );
}
