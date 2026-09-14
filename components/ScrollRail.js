"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

// Signature site element — the "Ascent Rail". A thin vertical line fixed to
// the left edge that fills upward as the page is read, echoing the mountain-
// peak "A" in the mark and the ELEVATE line of the tagline. Desktop only,
// purely ambient (pointer-events none), and reduces to a static line when
// prefers-reduced-motion is set.

export default function ScrollRail() {
  const { scrollYProgress } = useScroll();
  const smoothed = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.4,
  });
  const fillHeight = useTransform(smoothed, [0, 1], ["0%", "100%"]);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  return (
    <div className="pointer-events-none fixed left-6 top-0 bottom-0 z-40 hidden lg:flex flex-col items-center">
      <div className="relative flex-1 w-px bg-white/10 mt-24 mb-24 overflow-hidden">
        <motion.div
          className="absolute bottom-0 left-0 w-full bg-gold-gradient"
          style={{ height: reduced ? "100%" : fillHeight }}
        />
      </div>
      <span
        className="absolute bottom-8 text-[9px] tracking-widest2 uppercase text-muted"
        style={{ writingMode: "vertical-rl" }}
      >
        Elevate
      </span>
    </div>
  );
}
