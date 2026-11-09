"use client";

import { useEffect, useRef } from "react";
import HeroCharacter from "@/components/HeroCharacter";
import { useVisibleLoop } from "@/lib/motion";

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

const LIGHT = 1040; // spotlight diameter in px

export default function HeroStage({ revealed, boot = false }) {
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const lightRef = useRef(null);
  const chipRefs = useRef([]);
  const st = useRef({ tx: 0.5, ty: 0.4, cx: 0.5, cy: 0.4, w: 1, h: 1, fine: true, reduced: false });

  // Measure the panel once and on resize — never inside the frame loop.
  useEffect(() => {
    const s = st.current;
    s.fine = window.matchMedia("(pointer: fine)").matches;
    s.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = tiltRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      s.w = el.clientWidth;
      s.h = el.clientHeight;
      loop.current.wake();
    });
    ro.observe(el);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The loop runs only while the stage is on screen, and on desktop it goes
  // to sleep as soon as the light has caught up with the pointer.
  const loop = useVisibleLoop(stageRef, () => {
    const s = st.current;
    if (!s.fine) {
      // Phones: park the light behind the figure and let the character's own
      // idle motion carry the scene — one animation loop instead of two.
      s.cx = s.tx = 0.5;
      s.cy = s.ty = 0.42;
    }
    s.cx += (s.tx - s.cx) * 0.08;
    s.cy += (s.ty - s.cy) * 0.08;
    const cx = Math.min(1.2, Math.max(-0.2, s.cx));
    const cy = Math.min(1.2, Math.max(-0.2, s.cy));
    // Move a pre-painted light with a transform (composited, no repaint).
    if (lightRef.current) {
      lightRef.current.style.transform = `translate3d(${cx * s.w - LIGHT / 2}px, ${cy * s.h - LIGHT / 2}px, 0)`;
    }
    if (!s.reduced && s.fine && tiltRef.current) {
      const rx = (0.5 - Math.min(1, Math.max(0, s.cy))) * 6;
      const ry = (Math.min(1, Math.max(0, s.cx)) - 0.5) * 8;
      tiltRef.current.style.transform = `perspective(1400px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      chipRefs.current.forEach((el, i) => {
        if (!el) return;
        const d = CHIPS[i].depth;
        el.style.transform = `translate3d(${(s.cx - 0.5) * -d}px, ${(s.cy - 0.5) * -d}px, 0)`;
      });
    }
    if (Math.abs(s.tx - s.cx) < 0.001 && Math.abs(s.ty - s.cy) < 0.001) return false;
  });

  useEffect(() => {
    if (!st.current.fine) return;
    const onMove = (e) => {
      const r = stageRef.current?.getBoundingClientRect();
      if (!r) return;
      st.current.tx = (e.clientX - r.left) / r.width;
      st.current.ty = (e.clientY - r.top) / r.height;
      loop.current.wake();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={stageRef}
      className={`relative h-full w-full ${
        boot
          ? "hero-fade hero-fade-lg"
          : `transition-[opacity,transform] duration-[1400ms] ease-out ${revealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`
      }`}
      style={boot ? { "--hd": "200ms" } : { transitionDelay: revealed ? "250ms" : "0ms" }}
    >
      <div
        ref={tiltRef}
        className="relative h-full w-full overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-graphite shadow-[0_40px_90px_-30px_rgba(13,15,18,0.55)] will-change-transform"
      >
        {/* Pointer-following spotlight: painted once, moved with a transform */}
        <div
          ref={lightRef}
          className="pointer-events-none absolute left-0 top-0 will-change-transform"
          style={{
            width: LIGHT,
            height: LIGHT,
            transform: "translate3d(-9999px,0,0)",
            background:
              "radial-gradient(closest-side, rgba(255,170,76,0.30), rgba(232,93,16,0.10) 56%, transparent 100%)",
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
        <div
          className="absolute bottom-0 left-1/2 h-[16%] w-[80%] -translate-x-1/2"
          style={{ background: "radial-gradient(closest-side, rgba(232,93,16,0.32), rgba(232,93,16,0.08) 60%, transparent)" }}
        />
        <div
          className="absolute bottom-[2.5%] left-1/2 h-[6%] w-[52%] -translate-x-1/2"
          style={{ background: "radial-gradient(closest-side, rgba(0,0,0,0.7), rgba(0,0,0,0.25) 55%, transparent)" }}
        />

        {/* The character */}
        <HeroCharacter className="absolute inset-x-0 bottom-0 top-[6%] mx-auto w-[72%] max-w-[380px]" />

        {/* Service chips with parallax depth */}
        {CHIPS.map((chip, i) => (
          <div key={chip.label} className={`absolute ${chip.pos} hidden sm:block`}>
            <div ref={(el) => (chipRefs.current[i] = el)} className="will-change-transform">
              <span
                className="animate-float inline-flex items-center gap-2 rounded-full border border-white/15 bg-[#1c1f24]/90 px-3.5 py-2 text-[10px] uppercase tracking-[0.18em] text-white/85 shadow-[0_8px_24px_-10px_rgba(0,0,0,0.6)]"
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
          <span className="hidden [@media(pointer:fine)]:inline">Move your cursor</span>
          <span className="flex items-center gap-1.5 [@media(pointer:fine)]:hidden">
            <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
            Swipe to turn
          </span>
        </div>
      </div>
    </div>
  );
}
