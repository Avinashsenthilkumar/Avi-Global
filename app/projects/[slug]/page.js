import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import FinalCTA from "@/components/FinalCTA";
import ProjectThumb from "@/components/ProjectThumb";
import ProjectCard from "@/components/ProjectCard";
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

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const meta = [
    { label: "Category", value: project.category },
    project.location && { label: "Location", value: project.location },
    project.website && {
      label: "Live website",
      value: project.website.replace(/^https?:\/\//, ""),
      href: project.website,
    },
    ...(project.also || []).map((a) => ({ label: "Also", value: a.label, href: a.url })),
  ].filter(Boolean);

  return (
    <>
      <section className="relative overflow-x-clip px-4 sm:px-6 md:px-10 pt-32 md:pt-44 pb-12">
        <div className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-ember/20 blur-[140px]" />
        <div className="relative mx-auto max-w-7xl">
          <Reveal>
            <Link href="/projects" data-cursor="hover" className="group inline-flex items-center gap-2 label text-steel hover:text-graphite">
              <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> All projects
            </Link>
          </Reveal>
          <Reveal delay={0.05} className="mt-10 flex items-center gap-3">
            <span className="label text-steel">{String(idx + 1).padStart(2, "0")}</span>
            <span className="h-px w-10 bg-ember" />
            <span className="label text-ember">{project.category}</span>
          </Reveal>
          <RevealText
            as="h1"
            mode="words"
            text={project.name}
            className="mt-6 font-display font-medium uppercase leading-[0.92] tracking-[-0.02em] text-[3rem] sm:text-7xl lg:text-[7rem]"
          />
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div data-clip="" className="relative aspect-[16/10] md:aspect-[16/8] overflow-hidden rounded-[2rem]">
            <ProjectThumb slug={project.slug} name={project.name} zoom={false} className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-10 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <dl className="divide-y divide-graphite/10 border-y border-graphite/10">
              {meta.map((m) => (
                <div key={`${m.label}-${m.value}`} className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="label text-steel">{m.label}</dt>
                  <dd className="text-right text-[15px]">
                    {m.href ? (
                      <a href={m.href} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="underline decoration-ember/50 underline-offset-4 hover:text-ember">
                        {m.value} ↗
                      </a>
                    ) : (
                      m.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal as="h2" className="label mb-6 text-ember">Overview</Reveal>
            <Reveal delay={0.1} as="p" className="font-display text-2xl md:text-4xl leading-[1.25]">
              {project.overview}
            </Reveal>
            {project.website && (
              <Reveal delay={0.2}>
                <a
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="mt-10 inline-flex items-center gap-3 rounded-full bg-graphite px-7 py-4 text-[12px] uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.03]"
                >
                  Visit live website <span className="text-ember-light">↗</span>
                </a>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-10 pb-16 md:pb-24">
        <div className="mx-auto max-w-7xl border-t border-graphite/15 pt-12">
          <p className="label mb-8 text-steel">Next project</p>
          <div className="max-w-xl">
            <ProjectCard project={next} index={(idx + 1) % projects.length} />
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
