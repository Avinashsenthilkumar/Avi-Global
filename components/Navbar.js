"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/config";
import Logo from "@/components/Logo";

// Floating glass navigation. Transparent over the top of each page, frosted
// once you scroll, and it tucks away while scrolling down and returns the
// moment you scroll up — so it never sits on top of the content you're
// reading. Mobile gets a full-screen menu with staggered links.

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 30);
      setHidden(y > 240 && y > lastY.current + 4);
      if (y < lastY.current - 4 || y < 240) setHidden(false);
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 px-3 sm:px-5 pt-3 transition-transform duration-500 ease-out ${
          hidden && !open ? "-translate-y-[120%]" : "translate-y-0"
        }`}
      >
        <div
          className={`mx-auto flex h-16 md:h-[72px] max-w-7xl items-center justify-between rounded-full pl-3 pr-2 md:pl-5 transition-all duration-500 ease-out ${
            scrolled || open
              ? "bg-white/85 backdrop-blur-md shadow-[0_10px_40px_-12px_rgba(13,15,18,0.18)] border border-white/60"
              : "bg-transparent border border-transparent"
          }`}
        >
          <Link href="/" aria-label={`${siteConfig.name} home`} data-cursor="hover" className="flex items-center">
            <Logo variant="compact" priority height={52} className="h-11 md:h-[52px] w-auto" />
          </Link>

          <nav aria-label="Primary" className="hidden lg:flex items-center gap-1 rounded-full p-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  data-cursor="hover"
                  aria-current={active ? "page" : undefined}
                  className={`group relative overflow-hidden rounded-full px-4 py-2 text-[12px] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                    active ? "bg-graphite text-white" : "text-graphite/75 hover:text-graphite"
                  }`}
                >
                  {/* Text roll on hover */}
                  <span className="relative block overflow-hidden">
                    <span className="block transition-transform duration-500 ease-out group-hover:-translate-y-full">
                      {link.label}
                    </span>
                    <span aria-hidden="true" className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out group-hover:translate-y-0">
                      {link.label}
                    </span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              data-cursor="hover"
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-graphite px-5 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:scale-[1.03]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-ember" />
              Start a Project
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              data-cursor="hover"
              className="lg:hidden relative grid h-12 w-12 place-items-center rounded-full bg-graphite text-white"
            >
              <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-out ${open ? "rotate-45" : "-translate-y-[4px]"}`} />
              <span className={`absolute h-px w-5 bg-current transition-transform duration-500 ease-out ${open ? "-rotate-45" : "translate-y-[4px]"}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet full-screen menu */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 lg:hidden bg-graphite text-white transition-[clip-path] duration-700 ease-inout ${
          open ? "" : "pointer-events-none"
        }`}
        style={{
          // Menu grows out of the toggle button in the top-right corner.
          clipPath: open ? "circle(150% at calc(100% - 44px) 44px)" : "circle(0% at calc(100% - 44px) 44px)",
        }}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col justify-between px-7 pb-[calc(var(--tabbar-h)+2rem)] pt-28">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {navLinks.map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <Link
                    href={link.href}
                    tabIndex={open ? 0 : -1}
                    className={`flex items-baseline gap-4 py-2 font-display text-[2.6rem] uppercase leading-none transition-all duration-700 ease-out ${
                      open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                    } ${isActive(link.href) ? "text-ember" : ""}`}
                    style={{ transitionDelay: open ? `${150 + i * 60}ms` : "0ms" }}
                  >
                    <span className="font-body text-xs text-white/40">0{i + 1}</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className={`space-y-2 text-sm text-white/60 transition-opacity duration-700 ${open ? "opacity-100 delay-500" : "opacity-0"}`}
          >
            <a href={`tel:+${siteConfig.phoneRaw}`} tabIndex={open ? 0 : -1} className="block text-white">
              {siteConfig.phone}
            </a>
            <p>{siteConfig.regions.join(" • ")}</p>
          </div>
        </div>
      </div>
    </>
  );
}
