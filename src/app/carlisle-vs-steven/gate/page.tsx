import type { Metadata, Viewport } from "next";
import { GateForm } from "./GateForm";

export const metadata: Metadata = {
  title: "Carlisle vs Steven 🦀 — crew only",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#04263b",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function GatePage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#04263b] px-6 text-white">
      <div className="w-full max-w-sm text-center">
        <div className="text-5xl">🦀🔒🦀</div>
        <h1 className="mt-3 text-2xl font-bold">Carlisle vs Steven</h1>
        <p className="mt-2 text-sm text-white/60">
          Crew only. Boys from the <span className="text-white/90">Anne Bonnie</span> — Sasha&apos;s 40th 🎂 — know
          the password.
        </p>
        <GateForm />
      </div>
    </div>
  );
}
