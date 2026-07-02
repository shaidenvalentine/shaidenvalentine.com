// Tiny WebAudio sound kit — all tones synthesized, no asset files. iOS only
// allows audio after a user gesture, so the context is created lazily and
// resumed on the first tap from the React layer.

let ctx: AudioContext | null = null;
let muted = false;

export function initAudio() {
  if (ctx) {
    if (ctx.state === "suspended") void ctx.resume();
    return;
  }
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
}

export function setMuted(m: boolean) {
  muted = m;
}

export function isMuted() {
  return muted;
}

function blip(freq: number, dur: number, type: OscillatorType, gain = 0.08, slideTo?: number) {
  if (!ctx || muted) return;
  const t0 = ctx.currentTime;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
  g.gain.setValueAtTime(gain, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.02);
}

export const sfx = {
  crumb: () => blip(520 + Math.random() * 80, 0.06, "square", 0.04),
  shell: () => {
    blip(440, 0.12, "sawtooth", 0.06, 880);
    setTimeout(() => blip(880, 0.14, "triangle", 0.05, 1320), 60);
  },
  chomp: () => {
    blip(300, 0.09, "square", 0.1, 90);
    setTimeout(() => blip(140, 0.16, "sawtooth", 0.09, 60), 40);
  },
  start: () => {
    blip(523, 0.12, "triangle", 0.06);
    setTimeout(() => blip(659, 0.12, "triangle", 0.06), 120);
    setTimeout(() => blip(784, 0.18, "triangle", 0.07), 240);
  },
  tackle: () => {
    // Sasha body-slam — a comedic descending womp
    blip(200, 0.14, "sawtooth", 0.1, 70);
    setTimeout(() => blip(120, 0.2, "square", 0.08, 55), 60);
  },
  bonk: () => {
    // whacking Sasha — a springy boing
    blip(180, 0.1, "square", 0.09, 520);
    setTimeout(() => blip(520, 0.12, "triangle", 0.07, 180), 70);
  },
  win: () => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => blip(f, 0.18, "triangle", 0.07), i * 130));
  },
  lose: () => {
    [392, 330, 262].forEach((f, i) => setTimeout(() => blip(f, 0.22, "sawtooth", 0.06), i * 160));
  },
};
