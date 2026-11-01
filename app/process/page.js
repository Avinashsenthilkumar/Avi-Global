import PageHero from "@/components/PageHero";
import ProcessTimeline from "@/components/ProcessTimeline";
import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/Reveal";
import { processStepsExtended } from "@/lib/services";

export const metadata = {
  title: "Process",
  description:
    "How AVI GLOBAL SOLUTIONS builds — discover, plan, design, develop, test, deploy, support and scale.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Process"
        title={"How *we build.*"}
        subtitle="Eight stages from first conversation to a product that keeps growing with your business. Scroll — the line follows you."
      />

      {/* Stage overview chips */}
      <section className="px-4 sm:px-6 md:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap gap-2">
          {processStepsExtended.map((s, i) => (
            <Reveal key={s.number} delay={i * 0.05}>
              <span className="inline-flex items-center gap-2 rounded-full border border-graphite/15 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.16em]">
                <span className="text-ember">{s.number}</span> {s.title}
              </span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-10 py-20 md:py-32">
        <div className="mx-auto max-w-5xl">
          <ProcessTimeline steps={processStepsExtended} />
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
