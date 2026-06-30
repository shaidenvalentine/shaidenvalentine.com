import type { CSSProperties, ReactNode } from "react";
import type { Slide as SlideT } from "@content/carousels/types";
import { SLIDE_W, SLIDE_H } from "@content/carousels/types";
import { Ikigai } from "./Ikigai";

// ─────────────────────────────────────────────────────────────────────────
// "Volcanic Editorial" — the carousel design language.
//
// One slide, composed on the fixed 1080×1350 canvas. The system: a hairline
// inset frame (the printed-card motif), a running series mark + index up top,
// a signed mark + progress ticks down bottom, and a single content region
// between them. Everything is sized in px so the export is pixel-identical to
// what you see. One accent only: brass.
// ─────────────────────────────────────────────────────────────────────────

const BRASS = "var(--color-brass)";
const BRASS_DIM = "var(--color-brass-dim)";
const INK = "var(--color-ink)";
const MUTED = "var(--color-ink-muted)";
const LINE = "rgba(244, 241, 234, 0.10)";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const SIG = "var(--font-signature), cursive";
const MONO = "var(--font-mono), monospace";

// Margins. The frame sits 56px in; content breathes 68px inside the frame.
const FRAME = 56;
const EDGE = FRAME + 68; // 124
const HEAD_Y = 100;
const FOOT_Y = 100;
const BODY_TOP = 196;
const BODY_BOTTOM = 188;

function letter(spacing: string): CSSProperties {
  return { letterSpacing: spacing };
}

function Eyebrow({ text, big = false }: { text?: string; big?: boolean }) {
  if (!text) return null;
  return (
    <span
      style={{
        fontFamily: DISPLAY,
        fontSize: big ? 24 : 22,
        fontWeight: 400,
        letterSpacing: "0.24em",
        textTransform: "uppercase",
        color: BRASS,
      }}
    >
      {text}
    </span>
  );
}

/** A short brass rule — the recurring accent that ties statement slides. */
function Rule({ w = 64 }: { w?: number }) {
  return <div style={{ width: w, height: 2, background: BRASS, borderRadius: 2 }} />;
}

function Header({ series, counter }: { series: string; counter: string }) {
  return (
    <div
      style={{
        position: "absolute",
        top: HEAD_Y,
        left: EDGE,
        right: EDGE,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <span style={{ width: 7, height: 7, borderRadius: 7, background: BRASS, display: "inline-block" }} />
        <span
          style={{
            fontFamily: DISPLAY,
            fontSize: 20,
            fontWeight: 500,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: MUTED,
          }}
        >
          {series}
        </span>
      </div>
      <span style={{ fontFamily: MONO, fontSize: 21, letterSpacing: "0.1em", color: MUTED }}>{counter}</span>
    </div>
  );
}

function Footer({ index, total }: { index: number; total: number }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: FOOT_Y,
        left: EDGE,
        right: EDGE,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <span style={{ fontFamily: SIG, fontSize: 36, color: BRASS, lineHeight: 1 }}>@shaiden</span>
      <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            style={{
              width: i === index ? 26 : 16,
              height: 3,
              borderRadius: 3,
              background: i === index ? BRASS : "rgba(244,241,234,0.2)",
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/** Paint an exact substring brass; the rest stays as-is. */
function emphasize(text: string, phrase?: string): ReactNode {
  if (!phrase || !text.includes(phrase)) return text;
  const [before, after] = text.split(phrase);
  return (
    <>
      {before}
      <span style={{ color: BRASS }}>{phrase}</span>
      {after}
    </>
  );
}

const bodyBox: CSSProperties = {
  position: "absolute",
  left: EDGE,
  right: EDGE,
  top: BODY_TOP,
  bottom: BODY_BOTTOM,
  display: "flex",
  flexDirection: "column",
};

function SlideBody({ slide }: { slide: SlideT }) {
  switch (slide.kind) {
    case "cover":
      return (
        <div style={{ ...bodyBox, justifyContent: "flex-end" }}>
          {/* oversized ghost mark for editorial depth */}
          <span
            aria-hidden
            style={{
              position: "absolute",
              top: -40,
              right: -16,
              fontFamily: DISPLAY,
              fontSize: 360,
              fontWeight: 600,
              color: "rgba(201,168,116,0.05)",
              lineHeight: 0.8,
              letterSpacing: "-0.04em",
              userSelect: "none",
            }}
          >
            {slide.glyph ?? slide.title.charAt(0)}
          </span>
          <Eyebrow text={slide.eyebrow} big />
          <h1
            style={{
              fontFamily: DISPLAY,
              fontSize: 176,
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              color: INK,
              margin: "30px 0 0",
            }}
          >
            {slide.title}
          </h1>
          {slide.subtitle && (
            <>
              <div style={{ marginTop: 40 }}>
                <Rule w={80} />
              </div>
              <p
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 40,
                  fontWeight: 300,
                  lineHeight: 1.32,
                  color: MUTED,
                  marginTop: 32,
                  maxWidth: 740,
                }}
              >
                {slide.subtitle}
              </p>
            </>
          )}
        </div>
      );

    case "statement":
      return (
        <div style={{ ...bodyBox, justifyContent: "center" }}>
          {slide.lead && (
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: 33,
                fontWeight: 300,
                lineHeight: 1.45,
                color: MUTED,
                marginBottom: 44,
                maxWidth: 800,
              }}
            >
              {slide.lead}
            </p>
          )}
          <Rule />
          <p
            style={{
              fontFamily: DISPLAY,
              fontSize: 70,
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              color: INK,
              marginTop: 36,
            }}
          >
            {emphasize(slide.text, slide.emphasis)}
          </p>
          {slide.footnote && (
            <p style={{ fontFamily: DISPLAY, fontSize: 27, fontWeight: 300, color: MUTED, marginTop: 48, maxWidth: 760 }}>
              {slide.footnote}
            </p>
          )}
        </div>
      );

    case "principle":
      return (
        <div style={{ ...bodyBox, justifyContent: "center" }}>
          {/* oversized ghost index — the editorial rhythm of the series */}
          {slide.n && (
            <span
              aria-hidden
              style={{
                position: "absolute",
                top: -56,
                right: -10,
                fontFamily: DISPLAY,
                fontSize: 300,
                fontWeight: 600,
                color: "rgba(201,168,116,0.06)",
                lineHeight: 0.8,
                letterSpacing: "-0.04em",
                userSelect: "none",
              }}
            >
              {slide.n}
            </span>
          )}
          {slide.eyebrow && (
            <div style={{ marginBottom: 28 }}>
              <Eyebrow text={slide.eyebrow} />
            </div>
          )}
          <Rule />
          <p
            style={{
              fontFamily: DISPLAY,
              fontSize: 66,
              fontWeight: 500,
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: INK,
              marginTop: 34,
            }}
          >
            {emphasize(slide.text, slide.emphasis)}
          </p>
          {slide.elaboration && (
            <p style={{ fontFamily: DISPLAY, fontSize: 29, fontWeight: 300, lineHeight: 1.45, color: MUTED, marginTop: 40, maxWidth: 780 }}>
              {slide.elaboration}
            </p>
          )}
        </div>
      );

    case "list":
      return (
        <div style={bodyBox}>
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: 64,
              fontWeight: 500,
              letterSpacing: "-0.025em",
              color: INK,
              margin: 0,
            }}
          >
            {slide.title}
          </h2>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: 0 }}>
            {slide.items.map((it, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 32,
                  padding: "28px 0",
                  borderTop: i === 0 ? "none" : `1px solid ${LINE}`,
                }}
              >
                <span
                  style={{
                    fontFamily: slide.numbered ? MONO : DISPLAY,
                    fontSize: slide.numbered ? 32 : 44,
                    fontWeight: slide.numbered ? 400 : 500,
                    color: BRASS,
                    lineHeight: 1.05,
                    minWidth: 58,
                  }}
                >
                  {slide.numbered ? String(i + 1).padStart(2, "0") : "—"}
                </span>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <span style={{ fontFamily: DISPLAY, fontSize: 40, fontWeight: 500, color: INK, lineHeight: 1.18 }}>
                    {it.label}
                  </span>
                  {it.body && (
                    <span style={{ fontFamily: DISPLAY, fontSize: 27, fontWeight: 300, color: MUTED, lineHeight: 1.42 }}>
                      {it.body}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "ikigai":
      return (
        <div style={{ ...bodyBox, alignItems: "center", justifyContent: "center" }}>
          {slide.title && (
            <h2
              style={{
                fontFamily: DISPLAY,
                fontSize: 56,
                fontWeight: 500,
                letterSpacing: "-0.02em",
                color: INK,
                margin: 0,
                textAlign: "center",
              }}
            >
              {slide.title}
            </h2>
          )}
          <Ikigai spotlight={slide.spotlight} size={788} />
          {slide.caption && (
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: 31,
                fontWeight: 300,
                color: MUTED,
                textAlign: "center",
                margin: "-8px 0 0",
                maxWidth: 720,
              }}
            >
              {slide.caption}
            </p>
          )}
        </div>
      );

    case "quote":
      return (
        <div style={{ ...bodyBox, justifyContent: "center" }}>
          <span
            aria-hidden
            style={{ fontFamily: DISPLAY, fontSize: 200, color: BRASS, lineHeight: 0.5, opacity: 0.5, height: 110, display: "block" }}
          >
            &ldquo;
          </span>
          <p
            style={{
              fontFamily: DISPLAY,
              fontSize: 64,
              fontWeight: 500,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
              color: INK,
              marginTop: 12,
            }}
          >
            {slide.text}
          </p>
          {slide.attribution && (
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 48 }}>
              <Rule w={40} />
              <span style={{ fontFamily: DISPLAY, fontSize: 29, fontWeight: 300, color: MUTED }}>{slide.attribution}</span>
            </div>
          )}
        </div>
      );

    case "cta":
      return (
        <div style={{ ...bodyBox, justifyContent: "center" }}>
          <Eyebrow text={slide.eyebrow} big />
          <h2
            style={{
              fontFamily: DISPLAY,
              fontSize: 80,
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.06,
              color: INK,
              margin: "30px 0 0",
            }}
          >
            {slide.title}
          </h2>
          {slide.body && (
            <p
              style={{
                fontFamily: DISPLAY,
                fontSize: 33,
                fontWeight: 300,
                lineHeight: 1.45,
                color: MUTED,
                marginTop: 34,
                maxWidth: 800,
              }}
            >
              {slide.body}
            </p>
          )}
          {(slide.handle || slide.url) && (
            <div style={{ display: "flex", alignItems: "center", gap: 22, marginTop: 60 }}>
              {slide.handle && (
                <span
                  style={{
                    fontFamily: DISPLAY,
                    fontSize: 36,
                    fontWeight: 500,
                    color: BRASS,
                    paddingBottom: 6,
                    borderBottom: `2px solid ${BRASS_DIM}`,
                  }}
                >
                  {slide.handle}
                </span>
              )}
              {slide.url && (
                <span style={{ fontFamily: MONO, fontSize: 24, ...letter("0.08em"), color: MUTED }}>{slide.url}</span>
              )}
            </div>
          )}
        </div>
      );
  }
}

export function Slide({
  slide,
  index,
  total,
  series,
}: {
  slide: SlideT;
  index: number;
  total: number;
  series: string;
}) {
  const counter = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  return (
    <div
      className="slide-canvas bg-grad-volcanic grain"
      data-slide={index}
      style={{ width: SLIDE_W, height: SLIDE_H }}
    >
      {/* the printed-card hairline frame */}
      <div style={{ position: "absolute", inset: FRAME, border: `1px solid ${LINE}`, pointerEvents: "none" }} />

      <Header series={series} counter={counter} />
      <SlideBody slide={slide} />
      <Footer index={index} total={total} />
    </div>
  );
}
