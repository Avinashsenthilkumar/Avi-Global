import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import FinalCTA from "@/components/FinalCTA";
import { servicesDetailed } from "@/lib/services";

export const metadata = {
  title: "Services",
  description:
    "Complete digital solutions — web development, e-commerce, web applications, mobile applications, UI/UX design, custom software and more, from one partner.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <PageHero title={"COMPLETE DIGITAL\nSOLUTIONS. ONE PARTNER."} />

      <section className="mt-24 px-6 md:px-10 mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {servicesDetailed.map((service, i) => (
            <Reveal key={service.title} delay={(i % 2) * 0.08}>
              <div className="rounded-2xl border border-white/10 bg-ink-soft/40 p-8 h-full gold-border-hover">
                <h2 className="font-display font-medium uppercase text-xl md:text-2xl tracking-tight">
                  {service.title}
                </h2>
                <ul className="mt-5 space-y-2.5">
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-1.5 h-1 w-1 rounded-full bg-gold shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="mt-24 md:mt-32">
        <FinalCTA />
      </div>
    </div>
  );
}
