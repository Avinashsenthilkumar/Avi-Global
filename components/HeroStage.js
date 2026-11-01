"use client";

import { useEffect, useRef } from "react";
import HeroCharacter from "@/components/HeroCharacter";

// The graphite "stage" the character stands on. Three layers of motion,
// all driven from one rAF loop with eased values so nothing jitters:
//   • a soft ember spotlight that follows the pointer across the panel
//   • a gentle 3D tilt of the whole panel toward the pointer
//   • the character itself, whose head turns to follow the cursor
// On touch devices the spotlight drifts on its own so the panel still lives.

const CHIPS = [
  { label: "Web Development", pos: "left-[6%] top-[14%]", depth: 28 },
  { label: "E-Commerce", pos: "right-[6%] top-[30%]", depth: 18 },
  { label: "Mobile Apps", pos: "left-[8%] bottom-[24%]", depth: 22 },
];

export default function HeroStage({ revealed }) {
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const chipRefs = useRef([]);

  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    if (!stage || !tilt) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let tx = 0.5, ty = 0.4, cx = 0.5, cy = 0.4;
    let raf;
    const start = performance.now();

    const onMove = (e) => {
      const r = stage.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
    };
    if (fine) window.addEventListener("mousemove", onMove, { passive: true });

    const tick = (now) => {
      if (!fine) {
        const t = (now - start) / 1000;
        tx = 0.5 + Math.sin(t * 0.5) * 0.3;
        ty = 0.35 + Math.cos(t * 0.4) * 0.12;
      }
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const clx = Math.min(1.2, Math.max(-0.2, cx));
      const cly = Math.min(1.2, Math.max(-0.2, cy));
      stage.style.setProperty("--mx", `${clx * 100}%`);
      stage.style.setProperty("--my", `${cly * 100}%`);
      if (!reduced && fine) {
        const rx = (0.5 - Math.min(1, Math.max(0, cy))) * 6;
        const ry = (Math.min(1, Math.max(0, cx)) - 0.5) * 8;
        tilt.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        chipRefs.current.forEach((el, i) => {
          if (!el) return;
          const d = CHIPS[i].depth;
          el.style.transform = `translate3d(${(cx - 0.5) * -d}px, ${(cy - 0.5) * -d}px, 0)`;
        });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={stageRef}
      className={`relative h-full w-full transition-[opacity,transform] duration-[1400ms] ease-out ${
        revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: revealed ? "250ms" : "0ms" }}
    >
      <div
        ref={tiltRef}
        className="relative h-full w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-graphite shadow-[0_40px_90px_-30px_rgba(13,15,18,0.55)] will-change-transform"
      >
        {/* Pointer-following spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(520px circle at var(--mx,50%) var(--my,40%), rgba(255,170,76,0.30), rgba(232,93,16,0.10) 38%, transparent 68%)",
          }}
        />
        {/* Fine grid that the light rakes across */}
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage: "radial-gradient(ellipse at 50% 45%, #000 20%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, #000 20%, transparent 75%)",
          }}
        />
        {/* Slow orbit ring behind the figure */}
        <div className="absolute left-1/2 top-[44%] aspect-square w-[78%] -translate-x-1/2 -translate-y-1/2">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[9%] rounded-full border border-dashed border-white/[0.08] animate-[spin-slow_60s_linear_infinite]" />
          <div className="absolute inset-0 animate-[spin-slow_18s_linear_infinite]">
            <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_16px_4px_rgba(232,93,16,0.6)]" />
          </div>
        </div>
        {/* Floor glow + shadow to ground the figure */}
        <div className="absolute bottom-[3%] left-1/2 h-[7%] w-[56%] -translate-x-1/2 rounded-[50%] bg-ember/25 blur-2xl" />
        <div className="absolute bottom-[4%] left-1/2 h-[3%] w-[40%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-md" />

        {/* The character */}
        <HeroCharacter className="absolute inset-x-0 bottom-0 top-[6%] mx-auto w-[72%] max-w-[380px]" />

        {/* Service chips with parallax depth */}
        {CHIPS.map((chip, i) => (
          <div key={chip.label} className={`absolute ${chip.pos} hidden sm:block`}>
            <div ref={(el) => (chipRefs.current[i] = el)} className="will-change-transform">
              <span
                className="animate-float inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] text-white/85 backdrop-blur-md"
                style={{ animationDelay: `${i * -2}s` }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                {chip.label}
              </span>
            </div>
          </div>
        ))}

        {/* Corner caption */}
        <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/45">
          <span>Thanjavur → Worldwide</span>
          <span className="hidden md:inline">Move your cursor</span>
        </div>
      </div>
    </div>
  );
}
