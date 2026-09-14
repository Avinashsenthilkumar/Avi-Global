import PageHero from "@/components/PageHero";
import ProcessTimeline from "@/components/ProcessTimeline";
import FinalCTA from "@/components/FinalCTA";
import { processStepsExtended } from "@/lib/services";

export const metadata = {
  title: "Process",
  description:
    "How AVI GLOBAL SOLUTIONS builds — discover, plan, design, develop, test, deploy, support and scale.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <PageHero title="HOW WE BUILD" />

      <section className="mt-24 px-6 md:px-10 mx-auto max-w-4xl">
        <ProcessTimeline steps={processStepsExtended} />
      </section>

      <div className="mt-24 md:mt-32">
        <FinalCTA />
      </div>
    </div>
  );
}
