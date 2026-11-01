"use client";

import { useState } from "react";
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
  const filtered = active === "all" ? projects : projects.filter((p) => p.filterCategory === active);

  return (
    <div>
      {/* Filter bar — scrolls sideways on phones like an app's segmented control */}
      <div className="-mx-4 overflow-x-auto px-4 scrollbar-hide sm:mx-0 sm:px-0">
        <div role="tablist" aria-label="Filter projects" className="inline-flex gap-1 rounded-full border border-graphite/10 bg-white p-1">
          {FILTERS.map((f) => {
            const count = f.value === "all" ? projects.length : projects.filter((p) => p.filterCategory === f.value).length;
            const on = active === f.value;
            return (
              <button
                key={f.value}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => setActive(f.value)}
                data-cursor="hover"
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] transition-all duration-300 ${
                  on ? "bg-graphite text-white" : "text-graphite/70 hover:text-graphite"
                }`}
              >
                {f.label} <span className={on ? "text-ember-light" : "text-steel-light"}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Re-keying the grid on filter change replays the reveal animations */}
      <div key={active} className="mt-12 grid gap-x-6 gap-y-14 md:grid-cols-2">
        {filtered.map((project, i) => (
          <div key={project.slug} className={i % 2 === 1 ? "md:mt-24" : ""}>
            <ProjectCard project={project} index={i} tall={i % 3 === 0} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-16 rounded-3xl border border-dashed border-graphite/20 p-12 text-center">
          <p className="font-display text-2xl uppercase">More coming soon</p>
          <p className="mt-2 text-sm text-steel">No projects in this category yet — check another filter.</p>
          <button
            type="button"
            onClick={() => setActive("all")}
            className="mt-6 rounded-full bg-graphite px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-white"
          >
            Show all projects
          </button>
        </div>
      )}
    </div>
  );
}
