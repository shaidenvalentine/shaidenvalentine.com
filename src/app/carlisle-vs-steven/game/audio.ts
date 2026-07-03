// Tiny WebAudio sound kit — all tones synthesized, no asset files. iOS only
// allows audio after a user gesture, so the context is created lazily and
// resumed on the first tap from the React layer.

let ctx: AudioContext | null = null;
let muted = false;
let speechWarmed = false;

// Call this from inside a real user gesture (tap). Handles every iOS Safari
// audio quirk: unlock the AudioContext, route through the "playback" audio
// session so the ring/silent switch doesn't kill it, and warm up TTS.
export function initAudio() {
  // iOS 16.4+: play in the "playback" category so a flipped silent switch
  // doesn't mute the game.
  try {
    const ns = navigator as unknown as { audioSession?: { type: string } };
    if (ns.audioSession && ns.audioSession.type !== "playback") {
      ns.audioSession.type = "playback";
    }
  } catch {
    /* audioSession not supported */
  }

  if (!ctx) {
    const AC =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AC) ctx = new AC();
  }
  if (ctx) {
    if (ctx.state === "suspended") void ctx.resume();
    // Belt-and-suspenders unlock: play one silent sample inside the gesture.
    try {
      const buf = ctx.createBuffer(1, 1, 22050);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      src.connect(ctx.destination);
      src.start(0);
    } catch {
      /* ignore */
    }
  }

  // Warm up speech synthesis so Christian can talk from the game loop later.
  try {
    const synth = window.speechSynthesis;
    if (synth && !speechWarmed) {
      const u = new SpeechSynthesisUtterance(" ");
      u.volume = 0;
      synth.speak(u);
      speechWarmed = true;
    }
  } catch {
    /* no speech synthesis */
  }
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

// Speak a word via the browser's TTS (best-effort; iOS may vary). Used for
// Christian's creepy lisped "carwyle".
function say(text: string, pitch = 0.3, rate = 0.72) {
  if (muted) return;
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const u = new SpeechSynthesisUtterance(text);
    u.pitch = pitch;
    u.rate = rate;
    u.volume = 1;
    synth.cancel();
    synth.speak(u);
  } catch {
    /* no speech synthesis available */
  }
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
    // whacking a boy — a springy boing
    blip(180, 0.1, "square", 0.09, 520);
    setTimeout(() => blip(520, 0.12, "triangle", 0.07, 180), 70);
  },
  sting: () => {
    // stingray zap — a sharp electric buzz
    blip(900, 0.05, "sawtooth", 0.07, 1400);
    setTimeout(() => blip(1400, 0.08, "square", 0.06, 300), 40);
  },
  christian: () => {
    // creepy descending cackle, then a lisped "carwyle"
    [200, 168, 140, 120].forEach((f, i) => setTimeout(() => blip(f, 0.13, "sawtooth", 0.075, f * 0.7), i * 120));
    setTimeout(() => say("carwyle"), 520);
  },
  win: () => {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => blip(f, 0.18, "triangle", 0.07), i * 130));
  },
  lose: () => {
    [392, 330, 262].forEach((f, i) => setTimeout(() => blip(f, 0.22, "sawtooth", 0.06), i * 160));
  },
};
