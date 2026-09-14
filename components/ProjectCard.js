"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ProjectThumb from "@/components/ProjectThumb";

export default function ProjectCard({ project, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
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
        </div>
        <div className="p-6">
          <p className="text-xs tracking-widest2 uppercase text-gold mb-2">
            {project.category}
          </p>
          <h3 className="font-display font-medium text-xl uppercase tracking-tight">{project.name}</h3>
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
  );
}
