"use client";

import { useRef, useState } from "react";

// Ambient portrait that plays a silent loop, with a poster fallback.
// If the video file is missing/unsupported, the poster (or gradient) shows.
export function PortraitMedia({ video, poster }: { video: string; poster: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Placeholder backdrop — visible until a real portrait is dropped in. */}
      <div className="absolute inset-0 bg-grad-ember grid place-items-center">
        <span className="signature text-5xl text-[var(--color-ink-whisper)]">SV</span>
      </div>
      {!failed ? (
        <video
          ref={ref}
          className="h-full w-full object-cover opacity-90"
          autoPlay
          loop
          muted
          playsInline
          poster={poster}
          onError={() => setFailed(true)}
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        // Poster image, or a tasteful gradient if the poster is absent too.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={poster}
          alt=""
          className="h-full w-full object-cover opacity-90"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      )}
      {/* Soft inner shading for depth — the hard edges are feathered away by
          the hero's mask so the portrait melts into the background. */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_58%,rgba(11,11,13,0.3)_100%)]" />
    </div>
  );
}
