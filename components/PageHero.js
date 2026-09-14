import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";

export default function PageHero({ eyebrow, title, subtitle }) {
  return (
    <section className="px-6 md:px-10 mx-auto max-w-5xl text-center">
      {eyebrow && (
        <Reveal>
          <span className="block text-xs tracking-widest2 uppercase text-gold mb-6">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <RevealText
        text={title}
        as="h1"
        className="font-display font-medium uppercase text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight text-center"
      />
      {subtitle && (
        <Reveal delay={0.3}>
          <p className="mt-8 text-sm md:text-base text-muted max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </Reveal>
      )}
    </section>
  );
}
