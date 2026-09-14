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
  return (
    <footer className="border-t border-white/5 bg-ink">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <Logo variant="compact" className="h-16 w-auto" />
          <p className="mt-4 text-xs tracking-widest2 uppercase text-muted">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-xs tracking-widest2 uppercase text-gold mb-4">Navigation</h3>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-white/70 hover:text-white transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-widest2 uppercase text-gold mb-4">Services</h3>
          <ul className="space-y-3">
            {services.map((s) => (
              <li key={s} className="text-sm text-white/70">{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs tracking-widest2 uppercase text-gold mb-4">Contact</h3>
          <ul className="space-y-3 text-sm text-white/70">
            <li>
              <a href={`tel:${siteConfig.phoneRaw}`} className="hover:text-white transition-colors">
                {siteConfig.phone}
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
            )}
            <li>{siteConfig.city}</li>
            <li className="text-muted">{siteConfig.regions.join(" • ")}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
          </p>
          <p className="text-xs text-muted">{siteConfig.regions.join(" • ")}</p>
        </div>
      </div>
    </footer>
  );
}
