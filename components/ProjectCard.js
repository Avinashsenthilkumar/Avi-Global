import Link from "next/link";
import ProjectThumb from "@/components/ProjectThumb";

export default function ProjectCard({ project, index = 0, tall = false }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      data-cursor="view"
      data-cursor-label="View"
      className="group block"
    >
      <div
        data-clip=""
        style={{ "--d": `${(index % 2) * 120}ms` }}
        className={`relative overflow-hidden rounded-[1.75rem] ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}
      >
        <ProjectThumb slug={project.slug} name={project.name} className="absolute inset-0 h-full w-full" />
        <span className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white text-graphite transition-all duration-500 ease-out group-hover:-rotate-45 md:opacity-0 md:group-hover:opacity-100">
          →
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 px-1">
        <div>
          <p className="label text-ember">{project.category}</p>
          <h3 className="mt-2 font-display text-2xl md:text-3xl uppercase leading-none transition-colors duration-300 group-hover:text-ember">
            {project.name}
          </h3>
          {project.location && <p className="mt-2 text-sm text-steel">{project.location}</p>}
        </div>
        <span className="font-display text-sm text-steel-light">{String(index + 1).padStart(2, "0")}</span>
      </div>
    </Link>
  );
}
