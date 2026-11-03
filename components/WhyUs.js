"use client";

import { useRef } from "react";
import SectionHeading from "@/components/SectionHeading";

// Six reasons on a graphite panel. A soft ember light follows the pointer
// across the grid, lighting each cell's border as you pass over it.

export default function WhyUs({ items }) {
  const gridRef = useRef(null);

  // Only the cell under the pointer shows its light, so only it is measured.
  const onMove = (e) => {
    const cell = e.target.closest?.("[data-cell]");
    if (!cell) return;
    const r = cell.getBoundingClientRect();
    cell.style.setProperty("--x", `${e.clientX - r.left}px`);
    cell.style.setProperty("--y", `${e.clientY - r.top}px`);
  };

  return (
    <section className="px-3 sm:px-5 py-6 md:py-10">
      <div className="grain relative mx-auto max-w-[1400px] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-graphite px-5 py-20 text-white sm:px-10 md:px-16 md:py-28">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] glow scale-[1.7] [--glow-a:0.25]" />
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            tone="dark"
            eyebrow="Why AVI Global Solutions"
            title={"Built different.\n*Built for business.*"}
          />

          {/* Hairlines are cell borders (not a filled gap) so the panel's glow
              shows through evenly instead of stopping at a box edge. */}
          <div className="mt-14 md:mt-20 overflow-hidden rounded-3xl border border-white/10">
          <div
            ref={gridRef}
            onMouseMove={onMove}
            className="-mb-px -mr-px grid sm:grid-cols-2 lg:grid-cols-3"
          >
            {items.map((item, i) => (
              <div
                key={item.number}
                data-cell=""
                data-reveal=""
                style={{ "--d": `${(i % 3) * 110}ms` }}
                className="group relative border-b border-r border-white/10 bg-white/[0.015] p-8 md:p-10 min-h-[240px]"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(360px circle at var(--x) var(--y), rgba(232,93,16,0.18), transparent 60%)" }}
                />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-5xl text-white/15 transition-colors duration-500 group-hover:text-ember">
                      {item.number}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-white/20 transition-all duration-500 group-hover:scale-150 group-hover:bg-ember" />
                  </div>
                  <h3 className="mt-10 font-display text-xl md:text-2xl uppercase leading-tight">{item.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/60">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
