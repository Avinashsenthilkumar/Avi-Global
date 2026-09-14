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

## Hero character (cursor-driven head turn)

Rebuilt from your `Character_turning_head_animation` clip. The original is
kept at `public/videos/character-turn.mp4` so the sequence can be
regenerated later if you re-render the character at a higher resolution.

- `public/images/mascot/frame-01.webp` ... `frame-38.webp` — 662x1547,
  roughly 87 KB each (~3.3 MB total), alpha already baked in.
- The studio backdrop was removed by fitting a background plate to the
  clip and unpremultiplying the colour against it, so the edges carry no
  grey fringe on the dark theme — that halo is what made the previous
  set look rough. The contact shadow he cast on the studio floor is gone
  too, since `components/Hero.js` draws its own floor shadow in CSS.
- The clip's two blinks were dropped. Otherwise one cursor position would
  have left him permanently mid-blink.
- Frames were chosen by how much actually changes between them, not by
  even time spacing, so none are wasted on the 1.3 s the clip holds a
  front-facing pose.
- `components/HeroCharacter.js` cross-dissolves adjacent frames and drives
  the index with a critically-damped spring, so 38 frames read as a
  continuous turn. Cursor height adds a small vertical parallax and there
  is a slow breathing float underneath it all.
- It renders only at md and above, so phones never download the frames.
  Touch devices that are wide enough get a slow idle look-around;
  `prefers-reduced-motion` gets one static frame.

To regenerate after a higher-res re-render: drop the new clip in, extract
frames, and export the same 38 picks at the same crop — the component only
cares about the file names and `FRAME_COUNT`.

## Optional next steps
- If you want a lighter file for slower mobile connections, export a
  compressed/shorter version of the brand film and reference it from a
  `<source media="(max-width: 768px)">` inside `VideoIntro.js`.
- Add real project screenshots under `public/images/projects/<slug>/`
  and wire them into `lib/projects.js` + `app/projects/[slug]/page.js`
  (currently shows a placeholder block).
