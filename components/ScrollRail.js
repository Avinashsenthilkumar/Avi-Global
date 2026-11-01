"use client";

import { useEffect, useRef } from "react";

// Hairline reading-progress bar along the top edge of the viewport.
export default function ScrollRail() {
  const barRef = useRef(null);
  useEffect(() => {
    let raf;
    const tick = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-ember-gradient" />
    </div>
  );
}
