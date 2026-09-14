# AVI GLOBAL SOLUTIONS — Website

Built with Next.js 14 (App Router), Tailwind CSS, and Framer Motion.
Includes a Next.js API route (`/api/contact`) as the backend for the
project enquiry form.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Fill in before launch

1. **Email address** — set `email` in `lib/config.js`. It's left blank
   for now and every component hides the email field until it's set.
2. **Address lines** — set `addressLine1` / `addressLine2` in
   `lib/config.js` if you want a full postal address in the footer.
3. **Contact form delivery** — `app/api/contact/route.js` currently
   validates and logs enquiries server-side. Wire in an email provider
   (Resend, SMTP, SendGrid, etc.) once your company inbox is ready —
   there's a TODO with an example in that file.
4. **Project screenshots** — see `public/README-ASSETS.md`.

Your real logo and brand video are already wired in — see
`public/README-ASSETS.md` for exactly what was generated from them
(favicon, social preview image, navbar/footer lockups, video poster).

## Project structure

```
app/                 Routes (App Router)
  page.js            Home (video intro + hero + all homepage sections)
  about/
  services/
  process/
  projects/           listing + filters
  projects/[slug]/     reusable project detail template
  contact/            form (client) -> /api/contact (backend)
  api/contact/        POST endpoint for the enquiry form
  sitemap.js, robots.js
components/           Navbar, Footer, VideoIntro, Hero, cards, etc.
lib/                  config.js (site-wide settings), projects.js, services.js
```

## Deployment

Works out of the box on Vercel:

```bash
npm i -g vercel
vercel
```

Or any Node host that supports Next.js (`npm run build && npm start`).

## Design system

- **Type**: Fraunces (serif display, used sparingly in italic for one gold
  accent moment in the Hero) + Manrope (body/labels).
- **Color**: warm ember/amber accent (`#F2661C` → `#FFB562` → `#B3300C`) on
  black — set in one place, `tailwind.config.js` `colors.gold` and
  `backgroundImage["gold-gradient"]` — so it can be retuned site-wide by
  editing those two values.
- **Signature element**: the "Ascent Rail" (`components/ScrollRail.js`) — a
  thin gold line fixed to the left edge on desktop that fills as you scroll
  the page, echoing the mountain-peak "A" in your mark and the ELEVATE line
  in your tagline.
- **Capabilities slider**: `components/CapabilitiesSlider.js` — an
  interactive dot/arrow carousel on the homepage walking through five core
  services, each with a real project example where one exists (no invented
  stats).
- **Smooth scroll**: `components/SmoothScroll.js` wraps the whole site in
  Lenis for momentum-based scrolling; disabled automatically under
  `prefers-reduced-motion`.
- **Cursor**: `components/CustomCursor.js` — a two-layer cursor (an exact
  inner dot + a spring-lagged outer ring), driven by `requestAnimationFrame`
  rather than CSS transitions, with the native OS cursor hidden only once
  it's confirmed running.
- **Scroll motion**: `components/RevealText.js` (line-by-line curtain
  reveal, used for every major heading), Hero parallax + word-stagger,
  `components/Marquee.js` (infinite service strip), horizontal drag-scroll
  project gallery on the homepage, and `components/MagneticButton.js` on
  every primary CTA.
- All motion respects `prefers-reduced-motion` (see `app/globals.css`).

## Notes

- All copy, project names, and service lists come directly from the
  brief — no invented stats, testimonials, or client logos.
- `prefers-reduced-motion` is respected globally (see `app/globals.css`).
- The phone number (+91 79040 06912) is wired into `tel:` links and the
  WhatsApp button/CTA across the site.
