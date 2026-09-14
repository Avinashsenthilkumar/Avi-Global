"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Websites", value: "websites" },
  { label: "E-commerce", value: "ecommerce" },
  { label: "Web Apps", value: "webapps" },
  { label: "Mobile Apps", value: "mobile" },
];

export default function ProjectsClient({ projects }) {
  const [active, setActive] = useState("all");

  const filtered =
    active === "all" ? projects : projects.filter((p) => p.filterCategory === active);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            data-cursor-hover
            className={`text-xs tracking-widest2 uppercase px-5 py-2.5 rounded-full border transition-colors duration-300 ${
              active === f.value
                ? "border-gold bg-gold text-ink"
                : "border-white/15 text-white/70 hover:border-gold/50 hover:text-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Reveal>
          <p className="mt-16 text-center text-muted text-sm">
            No projects in this category yet.
          </p>
        </Reveal>
      )}
    </div>
  );
}
