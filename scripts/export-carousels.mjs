// Export every carousel's slides to PNGs for Instagram.
//
//   1. Start the site:   npm run dev   (or npm run build && npm start)
//   2. In another shell:  npm run carousels:export
//
// Output: public/carousels/<slug>/01.png … (1080×1350, 2× retina).
//
// Uses the Chromium that ships with this environment when present, so no
// `playwright install` is needed. Override with BASE_URL / SCALE env vars.

import { chromium } from "playwright";
import { mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const BASE_URL = process.env.BASE_URL || "http://localhost:3002";
const SCALE = Number(process.env.SCALE || 2); // 2× → crisp 2160×2700 source
const OUT_ROOT = path.resolve("public/carousels");

// Pull the slugs straight from the content registry (no duplication).
async function slugs() {
  const src = await readFile(path.resolve("content/carousels/index.ts"), "utf8");
  // matches: import { ikigai } from "./ikigai";  → slug files
  const files = [...src.matchAll(/from\s+["']\.\/([a-z0-9-]+)["']/g)].map((m) => m[1]);
  const out = [];
  for (const f of files) {
    if (f === "types") continue;
    const body = await readFile(path.resolve(`content/carousels/${f}.ts`), "utf8");
    const m = body.match(/slug:\s*["']([a-z0-9-]+)["']/);
    if (m) out.push(m[1]);
  }
  return out;
}

// Prefer the env's bundled Chromium; fall back to Playwright's own.
function chromiumPath() {
  const candidates = [
    process.env.PLAYWRIGHT_CHROMIUM_PATH,
    "/opt/pw-browsers/chromium",
  ].filter(Boolean);
  for (const c of candidates) if (existsSync(c)) return c;
  return undefined; // let Playwright resolve its managed browser
}

async function run() {
  const list = await slugs();
  if (!list.length) {
    console.error("No carousels found in content/carousels.");
    process.exit(1);
  }

  const browser = await chromium.launch({ executablePath: chromiumPath() });
  const ctx = await browser.newContext({ deviceScaleFactor: SCALE });
  const page = await ctx.newPage();

  for (const slug of list) {
    const url = `${BASE_URL}/carousels/${slug}/export`;
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts && document.fonts.ready);
    await page.waitForTimeout(400); // let fonts paint

    const slides = page.locator("[data-export-slide]");
    const n = await slides.count();
    const dir = path.join(OUT_ROOT, slug);
    await mkdir(dir, { recursive: true });

    for (let i = 0; i < n; i++) {
      const file = path.join(dir, `${String(i + 1).padStart(2, "0")}.png`);
      await slides.nth(i).locator(".slide-canvas").screenshot({ path: file });
      console.log(`  ✓ ${path.relative(process.cwd(), file)}`);
    }
    console.log(`${slug}: ${n} slides → ${path.relative(process.cwd(), dir)}/`);
  }

  await browser.close();
  console.log("\nDone. Post them in order, oldest number first.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
