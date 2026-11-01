import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";
import FinalCTA from "@/components/FinalCTA";

export const metadata = {
  title: "About",
  description:
    "AVI GLOBAL SOLUTIONS is a technology and digital solutions company focused on building meaningful digital products for modern businesses.",
  alternates: { canonical: "/about" },
};

const values = ["Innovation", "Integrity", "Quality", "Reliability", "Growth", "Customer Success"];

const sections = [
  {
    label: "Who we are",
    text: "AVI GLOBAL SOLUTIONS is a modern technology and digital solutions company providing end-to-end digital solutions for businesses, startups and organizations — from business and corporate websites to e-commerce platforms, web applications, mobile applications and custom software.",
  },
  {
    label: "Our mission",
    text: "To help businesses transform ideas into reliable digital products by combining strategy, design, development and technology into solutions built to perform, scale and evolve.",
  },
  {
    label: "Our vision",
    text: "To be a trusted technology partner for businesses locally and globally, delivering digital solutions without borders.",
  },
  {
    label: "Our approach",
    text: "We take a business-first approach, understanding the problem before building the technology, and deliver end-to-end — from strategy and design through development, deployment and ongoing support.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="01"
        eyebrow="About us"
        title={"We turn ideas into *digital reality.*"}
        subtitle="AVI GLOBAL SOLUTIONS is a technology and digital solutions company focused on building meaningful digital products for modern businesses."
      />

      <section className="px-4 sm:px-6 md:px-10 pb-10 md:pb-20">
        <div className="mx-auto max-w-7xl divide-y divide-graphite/10 border-y border-graphite/10">
          {sections.map((s, i) => (
            <div key={s.label} className="grid gap-6 py-12 md:grid-cols-12 md:gap-10 md:py-20">
              <Reveal className="md:col-span-4 flex items-start gap-4">
                <span className="font-display text-sm text-ember">0{i + 1}</span>
                <span className="label text-graphite">{s.label}</span>
              </Reveal>
              <Reveal delay={0.1} as="p" className="md:col-span-8 font-display text-2xl md:text-[2.1rem] leading-[1.25] text-graphite">
                {s.text}
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* Values — a list that fills with graphite as you hover each row */}
      <section className="px-4 sm:px-6 md:px-10 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between gap-6">
            <RevealText
              text={"Our *values.*"}
              className="font-display font-medium uppercase leading-none tracking-[-0.01em] text-5xl md:text-7xl"
            />
            <Reveal as="p" className="hidden md:block max-w-xs text-sm text-steel">
              The principles we hold ourselves to on every project.
            </Reveal>
          </div>
          <ul className="border-t border-graphite/15">
            {values.map((v, i) => (
              <li key={v} className="border-b border-graphite/15">
                <Reveal delay={i * 0.06}>
                  <div data-cursor="hover" className="group relative overflow-hidden">
                    <div className="absolute inset-0 origin-bottom scale-y-0 bg-graphite transition-transform duration-500 ease-out group-hover:scale-y-100" />
                    <div className="relative flex items-center justify-between px-2 py-6 md:px-6 md:py-9 transition-colors duration-500 group-hover:text-white">
                      <span className="font-display text-3xl md:text-6xl uppercase tracking-[-0.01em] transition-transform duration-500 ease-out group-hover:translate-x-4">
                        {v}
                      </span>
                      <span className="font-display text-sm text-steel transition-colors duration-500 group-hover:text-ember-light">
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
