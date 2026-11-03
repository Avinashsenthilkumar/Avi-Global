"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Momentum smooth scroll for the whole site. Lenis still drives the native
// scroll position, so sticky sections, scroll-linked effects and anchor
// links keep working. Off for touch devices (native scrolling already feels
// right there and keeps the app-like feel) and under reduced motion.

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    window.__lenis = lenis;

    // Drive Lenis only while it is actually animating. Once the scroll has
    // come to rest the loop stops, and the next wheel / key / scrollTo wakes
    // it — so a page you're just reading costs no frames at all.
    let raf = 0;
    let running = false;
    let idle = 0;
    const loop = (time) => {
      lenis.raf(time);
      const busy = lenis.isScrolling || lenis.animate?.isRunning;
      idle = busy ? 0 : idle + 1;
      if (idle > 20) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    const wake = () => {
      idle = 0;
      if (running) return;
      running = true;
      lenis.time = 0; // restart Lenis' clock so the first frame isn't a jump
      raf = requestAnimationFrame(loop);
    };
    const scrollTo = lenis.scrollTo.bind(lenis);
    lenis.scrollTo = (...args) => {
      wake();
      return scrollTo(...args);
    };
    const opts = { capture: true, passive: true };
    window.addEventListener("wheel", wake, opts);
    window.addEventListener("keydown", wake, opts);
    window.addEventListener("pointerdown", wake, opts);
    wake();

    return () => {
      window.removeEventListener("wheel", wake, opts);
      window.removeEventListener("keydown", wake, opts);
      window.removeEventListener("pointerdown", wake, opts);
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // New page always starts at the top.
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
