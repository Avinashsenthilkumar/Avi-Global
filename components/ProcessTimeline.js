"use client";

import { useRef } from "react";
import { useScrollProgress } from "@/lib/motion";

// Vertical timeline whose spine fills as you scroll through it. Each step's
// marker lights up the moment the line reaches it, and the step's copy
// brightens — so progress through the process is literally drawn.

export default function ProcessTimeline({ steps }) {
  const wrapRef = useRef(null);
  const fillRef = useRef(null);
  const stepRefs = useRef([]);

  useScrollProgress(wrapRef, (p) => {
    // Map so the line is empty when the list enters and full near its end.
    const t = Math.min(1, Math.max(0, (p - 0.18) / 0.55));
    if (fillRef.current) fillRef.current.style.transform = `scaleY(${t})`;
    const n = steps.length;
    stepRefs.current.forEach((el, i) => {
      if (!el) return;
      const on = t >= i / Math.max(1, n - 1) - 0.001;
      el.classList.toggle("is-active", on);
    });
  });

  return (
    <div ref={wrapRef} className="relative">
      <div className="absolute left-[19px] md:left-1/2 top-2 bottom-2 w-px -translate-x-1/2 bg-graphite/10">
        <div ref={fillRef} className="h-full w-full origin-top scale-y-0 bg-ember-gradient" />
      </div>

      <ol className="space-y-12 md:space-y-20">
        {steps.map((step, i) => {
          const right = i % 2 === 1;
          return (
            <li
              key={step.number}
              ref={(el) => (stepRefs.current[i] = el)}
              className="group/step relative grid grid-cols-[40px_1fr] gap-5 md:grid-cols-2 md:gap-16"
            >
              <span className="absolute left-[19px] md:left-1/2 top-1 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-graphite/15 bg-paper font-display text-sm text-steel transition-all duration-500 group-[.is-active]/step:border-ember group-[.is-active]/step:bg-ember group-[.is-active]/step:text-white group-[.is-active]/step:shadow-[0_0_0_8px_rgba(232,93,16,0.12)]">
                {step.number}
              </span>
              <div
                className={`col-start-2 row-start-1 transition-opacity duration-500 opacity-40 group-[.is-active]/step:opacity-100 ${
                  right ? "md:col-start-2" : "md:col-start-1 md:row-start-1 md:text-right"
                }`}
              >
                <h3 className="font-display text-3xl md:text-5xl uppercase leading-none tracking-[-0.01em]">{step.title}</h3>
                <p className={`mt-3 max-w-sm text-[15px] leading-relaxed text-steel ${right ? "" : "md:ml-auto"}`}>{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
