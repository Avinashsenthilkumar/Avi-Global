"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ProjectThumb from "@/components/ProjectThumb";

export default function ProjectGallery({ projects }) {
  const scrollerRef = useRef(null);

  function scrollBy(dir) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:-mx-10 md:px-10"
      >
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="shrink-0 w-[80vw] sm:w-[420px] snap-start"
          >
            <Link
              href={`/projects/${project.slug}`}
              data-cursor-hover
              className="group block rounded-2xl overflow-hidden border border-white/10 bg-ink-soft/40 gold-border-hover"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <ProjectThumb
                  slug={project.slug}
                  name={project.name}
                  category={project.category}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute bottom-4 left-4 z-10 font-display text-xs tracking-widest2 uppercase text-white/80">
                  {project.category}
                </span>
              </div>
              <div className="p-6 border-t border-white/10">
                <p className="text-xs tracking-widest2 uppercase text-gold mb-2">
                  {project.category}
                </p>
                <h3 className="font-display font-medium text-xl md:text-2xl uppercase">
                  {project.name}
                </h3>
                {project.location && (
                  <p className="mt-1 text-sm text-muted">{project.location}</p>
                )}
                <div className="mt-4 flex items-center gap-2 text-white/70 group-hover:text-gold transition-colors duration-300">
                  <span className="text-xs tracking-widest2 uppercase">View Project</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 hidden md:flex items-center gap-4">
        <button
          onClick={() => scrollBy(-1)}
          aria-label="Scroll projects left"
          data-cursor-hover
          className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-colors duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
        <button
          onClick={() => scrollBy(1)}
          aria-label="Scroll projects right"
          data-cursor-hover
          className="h-11 w-11 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:border-gold hover:text-gold transition-colors duration-300"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <path d="M1 7H13M13 7L7.5 1.5M13 7L7.5 12.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
