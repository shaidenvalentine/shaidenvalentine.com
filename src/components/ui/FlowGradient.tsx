// Pure-CSS flowing gradient — large, soft color fields drifting slowly behind
// the hero. No WebGL; degrades to a still gradient under reduced-motion.
// Warm volcanic palette so it reads as molten, not neon.

const BLOBS = [
  { color: "#D8B27E", size: "60vmax", top: "-12%", left: "-8%", anim: "flow-a 22s ease-in-out infinite", opacity: 0.6 },
  { color: "#9B4A24", size: "55vmax", top: "18%", left: "55%", anim: "flow-b 28s ease-in-out infinite", opacity: 0.65 },
  { color: "#5A3A22", size: "65vmax", top: "45%", left: "8%", anim: "flow-c 26s ease-in-out infinite", opacity: 0.7 },
  { color: "#A77F45", size: "48vmax", top: "0%", left: "32%", anim: "flow-b 34s ease-in-out infinite", opacity: 0.5 },
];

export function FlowGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-[var(--color-bg)]">
      {BLOBS.map((b, i) => (
        <div
          key={i}
          className="flow-blob"
          style={{
            background: `radial-gradient(circle at center, ${b.color}, transparent 65%)`,
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            animation: b.anim,
            opacity: b.opacity,
          }}
        />
      ))}
      {/* Settle the field toward volcanic black at the edges + base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,var(--color-bg)_92%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-bg)] to-transparent" />
    </div>
  );
}
