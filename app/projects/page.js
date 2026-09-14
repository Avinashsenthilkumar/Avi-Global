import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import ProjectsClient from "@/app/projects/ProjectsClient";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description:
    "Digital solutions designed, developed and delivered for businesses across industries.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <PageHero
        title="SELECTED WORK"
        subtitle="Digital solutions designed, developed and delivered for businesses across industries."
      />

      <section className="mt-16 px-6 md:px-10 mx-auto max-w-7xl">
        <ProjectsClient projects={projects} />
      </section>

      <div className="mt-24 md:mt-32">
        <FinalCTA />
      </div>
    </div>
  );
}
