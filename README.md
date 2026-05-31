# shaidenvalentine.com

Shaiden Valentine's personal founder portal — top of the funnel for Orbit,
Mothership, and Elysium, plus story, newsletter, and shop. Replaces the
Beacons link-in-bio. Lean v1: **no backend, no database, no CMS.** All content
lives in the repo; the only external dependency is the beehiiv embed.

## Stack
Next.js 15 (App Router) · TypeScript · Tailwind v4 · Framer Motion · Lenis ·
React Three Fiber (hero only). Deploy on Vercel.

## Editing content (the whole "CMS")
Everything the site renders comes from [`/content`](./content). Edit a field →
commit → Vercel redeploys.

- `content/profile.ts` — name, tagline, bio, socials, vCard fields, hero/intro media paths
- `content/ventures.ts` — the venture array (name, blurb, **status line**, outbound link)
- `content/now.ts` — the In-Motion feed (newest first)
- `content/shop.ts` — product(s) + hosted checkout URL
- `content/site.ts` — SEO/OG strings + **beehiiv embed URL**

To update a venture's status line, edit one `status` field in `ventures.ts`.

## Assets to drop in (`/public`)
Placeholders degrade gracefully until these exist:

| Path | What |
|------|------|
| `public/video/hero-portrait.mp4` | Ambient hero portrait loop |
| `public/img/hero-poster.jpg` | Hero poster / WebGL-off fallback still |
| `public/video/intro.mp4` | Full tap-to-play intro film |
| `public/img/intro-poster.jpg` | Intro poster frame |
| `public/img/art-of-flipping.jpg` | Product cover |
| `public/img/og.jpg` | Open Graph share image (1200×630) |
| logos | Optional venture marks (set `logo` in `ventures.ts`) |

## Go-live checklist
1. Add real assets above.
2. Paste the beehiiv embed URL into `content/site.ts` (`beehiivEmbedUrl`).
3. Set the real product price + checkout URL in `content/shop.ts`.
4. Confirm social handles + email/phone in `content/profile.ts`.
5. Push to GitHub → import on Vercel → point `shaidenvalentine.com` DNS at it.

## Dev
```bash
npm run dev    # http://localhost:3002
npm run build  # production build
```
