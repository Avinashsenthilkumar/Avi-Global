"use client";

import { useEffect, useRef } from "react";
import { useVisibleLoop } from "@/lib/motion";

// Two counter-scrolling bands of service names. Their speed reacts to how
// fast you scroll and flips direction when you scroll back up — a small
// detail that makes the page feel physically connected to your hand.

export default function Marquee({ items, tone = "dark" }) {
  const rowA = useRef(null);
  const rowB = useRef(null);

  const sectionRef = useRef(null);
  const state = useRef({ x: 0, lastY: 0, velocity: 0, dir: 1, wA: 1, wB: 1, reduced: false });

  useEffect(() => {
    const st = state.current;
    st.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    st.lastY = window.scrollY;
    // Measure once (and on resize) instead of reading layout every frame.
    const measure = () => {
      st.wA = (rowA.current?.scrollWidth || 2) / 2;
      st.wB = (rowB.current?.scrollWidth || 2) / 2;
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Only animates while the band is on screen and the tab is visible.
  useVisibleLoop(sectionRef, () => {
    const st = state.current;
    if (st.reduced) return false;
    const y = window.scrollY;
    const dy = y - st.lastY;
    st.lastY = y;
    if (Math.abs(dy) > 0.5) st.dir = dy > 0 ? 1 : -1;
    st.velocity += (Math.min(40, Math.abs(dy)) - st.velocity) * 0.1;
    st.x += (0.6 + st.velocity * 0.25) * st.dir;
    const a = ((st.x % st.wA) + st.wA) % st.wA;
    const b = ((st.x % st.wB) + st.wB) % st.wB;
    if (rowA.current) rowA.current.style.transform = `translate3d(${-a}px,0,0)`;
    if (rowB.current) rowB.current.style.transform = `translate3d(${b - st.wB}px,0,0)`;
  });

  const dark = tone === "dark";
  const doubled = [...items, ...items];

  return (
    <section
      ref={sectionRef}
      aria-label="Services"
      className={`relative overflow-hidden py-6 md:py-8 ${dark ? "bg-graphite text-white" : "bg-paper-2 text-graphite"}`}
    >
      <div className="-rotate-[1.5deg] scale-[1.03] space-y-2">
        <div ref={rowA} className="flex w-max will-change-transform">
          {doubled.map((item, i) => (
            <span key={`a${i}`} className="flex items-center gap-8 pr-8 font-display text-4xl md:text-6xl uppercase whitespace-nowrap">
              {item}
              <Star />
            </span>
          ))}
        </div>
        <div ref={rowB} className="flex w-max will-change-transform">
          {doubled.map((item, i) => (
            <span
              key={`b${i}`}
              className={`flex items-center gap-8 pr-8 font-display text-4xl md:text-6xl uppercase italic whitespace-nowrap ${
                dark ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)]" : "text-transparent [-webkit-text-stroke:1px_rgb(var(--c-ink)/0.4)]"
              }`}
            >
              {item}
              <Star />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6z" fill="#E85D10" />
    </svg>
  );
}
