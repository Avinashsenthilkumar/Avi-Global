"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Phone-only bottom tab bar — the navigation pattern people know from apps.
// Sits above the home indicator via safe-area padding, highlights the
// current section, and gives a light haptic tick where the browser supports
// it. Hidden from tablet width up, where the top navigation takes over.

const TABS = [
  { label: "Home", href: "/", icon: <path d="M4 11 12 4l8 7v9a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z" /> },
  { label: "Work", href: "/projects", icon: <path d="M4 7h16v12H4zM9 7V5h6v2M4 12h16" /> },
  { label: "Services", href: "/services", icon: <path d="M5 5h6v6H5zM13 5h6v6h-6zM5 13h6v6H5zM13 13h6v6h-6z" /> },
  { label: "Process", href: "/process", icon: <path d="M5 19V9M12 19V5M19 19v-7" /> },
  { label: "Contact", href: "/contact", icon: <path d="M4 6h16v12H4zM4 7l8 6 8-6" /> },
];

export default function MobileTabBar() {
  const pathname = usePathname();
  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav
      aria-label="App navigation"
      className="fixed inset-x-0 bottom-0 z-40 md:hidden border-t border-graphite/10 bg-white shadow-[0_-8px_24px_-16px_rgba(13,15,18,0.25)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="grid h-16 grid-cols-5">
        {TABS.map((tab) => {
          const active = isActive(tab.href);
          return (
            <li key={tab.href}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                onClick={() => navigator.vibrate?.(8)}
                className={`relative flex h-full flex-col items-center justify-center gap-1 text-[10px] font-medium tracking-wide transition-colors ${
                  active ? "text-graphite" : "text-steel-light"
                }`}
              >
                <span
                  className={`absolute top-0 h-[3px] w-8 rounded-b-full bg-ember transition-transform duration-300 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <svg
                  viewBox="0 0 24 24"
                  className={`h-[22px] w-[22px] transition-transform duration-300 ${active ? "-translate-y-0.5" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={active ? 2 : 1.6}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {tab.icon}
                </svg>
                {tab.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
