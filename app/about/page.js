import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
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
    title: "WHO WE ARE",
    text: "AVI GLOBAL SOLUTIONS is a modern technology and digital solutions company providing end-to-end digital solutions for businesses, startups and organizations — from business and corporate websites to e-commerce platforms, web applications, mobile applications and custom software.",
  },
  {
    title: "OUR MISSION",
    text: "To help businesses transform ideas into reliable digital products by combining strategy, design, development and technology into solutions built to perform, scale and evolve.",
  },
  {
    title: "OUR VISION",
    text: "To be a trusted technology partner for businesses locally and globally, delivering digital solutions without borders.",
  },
  {
    title: "OUR APPROACH",
    text: "We take a business-first approach, understanding the problem before building the technology, and deliver end-to-end — from strategy and design through development, deployment and ongoing support.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <PageHero
        eyebrow="About Us"
        title={"WE TURN IDEAS\nINTO DIGITAL REALITY."}
        subtitle="AVI GLOBAL SOLUTIONS is a technology and digital solutions company focused on building meaningful digital products for modern businesses."
      />

      <section className="mt-24 md:mt-32 px-6 md:px-10 mx-auto max-w-5xl space-y-16">
        {sections.map((s) => (
          <Reveal key={s.title}>
            <div className="border-t border-white/10 pt-8">
              <h2 className="font-display font-medium uppercase text-2xl md:text-3xl text-gold tracking-tight">
                {s.title}
              </h2>
              <p className="mt-4 text-sm md:text-base text-muted leading-relaxed max-w-3xl">
                {s.text}
              </p>
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="border-t border-white/10 pt-8">
            <h2 className="font-display font-medium uppercase text-2xl md:text-3xl text-gold tracking-tight">
              OUR VALUES
            </h2>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {values.map((v) => (
                <div
                  key={v}
                  className="rounded-xl border border-white/10 px-5 py-4 text-sm tracking-wide uppercase text-white/80 text-center"
                >
                  {v}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      <div className="mt-24 md:mt-32">
        <FinalCTA />
      </div>
    </div>
  );
}
