import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/FinalCTA";
import ProjectThumb from "@/components/ProjectThumb";
import { projects, getProjectBySlug } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.overview,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default function ProjectDetailPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <section className="px-6 md:px-10 mx-auto max-w-5xl">
        <Reveal>
          <Link
            href="/projects"
            data-cursor-hover
            className="inline-flex items-center gap-2 text-xs tracking-widest2 uppercase text-muted hover:text-gold transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M13 7H1M1 7L6.5 1.5M1 7L6.5 12.5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            Back to Projects
          </Link>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-8 text-xs tracking-widest2 uppercase text-gold">
            {project.category}
          </p>
          <h1 className="mt-3 font-display font-medium uppercase text-4xl sm:text-5xl md:text-6xl leading-[1.05] tracking-tight">
            {project.name}
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4 border-t border-white/10 pt-8">
            {project.location && (
              <Field label="Location" value={project.location} />
            )}
            <Field label="Category" value={project.category} />
            {project.website && (
              <Field
                label="Live Website"
                value={project.website.replace(/^https?:\/\//, "")}
                href={project.website}
              />
            )}
            {project.also?.map((a) => (
              <Field key={a.url} label="Also" value={a.label} href={a.url} />
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mt-16 px-6 md:px-10 mx-auto max-w-5xl">
        <Reveal>
          <div className="relative aspect-video w-full rounded-2xl border border-white/10 overflow-hidden">
            <ProjectThumb slug={project.slug} name={project.name} className="absolute inset-0 h-full w-full" />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-16 max-w-3xl">
            <h2 className="font-display font-medium uppercase text-xl text-gold tracking-tight">
              Overview
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted leading-relaxed">
              {project.overview}
            </p>
          </div>
        </Reveal>
      </section>

      <div className="mt-24 md:mt-32">
        <FinalCTA />
      </div>
    </div>
  );
}

function Field({ label, value, href }) {
  return (
    <div>
      <p className="text-[10px] tracking-widest2 uppercase text-muted">{label}</p>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover
          className="mt-1 block text-sm text-white hover:text-gold transition-colors"
        >
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm text-white">{value}</p>
      )}
    </div>
  );
}
