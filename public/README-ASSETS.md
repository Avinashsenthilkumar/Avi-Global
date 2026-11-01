# Brand assets — status

Your real assets are wired in and ready to go:

## Logo
Source: your PNG lockup (icon + wordmark + tagline), background removed
so it sits cleanly on the dark theme.

- `public/logo.png` — full lockup (icon + "AVI GLOBAL SOLUTIONS" +
  "SOLUTIONS" subtitle + tagline). Used in the video-intro logo reveal.
- `public/logo-compact.png` — icon + "AVI GLOBAL SOLUTIONS" wordmark only
  (tagline trimmed off for tight spaces). Used in the navbar and footer.
- `public/favicon-mark.png` — icon only, used to generate the favicon.
- `components/Logo.js` renders whichever variant you ask for
  (`variant="full" | "compact" | "mark"`) at any size via `className`,
  always scaled uniformly (never stretched or recolored).
- `app/icon.png` / `app/apple-icon.png` — generated from the icon mark,
  picked up automatically by Next.js as the site favicon / apple touch icon.
- `public/images/og-cover.jpg` — social share preview image, generated
  from the full logo on a black background.

If you'd prefer a version with an actual transparent background (rather
than the auto-detected one here), just drop a new `logo.png` in
`public/` with alpha already baked in — no code changes needed.

## Brand video
- `public/videos/brand-film.mp4` — your uploaded brand film.
- `public/videos/brand-film-poster.jpg` — first-frame poster, auto-generated
  from the video, shown while it loads and as the fallback if autoplay is
  blocked.

Both are already wired into `components/VideoIntro.js` exactly as the
brief specifies: black screen → logo reveal → brand film → cinematic
transition into the Hero, with a working "Skip Intro" button throughout.

## Optional next steps
- If you want a lighter file for slower mobile connections, export a
  compressed/shorter version of the brand film and reference it from a
  `<source media="(max-width: 768px)">` inside `VideoIntro.js`.
- Add real project screenshots under `public/images/projects/<slug>/`
  and wire them into `lib/projects.js` + `app/projects/[slug]/page.js`
  (currently shows a placeholder block).
