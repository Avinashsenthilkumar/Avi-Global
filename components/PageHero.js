import RevealText from "@/components/RevealText";
import Reveal from "@/components/Reveal";

// Shared hero for inner pages: oversized headline revealed word-by-word,
// an index label, and a soft ember glow + dot grid for depth.
export default function PageHero({ eyebrow, title, subtitle, index }) {
  return (
    <section className="relative isolate overflow-x-clip px-4 sm:px-6 md:px-10 pt-36 md:pt-48 pb-16 md:pb-24">
      <div className="pointer-events-none absolute -right-40 -top-32 -z-10 h-[560px] w-[560px] glow scale-[1.7] [--glow-a:0.2]" />
      <div
        className="dot-grid pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{ maskImage: "radial-gradient(ellipse at 70% 30%, #000 10%, transparent 65%)", WebkitMaskImage: "radial-gradient(ellipse at 70% 30%, #000 10%, transparent 65%)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mb-8 flex items-center gap-3">
          {index && <span className="label text-steel">{index}</span>}
          <span className="h-px w-10 bg-ember" />
          {eyebrow && <span className="label text-ember">{eyebrow}</span>}
        </Reveal>
        <RevealText
          as="h1"
          mode="words"
          stagger={0.07}
          text={title}
          className="max-w-5xl font-display font-medium uppercase leading-[0.95] tracking-[-0.02em] text-[2.8rem] sm:text-6xl md:text-7xl lg:text-[6.2rem]"
        />
        {subtitle && (
          <Reveal delay={0.35} as="p" className="mt-8 max-w-xl text-[15px] md:text-lg leading-relaxed text-steel">
            {subtitle}
          </Reveal>
        )}
      </div>
    </section>
  );
}
