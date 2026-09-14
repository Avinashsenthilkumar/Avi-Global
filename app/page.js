"use client";

import { useState } from "react";
import Link from "next/link";
import VideoIntro from "@/components/VideoIntro";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CapabilitiesSlider from "@/components/CapabilitiesSlider";
import ProjectGallery from "@/components/ProjectGallery";
import Marquee from "@/components/Marquee";
import GlobalVision from "@/components/GlobalVision";
import FinalCTA from "@/components/FinalCTA";
import { homeServices, whyUs } from "@/lib/services";
import { projects } from "@/lib/projects";

const introCards = [
  { title: "WEB DEVELOPMENT" },
  { title: "E-COMMERCE" },
  { title: "WEB APPLICATIONS" },
  { title: "MOBILE APPLICATIONS" },
];

const marqueeItems = homeServices.map((s) => s.title);

export default function HomePage() {
  const [revealed, setRevealed] = useState(false);

  return (
    <>
      <VideoIntro onComplete={() => setRevealed(true)} />
      <Hero revealed={revealed} />

      <Marquee items={marqueeItems} />

      {/* Section 01 — Introduction */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <SectionHeading
              eyebrow="Introduction"
              title={"TECHNOLOGY BUILT\nAROUND YOUR BUSINESS."}
            />
            <Reveal delay={0.1}>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                AVI GLOBAL SOLUTIONS helps businesses transform ideas into
                reliable digital products. We combine strategy, design,
                development and technology to create solutions that are built
                to perform, scale and evolve.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {introCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/10 bg-ink-soft/40 p-6 h-full flex items-center justify-center text-center">
                  <span className="font-display text-xs md:text-sm tracking-widest2 uppercase text-white/80">
                    {card.title}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 02 — Capabilities slider */}
      <div className="bg-ink-soft/20">
        <CapabilitiesSlider slides={homeServices.slice(0, 5)} />
      </div>

      {/* Section 03 — Featured Projects */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SectionHeading eyebrow="Our Work" title={"OUR WORK.\nBUILT FOR THE REAL WORLD."} />
            <Reveal delay={0.1}>
              <Link
                href="/projects"
                data-cursor-hover
                className="inline-flex items-center gap-2 text-xs tracking-widest2 uppercase text-gold border border-gold/40 rounded-full px-6 py-3 hover:bg-gold hover:text-ink transition-colors duration-300 whitespace-nowrap"
              >
                View All Projects
              </Link>
            </Reveal>
          </div>

          <div className="mt-16">
            <ProjectGallery projects={projects.slice(0, 6)} />
          </div>
        </div>
      </section>

      {/* Section 04 — Why AVI GLOBAL SOLUTIONS */}
      <section className="py-16 md:py-24 px-6 md:px-10 bg-ink-soft/20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Avi Global Solutions"
            title={"BUILT DIFFERENT.\nBUILT FOR BUSINESS."}
            align="center"
            className="max-w-2xl mx-auto"
          />
          <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyUs.map((item, i) => (
              <Reveal key={item.number} delay={(i % 3) * 0.08}>
                <div className="border-t border-white/10 pt-6">
                  <span className="font-display text-sm text-gold">{item.number}</span>
                  <h3 className="mt-3 font-display font-medium uppercase text-lg tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <GlobalVision />
      <FinalCTA />
    </>
  );
}
