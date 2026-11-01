"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import ProjectThumb from "@/components/ProjectThumb";
import RevealText from "@/components/RevealText";
import { useScrollProgress } from "@/lib/motion";

// Featured work. On desktop the section pins and vertical scrolling drives
// the cards sideways — a horizontal gallery you move through with the
// wheel. On phones it becomes a native swipe carousel with snap points,
// which is the gesture people already use in apps.

export default function ProjectsShowcase({ projects }) {
  const outerRef = useRef(null);
  const trackRef = useRef(null);
  const barRef = useRef(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const measure = () => {
      const on = mq.matches;
      setPinned(on);
      if (on && trackRef.current) {
        const distance = trackRef.current.scrollWidth - window.innerWidth;
        setHeight(Math.max(0, distance) + window.innerHeight);
      } else {
        setHeight(null);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    mq.addEventListener?.("change", measure);
    return () => {
      window.removeEventListener("resize", measure);
      mq.removeEventListener?.("change", measure);
    };
  }, [projects.length]);

  // Re-measure once the pinned layout (single-row track) has actually rendered.
  useEffect(() => {
    if (!pinned || !trackRef.current) return;
    const id = requestAnimationFrame(() => {
      const distance = trackRef.current.scrollWidth - window.innerWidth;
      setHeight(Math.max(0, distance) + window.innerHeight);
    });
    return () => cancelAnimationFrame(id);
  }, [pinned]);

  useScrollProgress(
    outerRef,
    (p) => {
      if (!pinned || !trackRef.current) return;
      const distance = trackRef.current.scrollWidth - window.innerWidth;
      trackRef.current.style.transform = `translate3d(${-p * distance}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    },
    "sticky"
  );

  return (
    <section ref={outerRef} className="relative bg-paper-2" style={pinned && height ? { height } : undefined}>
      <div className={pinned ? "sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden" : "py-20 md:py-28"}>
        <div className="px-4 sm:px-6 md:px-10">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div data-reveal="" className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-ember" />
                <span className="label text-ember">Our work</span>
              </div>
              <RevealText
                text={"Our work.\n*Built for the real world.*"}
                className="font-display font-medium uppercase leading-[1.02] tracking-[-0.01em] text-[2.1rem] sm:text-5xl lg:text-[3.6rem]"
              />
            </div>
            <Link
              href="/projects"
              data-cursor="hover"
              data-reveal=""
              className="group inline-flex w-fit items-center gap-3 rounded-full border border-graphite/20 bg-white px-6 py-3.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-graphite hover:text-white"
            >
              View all projects
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        <div
          ref={trackRef}
          className={
            pinned
              ? "mt-12 flex w-max gap-6 pl-10 pr-[20vw] will-change-transform"
              : "mt-10 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 sm:px-6 md:px-10 pb-2"
          }
        >
          {projects.map((p, i) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              data-cursor="view"
              data-cursor-label="View"
              className={`group relative block shrink-0 snap-start ${pinned ? "" : "w-[82vw] sm:w-[52vw] md:w-[40vw]"}`}
              // Pinned cards are sized from the viewport height so heading,
              // image and caption always fit on one screen.
              style={pinned ? { width: "min(32vw, calc((100svh - 380px) / 1.25))" } : undefined}
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem]" data-clip="" style={{ "--d": `${i * 90}ms` }}>
                <ProjectThumb slug={p.slug} name={p.name} className="absolute inset-0 h-full w-full" />
                <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-graphite backdrop-blur">
                  {String(i + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-5 flex items-start justify-between gap-4 px-1">
                <div>
                  <p className="label text-ember">{p.category}</p>
                  <h3 className="mt-2 font-display text-2xl md:text-3xl uppercase leading-none">{p.name}</h3>
                  {p.location && <p className="mt-2 text-sm text-steel">{p.location}</p>}
                </div>
                <span className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-graphite/15 transition-all duration-500 ease-out group-hover:-rotate-45 group-hover:border-ember group-hover:bg-ember group-hover:text-white">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {pinned && (
          <div className="mx-10 mt-10 h-px bg-graphite/10">
            <div ref={barRef} className="h-full origin-left scale-x-0 bg-graphite" />
          </div>
        )}
      </div>
    </section>
  );
}
