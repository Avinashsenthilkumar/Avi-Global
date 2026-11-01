"use client";

import { useEffect, useRef } from "react";

// Two counter-scrolling bands of service names. Their speed reacts to how
// fast you scroll and flips direction when you scroll back up — a small
// detail that makes the page feel physically connected to your hand.

export default function Marquee({ items, tone = "dark" }) {
  const rowA = useRef(null);
  const rowB = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    let x = 0;
    let lastY = window.scrollY;
    let velocity = 0;
    let dir = 1;
    let raf;
    const tick = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      if (Math.abs(dy) > 0.5) dir = dy > 0 ? 1 : -1;
      velocity += (Math.min(40, Math.abs(dy)) - velocity) * 0.1;
      x += (0.6 + velocity * 0.25) * dir;
      const wA = rowA.current?.scrollWidth / 2 || 1;
      const wB = rowB.current?.scrollWidth / 2 || 1;
      const a = ((x % wA) + wA) % wA;
      const b = ((x % wB) + wB) % wB;
      if (rowA.current) rowA.current.style.transform = `translate3d(${-a}px,0,0)`;
      if (rowB.current) rowB.current.style.transform = `translate3d(${b - wB}px,0,0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const dark = tone === "dark";
  const doubled = [...items, ...items];

  return (
    <section
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
                dark ? "text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.45)]" : "text-transparent [-webkit-text-stroke:1px_rgba(13,15,18,0.4)]"
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
