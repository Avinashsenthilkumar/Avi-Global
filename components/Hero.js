"use client";

import { useRef } from "react";
import Link from "next/link";
import RevealText from "@/components/RevealText";
import MagneticButton from "@/components/MagneticButton";
import HeroStage from "@/components/HeroStage";
import { useScrollProgress } from "@/lib/motion";
import { siteConfig } from "@/lib/config";

export default function Hero({ revealed }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const stageWrapRef = useRef(null);

  // Scroll-out: copy drifts up and fades, the stage eases back slightly.
  useScrollProgress(sectionRef, (p) => {
    const out = Math.max(0, (p - 0.5) * 2);
    if (textRef.current) {
      textRef.current.style.transform = `translate3d(0, ${out * -80}px, 0)`;
      textRef.current.style.opacity = String(1 - out * 0.9);
    }
    if (stageWrapRef.current) {
      stageWrapRef.current.style.transform = `translate3d(0, ${out * 40}px, 0) scale(${1 - out * 0.06})`;
    }
  });

  // "boot": no intro, so the entrance is pure CSS keyframes that start on
  // first paint (see .hero-boot in globals.css). With the intro on, the
  // older transition-based entrance waits for the intro to finish.
  const boot = !siteConfig.showIntro;
  const fade = () =>
    boot
      ? "hero-fade"
      : `transition-all duration-1000 ease-out ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`;
  const delayStyle = (ms) => (boot ? { "--hd": `${ms}ms` } : { transitionDelay: revealed ? `${ms}ms` : "0ms" });

  return (
    <section
      ref={sectionRef}
      className="grain relative overflow-hidden px-4 sm:px-6 md:px-10 pt-24 md:pt-32 lg:pt-32 pb-12 md:pb-20 lg:pb-16 lg:min-h-[100svh] lg:flex lg:items-center"
    >
      {/* Ambient light + dot grid */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-[620px] w-[620px] glow scale-[1.7] [--glow-a:0.2]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[520px] w-[520px] glow scale-[1.7] [--glow:154_163_178] [--glow-a:0.3]" />
      <div
        className="dot-grid pointer-events-none absolute inset-0 opacity-60"
        style={{ maskImage: "radial-gradient(ellipse at 30% 40%, #000 10%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at 30% 40%, #000 10%, transparent 70%)" }}
      />

      {/* Phones and tablets: the copy column "dissolves" (display: contents) so
          the character can sit right under the headline — visible on the
          very first screen instead of below the buttons. */}
      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-0 lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <div ref={textRef} className={`contents lg:block lg:col-span-7 ${boot ? "hero-boot" : revealed ? "is-in" : ""}`}>
          <div className={`order-1 mb-6 md:mb-7 flex items-center gap-3 ${fade()}`} style={delayStyle(100)}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-ember animate-[pulse-ring_1.8s_ease-out_infinite]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ember" />
            </span>
            <span className="label text-steel">Technology &amp; Digital Solutions</span>
          </div>

          <RevealText
            as="h1"
            trigger="manual"
            delay={0.25}
            stagger={0.11}
            text={"We build\n*digital solutions*\nthat move\nbusiness forward."}
            className="order-2 font-display font-medium uppercase leading-[0.95] tracking-[-0.02em] text-[2.55rem] sm:text-6xl md:text-7xl lg:text-[4.6rem] xl:text-[5.1rem] 2xl:text-[5.6rem]"
          />

          <p
            className={`order-4 mt-7 max-w-[34rem] text-[15px] md:text-[17px] leading-relaxed text-steel ${fade()}`}
            style={delayStyle(850)}
          >
            From powerful websites and e-commerce platforms to custom web applications and mobile apps,
            AVI GLOBAL SOLUTIONS delivers end-to-end digital solutions built for modern businesses.
          </p>

          <div className={`order-5 mt-8 md:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4 ${fade()}`} style={delayStyle(1000)}>
            <MagneticButton>
              <Link
                href="/contact"
                data-cursor="hover"
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-graphite px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white"
              >
                Start a Project
                <span className="grid h-6 w-6 place-items-center rounded-full bg-ember-gradient transition-transform duration-500 ease-out group-hover:rotate-[-45deg]">
                  <Arrow />
                </span>
              </Link>
            </MagneticButton>
            <MagneticButton>
              <Link
                href="/projects"
                data-cursor="hover"
                className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-graphite/20 bg-white/80 px-8 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-graphite transition-colors duration-300 hover:border-graphite"
              >
                Explore Our Work
              </Link>
            </MagneticButton>
          </div>

          <div className={`order-6 mt-10 hidden md:flex items-center gap-6 text-[12px] text-steel ${fade()}`} style={delayStyle(1150)}>
            {siteConfig.regions.map((r, i) => (
              <span key={r} className="flex items-center gap-6">
                {i > 0 && <span className="h-3 w-px bg-graphite/20" />}
                {r}
              </span>
            ))}
          </div>
        </div>

        {/* Stage */}
        <div ref={stageWrapRef} className="order-3 lg:order-none mt-7 lg:mt-0 lg:col-span-5 h-[50svh] min-h-[340px] max-h-[780px] md:h-[64svh] md:min-h-[440px] lg:h-[calc(100svh-10rem)] lg:min-h-[520px] will-change-transform">
          <HeroStage revealed={revealed} boot={boot} />
        </div>
      </div>

      {/* Scroll cue */}
      <div className={`absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex ${fade()}`} style={delayStyle(1400)}>
        <span className="label text-steel">Scroll to explore</span>
        <span className="relative h-10 w-[1.5px] overflow-hidden rounded bg-graphite/10">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-graphite animate-[scrollcue_2s_cubic-bezier(0.76,0,0.24,1)_infinite]" />
        </span>
      </div>
      <style>{`@keyframes scrollcue { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }`}</style>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="#fff" strokeWidth="1.6" />
    </svg>
  );
}
