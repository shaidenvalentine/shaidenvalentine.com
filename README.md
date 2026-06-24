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
- `content/collab.ts` — copy + options for the Work-With-Me + Feedback sections
- `content/personal.ts` — Ethos principles (how I think) + Life/Bali copy & gallery
- `content/investing.ts` — investing thesis + portfolio (Next Life Sciences, Space Campers, …)

To update a venture's status line, edit one `status` field in `ventures.ts`.

## Forms (Work With Me + Anonymous Feedback)
Two serverless routes email each submission via [Resend](https://resend.com) —
**nothing is stored**. The feedback route reads no name, email, or IP; it's
anonymous by design.

- `/api/apply` ← Work With Me (validated, honeypot-guarded)
- `/api/feedback` ← Anonymous Feedback (message + optional topic only)

Set these env vars (locally in `.env.local`, and in Vercel) — see `.env.example`:
`RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM`. Until they're set, the forms
render and validate but report "Email isn't configured yet."

Investment pitches use the **same** Work-With-Me form (roles include "Founder
pitching an idea" / "Investment opportunity"), so they email you too — the role
is in the subject line.

## Events module (THRESHOLD)
A reusable, invite-only event system. First event: **THRESHOLD** (Shaiden's
30th). Built on the same Postgres store as the rest of the admin — tables
(`events`, `event_rsvps`) auto-create on first use, and the THRESHOLD config
row seeds itself the first time the page or admin loads.

- **Public page:** [`/threshold`](http://localhost:3002/threshold) — invite-gated
  (word `samhain`, editable in admin). Unlock lives in component state only (no
  storage), so a refresh re-locks. Two RSVP flows (Inner Circle full weekend /
  Outer Circle Halloween night) write to `event_rsvps`; live slot counts pull
  **aggregate-only** capacity (the guest list is never exposed to the client).
  Full tiers flip to a waitlist instead of erroring.
- **Admin:** `/admin/events` → Overview (tier counts, committed vs collected,
  deadline tracker, flags), Guests (filter/sort, per-guest drawer: status,
  manual payments, room assignment, internal notes, comms flags, CSV export),
  Accommodation (estate vs nearby bed allocation), Rollups (adventures, dietary,
  arrivals + CSVs), and Config (edit caps/prices/invite word/dates/payment copy
  without redeploying).
- **Copy** lives in [`content/threshold.ts`](./content/threshold.ts) — sections,
  the day-by-day arc, adventures, FAQ, and the seed facts. Payments are **manual
  transfers** (no Stripe/cards); admin tracks them. **Placeholders to confirm
  before launch:** Outer Circle price ($50) and the transfer-details copy.

The data layer is plain `@vercel/postgres` (server-side only) rather than a
Supabase client — the service-key/RLS goals in the brief are met by never
touching the DB from the client: the public page reads only aggregates via a
server route, and all admin reads/writes sit behind the existing `/admin` auth.

## Analytics + /admin
Traffic runs on **Vercel Web Analytics** (`@vercel/analytics`, mounted in
`layout.tsx`) — privacy-friendly, no DB. The full dashboard lives on vercel.com.
Custom events tracked: `venture_click`, `save_contact`, `apply_submit` (with
role), `feedback_submit`, `pitch_cta`.

**`/admin`** is a private hub (jump to the Vercel dashboard + event legend),
gated by HTTP Basic Auth in `src/middleware.ts`. Set `ADMIN_USER` /
`ADMIN_PASSWORD` (locally + Vercel). If unset, `/admin` stays locked.
Want the dashboard embedded *inside* `/admin` (Beacons-style) later? Swap in
Umami or Plausible — no other changes needed.

## Local dev ports
Each project runs on its own port, so they never collide:
`shaidenvalentine` → **3002**, Mothership → 3000, Find Your Place → 3200.

## Assets to drop in (`/public`)
Placeholders degrade gracefully until these exist:

| Path | What |
|------|------|
| `public/video/hero-portrait.mp4` | Ambient hero portrait loop (fills the hero frame) |
| `public/img/hero-poster.jpg` | Hero portrait still (shown before/instead of video) |
| `public/video/intro.mp4` | Full tap-to-play intro film |
| `public/img/intro-poster.jpg` | Intro poster frame |
| `public/img/life-1.jpg` … `life-3.jpg` | Life/Bali gallery (set in `content/personal.ts`) |
| `public/img/art-of-flipping.jpg` | Product cover |
| `public/img/og.jpg` | Open Graph share image (1200×630) |
| logos | Optional venture marks (set `logo` in `ventures.ts`) |

Until a real hero portrait exists, the frame shows an "SV" monogram placeholder.

## Go-live checklist
1. Add real assets above.
2. Paste the beehiiv embed URL into `content/site.ts` (`beehiivEmbedUrl`).
3. Set the real product price + checkout URL in `content/shop.ts`.
4. Confirm social handles + email/phone in `content/profile.ts`.
5. Set `RESEND_API_KEY` / `CONTACT_EMAIL` / `RESEND_FROM` in Vercel, and verify
   your sending domain in Resend (so application + feedback emails deliver).
6. Set `ADMIN_USER` / `ADMIN_PASSWORD` in Vercel (gates `/admin`).
7. Enable Web Analytics for the project in the Vercel dashboard (Analytics tab).
8. Push to GitHub → import on Vercel → point `shaidenvalentine.com` DNS at it.

## Dev
```bash
npm run dev    # http://localhost:3002
npm run build  # production build
```
