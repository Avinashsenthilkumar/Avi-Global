import Link from "next/link";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-44 px-6 md:px-10 bg-ink overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />
      <div className="relative mx-auto max-w-4xl text-center">
        <RevealText
          text={"YOUR NEXT DIGITAL\nPRODUCT STARTS HERE."}
          as="h2"
          className="font-display font-medium uppercase text-3xl sm:text-5xl md:text-6xl leading-[1.08] tracking-tight text-center"
        />
        <Reveal delay={0.1}>
          <p className="mt-6 text-sm md:text-base text-muted max-w-xl mx-auto leading-relaxed">
            Have an idea, a business challenge or an existing product that needs
            improvement? Let&apos;s build something exceptional.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor-hover
                className="inline-flex items-center rounded-full bg-gold-gradient px-8 py-3.5 text-xs tracking-widest2 uppercase text-ink font-medium"
              >
                Start a Project
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor-hover
                className="inline-flex items-center rounded-full border border-gold/50 px-8 py-3.5 text-xs tracking-widest2 uppercase text-white hover:border-gold hover:text-gold transition-colors duration-300"
              >
                Contact Us
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
