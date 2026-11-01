"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/motion";

// A paragraph whose words light up one after another as you scroll past —
// reading speed is tied to scroll speed. Words start faint and resolve to
// full ink; *asterisked* words resolve to the ember gradient instead.

export default function ScrubText({ text, className = "" }) {
  const ref = useRef(null);
  const words = text.split(" ");

  useScrollProgress(ref, (p) => {
    const spans = ref.current?.querySelectorAll("[data-w]");
    if (!spans) return;
    // Reveal across the middle of the element's journey through the viewport.
    const t = Math.min(1, Math.max(0, (p - 0.22) / 0.42));
    const lit = t * spans.length;
    spans.forEach((s, i) => {
      const o = Math.min(1, Math.max(0.14, lit - i + 0.14));
      s.style.opacity = String(o);
    });
  });

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const accent = w.startsWith("*") && w.replace(/[.,]$/, "").endsWith("*");
        const clean = w.replace(/\*/g, "");
        return (
          <span key={i} data-w="" className={`inline transition-opacity duration-200 ${accent ? "text-ember-gradient italic" : ""}`} style={{ opacity: 0.14 }}>
            {clean}{" "}
          </span>
        );
      })}
    </p>
  );
}
