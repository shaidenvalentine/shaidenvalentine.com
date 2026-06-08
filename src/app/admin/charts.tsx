// Pure-SVG charts in the site's volcanic-brass palette. No chart lib, no
// client JS — server-rendered, responsive via viewBox.

import type { DailyBucket } from "@/lib/store";

const BRASS = "#C9A874";
const INK = "#F4F1EA";
const MUTED = "rgba(244,241,234,0.45)";
const LINE = "rgba(244,241,234,0.08)";

// ──────────────────────────────────────────────────────────────────────────
// Area + line chart for daily activity over N days. Multiple series stack.
// ──────────────────────────────────────────────────────────────────────────

export function DailyChart({
  data,
  series,
  height = 220,
}: {
  data: DailyBucket[];
  series: { key: keyof Omit<DailyBucket, "day">; label: string; color: string }[];
  height?: number;
}) {
  const W = 800;
  const H = height;
  const PAD = { t: 18, r: 18, b: 28, l: 28 };
  const innerW = W - PAD.l - PAD.r;
  const innerH = H - PAD.t - PAD.b;

  const xs = data.map((_, i) => PAD.l + (data.length === 1 ? innerW / 2 : (i * innerW) / (data.length - 1)));
  const maxY = Math.max(
    1,
    ...data.flatMap((d) => series.map((s) => Number(d[s.key])))
  );
  const niceMax = Math.max(4, Math.ceil(maxY * 1.15));
  const yOf = (v: number) => PAD.t + innerH - (v / niceMax) * innerH;

  // Y gridlines at 0, max/2, max
  const yTicks = [0, niceMax / 2, niceMax];

  // X axis labels — first, middle, last
  const xLabels =
    data.length >= 2
      ? [0, Math.floor((data.length - 1) / 2), data.length - 1].map((i) => ({
          x: xs[i],
          text: fmtShort(data[i].day),
        }))
      : data.length === 1
        ? [{ x: xs[0], text: fmtShort(data[0].day) }]
        : [];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      className="block h-full w-full"
      role="img"
      aria-label="Daily activity"
    >
      <defs>
        {series.map((s) => (
          <linearGradient key={s.key} id={`grad-${String(s.key)}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={s.color} stopOpacity="0.34" />
            <stop offset="100%" stopColor={s.color} stopOpacity="0" />
          </linearGradient>
        ))}
      </defs>

      {/* gridlines */}
      {yTicks.map((v, i) => (
        <g key={i}>
          <line x1={PAD.l} x2={W - PAD.r} y1={yOf(v)} y2={yOf(v)} stroke={LINE} strokeWidth={1} />
          <text x={PAD.l - 6} y={yOf(v) + 3} textAnchor="end" fontSize={9} fill={MUTED} fontFamily="ui-monospace, monospace">
            {Math.round(v)}
          </text>
        </g>
      ))}

      {/* series */}
      {series.map((s) => {
        const pts = data.map((d, i) => `${xs[i]},${yOf(Number(d[s.key]))}`);
        const linePath = `M ${pts.join(" L ")}`;
        const areaPath = `M ${PAD.l},${yOf(0)} L ${pts.join(" L ")} L ${xs[xs.length - 1]},${yOf(0)} Z`;
        return (
          <g key={s.key}>
            <path d={areaPath} fill={`url(#grad-${String(s.key)})`} />
            <path d={linePath} fill="none" stroke={s.color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" />
            {data.map((d, i) => {
              const v = Number(d[s.key]);
              return v > 0 ? (
                <circle key={i} cx={xs[i]} cy={yOf(v)} r={2} fill={s.color}>
                  <title>
                    {fmtShort(d.day)} · {s.label}: {v}
                  </title>
                </circle>
              ) : null;
            })}
          </g>
        );
      })}

      {/* x labels */}
      {xLabels.map((l, i) => (
        <text
          key={i}
          x={l.x}
          y={H - 8}
          textAnchor={i === 0 ? "start" : i === xLabels.length - 1 ? "end" : "middle"}
          fontSize={9}
          fill={MUTED}
          fontFamily="ui-monospace, monospace"
        >
          {l.text}
        </text>
      ))}
    </svg>
  );
}

function fmtShort(iso: string) {
  try {
    return new Date(iso + "T00:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

// ──────────────────────────────────────────────────────────────────────────
// Sparkline — tiny inline chart in stat cards.
// ──────────────────────────────────────────────────────────────────────────

export function Sparkline({
  values,
  color = BRASS,
  height = 36,
}: {
  values: number[];
  color?: string;
  height?: number;
}) {
  if (values.length === 0) return null;
  const W = 120;
  const H = height;
  const maxY = Math.max(1, ...values);
  const x = (i: number) => (values.length === 1 ? W / 2 : (i * W) / (values.length - 1));
  const y = (v: number) => H - 2 - (v / maxY) * (H - 4);
  const pts = values.map((v, i) => `${x(i)},${y(v)}`);
  const line = `M ${pts.join(" L ")}`;
  const area = `M ${0},${H} L ${pts.join(" L ")} L ${W},${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="block h-9 w-full">
      <defs>
        <linearGradient id={`spark-${color.replace("#", "")}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#spark-${color.replace("#", "")})`} />
      <path d={line} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Horizontal bar list (intent / role breakdowns).
// ──────────────────────────────────────────────────────────────────────────

export function BarList({ rows, accent = BRASS }: { rows: { label: string; n: number }[]; accent?: string }) {
  const max = Math.max(1, ...rows.map((r) => r.n));
  if (rows.length === 0) {
    return <p className="body-sm">Nothing here yet.</p>;
  }
  return (
    <ul className="flex flex-col gap-3.5">
      {rows.map((r) => {
        const pct = (r.n / max) * 100;
        return (
          <li key={r.label}>
            <div className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate text-[var(--color-ink)]">{r.label}</span>
              <span className="font-mono text-[var(--color-ink-muted)]">{r.n}</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--color-line)]">
              <div className="h-full rounded-full" style={{ width: `${pct}%`, background: accent }} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

// ──────────────────────────────────────────────────────────────────────────
// Donut for status breakdown.
// ──────────────────────────────────────────────────────────────────────────

const STATUS_COLOR: Record<string, string> = {
  new: BRASS,
  replied: "rgba(244,241,234,0.55)",
  archived: "rgba(244,241,234,0.18)",
};

export function StatusDonut({ rows, total }: { rows: { status: string; n: number }[]; total: number }) {
  const size = 120;
  const r = 48;
  const c = size / 2;
  const stroke = 14;
  const circ = 2 * Math.PI * r;
  let acc = 0;
  const segments = rows
    .filter((row) => row.n > 0)
    .map((row) => {
      const frac = row.n / Math.max(1, total);
      const offset = acc * circ;
      acc += frac;
      return { ...row, frac, offset, len: frac * circ };
    });

  return (
    <div className="flex items-center gap-5">
      <svg viewBox={`0 0 ${size} ${size}`} className="h-28 w-28 -rotate-90">
        <circle cx={c} cy={c} r={r} fill="none" stroke={LINE} strokeWidth={stroke} />
        {segments.map((s) => (
          <circle
            key={s.status}
            cx={c}
            cy={c}
            r={r}
            fill="none"
            stroke={STATUS_COLOR[s.status] ?? MUTED}
            strokeWidth={stroke}
            strokeDasharray={`${s.len} ${circ - s.len}`}
            strokeDashoffset={-s.offset}
            strokeLinecap="butt"
          />
        ))}
        <text
          x={c}
          y={c}
          textAnchor="middle"
          dominantBaseline="central"
          transform={`rotate(90 ${c} ${c})`}
          fontSize={20}
          fontWeight={500}
          fill={INK}
        >
          {total}
        </text>
      </svg>
      <ul className="flex flex-col gap-2 text-xs">
        {(["new", "replied", "archived"] as const).map((k) => {
          const n = rows.find((r) => r.status === k)?.n ?? 0;
          return (
            <li key={k} className="flex items-center gap-2">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: STATUS_COLOR[k] }} />
              <span className="uppercase tracking-wider text-[var(--color-ink-muted)]">{k}</span>
              <span className="ml-auto font-mono text-[var(--color-ink)]">{n}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
