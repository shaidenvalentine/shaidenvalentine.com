// Canvas renderer for Carlisle vs Steven. Everything is drawn procedurally —
// no image assets — so the game is a single self-contained bundle. A sandy
// beach maze on an ocean gradient; the two crabs are little spiral shells with
// claws, eyes on stalks, and wiggling legs.

import type { Crab, CrabId, GameState, Monster } from "./engine";

export const THEME: Record<CrabId, { shell: string; shellDark: string; body: string; claw: string; name: string }> = {
  carlisle: { shell: "#FF7A45", shellDark: "#D2551F", body: "#FF9E7A", claw: "#E24A2B", name: "Carlisle" },
  steven: { shell: "#2DD4BF", shellDark: "#0E9488", body: "#67E8DC", claw: "#0891B2", name: "Steven" },
};

interface View {
  tile: number; // px per tile
  ox: number; // maze origin x (px)
  oy: number; // maze origin y (px)
}

// Fixed star field (fractions of width / sky band) so they don't flicker-jump.
const STARS: Array<[number, number]> = [
  [0.08, 0.16], [0.19, 0.42], [0.31, 0.12], [0.42, 0.55], [0.54, 0.28],
  [0.63, 0.6], [0.71, 0.18], [0.86, 0.5], [0.91, 0.2], [0.15, 0.66],
  [0.47, 0.8], [0.27, 0.9], [0.6, 0.88], [0.78, 0.72], [0.36, 0.34],
];

// Compute how the maze should be centred within the available canvas box.
export function computeView(s: GameState, w: number, h: number, topPad: number): View {
  const usableH = h - topPad;
  const tile = Math.floor(Math.min(w / s.cols, usableH / s.rows));
  const ox = Math.floor((w - tile * s.cols) / 2);
  const oy = Math.floor(topPad + (usableH - tile * s.rows) / 2);
  return { tile, ox, oy };
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

export function draw(
  ctx: CanvasRenderingContext2D,
  s: GameState,
  view: View,
  now: number,
  w: number,
  h: number,
  topPad: number,
) {
  const { tile, ox, oy } = view;

  // Night-dive background — dark sky up top fading into the reef.
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#021320");
  bg.addColorStop(0.32, "#063049");
  bg.addColorStop(0.7, "#075e7a");
  bg.addColorStop(1, "#0a7d8c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Stars + the unknown comet in the band above the board.
  const band = Math.max(oy, 40);
  ctx.fillStyle = "#dff1ff";
  for (let i = 0; i < STARS.length; i++) {
    const [fx, fy] = STARS[i];
    ctx.globalAlpha = 0.35 + 0.55 * Math.abs(Math.sin(now / 700 + i * 1.7));
    ctx.beginPath();
    ctx.arc(fx * w, fy * band, 1.3, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
  drawComet(ctx, w * 0.8, band * 0.42, Math.max(9, band * 0.15), now, true);

  // Maze board (sandy floor).
  ctx.fillStyle = "#0b3a4d";
  roundRect(ctx, ox - 4, oy - 4, tile * s.cols + 8, tile * s.rows + 8, 14);
  ctx.fill();

  // Walls — coral/sand ridges.
  for (let r = 0; r < s.rows; r++) {
    for (let c = 0; c < s.cols; c++) {
      if (!s.wall[r][c]) continue;
      const x = ox + c * tile;
      const y = oy + r * tile;
      ctx.fillStyle = "#0d4a63";
      roundRect(ctx, x + tile * 0.06, y + tile * 0.06, tile * 0.88, tile * 0.88, tile * 0.28);
      ctx.fill();
      ctx.fillStyle = "#12678a";
      roundRect(ctx, x + tile * 0.14, y + tile * 0.14, tile * 0.72, tile * 0.55, tile * 0.24);
      ctx.fill();
    }
  }

  // Pellets (food crumbs) and power shells.
  for (let r = 0; r < s.rows; r++) {
    for (let c = 0; c < s.cols; c++) {
      const cell = s.pellets[r][c];
      if (!cell) continue;
      const cx = ox + c * tile + tile / 2;
      const cy = oy + r * tile + tile / 2;
      if (cell === 1) {
        // a dab of sambal 🌶️
        ctx.fillStyle = "#d92b17";
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(1.7, tile * 0.11), 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#ff6a4d";
        ctx.beginPath();
        ctx.arc(cx - tile * 0.03, cy - tile * 0.03, Math.max(0.8, tile * 0.045), 0, Math.PI * 2);
        ctx.fill();
      } else {
        // the comet — grab it for beast mode
        drawComet(ctx, cx, cy, tile * 0.4, now, false);
      }
    }
  }

  // Crabs — draw the non-hungry one first so a hungry chaser glows on top.
  const crabs = [s.crabs.carlisle, s.crabs.steven].sort(
    (a, b) => (a.hungryUntil > now ? 1 : 0) - (b.hungryUntil > now ? 1 : 0),
  );
  for (const crab of crabs) drawCrab(ctx, crab, view, now);

  for (const m of s.monsters) drawMonster(ctx, m, view, now);

  drawHUD(ctx, s, now, w, topPad);
}

function drawComet(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, now: number, longTail: boolean) {
  const pulse = 0.78 + 0.22 * Math.sin(now / 220);
  const t = longTail ? 3.4 : 1.9; // tail length in radii
  ctx.save();
  // tail streaking up to the right
  const tx = x + radius * t;
  const ty = y - radius * t;
  const g = ctx.createLinearGradient(tx, ty, x, y);
  g.addColorStop(0, "rgba(150,210,255,0)");
  g.addColorStop(1, "rgba(200,235,255,0.9)");
  ctx.strokeStyle = g;
  ctx.lineWidth = radius * (longTail ? 0.6 : 0.5);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(tx, ty);
  ctx.lineTo(x, y);
  ctx.stroke();
  // glowing head
  ctx.shadowColor = "#bfe6ff";
  ctx.shadowBlur = radius * 2 * pulse;
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.55, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#8fd3ff";
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawCrab(ctx: CanvasRenderingContext2D, crab: Crab, view: View, now: number) {
  const { tile, ox, oy } = view;
  const x = ox + crab.c * tile + tile / 2;
  const y = oy + crab.r * tile + tile / 2;
  const R = tile * 0.42;
  const t = THEME[crab.id];
  const hungry = crab.hungryUntil > now;

  // Respawn flash — blink out.
  if (crab.respawnFlash > 0 && Math.floor(crab.respawnFlash / 120) % 2 === 0) return;

  ctx.save();
  ctx.translate(x, y);

  // Hungry aura.
  if (hungry) {
    const remain = crab.hungryUntil - now;
    const flick = remain < 1500 ? (Math.floor(now / 150) % 2 === 0 ? 0.4 : 1) : 1;
    ctx.save();
    ctx.globalAlpha = 0.55 * flick;
    const g = ctx.createRadialGradient(0, 0, R * 0.4, 0, 0, R * 1.9);
    g.addColorStop(0, "#fff2b0");
    g.addColorStop(1, "rgba(255,180,0,0)");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(0, 0, R * 1.9, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  const ang = crab.facing;
  // Legs — three per side, wiggling.
  ctx.strokeStyle = t.claw;
  ctx.lineWidth = Math.max(1.5, R * 0.16);
  ctx.lineCap = "round";
  for (let side = -1; side <= 1; side += 2) {
    for (let i = 0; i < 3; i++) {
      const base = ang + Math.PI / 2 + side * (0.5 + i * 0.45);
      const wig = Math.sin(crab.wiggle + i * 1.3 + (side > 0 ? 0 : Math.PI)) * 0.25;
      const bx = Math.cos(base) * R * 0.6;
      const by = Math.sin(base) * R * 0.6;
      const ex = Math.cos(base + wig) * R * 1.25;
      const ey = Math.sin(base + wig) * R * 1.25;
      ctx.beginPath();
      ctx.moveTo(bx, by);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }
  }

  // Claws out front.
  for (let side = -1; side <= 1; side += 2) {
    const ca = ang + side * 0.55;
    const cx = Math.cos(ca) * R * 1.15;
    const cy = Math.sin(ca) * R * 1.15;
    ctx.fillStyle = t.claw;
    ctx.beginPath();
    ctx.arc(cx, cy, R * 0.34, 0, Math.PI * 2);
    ctx.fill();
    // pincer notch
    ctx.strokeStyle = t.shellDark;
    ctx.lineWidth = Math.max(1, R * 0.1);
    ctx.beginPath();
    ctx.moveTo(cx + Math.cos(ang) * R * 0.34, cy + Math.sin(ang) * R * 0.34);
    ctx.lineTo(cx + Math.cos(ang) * R * 0.05, cy + Math.sin(ang) * R * 0.05);
    ctx.stroke();
  }

  // Shell (spiral body).
  const shellGrad = ctx.createRadialGradient(-R * 0.3, -R * 0.3, R * 0.2, 0, 0, R);
  shellGrad.addColorStop(0, t.body);
  shellGrad.addColorStop(1, t.shell);
  ctx.fillStyle = shellGrad;
  ctx.beginPath();
  ctx.arc(0, 0, R, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = t.shellDark;
  ctx.lineWidth = Math.max(1, R * 0.12);
  ctx.stroke();
  // spiral swirl
  ctx.beginPath();
  for (let i = 0; i < 34; i++) {
    const a = i * 0.5;
    const rr = (R * 0.82 * i) / 34;
    const px = Math.cos(a) * rr;
    const py = Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();

  // Eyes on stalks, pointing the way we move.
  for (let side = -1; side <= 1; side += 2) {
    const ea = ang - Math.PI / 2 + side * 0.4;
    const sx = Math.cos(ea) * R * 0.35;
    const sy = Math.sin(ea) * R * 0.35;
    const ex = Math.cos(ea) * R * 0.9 + Math.cos(ang) * R * 0.4;
    const ey = Math.sin(ea) * R * 0.9 + Math.sin(ang) * R * 0.4;
    ctx.strokeStyle = t.shellDark;
    ctx.lineWidth = Math.max(1, R * 0.1);
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(ex, ey);
    ctx.stroke();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(ex, ey, R * 0.22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0b0b0d";
    ctx.beginPath();
    ctx.arc(ex + Math.cos(ang) * R * 0.07, ey + Math.sin(ang) * R * 0.07, R * (hungry ? 0.13 : 0.1), 0, Math.PI * 2);
    ctx.fill();
  }

  // Hungry mouth (little angry grin).
  if (hungry) {
    ctx.strokeStyle = "#7a1500";
    ctx.lineWidth = Math.max(1, R * 0.12);
    ctx.beginPath();
    ctx.arc(Math.cos(ang) * R * 0.35, Math.sin(ang) * R * 0.35, R * 0.25, ang - 0.9, ang + 0.9);
    ctx.stroke();
  }

  // Mustache — everyone on the trip had one.
  {
    const fx = Math.cos(ang) * R * 0.34;
    const fy = Math.sin(ang) * R * 0.34;
    const px = Math.cos(ang + Math.PI / 2);
    const py = Math.sin(ang + Math.PI / 2);
    ctx.strokeStyle = "#241009";
    ctx.lineWidth = Math.max(1.2, R * 0.14);
    ctx.lineCap = "round";
    for (const sgn of [-1, 1]) {
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.quadraticCurveTo(
        fx + sgn * px * R * 0.24 + Math.cos(ang) * R * 0.06,
        fy + sgn * py * R * 0.24 + Math.sin(ang) * R * 0.06,
        fx + sgn * px * R * 0.4 - Math.cos(ang) * R * 0.04,
        fy + sgn * py * R * 0.4 - Math.sin(ang) * R * 0.04,
      );
      ctx.stroke();
    }
  }

  ctx.restore();
}

function drawMonster(ctx: CanvasRenderingContext2D, m: Monster, view: View, now: number) {
  const { tile, ox, oy } = view;
  const x = ox + m.c * tile + tile / 2;
  const y = oy + m.r * tile + tile / 2;
  if (m.respawnFlash > 0 && Math.floor(m.respawnFlash / 120) % 2 === 0) return;

  if (m.kind === "stingray") {
    drawStingray(ctx, x, y, tile, m);
    return;
  }

  const sasha = m.kind === "sasha";
  drawBoy(ctx, x, y, tile, m, sasha ? "#c6ff00" : "#12557a", sasha);
  nameTag(
    ctx,
    x,
    y - tile * 0.38 * 1.7,
    tile,
    sasha ? "SASHA" : "JOSIAH",
    sasha ? "rgba(140,200,0,0.94)" : "rgba(255,150,40,0.96)",
    sasha ? "#173a00" : "#3a1a00",
  );
}

// A mustachioed boy in swimwear — Sasha (lime mankini) or Josiah (shorts).
function drawBoy(ctx: CanvasRenderingContext2D, x: number, y: number, tile: number, m: Monster, kit: string, mankini: boolean) {
  const s = tile * 0.38;
  const P2 = Math.PI * 2;
  const face = Math.cos(m.facing) >= 0 ? 1 : -1;
  const swing = Math.sin(m.wiggle) * 0.55;
  const skin = "#e9b58a";
  const hair = "#4a3120";

  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.beginPath();
  ctx.ellipse(0, s * 1.2, s * 0.7, s * 0.22, 0, 0, P2);
  ctx.fill();
  ctx.scale(face, 1);
  ctx.lineCap = "round";

  // legs
  ctx.strokeStyle = skin;
  ctx.lineWidth = s * 0.28;
  ctx.beginPath();
  ctx.moveTo(0, s * 0.2);
  ctx.lineTo(-s * 0.15 - swing * s, s * 1.1);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, s * 0.2);
  ctx.lineTo(s * 0.3 + swing * s, s * 1.05);
  ctx.stroke();

  // back arm
  ctx.lineWidth = s * 0.22;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.35);
  ctx.lineTo(-s * 0.55 - swing * s * 0.5, -s * 0.55);
  ctx.stroke();

  // torso
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(0, -s * 0.15, s * 0.48, s * 0.72, 0, 0, P2);
  ctx.fill();

  if (mankini) {
    // brief + over-the-shoulder strap
    ctx.fillStyle = kit;
    ctx.beginPath();
    ctx.moveTo(-s * 0.42, s * 0.12);
    ctx.lineTo(s * 0.42, s * 0.12);
    ctx.lineTo(0, s * 0.62);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = kit;
    ctx.lineWidth = s * 0.22;
    ctx.beginPath();
    ctx.moveTo(-s * 0.08, s * 0.3);
    ctx.lineTo(s * 0.3, -s * 0.82);
    ctx.stroke();
  } else {
    // board shorts
    ctx.fillStyle = kit;
    roundRect(ctx, -s * 0.46, s * 0.04, s * 0.92, s * 0.62, s * 0.16);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.25)";
    roundRect(ctx, -s * 0.46, s * 0.04, s * 0.16, s * 0.6, s * 0.08);
    ctx.fill();
  }

  // front arm
  ctx.strokeStyle = skin;
  ctx.beginPath();
  ctx.moveTo(0, -s * 0.35);
  ctx.lineTo(s * 0.55 + swing * s * 0.5, -s * 0.12);
  ctx.stroke();

  // head + hair
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.arc(s * 0.06, -s * 1.02, s * 0.42, 0, P2);
  ctx.fill();
  ctx.fillStyle = hair;
  ctx.beginPath();
  ctx.arc(s * 0.06, -s * 1.08, s * 0.44, Math.PI, P2);
  ctx.closePath();
  ctx.fill();

  // eye
  ctx.fillStyle = "#20140b";
  ctx.beginPath();
  ctx.arc(s * 0.24, -s * 1.04, s * 0.06, 0, P2);
  ctx.fill();

  // mustache — everyone had one
  ctx.strokeStyle = "#2a180c";
  ctx.lineWidth = s * 0.14;
  ctx.beginPath();
  ctx.moveTo(s * 0.02, -s * 0.86);
  ctx.quadraticCurveTo(s * 0.28, -s * 0.94, s * 0.42, -s * 0.82);
  ctx.stroke();

  ctx.restore();
}

// The blue-spotted stingray gliding the reef.
function drawStingray(ctx: CanvasRenderingContext2D, x: number, y: number, tile: number, m: Monster) {
  const R = tile * 0.5;
  const P2 = Math.PI * 2;
  const bob = Math.sin(m.wiggle * 0.5) * R * 0.08;

  ctx.save();
  ctx.translate(x, y + R * 1.2);
  ctx.fillStyle = "rgba(0,0,0,0.22)";
  ctx.beginPath();
  ctx.ellipse(0, 0, R * 0.7, R * 0.18, 0, 0, P2);
  ctx.fill();
  ctx.restore();

  ctx.save();
  ctx.translate(x, y + bob);
  ctx.rotate(m.facing);

  // tail with blue stripes
  ctx.strokeStyle = "#8a6238";
  ctx.lineWidth = Math.max(1, R * 0.12);
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-R * 0.6, 0);
  ctx.lineTo(-R * 1.5, 0);
  ctx.stroke();
  ctx.strokeStyle = "#3fd0ff";
  ctx.lineWidth = Math.max(1, R * 0.11);
  for (const tx of [-R * 1.0, -R * 1.28]) {
    ctx.beginPath();
    ctx.moveTo(tx, -R * 0.07);
    ctx.lineTo(tx, R * 0.07);
    ctx.stroke();
  }

  // kite-shaped disc body
  const grad = ctx.createRadialGradient(0, -R * 0.1, R * 0.15, 0, 0, R);
  grad.addColorStop(0, "#c8996a");
  grad.addColorStop(1, "#a5773f");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.moveTo(R * 0.95, 0);
  ctx.quadraticCurveTo(R * 0.2, R * 0.72, -R * 0.7, R * 0.34);
  ctx.quadraticCurveTo(-R * 0.9, 0, -R * 0.7, -R * 0.34);
  ctx.quadraticCurveTo(R * 0.2, -R * 0.72, R * 0.95, 0);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#835d33";
  ctx.lineWidth = Math.max(1, R * 0.05);
  ctx.stroke();

  // the blue spots
  ctx.fillStyle = "#48d6ff";
  const dots: Array<[number, number]> = [
    [R * 0.4, 0], [R * 0.08, R * 0.3], [R * 0.08, -R * 0.3],
    [-R * 0.28, R * 0.14], [-R * 0.28, -R * 0.14], [R * 0.18, R * 0.04],
  ];
  for (const [dx, dy] of dots) {
    ctx.beginPath();
    ctx.arc(dx, dy, Math.max(1, R * 0.08), 0, P2);
    ctx.fill();
  }

  // eyes near the front
  ctx.fillStyle = "#1a1208";
  ctx.beginPath();
  ctx.arc(R * 0.52, R * 0.12, R * 0.055, 0, P2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(R * 0.52, -R * 0.12, R * 0.055, 0, P2);
  ctx.fill();

  ctx.restore();
}

function nameTag(
  ctx: CanvasRenderingContext2D,
  x: number,
  ty: number,
  tile: number,
  text: string,
  bg: string,
  fg: string,
) {
  ctx.font = `700 ${Math.max(8, Math.round(tile * 0.28))}px ui-sans-serif, system-ui`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const tw = ctx.measureText(text).width + tile * 0.4;
  ctx.fillStyle = bg;
  roundRect(ctx, x - tw / 2, ty - tile * 0.28, tw, tile * 0.56, tile * 0.28);
  ctx.fill();
  ctx.fillStyle = fg;
  ctx.fillText(text, x, ty + 1);
}

function drawHUD(ctx: CanvasRenderingContext2D, s: GameState, now: number, w: number, topPad: number) {
  const pad = 14;
  const badgeH = Math.min(52, topPad - 12);
  const y = Math.max(8, (topPad - badgeH) / 2 - 6);

  const secs = Math.max(0, Math.ceil((s.duration - s.time) / 1000));
  const mm = Math.floor(secs / 60);
  const ss = String(secs % 60).padStart(2, "0");

  // Timer pill centred.
  ctx.font = `700 ${Math.round(badgeH * 0.42)}px ui-monospace, Menlo, monospace`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  const timeStr = `${mm}:${ss}`;
  const tw = ctx.measureText(timeStr).width + 28;
  ctx.fillStyle = secs <= 10 ? "rgba(255,90,60,0.9)" : "rgba(4,25,38,0.7)";
  roundRect(ctx, w / 2 - tw / 2, y, tw, badgeH, badgeH / 2);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.fillText(timeStr, w / 2, y + badgeH / 2 + 1);

  // Score badges.
  drawScore(ctx, s.crabs.carlisle, now, pad, y, badgeH, "left");
  drawScore(ctx, s.crabs.steven, now, w - pad, y, badgeH, "right");
}

function drawScore(
  ctx: CanvasRenderingContext2D,
  crab: Crab,
  now: number,
  x: number,
  y: number,
  hgt: number,
  align: "left" | "right",
) {
  const t = THEME[crab.id];
  const bw = Math.min(120, hgt * 2.5);
  const bx = align === "left" ? x : x - bw;
  const hungry = crab.hungryUntil > now;

  ctx.fillStyle = "rgba(4,25,38,0.62)";
  roundRect(ctx, bx, y, bw, hgt, hgt / 2);
  ctx.fill();
  if (hungry) {
    ctx.strokeStyle = "#ffd54a";
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Colour dot.
  const dotR = hgt * 0.2;
  const dotX = align === "left" ? bx + hgt * 0.32 : bx + bw - hgt * 0.32;
  ctx.fillStyle = t.shell;
  ctx.beginPath();
  ctx.arc(dotX, y + hgt / 2, dotR, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.textBaseline = "middle";
  ctx.font = `600 ${Math.round(hgt * 0.28)}px ui-sans-serif, system-ui`;
  ctx.textAlign = align === "left" ? "left" : "right";
  const nameX = align === "left" ? dotX + dotR + 8 : dotX - dotR - 8;
  ctx.fillText(t.name, nameX, y + hgt * 0.34);
  ctx.font = `700 ${Math.round(hgt * 0.4)}px ui-monospace, monospace`;
  ctx.fillText(String(crab.score), nameX, y + hgt * 0.7);
}
