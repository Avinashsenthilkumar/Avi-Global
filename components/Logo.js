import Image from "next/image";

// Real AVI GLOBAL SOLUTIONS logo. Do not distort, recolor, or restretch —
// only ever scaled uniformly (aspect ratio locked) via the `className` height.
//
// variant="compact"  -> icon + "AVI GLOBAL SOLUTIONS" wordmark (no tagline line)
//                        — used where horizontal space is limited (navbar, footer)
// variant="full"      -> the complete lockup exactly as supplied, including the
//                        tagline line — used for large, spacious placements
//                        (video intro, loading moment)
// variant="mark"      -> icon only — used at very small sizes

const SOURCES = {
  compact: { src: "/logo-compact.png", width: 768, height: 657 },
  full: { src: "/logo.png", width: 1024, height: 1024 },
  mark: { src: "/favicon-mark.png", width: 565, height: 565 },
};

// `height` is the largest CSS height the logo is shown at. next/image then
// builds its 1x/2x sources from that, instead of from the 768–1024px
// originals — the navbar mark downloads ~110px-tall images, not 1500px ones.
export default function Logo({ className = "h-8 w-auto", variant = "compact", priority = false, height = 64 }) {
  const { src, width: w0, height: h0 } = SOURCES[variant] || SOURCES.compact;
  const width = Math.round((w0 / h0) * height);
  return (
    <Image
      src={src}
      alt="AVI GLOBAL SOLUTIONS"
      width={width}
      height={height}
      priority={priority}
      className={`object-contain ${className}`}
    />
  );
}
