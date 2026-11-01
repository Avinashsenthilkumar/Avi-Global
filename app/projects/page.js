import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import ProjectsClient from "@/app/projects/ProjectsClient";
import { projects } from "@/lib/projects";

export const metadata = {
  title: "Projects",
  description: "Digital solutions designed, developed and delivered for businesses across industries.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Projects"
        title={"Selected *work.*"}
        subtitle="Digital solutions designed, developed and delivered for businesses across industries."
      />
      <section className="px-4 sm:px-6 md:px-10 pb-20 md:pb-32">
        <div className="mx-auto max-w-7xl">
          <ProjectsClient projects={projects} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
