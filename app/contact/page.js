import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import ContactForm from "@/app/contact/ContactForm";
import { siteConfig } from "@/lib/config";

export const metadata = {
  title: "Contact",
  description:
    "Tell us what you're building. We'll help turn your idea into a digital solution.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(
    siteConfig.whatsappDefaultMessage
  )}`;

  return (
    <div className="pt-32 md:pt-40 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <PageHero
          title={"LET'S BUILD\nSOMETHING GREAT."}
          subtitle="Tell us what you're building. We'll help turn your idea into a digital solution."
        />

        <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-12">
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>

          <Reveal delay={0.16}>
            <div className="space-y-8">
              <div>
                <p className="text-[10px] tracking-widest2 uppercase text-gold">Phone</p>
                <a
                  href={`tel:${siteConfig.phoneRaw}`}
                  data-cursor-hover
                  className="mt-1 block text-lg text-white hover:text-gold transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </div>

              {siteConfig.email && (
                <div>
                  <p className="text-[10px] tracking-widest2 uppercase text-gold">Email</p>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    data-cursor-hover
                    className="mt-1 block text-lg text-white hover:text-gold transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              )}

              <div>
                <p className="text-[10px] tracking-widest2 uppercase text-gold">Location</p>
                <p className="mt-1 text-lg text-white">{siteConfig.city}</p>
              </div>

              <div>
                <p className="text-[10px] tracking-widest2 uppercase text-gold">
                  Global Service
                </p>
                <p className="mt-1 text-lg text-white">
                  {siteConfig.regions.join(" • ")}
                </p>
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-6 py-3 text-xs tracking-widest2 uppercase text-gold hover:bg-gold hover:text-ink transition-colors duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
