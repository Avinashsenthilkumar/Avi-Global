"use client";

import { useEffect, useRef } from "react";

// Two-layer cursor, desktop only.
//  • A dot that sits exactly on the pointer (difference-blended, so it is
//    dark over the light page and light over graphite panels).
//  • An ember ring that follows with spring-like easing and morphs by
//    context: grows on links/buttons (data-cursor="hover"), and becomes a
//    filled disc with a label over project cards (data-cursor="view").
// All motion runs in one requestAnimationFrame loop with transforms only,
// and the loop sleeps the moment the ring settles, so an idle mouse costs
// nothing.

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    document.body.classList.add("custom-cursor-active");

    let mx = -100, my = -100, rx = -100, ry = -100;
    let scale = 1, targetScale = 1;
    let fill = 0, targetFill = 0;
    let visible = false;
    let raf = 0;
    let running = false;
    const wake = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const show = (v) => {
      visible = v;
      dot.style.opacity = v ? "1" : "0";
      ring.style.opacity = v ? "1" : "0";
    };

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        rx = mx;
        ry = my;
        show(true);
      }
      wake();
    };

    const onOver = (e) => {
      const t = e.target.closest?.("[data-cursor],[data-cursor-hover]");
      if (!t) {
        targetScale = 1;
        targetFill = 0;
        label.style.opacity = "0";
        wake();
        return;
      }
      const kind = t.getAttribute("data-cursor") || "hover";
      if (kind === "view") {
        targetScale = 2.4;
        targetFill = 1;
        label.textContent = t.getAttribute("data-cursor-label") || "View";
        label.style.opacity = "1";
      } else {
        targetScale = 1.6;
        targetFill = 0;
        label.style.opacity = "0";
      }
      wake();
    };

    const onDown = () => {
      targetScale *= 0.8;
      wake();
    };
    const onUp = () => {
      targetScale /= 0.8;
      wake();
    };
    const onLeave = () => show(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);

    const k = reduced ? 1 : 0.18;
    function tick() {
      rx += (mx - rx) * k;
      ry += (my - ry) * k;
      scale += (targetScale - scale) * 0.18;
      fill += (targetFill - fill) * 0.18;

      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0) scale(${1 - fill})`;
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${scale})`;
      ring.style.backgroundColor = `rgba(232, 93, 16, ${fill * 0.92})`;
      label.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      const settled =
        Math.abs(mx - rx) < 0.1 &&
        Math.abs(my - ry) < 0.1 &&
        Math.abs(targetScale - scale) < 0.002 &&
        Math.abs(targetFill - fill) < 0.002;
      if (settled) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring hidden md:block" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot hidden md:block" aria-hidden="true" />
      <div ref={labelRef} className="cursor-label hidden md:block" aria-hidden="true" />
    </>
  );
}
