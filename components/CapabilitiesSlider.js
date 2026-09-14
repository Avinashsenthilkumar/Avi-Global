"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import Reveal from "@/components/Reveal";

// Icons are simple, abstract, and generated per-category rather than stock
// photography — consistent with the rest of the site's "no fabricated
// imagery" approach until real project screenshots are added.
const ICONS = {
  "WEB DEVELOPMENT": (
    <path d="M4 6h24v16H4zM4 26h24M12 22l-4-4 4-4M20 14l4 4-4 4" />
  ),
  "E-COMMERCE": (
    <path d="M6 8h20l-2 12H8L6 8zM6 8L5 4H2M12 26a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM22 26a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
  ),
  "WEB APPLICATIONS": (
    <path d="M5 9a2 2 0 012-2h18a2 2 0 012 2v12a2 2 0 01-2 2H7a2 2 0 01-2-2V9zM5 13h22M10 24h12" />
  ),
  "MOBILE APPLICATIONS": (
    <path d="M11 4h10a2 2 0 012 2v20a2 2 0 01-2 2H11a2 2 0 01-2-2V6a2 2 0 012-2zM14 24h4" />
  ),
  "UI / UX DESIGN": (
    <path d="M16 4a12 12 0 100 24 12 12 0 000-24zM16 10v6l4 4" />
  ),
};

export default function CapabilitiesSlider({ slides }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = slides[index];

  function go(next) {
    setDirection(next > index ? 1 : -1);
    setIndex(((next % slides.length) + slides.length) % slides.length);
  }

  return (
    <section className="py-16 md:py-24 px-6 md:px-10 relative overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <RevealText
            text={"ONE PARTNER.\nEVERY SERVICE CONNECTED."}
            as="h2"
            className="font-display font-medium uppercase text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight text-center"
            lineClassName=""
          />
          <Reveal delay={0.2}>
            <p className="mt-6 text-sm md:text-base text-muted leading-relaxed">
              Web, mobile, commerce and support — working off one build system,
              not eight separate vendors.
            </p>
          </Reveal>
        </div>

        <motion.div layout className="relative mt-12 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={active.number}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h3 className="font-display font-medium uppercase text-3xl md:text-5xl text-gradient-gold tracking-tight">
                  {active.title}
                </h3>
                <p className="mt-5 text-base md:text-lg text-white/80 leading-relaxed max-w-md">
                  {active.description}
                </p>
                {active.example && (
                  <div className="mt-8 max-w-md rounded-xl border-l-2 border-gold bg-ink-soft/60 px-6 py-5">
                    <p className="text-sm text-white/70 leading-relaxed">{active.example}</p>
                  </div>
                )}
              </div>

              <div className="flex items-end justify-center lg:justify-end gap-5 py-6 lg:py-0">
                <div className="w-32 md:w-40 aspect-[3/4] rounded-2xl bg-gold-gradient flex items-center justify-center shadow-2xl shadow-black/40">
                  <svg
                    viewBox="0 0 32 32"
                    className="w-14 h-14 text-ink/70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[active.title] || <circle cx="16" cy="16" r="10" />}
                  </svg>
                </div>
                <div className="w-32 md:w-40 aspect-[3/4] rounded-2xl bg-ink-softer border border-white/10 mb-8 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-radial-glow opacity-70" />
                  <span className="relative font-display text-5xl text-white/10">
                    {active.number}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {slides.map((s, i) => (
              <button
                key={s.number}
                onClick={() => go(i)}
                data-cursor-hover
                aria-label={`Show ${s.title}`}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: i === index ? "28px" : "8px",
                  backgroundColor: i === index ? "#F2661C" : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => go(index - 1)}
              aria-label="Previous"
              data-cursor-hover
              className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
            <button
              onClick={() => go(index + 1)}
              aria-label="Next"
              data-cursor-hover
              className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-colors duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
                <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
