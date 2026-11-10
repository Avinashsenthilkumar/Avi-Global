"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

// Light / dark switch. The new theme is revealed with an ink blot that
// blooms out from this button (CSS in globals.css, "Theme switch").
//  • The choice is remembered (localStorage "avi-theme"); a tiny script in
//    the <head> applies it before the first paint, so there's no flash.
//  • Without the View Transitions API, or with reduced motion, the theme
//    simply switches instantly.

const KEY = "avi-theme";
const COLORS = { light: "#F1F2F4", dark: "#0A0B0E" };

function applyTheme(next) {
  const root = document.documentElement;
  root.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem(KEY, next);
  } catch {}
  document.querySelectorAll('meta[name="theme-color"]').forEach((m) => m.setAttribute("content", COLORS[next]));
}

export default function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    // Warm the ink mask so the very first switch has it ready.
    const id = setTimeout(() => {
      const img = new Image();
      img.src = "/theme/ink-mask.png";
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  const toggle = () => {
    if (busy) return;
    const next = dark ? "light" : "dark";
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (!document.startViewTransition || reduced) {
      applyTheme(next);
      setDark(next === "dark");
      return;
    }

    setBusy(true);
    root.classList.add("theme-ink");
    const t = document.startViewTransition(() => {
      // Flip synchronously so the button's own icon is part of the new snapshot.
      flushSync(() => setDark(next === "dark"));
      applyTheme(next);
    });
    t.finished.finally(() => {
      root.classList.remove("theme-ink");
      setBusy(false);
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      data-cursor="hover"
      className={`group relative grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full border border-graphite/15 bg-white text-graphite transition-colors duration-300 hover:border-ember ${className}`}
    >
      {/* Sun */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`absolute h-[18px] w-[18px] transition-all duration-700 ease-out ${dark ? "translate-y-0 rotate-0 opacity-100" : "-translate-y-6 -rotate-90 opacity-0"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      >
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
      </svg>
      {/* Moon */}
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={`absolute h-[18px] w-[18px] transition-all duration-700 ease-out ${dark ? "translate-y-6 rotate-90 opacity-0" : "translate-y-0 rotate-0 opacity-100"}`}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z" />
      </svg>
      <span className="pointer-events-none absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-ember" />
    </button>
  );
}
