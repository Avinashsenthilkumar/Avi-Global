# AVI GLOBAL SOLUTIONS — Website

Built with Next.js 14 (App Router) and Tailwind CSS, with Lenis for smooth scrolling.
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

- **Palette**: light platinum page (`paper`), graphite type and feature panels,
  ember gradient as the accent. All tokens live in `tailwind.config.js`.
- **Type**: Fraunces (display) + Manrope (body).
- **Motion engine**: no animation library. `components/MotionObserver.js` adds
  `is-in` to anything with `data-reveal`, `data-clip`, `data-draw` or
  `data-inview` when it scrolls into view; `app/globals.css` does the
  animating. `lib/motion.js` provides `useScrollProgress` for scroll-linked
  effects. Everything respects `prefers-reduced-motion`.
- **Signature moments**: intro curtain (`VideoIntro`), cursor-tracking
  character on a lit stage with pointer spotlight + 3D tilt (`HeroStage`),
  velocity-reactive marquee, stacking service cards (`ServicesStack`), pinned
  horizontal project gallery (`ProjectsShowcase`), scroll-scrubbed statement
  text (`ScrubText`), scroll-drawn process line (`ProcessTimeline`),
  self-drawing globe (`GlobalVision`).
- **Mobile**: bottom tab bar (`MobileTabBar`), swipe carousels, installable
  as an app via `app/manifest.js`, safe-area aware.
- **Character frames**: `public/images/mascot/desktop` (full resolution) and
  `/mobile` (phone weight), 60 frames each.

## Notes

- All copy, project names, and service lists come directly from the
  brief — no invented stats, testimonials, or client logos.
- `prefers-reduced-motion` is respected globally (see `app/globals.css`).
- The phone number (+91 63825 35043) is wired into `tel:` links and the
  WhatsApp button/CTA across the site.
