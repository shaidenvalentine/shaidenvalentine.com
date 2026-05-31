"use client";

import { useRef, useState } from "react";

// Ambient portrait that plays a silent loop, with a poster fallback.
// If the video file is missing/unsupported, the poster (or gradient) shows.
export function PortraitMedia({ video, poster }: { video: string; poster: string }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  return (
    <div className="absolute inset-0 overflow-hidden">
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
      {/* No overlay — edges are softened by the hero's mask alone so the
          portrait blends straight into the site background. */}
    </div>
  );
}
