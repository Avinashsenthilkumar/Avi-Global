import Link from "next/link";
import Logo from "@/components/Logo";
import { siteConfig, navLinks } from "@/lib/config";

const services = [
  "Web Development",
  "E-commerce",
  "Web Applications",
  "Mobile Applications",
  "Custom Software",
  "UI/UX Design",
  "Maintenance",
  "Digital Transformation",
];

export default function Footer() {
  const wa = `https://wa.me/${siteConfig.phoneRaw}?text=${encodeURIComponent(siteConfig.whatsappDefaultMessage)}`;
  return (
    <footer className="relative overflow-hidden bg-paper px-4 sm:px-6 md:px-10 pt-20 pb-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="compact" className="h-24 w-auto" />
            <p className="label mt-6 text-steel">{siteConfig.tagline}</p>
          </div>

          <div className="md:col-span-2">
            <h3 className="label mb-5 text-ember">Navigate</h3>
            <ul className="space-y-3 text-[15px]">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} data-cursor="hover" className="text-graphite/75 transition-colors hover:text-graphite">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="label mb-5 text-ember">Services</h3>
            <ul className="space-y-3 text-[15px] text-graphite/75">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" data-cursor="hover" className="transition-colors hover:text-graphite">
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="label mb-5 text-ember">Contact</h3>
            <ul className="space-y-3 text-[15px] text-graphite/75">
              <li>
                <a href={`tel:+${siteConfig.phoneRaw}`} data-cursor="hover" className="font-medium text-graphite hover:text-ember">
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="hover:text-graphite">
                  WhatsApp us
                </a>
              </li>
              {siteConfig.email && (
                <li>
                  <a href={`mailto:${siteConfig.email}`} data-cursor="hover" className="hover:text-graphite">
                    {siteConfig.email}
                  </a>
                </li>
              )}
              <li>{siteConfig.city}</li>
              <li className="text-steel">{siteConfig.regions.join(" • ")}</li>
            </ul>
          </div>
        </div>

        {/* Oversized outline wordmark */}
        <div aria-hidden="true" className="mt-20 select-none overflow-hidden">
          <p className="font-display text-[19vw] md:text-[15vw] uppercase leading-[0.8] tracking-[-0.03em] text-transparent [-webkit-text-stroke:1px_rgba(13,15,18,0.14)] whitespace-nowrap">
            Avi Global
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-graphite/10 pt-6 text-xs text-steel md:flex-row">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.</p>
          <p>{siteConfig.regions.join(" • ")}</p>
        </div>
      </div>
    </footer>
  );
}
