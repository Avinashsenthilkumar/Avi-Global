"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// One observer for the whole site. Any element carrying data-reveal,
// data-clip, data-draw or data-inview gets the `is-in` class the first time
// it scrolls into view; the CSS in globals.css does the actual animating.
//
// Because the trigger is just an attribute, pages and sections can stay
// server components — they don't need to import a client wrapper to animate.
// A MutationObserver picks up anything mounted later (route changes, slider
// slides, filtered project lists).

const SELECTOR = "[data-reveal],[data-clip],[data-draw],[data-inview]";

export default function MotionObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const reveal = (el) => el.classList.add("is-in");

    if (reduced || !("IntersectionObserver" in window)) {
      document.querySelectorAll(SELECTOR).forEach(reveal);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    const watch = (root) => {
      if (!(root instanceof Element)) return;
      if (root.matches?.(SELECTOR) && !root.classList.contains("is-in")) io.observe(root);
      root.querySelectorAll?.(SELECTOR).forEach((el) => {
        if (!el.classList.contains("is-in")) io.observe(el);
      });
    };

    watch(document.body);

    const mo = new MutationObserver((mutations) => {
      mutations.forEach((m) => m.addedNodes.forEach(watch));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
