"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  newGame,
  update,
  setDirection,
  type CrabId,
  type Difficulty,
  type Dir,
  type GameState,
} from "./game/engine";
import { computeView, draw, THEME } from "./game/render";
import { initAudio, setMuted as setAudioMuted, sfx } from "./game/audio";

type Screen = "title" | "countdown" | "playing" | "paused" | "over";
type Mode = "solo" | "versus";

const DIRS: Record<string, Dir> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef<GameState | null>(null);
  const rafRef = useRef<number>(0);
  const lastRef = useRef<number>(0);
  const runningRef = useRef<boolean>(false);
  const sizeRef = useRef<{ w: number; h: number; topPad: number }>({ w: 0, h: 0, topPad: 80 });

  const [screen, setScreen] = useState<Screen>("title");
  const [mode, setMode] = useState<Mode>("solo");
  const [human, setHuman] = useState<CrabId>("carlisle");
  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [chaos, setChaos] = useState(true);
  const [muted, setMuted] = useState(false);
  const [count, setCount] = useState(3);
  const [result, setResult] = useState<{ winner: CrabId | "draw"; c: number; s: number } | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Keep the latest mode/human handy for input handlers.
  const modeRef = useRef(mode);
  const humanRef = useRef(human);
  modeRef.current = mode;
  humanRef.current = human;

  // ---- canvas sizing (high-DPI) ---------------------------------------
  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const topPad = Math.max(70, rect.height * 0.1);
    sizeRef.current = { w: rect.width, h: rect.height, topPad };
    renderOnce();
  }, []);

  const renderOnce = useCallback(() => {
    const canvas = canvasRef.current;
    const s = stateRef.current;
    if (!canvas || !s) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const { w, h, topPad } = sizeRef.current;
    const view = computeView(s, w, h, topPad);
    draw(ctx, s, view, performance.now(), w, h, topPad);
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("orientationchange", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("orientationchange", resize);
    };
  }, [resize]);

  // ---- game loop ------------------------------------------------------
  const loop = useCallback(
    (t: number) => {
      if (!runningRef.current) return;
      const s = stateRef.current;
      const canvas = canvasRef.current;
      if (!s || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dt = lastRef.current ? t - lastRef.current : 16;
      lastRef.current = t;

      const ev = update(s, dt, t);
      if (ev.bonk) sfx.bonk();
      else if (ev.sting) sfx.sting();
      else if (ev.tackle) sfx.tackle();
      else if (ev.chomp) sfx.chomp();
      else if (ev.shell) sfx.shell();
      else if (ev.crumb) sfx.crumb();

      const { w, h, topPad } = sizeRef.current;
      const view = computeView(s, w, h, topPad);
      draw(ctx, s, view, t, w, h, topPad);

      if (s.over) {
        runningRef.current = false;
        const c = s.crabs.carlisle.score;
        const sc = s.crabs.steven.score;
        const winner = s.winner === "draw" ? "draw" : (s.winner as CrabId);
        setResult({ winner, c, s: sc });
        setScreen("over");
        const humanWon =
          modeRef.current === "versus" ? false : winner !== "draw" && winner === humanRef.current;
        if (winner === "draw") sfx.win();
        else if (modeRef.current === "versus") sfx.win();
        else humanWon ? sfx.win() : sfx.lose();
        return;
      }
      rafRef.current = requestAnimationFrame(loop);
    },
    [],
  );

  const startLoop = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastRef.current = 0;
    rafRef.current = requestAnimationFrame(loop);
  }, [loop]);

  const stopLoop = useCallback(() => {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
  }, []);

  // ---- start / restart ------------------------------------------------
  const beginCountdown = useCallback(() => {
    initAudio();
    stateRef.current = newGame({ mode, difficulty, human, chaos });
    setResult(null);
    resize();
    renderOnce();
    setScreen("countdown");
    setCount(3);
  }, [mode, difficulty, human, chaos, resize, renderOnce]);

  // Countdown ticker.
  useEffect(() => {
    if (screen !== "countdown") return;
    if (count <= 0) {
      sfx.start();
      setScreen("playing");
      startLoop();
      return;
    }
    const id = setTimeout(() => setCount((c) => c - 1), 700);
    return () => clearTimeout(id);
  }, [screen, count, startLoop]);

  // Pause when tab hidden.
  useEffect(() => {
    const onVis = () => {
      if (document.hidden && screen === "playing") {
        stopLoop();
        setScreen("paused");
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [screen, stopLoop]);

  useEffect(() => () => stopLoop(), [stopLoop]);

  // ---- input: which crab does a gesture control ----------------------
  const crabForHalf = useCallback((clientX: number): CrabId => {
    if (modeRef.current === "solo") return humanRef.current;
    const rect = containerRef.current?.getBoundingClientRect();
    const mid = rect ? rect.left + rect.width / 2 : window.innerWidth / 2;
    return clientX < mid ? "carlisle" : "steven";
  }, []);

  const applyDir = useCallback((crabId: CrabId, dir: Dir) => {
    const s = stateRef.current;
    if (!s) return;
    setDirection(s.crabs[crabId], dir);
  }, []);

  // Swipe steering (multi-touch aware for 2-player).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const origins = new Map<number, { x: number; y: number; crab: CrabId }>();
    const TH = 22;

    const onStart = (e: TouchEvent) => {
      for (const touch of Array.from(e.changedTouches)) {
        origins.set(touch.identifier, {
          x: touch.clientX,
          y: touch.clientY,
          crab: crabForHalf(touch.clientX),
        });
      }
    };
    const onMove = (e: TouchEvent) => {
      if (screen === "playing") e.preventDefault();
      for (const touch of Array.from(e.changedTouches)) {
        const o = origins.get(touch.identifier);
        if (!o) continue;
        const dx = touch.clientX - o.x;
        const dy = touch.clientY - o.y;
        if (Math.abs(dx) < TH && Math.abs(dy) < TH) continue;
        const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? DIRS.right : DIRS.left) : dy > 0 ? DIRS.down : DIRS.up;
        applyDir(o.crab, dir);
        o.x = touch.clientX;
        o.y = touch.clientY;
      }
    };
    const onEnd = (e: TouchEvent) => {
      for (const touch of Array.from(e.changedTouches)) origins.delete(touch.identifier);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("touchend", onEnd, { passive: true });
    el.addEventListener("touchcancel", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onEnd);
      el.removeEventListener("touchcancel", onEnd);
    };
  }, [crabForHalf, applyDir, screen]);

  // Keyboard (desktop). WASD = Carlisle, Arrows = Steven (or human in solo).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const s = stateRef.current;
      if (!s || screen !== "playing") return;
      const k = e.key.toLowerCase();
      const wasd: Record<string, Dir> = { w: DIRS.up, a: DIRS.left, s: DIRS.down, d: DIRS.right };
      const arrows: Record<string, Dir> = {
        arrowup: DIRS.up,
        arrowleft: DIRS.left,
        arrowdown: DIRS.down,
        arrowright: DIRS.right,
      };
      if (modeRef.current === "solo") {
        const dir = wasd[k] || arrows[k];
        if (dir) {
          e.preventDefault();
          applyDir(humanRef.current, dir);
        }
      } else {
        if (wasd[k]) {
          e.preventDefault();
          applyDir("carlisle", wasd[k]);
        } else if (arrows[k]) {
          e.preventDefault();
          applyDir("steven", arrows[k]);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [applyDir, screen]);

  const toggleMute = () => {
    const m = !muted;
    setMuted(m);
    setAudioMuted(m);
  };

  const share = async () => {
    const url = typeof window !== "undefined" ? `${window.location.origin}/carlisle-vs-steven` : "";
    const text = "🦀 Carlisle vs Steven — hermit crab showdown. Can you out-crab me?";
    try {
      if (navigator.share) {
        await navigator.share({ title: "Carlisle vs Steven", text, url });
        return;
      }
    } catch {
      /* user dismissed share sheet */
    }
    try {
      await navigator.clipboard.writeText(url);
      setToast("Link copied! Send it to the group 🦀");
      setTimeout(() => setToast(null), 2400);
    } catch {
      setToast(url);
    }
  };

  const dpadFor = (crabId: CrabId, corner: "center" | "bl" | "br") => (
    <DPad
      key={crabId}
      color={THEME[crabId].shell}
      corner={corner}
      onDir={(dir) => {
        initAudio();
        applyDir(crabId, dir);
      }}
    />
  );

  return (
    <div
      ref={containerRef}
      data-lenis-prevent
      className="fixed inset-0 select-none overflow-hidden bg-[#04263b] text-white"
      style={{ touchAction: "none", WebkitUserSelect: "none", WebkitTapHighlightColor: "transparent" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* In-play controls */}
      {screen === "playing" && (
        <>
          <button
            onClick={() => {
              stopLoop();
              setScreen("paused");
            }}
            className="absolute right-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-sm font-semibold backdrop-blur"
            style={{ top: "calc(env(safe-area-inset-top) + 70px)" }}
            aria-label="Pause"
          >
            ❚❚
          </button>
          {mode === "solo"
            ? dpadFor(human, "center")
            : (
                <>
                  {dpadFor("carlisle", "bl")}
                  {dpadFor("steven", "br")}
                </>
              )}
        </>
      )}

      {/* Title / menu */}
      {screen === "title" && (
        <Overlay>
          <div className="mx-auto flex max-h-full w-full max-w-md flex-col items-center gap-5 overflow-y-auto px-6 py-8">
            <div className="text-center">
              <div className="mb-1 text-5xl">🦀⚔️🦀</div>
              <h1 className="font-[family-name:var(--font-display,inherit)] text-3xl font-bold tracking-tight">
                <span style={{ color: THEME.carlisle.shell }}>Carlisle</span> vs{" "}
                <span style={{ color: THEME.steven.shell }}>Steven</span>
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Two hermit crabs from the <span className="font-semibold text-white/90">Anne Bonnie</span> — the
                boys-only Raja Ampat dive trip. Scurry the reef, hoover up{" "}
                <span className="font-semibold text-red-400">sambal</span> 🌶️, grab the{" "}
                <span className="font-semibold text-sky-300">comet</span> ☄️ for beast mode and chomp your rival.
                Dodge the <span className="text-cyan-300">blue-spotted stingray</span>, and whatever you do, don&apos;t
                let <span className="font-semibold text-lime-300">Sasha</span> (mankini) or{" "}
                <span className="font-semibold text-orange-300">Josiah</span> catch you. Mustaches mandatory. Most
                points when the clock hits zero wins.
              </p>
            </div>

            <Field label="Mode">
              <Segmented
                options={[
                  { v: "solo", label: "Solo vs CPU" },
                  { v: "versus", label: "2 Players" },
                ]}
                value={mode}
                onChange={(v) => setMode(v as Mode)}
              />
            </Field>

            {mode === "solo" && (
              <>
                <Field label="You play as">
                  <Segmented
                    options={[
                      { v: "carlisle", label: "Carlisle", color: THEME.carlisle.shell },
                      { v: "steven", label: "Steven", color: THEME.steven.shell },
                    ]}
                    value={human}
                    onChange={(v) => setHuman(v as CrabId)}
                  />
                </Field>
                <Field label="CPU difficulty">
                  <Segmented
                    options={[
                      { v: "chill", label: "Chill" },
                      { v: "normal", label: "Normal" },
                      { v: "savage", label: "Savage" },
                    ]}
                    value={difficulty}
                    onChange={(v) => setDifficulty(v as Difficulty)}
                  />
                </Field>
              </>
            )}

            {mode === "versus" && (
              <p className="rounded-xl bg-white/10 px-4 py-3 text-center text-xs text-white/70">
                One phone, two thumbs. <b style={{ color: THEME.carlisle.shell }}>Carlisle</b> = swipe the left
                side, <b style={{ color: THEME.steven.shell }}>Steven</b> = swipe the right. Or use the two D-pads.
              </p>
            )}

            <Field label="Trip chaos (Sasha · Josiah · stingray)">
              <Segmented
                options={[
                  { v: "on", label: "Chaos: ON", color: "#c6ff00" },
                  { v: "off", label: "Chaos: OFF" },
                ]}
                value={chaos ? "on" : "off"}
                onChange={(v) => setChaos(v === "on")}
              />
            </Field>

            <button
              onClick={beginCountdown}
              className="mt-1 w-full rounded-2xl bg-gradient-to-r from-orange-400 to-teal-400 py-4 text-lg font-bold text-[#04263b] shadow-lg active:scale-[0.98]"
            >
              Play ▶
            </button>
            <button onClick={share} className="text-sm text-white/60 underline underline-offset-4">
              Share with the group
            </button>
            <p className="text-center text-[11px] text-white/40">
              Swipe to steer · grab a golden shell to turn hungry · add to Home Screen for fullscreen.
            </p>
          </div>
        </Overlay>
      )}

      {/* Countdown */}
      {screen === "countdown" && (
        <Overlay dim>
          <div className="text-center">
            <div className="animate-pulse text-8xl font-black tabular-nums">{count > 0 ? count : "GO!"}</div>
            <p className="mt-4 text-white/70">Get ready to scurry…</p>
          </div>
        </Overlay>
      )}

      {/* Paused */}
      {screen === "paused" && (
        <Overlay dim>
          <div className="flex w-full max-w-xs flex-col items-center gap-4 px-6">
            <h2 className="text-2xl font-bold">Paused</h2>
            <button
              onClick={() => {
                setScreen("playing");
                startLoop();
              }}
              className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-teal-400 py-3 text-lg font-bold text-[#04263b]"
            >
              Resume
            </button>
            <button
              onClick={() => {
                stopLoop();
                setScreen("title");
              }}
              className="w-full rounded-2xl bg-white/10 py-3 font-semibold"
            >
              Quit to menu
            </button>
          </div>
        </Overlay>
      )}

      {/* Game over */}
      {screen === "over" && result && (
        <Overlay dim>
          <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-5 px-6 text-center">
            <div className="text-6xl">{result.winner === "draw" ? "🤝" : "🏆"}</div>
            <h2 className="text-3xl font-bold">
              {result.winner === "draw" ? (
                "It's a draw!"
              ) : (
                <span style={{ color: THEME[result.winner].shell }}>{THEME[result.winner].name} wins!</span>
              )}
            </h2>
            {(() => {
              const winnerId = result.winner === "draw" ? null : result.winner;
              const loserId = winnerId ? (winnerId === "carlisle" ? "steven" : "carlisle") : null;
              const humanWon = mode === "solo" && winnerId === human;
              const humanLost = mode === "solo" && winnerId !== null && winnerId !== human;
              if (!winnerId) {
                return <p className="text-lg font-bold text-white/80">Nobody caught crabs today. 🤝</p>;
              }
              if (humanWon) {
                return <p className="text-2xl font-black tracking-tight text-teal-300">YOU&apos;VE GOT CRABS! 🦀</p>;
              }
              if (humanLost) {
                return <p className="text-2xl font-black tracking-tight text-red-400">GET WREKD 💀</p>;
              }
              // versus: crown one, roast the other
              return (
                <p className="text-lg font-black leading-tight tracking-tight">
                  <span className="text-teal-300">{THEME[winnerId].name} HAS CRABS 🦀</span>
                  <br />
                  <span className="text-red-400">{THEME[loserId!].name} GOT WREKD 💀</span>
                </p>
              );
            })()}
            <div className="flex w-full items-center justify-center gap-6 rounded-2xl bg-white/10 py-4">
              <Tally id="carlisle" score={result.c} />
              <div className="text-2xl font-black text-white/40">vs</div>
              <Tally id="steven" score={result.s} />
            </div>
            <button
              onClick={beginCountdown}
              className="w-full rounded-2xl bg-gradient-to-r from-orange-400 to-teal-400 py-4 text-lg font-bold text-[#04263b] active:scale-[0.98]"
            >
              Rematch ↻
            </button>
            <div className="flex w-full gap-3">
              <button onClick={share} className="flex-1 rounded-2xl bg-white/10 py-3 font-semibold">
                Share 🔗
              </button>
              <button onClick={() => setScreen("title")} className="flex-1 rounded-2xl bg-white/10 py-3 font-semibold">
                Menu
              </button>
            </div>
          </div>
        </Overlay>
      )}

      {/* Mute toggle — always available */}
      {screen !== "playing" && (
        <button
          onClick={toggleMute}
          className="absolute z-30 rounded-full bg-black/40 px-3 py-1.5 text-sm backdrop-blur"
          style={{ top: "calc(env(safe-area-inset-top) + 8px)", left: "calc(env(safe-area-inset-left) + 10px)" }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? "🔇" : "🔊"}
        </button>
      )}

      {toast && (
        <div className="absolute bottom-24 left-1/2 z-40 -translate-x-1/2 rounded-full bg-black/80 px-5 py-2.5 text-sm font-medium backdrop-blur">
          {toast}
        </div>
      )}
    </div>
  );
}

// ---- small presentational helpers -------------------------------------

function Overlay({ children, dim }: { children: React.ReactNode; dim?: boolean }) {
  return (
    <div
      className={`absolute inset-0 z-20 flex items-center justify-center ${dim ? "bg-black/55" : "bg-[#04263b]/85"} backdrop-blur-sm`}
      style={{
        paddingTop: "env(safe-area-inset-top)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="w-full">
      <div className="mb-1.5 text-xs font-semibold uppercase tracking-wider text-white/50">{label}</div>
      {children}
    </div>
  );
}

function Segmented({
  options,
  value,
  onChange,
}: {
  options: Array<{ v: string; label: string; color?: string }>;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1.5 rounded-2xl bg-white/10 p-1.5">
      {options.map((o) => {
        const active = o.v === value;
        return (
          <button
            key={o.v}
            onClick={() => onChange(o.v)}
            className={`flex-1 rounded-xl py-2.5 text-sm font-semibold transition ${
              active ? "text-[#04263b]" : "text-white/70"
            }`}
            style={active ? { background: o.color ?? "#fff" } : undefined}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Tally({ id, score }: { id: CrabId; score: number }) {
  return (
    <div className="flex flex-col items-center">
      <div className="h-4 w-4 rounded-full" style={{ background: THEME[id].shell }} />
      <div className="mt-1 text-xs text-white/60">{THEME[id].name}</div>
      <div className="text-2xl font-black tabular-nums">{score}</div>
    </div>
  );
}

function DPad({
  color,
  corner,
  onDir,
}: {
  color: string;
  corner: "center" | "bl" | "br";
  onDir: (dir: Dir) => void;
}) {
  const pos =
    corner === "center"
      ? "left-1/2 -translate-x-1/2"
      : corner === "bl"
        ? "left-4"
        : "right-4";
  const btn = (dir: Dir, label: string, extra: string) => (
    <button
      className={`absolute flex h-12 w-12 items-center justify-center rounded-xl bg-white/15 text-lg font-bold backdrop-blur active:bg-white/30 ${extra}`}
      onPointerDown={(e) => {
        e.preventDefault();
        onDir(dir);
      }}
      aria-label={label}
    >
      {label}
    </button>
  );
  return (
    <div
      className={`absolute z-20 h-40 w-40 ${pos}`}
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 16px)", touchAction: "none" }}
    >
      <div className="relative h-full w-full opacity-90" style={{ filter: `drop-shadow(0 0 6px ${color}88)` }}>
        {btn(DIRS.up, "▲", "left-1/2 top-0 -translate-x-1/2")}
        {btn(DIRS.left, "◀", "left-0 top-1/2 -translate-y-1/2")}
        {btn(DIRS.right, "▶", "right-0 top-1/2 -translate-y-1/2")}
        {btn(DIRS.down, "▼", "bottom-0 left-1/2 -translate-x-1/2")}
      </div>
    </div>
  );
}
