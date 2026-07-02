// Canvas renderer for Carlisle vs Steven. Everything is drawn procedurally —
// no image assets — so the game is a single self-contained bundle. A sandy
// beach maze on an ocean gradient; the two crabs are little spiral shells with
// claws, eyes on stalks, and wiggling legs.

import type { Crab, CrabId, GameState } from "./engine";

export const THEME: Record<CrabId, { shell: string; shellDark: string; body: string; claw: string; name: string }> = {
  carlisle: { shell: "#FF7A45", shellDark: "#D2551F", body: "#FF9E7A", claw: "#E24A2B", name: "Carlisle" },
  steven: { shell: "#2DD4BF", shellDark: "#0E9488", body: "#67E8DC", claw: "#0891B2", name: "Steven" },
};

interface View {
  tile: number; // px per tile
  ox: number; // maze origin x (px)
  oy: number; // maze origin y (px)
}

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

  // Ocean background.
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#04263b");
  bg.addColorStop(0.5, "#075e7a");
  bg.addColorStop(1, "#0a7d8c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

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
        ctx.fillStyle = "#ffe6a7";
        ctx.beginPath();
        ctx.arc(cx, cy, Math.max(1.5, tile * 0.09), 0, Math.PI * 2);
        ctx.fill();
      } else {
        drawShellPellet(ctx, cx, cy, tile * 0.42, now);
      }
    }
  }

  // Crabs — draw the non-hungry one first so a hungry chaser glows on top.
  const crabs = [s.crabs.carlisle, s.crabs.steven].sort(
    (a, b) => (a.hungryUntil > now ? 1 : 0) - (b.hungryUntil > now ? 1 : 0),
  );
  for (const crab of crabs) drawCrab(ctx, crab, view, now);

  drawHUD(ctx, s, now, w, topPad);
}

function drawShellPellet(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, now: number) {
  const pulse = 0.75 + 0.25 * Math.sin(now / 220);
  ctx.save();
  ctx.translate(x, y);
  ctx.shadowColor = "#ffd54a";
  ctx.shadowBlur = radius * 1.6 * pulse;
  ctx.fillStyle = "#ffcf4d";
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;
  // spiral
  ctx.strokeStyle = "#a85b00";
  ctx.lineWidth = Math.max(1, radius * 0.14);
  ctx.beginPath();
  for (let i = 0; i < 30; i++) {
    const a = i * 0.5;
    const rr = (radius * 0.85 * i) / 30;
    const px = Math.cos(a) * rr;
    const py = Math.sin(a) * rr;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
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

  ctx.restore();
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
