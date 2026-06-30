import type { IkigaiKey } from "@content/carousels/types";

// The ikigai Venn — four circles at the compass points, rendered in the site's
// brass-on-volcanic palette. Overlaps brighten via screen blending, so the
// center (where all four meet) glows on its own. Pure SVG → exports razor-sharp.

const BRASS = "#C9A874";
const BRASS_DIM = "#7A6647";
const INK = "#F4F1EA";
const INK_MUTED = "#9A958C";

// circle centers (compass points around a 1000×1000 field)
const C = {
  love: { cx: 500, cy: 360 }, // N
  good: { cx: 640, cy: 500 }, // E
  paid: { cx: 500, cy: 640 }, // S
  world: { cx: 360, cy: 500 }, // W
} as const;
const R = 210;

const OUTER: { key: IkigaiKey; x: number; y: number; lines: string[]; anchor: "middle" }[] = [
  { key: "love", x: 500, y: 96, lines: ["WHAT YOU", "LOVE"], anchor: "middle" },
  { key: "good", x: 905, y: 492, lines: ["WHAT YOU'RE", "GOOD AT"], anchor: "middle" },
  { key: "paid", x: 500, y: 928, lines: ["WHAT YOU CAN", "BE PAID FOR"], anchor: "middle" },
  { key: "world", x: 95, y: 492, lines: ["WHAT THE", "WORLD NEEDS"], anchor: "middle" },
];

// the four pairwise intersections (the "lens" between two adjacent circles)
const PAIRS: { label: string; x: number; y: number }[] = [
  { label: "PASSION", x: 600, y: 400 }, // love ∩ good
  { label: "PROFESSION", x: 600, y: 600 }, // good ∩ paid
  { label: "VOCATION", x: 400, y: 600 }, // paid ∩ world
  { label: "MISSION", x: 400, y: 400 }, // world ∩ love
];

export function Ikigai({ spotlight, size = 900 }: { spotlight?: IkigaiKey; size?: number }) {
  const dim = (k: IkigaiKey) => (spotlight && spotlight !== k ? 0.32 : 1);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="Ikigai diagram — the overlap of what you love, what you're good at, what the world needs, and what you can be paid for"
      style={{ fontFamily: "var(--font-display), 'Space Grotesk', sans-serif" }}
    >
      <defs>
        <radialGradient id="ikigai-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={BRASS} stopOpacity="0.45" />
          <stop offset="55%" stopColor={BRASS} stopOpacity="0.12" />
          <stop offset="100%" stopColor={BRASS} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* circles — screen blend so overlaps brighten toward the center */}
      <g style={{ mixBlendMode: "screen" }}>
        {(Object.keys(C) as IkigaiKey[]).map((k) => {
          const active = !spotlight || spotlight === k;
          return (
            <circle
              key={k}
              cx={C[k].cx}
              cy={C[k].cy}
              r={R}
              fill={BRASS}
              fillOpacity={active ? 0.1 : 0.04}
              stroke={active ? BRASS : BRASS_DIM}
              strokeOpacity={dim(k)}
              strokeWidth={active ? 2.5 : 1.5}
            />
          );
        })}
      </g>

      {/* center glow + the word that names the whole thing */}
      <circle cx={500} cy={500} r={150} fill="url(#ikigai-core)" />
      <text
        x={500}
        y={500}
        textAnchor="middle"
        dominantBaseline="central"
        fill={BRASS}
        style={{ fontSize: 38, fontWeight: 600, letterSpacing: "0.04em" }}
      >
        IKIGAI
      </text>

      {/* pairwise lens labels */}
      {PAIRS.map((p) => (
        <text
          key={p.label}
          x={p.x}
          y={p.y}
          textAnchor="middle"
          dominantBaseline="central"
          fill={INK}
          fillOpacity={0.65}
          style={{ fontSize: 19, fontWeight: 500, letterSpacing: "0.12em" }}
        >
          {p.label}
        </text>
      ))}

      {/* outer labels — the four questions */}
      {OUTER.map((o) => {
        const active = !spotlight || spotlight === o.key;
        return (
          <text
            key={o.key}
            x={o.x}
            y={o.y}
            textAnchor={o.anchor}
            fill={active ? INK : INK_MUTED}
            fillOpacity={dim(o.key)}
            style={{ fontSize: 23, fontWeight: 500, letterSpacing: "0.14em" }}
          >
            {o.lines.map((line, i) => (
              <tspan key={i} x={o.x} dy={i === 0 ? 0 : 28}>
                {line}
              </tspan>
            ))}
          </text>
        );
      })}
    </svg>
  );
}
