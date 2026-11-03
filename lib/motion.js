"use client";

import { useEffect, useRef } from "react";

// ---------------------------------------------------------------------------
// One shared scroll/resize scheduler for the whole site.
//
// Every scroll-linked effect subscribes here instead of running its own
// requestAnimationFrame loop. A single passive listener coalesces events into
// at most one callback pass per frame, and when the page isn't scrolling,
// nothing runs at all — no idle loops burning battery.
// ---------------------------------------------------------------------------
const subscribers = new Set();
let scheduled = false;
let listening = false;

function flush() {
  scheduled = false;
  subscribers.forEach((fn) => fn());
}
function schedule() {
  if (scheduled) return;
  scheduled = true;
  requestAnimationFrame(flush);
}
function ensureListening() {
  if (listening || typeof window === "undefined") return;
  listening = true;
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule, { passive: true });
}

export function onScrollFrame(fn) {
  ensureListening();
  subscribers.add(fn);
  schedule(); // run once so initial positions are correct
  return () => subscribers.delete(fn);
}

// Calls `onProgress(p)` whenever the page scrolls while `ref` is near the
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
    let near = true;
    let last = -1;

    const update = () => {
      if (!near) return;
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
    };

    // The observer reports asynchronously, often after the scroll frame that
    // brought the element back — so catch up the moment it becomes near.
    const io = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) update();
      },
      { rootMargin: "20% 0px 20% 0px" }
    );
    io.observe(el);

    const off = onScrollFrame(update);
    return () => {
      off();
      io.disconnect();
    };
  }, [ref, mode]);
}

// Runs `tick(now)` every frame only while `ref` is on screen and the tab is
// visible. `tick` returns false to go to sleep; call the returned `wake()`
// (e.g. from a mousemove) to start it again.
export function useVisibleLoop(ref, tick, deps = []) {
  const tickRef = useRef(tick);
  tickRef.current = tick;
  const api = useRef({ wake: () => {} });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let inView = false;
    let running = false;
    let raf = 0;

    const loop = (now) => {
      if (!inView || document.visibilityState !== "visible") {
        running = false;
        return;
      }
      const keepGoing = tickRef.current(now);
      if (keepGoing === false) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      if (running || !inView) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    api.current.wake = wake;

    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) wake();
    });
    io.observe(el);
    const onVis = () => document.visibilityState === "visible" && wake();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);

  return api;
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
// Remap p from [a,b] to [0,1], clamped.
export const range = (p, a, b) => clamp((p - a) / (b - a));
