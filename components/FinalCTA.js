import Link from "next/link";
import RevealText from "@/components/RevealText";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import { siteConfig } from "@/lib/config";

export default function FinalCTA() {
  const wa = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`;
  return (
    <section className="px-3 sm:px-5 py-6 md:py-10">
      <div className="grain relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-graphite px-6 py-20 text-white sm:px-10 md:px-16 md:py-28">
        <div className="pointer-events-none absolute left-1/2 top-full h-[700px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/40 blur-[160px]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_auto]">
          <div>
            <Reveal className="mb-6 flex items-center gap-3">
              <span className="h-px w-8 bg-ember" />
              <span className="label text-ember-light">Let&apos;s talk</span>
            </Reveal>
            <RevealText
              mode="words"
              text={"Your next digital\nproduct *starts here.*"}
              className="font-display font-medium uppercase leading-[0.98] tracking-[-0.02em] text-[2.6rem] sm:text-6xl lg:text-[5rem]"
            />
            <Reveal delay={0.3} as="p" className="mt-8 max-w-lg text-[15px] md:text-base leading-relaxed text-white/65">
              Have an idea, a business challenge or an existing product that needs improvement? Let&apos;s build
              something exceptional.
            </Reveal>
            <Reveal delay={0.4} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap text-sm">
              <a href={`tel:+${siteConfig.phoneRaw}`} data-cursor="hover" className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 transition-colors hover:border-ember">
                <span className="text-white/50">Call</span> {siteConfig.phone}
              </a>
              <a href={wa} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="inline-flex items-center gap-3 rounded-full border border-white/15 px-5 py-3 transition-colors hover:border-ember">
                <span className="text-white/50">WhatsApp</span> Chat now
              </a>
            </Reveal>
          </div>

          <Reveal variant="scale" delay={0.2} className="justify-self-center lg:justify-self-end">
            <MagneticButton strength={0.4}>
              <Link
                href="/contact"
                data-cursor="hover"
                className="group relative grid h-48 w-48 md:h-60 md:w-60 place-items-center rounded-full bg-ember-gradient text-center text-[12px] font-medium uppercase tracking-[0.2em] text-white shadow-[0_30px_80px_-20px_rgba(232,93,16,0.7)]"
              >
                <span className="absolute inset-3 rounded-full border border-white/30 transition-transform duration-700 ease-out group-hover:scale-110" />
                <span className="relative">
                  Start a
                  <br />
                  Project
                  <span className="mt-3 block text-lg transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </MagneticButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
