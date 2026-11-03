"use client";

import { useEffect, useRef } from "react";
import { onScrollFrame } from "@/lib/motion";

// Hairline reading-progress bar along the top edge of the viewport.
// Updates only on frames where the page actually scrolled.
export default function ScrollRail() {
  const barRef = useRef(null);
  useEffect(
    () =>
      onScrollFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      }),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left scale-x-0 bg-ember-gradient will-change-transform" />
    </div>
  );
}
