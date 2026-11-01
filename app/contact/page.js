import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/app/contact/ContactForm";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Contact",
  description: "Tell us what you're building. We'll help turn your idea into a digital solution.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`;

  const rows = [
    { label: "Phone", value: siteConfig.phone, href: `tel:+${siteConfig.phoneRaw}` },
    siteConfig.email && { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { label: "Location", value: siteConfig.city },
    { label: "Global service", value: siteConfig.regions.join(" • ") },
  ].filter(Boolean);

  return (
    <>
      <PageHero
        index="06"
        eyebrow="Contact"
        title={"Let's build something *great.*"}
        subtitle="Tell us what you're building. We'll help turn your idea into a digital solution."
      />

      <section className="px-4 sm:px-6 md:px-10 pb-20 md:pb-32">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
          <Reveal>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.15}>
            <aside className="grain relative h-full overflow-hidden rounded-[2rem] bg-graphite p-8 text-white md:p-10">
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-ember/35 blur-[90px]" />
              <div className="relative flex h-full flex-col">
                <p className="label text-ember-light">Reach us directly</p>
                <dl className="mt-8 divide-y divide-white/10">
                  {rows.map((r) => (
                    <div key={r.label} className="py-5">
                      <dt className="label text-white/45">{r.label}</dt>
                      <dd className="mt-2 text-lg">
                        {r.href ? (
                          <a href={r.href} data-cursor="hover" className="transition-colors hover:text-ember-light">
                            {r.value}
                          </a>
                        ) : (
                          r.value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="mt-auto inline-flex items-center justify-center gap-3 rounded-full bg-[#25D366] px-6 py-4 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.02]"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
