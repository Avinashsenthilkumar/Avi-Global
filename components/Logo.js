// Real AVI GLOBAL SOLUTIONS logo. Do not distort, recolor, or restretch —
// only ever scaled uniformly (aspect ratio locked) via the `className` height.
//
// variant="compact"  -> icon + "AVI GLOBAL SOLUTIONS" wordmark (no tagline line)
//                        — used where horizontal space is limited (navbar, footer)
// variant="full"      -> the complete lockup including the tagline line —
//                        used for large, spacious placements (video intro)
// variant="mark"      -> icon only — used at very small sizes
//
// The files in /public/brand are pre-made from the original PNGs: empty
// padding trimmed (so the logo fills its box), resized with a high-quality
// filter, lightly sharpened and saved at near-lossless quality. They are
// served as-is with 1x/2x/3x sources, so the gold and the lettering stay
// crisp on every screen instead of going through a lossy re-compression.

const SETS = {
  compact: { ratio: 744 / 630, heights: [64, 96, 128, 192, 256, 384, 512] },
  full: { ratio: 744 / 781, heights: [240, 480, 720] },
  mark: { ratio: 531 / 487, heights: [64, 128, 192] },
};

const pick = (heights, need) => heights.find((h) => h >= need) || heights[heights.length - 1];

// `height` is the largest CSS height the logo is shown at.
export default function Logo({ className = "h-8 w-auto", variant = "compact", priority = false, height = 64 }) {
  const set = SETS[variant] || SETS.compact;
  const file = (h) => `/brand/logo-${variant in SETS ? variant : "compact"}-${h}.webp`;
  const h1 = pick(set.heights, height);
  const h2 = pick(set.heights, height * 2);
  const h3 = pick(set.heights, height * 3);
  const srcSet = [...new Set([`${file(h1)} 1x`, `${file(h2)} 2x`, `${file(h3)} 3x`])].join(", ");

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={file(h2)}
      srcSet={srcSet}
      alt="AVI GLOBAL SOLUTIONS"
      width={Math.round(set.ratio * height)}
      height={height}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={`object-contain ${className}`}
      draggable={false}
    />
  );
}
