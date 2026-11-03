"use client";

import { useEffect, useState } from "react";
import VideoIntro from "@/components/VideoIntro";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ScrubText from "@/components/ScrubText";
import Reveal from "@/components/Reveal";
import ServicesStack from "@/components/ServicesStack";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import WhyUs from "@/components/WhyUs";
import SectionHeading from "@/components/SectionHeading";
import ProcessTimeline from "@/components/ProcessTimeline";
import GlobalVision from "@/components/GlobalVision";
import FinalCTA from "@/components/FinalCTA";
import { homeServices, whyUs, processSteps } from "@/lib/services";
import { projects } from "@/lib/projects";
import { siteConfig } from "@/lib/config";

const CAPABILITIES = [
  { title: "Web Development", icon: <path d="M4 6h24v16H4zM4 26h24M12 18l-3-3 3-3M20 12l3 3-3 3" /> },
  { title: "E-Commerce", icon: <path d="M6 9h20l-2 11H8L6 9zM6 9 5 5H2M12 26a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM22 26a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" /> },
  { title: "Web Applications", icon: <path d="M4 8a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 12h24M9 17h6M9 20h10" /> },
  { title: "Mobile Applications", icon: <path d="M11 3h10a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 25h4" /> },
];

export default function HomePage() {
  const [revealed, setRevealed] = useState(false);

  // With the intro switched off, start the hero entrance on the next frame
  // so its animation still plays.
  useEffect(() => {
    if (siteConfig.showIntro) return;
    const id = requestAnimationFrame(() => setRevealed(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      {siteConfig.showIntro && <VideoIntro onComplete={() => setRevealed(true)} />}
      <Hero revealed={revealed} />

      <Marquee items={homeServices.map((s) => s.title)} />

      {/* Introduction — a statement that resolves word by word on scroll */}
      <section className="px-4 sm:px-6 md:px-10 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal className="mb-10 flex items-center gap-3">
            <span className="h-px w-8 bg-ember" />
            <span className="label text-ember">Technology built around your business</span>
          </Reveal>
          <ScrubText
            className="max-w-6xl font-display text-[1.9rem] sm:text-4xl md:text-5xl lg:text-[3.6rem] leading-[1.12] tracking-[-0.01em]"
            text="AVI GLOBAL SOLUTIONS helps businesses transform ideas into *reliable* digital products. We combine strategy, design, development and technology to create solutions that are built to *perform,* *scale* and *evolve.*"
          />

          <div className="mt-16 md:mt-24 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.08}>
                <div
                  data-cursor="hover"
                  className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card p-5 md:p-7 transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_30px_60px_-30px_rgba(13,15,18,0.35)]"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-ember-gradient transition-transform duration-700 ease-out group-hover:scale-x-100" />
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-paper text-graphite transition-colors duration-500 group-hover:bg-graphite group-hover:text-ember-light">
                    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {c.icon}
                    </svg>
                  </span>
                  <p className="mt-10 md:mt-14 font-display text-lg md:text-2xl uppercase leading-tight">{c.title}</p>
                  <span className="label mt-2 block text-steel">0{i + 1}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ServicesStack services={homeServices} />

      <ProjectsShowcase projects={projects.slice(0, 6)} />

      <WhyUs items={whyUs} />

      {/* Process */}
      <section className="px-4 sm:px-6 md:px-10 py-20 md:py-32">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            align="center"
            eyebrow="Our process"
            title={"From idea\n*to impact.*"}
            intro="Seven clear stages, one accountable team — so you always know what's happening and what comes next."
          />
          <div className="mx-auto mt-16 md:mt-24 max-w-5xl">
            <ProcessTimeline steps={processSteps} />
          </div>
        </div>
      </section>

      <GlobalVision />
      <FinalCTA />
    </>
  );
}
