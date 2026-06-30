"use client";

import { useRef, useState } from "react";

// One-tap "save the whole carousel."
//
// iPhone/iPad: the Web Share sheet accepts multiple image files and offers
// "Save N Images" → every slide lands in Photos at once, in order.
// Desktop / unsupported: falls back to downloading each PNG.
//
// The slides are the pre-rendered exports at /carousels/<slug>/NN.png.
export function SaveToPhotos({
  slug,
  count,
  title,
}: {
  slug: string;
  count: number;
  title: string;
}) {
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<string | null>(null);
  const cache = useRef<File[] | null>(null);

  const urls = Array.from(
    { length: count },
    (_, i) => `/carousels/${slug}/${String(i + 1).padStart(2, "0")}.png`
  );
  const fileName = (i: number) => `${slug}-${String(i + 1).padStart(2, "0")}.png`;

  // Fetch every slide into a File[]. Cached so we can warm it on intent
  // (pointer down) and keep the click handler's await window tiny — iOS only
  // allows share() while the user gesture is still "active."
  async function getFiles(): Promise<File[]> {
    if (cache.current) return cache.current;
    const files = await Promise.all(
      urls.map(async (u, i) => {
        const res = await fetch(u);
        const blob = await res.blob();
        return new File([blob], fileName(i), { type: "image/png" });
      })
    );
    cache.current = files;
    return files;
  }

  async function save() {
    setBusy(true);
    setNote(null);
    try {
      const files = await getFiles();
      const nav = navigator as Navigator & { canShare?: (d: unknown) => boolean };

      if (nav.canShare && nav.canShare({ files })) {
        await (nav as Navigator & { share: (d: unknown) => Promise<void> }).share({ files });
        setNote("In the share sheet, tap “Save Images” to add them all to Photos.");
      } else {
        // Desktop fallback — stagger so the browser doesn't block the batch.
        files.forEach((f, idx) => {
          setTimeout(() => {
            const url = URL.createObjectURL(f);
            const a = document.createElement("a");
            a.href = url;
            a.download = f.name;
            document.body.appendChild(a);
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
          }, idx * 200);
        });
        setNote(`Downloading all ${count} slides…`);
      }
    } catch (err) {
      if ((err as { name?: string })?.name !== "AbortError") {
        setNote("Couldn’t open the share sheet — try “Open export view” and long-press each slide.");
      }
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={save}
        onPointerDown={() => void getFiles().catch(() => {})}
        disabled={busy}
        className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--color-brass)] px-6 py-3 text-sm font-medium text-[var(--color-bg)] transition hover:brightness-110 disabled:opacity-60"
      >
        {busy ? "Preparing…" : "Save all to Photos"}
        <span aria-hidden>↓</span>
      </button>
      <span className="body-sm">
        {note ?? `All ${count} slides · on iPhone choose “Save ${count} Images.”`}
      </span>
    </div>
  );
}
