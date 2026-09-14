"use client";

import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";

const REGIONS = [
  { label: "INDIA", x: "28%", y: "46%" },
  { label: "KENYA", x: "54%", y: "62%" },
  { label: "WORLDWIDE", x: "76%", y: "30%" },
];

export default function GlobalVision() {
  return (
    <section className="relative py-28 md:py-36 px-6 md:px-10 overflow-hidden bg-ink-soft/30">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-16 items-center">
        <div>
          <SectionText />
        </div>

        <Reveal delay={0.15}>
          <div className="relative aspect-square max-w-lg mx-auto">
            <svg viewBox="0 0 400 400" className="w-full h-full opacity-90">
              <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(242,102,28,0.15)" strokeWidth="1" />
              <circle cx="200" cy="200" r="140" fill="none" stroke="rgba(242,102,28,0.1)" strokeWidth="1" />
              <circle cx="200" cy="200" r="100" fill="none" stroke="rgba(242,102,28,0.08)" strokeWidth="1" />
              {[...Array(6)].map((_, i) => (
                <ellipse
                  key={i}
                  cx="200"
                  cy="200"
                  rx="180"
                  ry={20 + i * 28}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="1"
                />
              ))}
            </svg>

            {REGIONS.map((r, i) => (
              <motion.div
                key={r.label}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="absolute flex flex-col items-center gap-2"
                style={{ left: r.x, top: r.y, transform: "translate(-50%, -50%)" }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gold" />
                </span>
                <span className="text-[10px] tracking-widest2 uppercase text-white/80 whitespace-nowrap">
                  {r.label}
                </span>
              </motion.div>
            ))}

            <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full">
              <motion.path
                d="M 112 184 Q 216 220 216 248"
                fill="none"
                stroke="#F2661C"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.6 }}
              />
              <motion.path
                d="M 216 248 Q 260 150 304 120"
                fill="none"
                stroke="#F2661C"
                strokeWidth="1"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.6 }}
                viewport={{ once: true }}
                transition={{ duration: 1.4, delay: 0.9 }}
              />
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionText() {
  return (
    <div>
      <Reveal>
        <span className="block text-xs tracking-widest2 uppercase text-gold mb-4">
          Global Vision
        </span>
      </Reveal>
      <RevealText
        text={"LOCAL EXPERTISE.\nGLOBAL VISION."}
        as="h2"
        className="font-display font-medium uppercase text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight"
      />
      <Reveal delay={0.16}>
        <p className="mt-6 text-sm md:text-base text-muted leading-relaxed max-w-md">
          Technology without borders. Building digital solutions for businesses
          locally and globally.
        </p>
      </Reveal>
    </div>
  );
}
