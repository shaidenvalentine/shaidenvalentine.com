"use client";

import { useEffect, useState } from "react";
import QR from "qrcode";

// Render a QR for the given value as a data-URL <img>. No runtime service.
export function QRCode({ value, size = 160 }: { value: string; size?: number }) {
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    QR.toDataURL(value, {
      margin: 1,
      width: size * 2,
      color: { dark: "#0B0B0D", light: "#F4F1EA" },
      errorCorrectionLevel: "M",
    })
      .then(setSrc)
      .catch(() => setSrc(""));
  }, [value, size]);

  if (!src) return <div style={{ width: size, height: size }} className="rounded-xl bg-[var(--glass-fill-strong)]" />;

  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={src}
      alt="QR code"
      width={size}
      height={size}
      className="rounded-xl"
      style={{ width: size, height: size }}
    />
  );
}
