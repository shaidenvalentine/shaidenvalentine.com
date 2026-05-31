"use client";

import { useEffect, useState } from "react";

// Detect WebGL support so the hero can fall back to a static frame.
export function useWebGL(): boolean {
  const [ok, setOk] = useState(false);
  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setOk(!!gl && !reduce);
    } catch {
      setOk(false);
    }
  }, []);
  return ok;
}
