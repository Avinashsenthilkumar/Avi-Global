import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FinalCTA from "@/components/FinalCTA";
import Marquee from "@/components/Marquee";
import { servicesDetailed } from "@/lib/services";

export const metadata = {
  title: "Services",
  description:
    "Complete digital solutions — web development, e-commerce, web applications, mobile applications, UI/UX design, custom software and more, from one partner.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="03"
        eyebrow="Services"
        title={"Complete digital solutions. *One partner.*"}
        subtitle="Ten disciplines, one team. Everything you need to take a product from first idea to a running, supported business tool."
      />

      <Marquee tone="light" items={servicesDetailed.slice(0, 6).map((s) => s.title)} />

      <section className="px-4 sm:px-6 md:px-10 py-16 md:py-28">
        <div className="mx-auto max-w-7xl border-t border-graphite/15">
          {servicesDetailed.map((service, i) => (
            <Reveal key={service.title} delay={0.04 * (i % 3)}>
              <article data-cursor="hover" className="group relative overflow-hidden border-b border-graphite/15">
                {/* Graphite fill sweeps in from the left on hover */}
                <div className="absolute inset-0 origin-left scale-x-0 bg-graphite transition-transform duration-700 ease-out group-hover:scale-x-100" />
                <div className="relative grid gap-5 px-2 py-10 md:grid-cols-12 md:items-center md:gap-8 md:px-8 md:py-12 transition-colors duration-500 group-hover:text-white">
                  <span className="md:col-span-1 font-display text-sm text-ember">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="md:col-span-5 font-display text-3xl md:text-[2.6rem] uppercase leading-none tracking-[-0.01em]">
                    {service.title}
                  </h2>
                  <ul className="md:col-span-6 flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-graphite/15 bg-white/70 px-3.5 py-1.5 text-[13px] text-graphite transition-colors duration-500 group-hover:border-white/15 group-hover:bg-snow/[0.06] group-hover:text-white/85"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
