"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Logo from "@/components/Logo";
import MagneticButton from "@/components/MagneticButton";
import HeroCharacter from "@/components/HeroCharacter";

const headlineWords = [
  ["WE", "BUILD"],
  ["DIGITAL", "SOLUTIONS"],
  ["THAT", "MOVE", "BUSINESS"],
  ["FORWARD."],
];

export default function Hero({ revealed }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const markRotate = useTransform(scrollYProgress, [0, 1], [0, 18]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={revealed ? { opacity: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen overflow-hidden px-6 md:px-10"
    >
      <div className="noise-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-radial-glow" />

      {/* Ghost brand mark — faint depth layer behind the character */}
      <motion.div
        style={{ y: markY, rotate: markRotate }}
        className="pointer-events-none absolute -right-16 top-1/2 -translate-y-1/2 w-[60vw] max-w-[640px] opacity-[0.05] animate-drift"
        aria-hidden="true"
      >
        <Logo variant="mark" className="w-full h-auto" />
      </motion.div>

      {/* Character stage — a soft spotlight behind the figure plus a floor
          shadow beneath it. Doing this in CSS rather than baking a backdrop
          into the frames keeps the edges clean against the dark theme and
          means the intensity is tunable here in one place. */}
      <div
        className="hidden md:block pointer-events-none absolute right-[4%] xl:right-[8%] bottom-0 top-28 md:w-[20vw] md:max-w-[240px] lg:w-[22vw] lg:max-w-[300px] xl:w-[24vw] xl:max-w-[360px] z-[4]"
        aria-hidden="true"
      >
        {/* Spotlight */}
        <div
          className="absolute left-1/2 top-[8%] h-[78%] w-[190%] -translate-x-1/2 rounded-full blur-3xl opacity-50"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(242,102,28,0.30) 0%, rgba(242,102,28,0.10) 42%, rgba(5,5,5,0) 72%)",
          }}
        />
        {/* Cool rim fill, keeps him from reading as pasted-on */}
        <div
          className="absolute left-1/2 top-[18%] h-[62%] w-[135%] -translate-x-1/2 rounded-full blur-2xl opacity-40"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,181,98,0.16) 0%, rgba(5,5,5,0) 70%)",
          }}
        />
        {/* Floor shadow — grounds the figure */}
        <div
          className="absolute bottom-[2%] left-1/2 h-[5%] w-[78%] -translate-x-1/2 rounded-[50%] blur-xl opacity-70"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)",
          }}
        />
      </div>

      {/* Character — head-turn frames driven by cursor position. Inset from
          the top so he clears the fixed header rather than running under it.
          Frames are tightly cropped to the figure, so the box is narrow. */}
      <HeroCharacter className="hidden md:block pointer-events-none absolute right-[4%] md:w-[20vw] md:max-w-[240px] lg:w-[22vw] lg:max-w-[300px] xl:w-[24vw] xl:max-w-[360px] xl:right-[8%] bottom-0 top-28 z-[5]" />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto max-w-7xl min-h-screen flex flex-col justify-center pt-32 pb-24"
      >
        <div className="max-w-3xl lg:max-w-[52%]">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="block text-xs tracking-widest2 uppercase text-muted mb-8"
          >
            Technology &amp; Digital Solutions
          </motion.span>

          <h1 className="font-display font-medium uppercase leading-[0.98] text-5xl sm:text-6xl md:text-7xl lg:text-[4.6rem]">
            {headlineWords.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <motion.span
                  className="flex flex-wrap gap-x-4"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.06, delayChildren: 0.3 + li * 0.09 },
                    },
                  }}
                  initial="hidden"
                  animate={revealed ? "show" : "hidden"}
                >
                  {line.map((word, wi) => {
                    const isGold = li === 1;
                    return (
                      <motion.span
                        key={wi}
                        variants={{
                          hidden: { y: "115%" },
                          show: {
                            y: "0%",
                            transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
                          },
                        }}
                        className={
                          isGold
                            ? "italic-serif font-normal text-gradient-gold"
                            : ""
                        }
                      >
                        {word}
                      </motion.span>
                    );
                  })}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={revealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-8 text-sm md:text-base text-muted leading-relaxed max-w-md"
          >
            From powerful websites and e-commerce platforms to custom web
            applications and mobile apps, AVI GLOBAL SOLUTIONS delivers
            end-to-end digital solutions built for modern businesses.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={revealed ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
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
              href="/projects"
              data-cursor-hover
              className="inline-flex items-center rounded-full border border-gold/50 px-8 py-3.5 text-xs tracking-widest2 uppercase text-white hover:border-gold hover:text-gold transition-colors duration-300"
            >
              Explore Our Work
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-6 md:left-10 flex flex-col items-start gap-2 text-muted z-10"
      >
        <span className="h-8 w-px bg-gradient-to-b from-transparent to-gold" />
        <span className="text-[10px] tracking-widest2 uppercase">Scroll to Explore</span>
      </motion.div>
    </motion.section>
  );
}
