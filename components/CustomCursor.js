"use client";

import { useEffect, useRef } from "react";

// Two-layer cursor: an inner dot that tracks the pointer exactly (no lag,
// stays pin-sharp) and an outer ring that trails it with a critically-damped
// lerp for a fluid, weighted feel. Both render as crisp SVG/CSS — no raster
// images — so there's no blur at any zoom or pixel density. Desktop,
// fine-pointer only; a no-op everywhere else.

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const raf = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;

    document.body.classList.add("custom-cursor-active");

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let ringScale = 1;
    let targetScale = 1;

    // Show immediately, centered, rather than waiting for the first
    // mousemove — otherwise a static screenshot/first paint looks like
    // nothing is there at all.
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    dot.style.opacity = "1";
    ring.style.opacity = "1";

    const move = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const onOver = (e) => {
      if (e.target.closest?.("[data-cursor-hover]")) targetScale = 2.1;
    };
    const onOut = (e) => {
      if (e.target.closest?.("[data-cursor-hover]")) targetScale = 1;
    };
    const onLeaveWindow = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const onEnterWindow = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseleave", onLeaveWindow);
    document.addEventListener("mouseenter", onEnterWindow);

    if (reduced) {
      // Keep the ring static under the dot rather than animating it.
      ring.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      const staticSync = (e) => {
        ring.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      };
      window.addEventListener("mousemove", staticSync, { passive: true });
      return () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mousemove", staticSync);
        document.removeEventListener("mouseover", onOver);
        document.removeEventListener("mouseout", onOut);
        document.removeEventListener("mouseleave", onLeaveWindow);
        document.removeEventListener("mouseenter", onEnterWindow);
      };
    }

    const tick = () => {
      // Critically-damped lerp — frame-rate independent enough at 60/120hz
      // to read as smooth weighted momentum rather than a stepped chase.
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ringScale += (targetScale - ringScale) * 0.22;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseleave", onLeaveWindow);
      document.removeEventListener("mouseenter", onEnterWindow);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
