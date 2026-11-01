"use client";

import { useEffect, useRef } from "react";

// Calls `onProgress(p)` every animation frame while `ref` is near the
// viewport, with p running 0 → 1 as the element travels from "top edge at
// the bottom of the screen" to "bottom edge at the top of the screen".
// Mode "sticky" instead measures progress through a tall pinned section:
// 0 when its top reaches the viewport top, 1 when its bottom reaches the
// viewport bottom. Nothing re-renders — callers write styles directly.
export function useScrollProgress(ref, onProgress, mode = "through") {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let visible = true;
    let last = -1;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    io.observe(el);

    const tick = () => {
      if (visible) {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        let p;
        if (mode === "sticky") {
          const span = r.height - vh;
          p = span > 0 ? -r.top / span : 0;
        } else {
          p = (vh - r.top) / (vh + r.height);
        }
        p = Math.min(1, Math.max(0, p));
        if (Math.abs(p - last) > 0.0005) {
          last = p;
          cb.current(p);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [ref, mode]);
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
// Remap p from [a,b] to [0,1], clamped.
export const range = (p, a, b) => clamp((p - a) / (b - a));
