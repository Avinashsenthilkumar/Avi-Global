"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { onScrollFrame } from "@/lib/motion";

// "What we do" as a deck of cards that stack as you scroll. Each card pins
// just below the one before; as the next card slides over it, the card
// underneath eases back and dims, so the eye always lands on the newest one.

const ICONS = {
  "01": <path d="M4 6h24v16H4zM4 26h24M12 18l-3-3 3-3M20 12l3 3-3 3" />,
  "02": <path d="M6 9h20l-2 11H8L6 9zM6 9 5 5H2M12 26a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM22 26a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />,
  "03": <path d="M4 8a2 2 0 0 1 2-2h20a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 12h24M9 17h6M9 20h10" />,
  "04": <path d="M11 3h10a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2H11a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM14 25h4" />,
  "05": <path d="M16 4a12 12 0 1 0 0 24c1.7 0 2-1.4 1.2-2.4-.8-1-.3-2.6 1.2-2.6H22a6 6 0 0 0 6-6C28 9.4 22.6 4 16 4zM9 15h.01M12 10h.01M19 9h.01" />,
  "06": <path d="M10 10 4 16l6 6M22 10l6 6-6 6M18 6l-4 20" />,
  "07": <path d="M20 6a6 6 0 0 0-7.6 7.6L5 21l3 3 7.4-7.4A6 6 0 0 0 23 9l-3.5 3.5-3-3z" />,
  "08": <path d="M6 22 12 14l5 5 9-12M20 7h6v6" />,
};

export default function ServicesStack({ services }) {
  const cardRefs = useRef([]);

  const sectionRef = useRef(null);

  // Runs only on frames where the page scrolled, and only while this
  // section is on screen (the shared scheduler + IntersectionObserver).
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !sectionRef.current) return;
    let near = false;
    const update = () => {
      if (!near) return;
      const cards = cardRefs.current;
      for (let i = 0; i < cards.length - 1; i++) {
        const card = cards[i];
        const next = cards[i + 1];
        if (!card || !next) continue;
        const a = card.getBoundingClientRect();
        const b = next.getBoundingClientRect();
        // How far the next card has travelled over this one (0 → 1).
        const overlap = Math.min(1, Math.max(0, (a.bottom - b.top) / a.height));
        const inner = card.firstElementChild;
        if (inner) {
          inner.style.transform = `scale(${1 - overlap * 0.06})`;
          // Dim with a cheap overlay opacity rather than a filter.
          inner.style.setProperty("--dim", String(overlap * 0.28));
        }
      }
    };
    const io = new IntersectionObserver(
      ([e]) => {
        near = e.isIntersecting;
        if (near) update(); // catch up — the observer fires after the scroll frame
      },
      { rootMargin: "10% 0px" }
    );
    io.observe(sectionRef.current);
    const off = onScrollFrame(update);
    return () => {
      off();
      io.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative px-4 sm:px-6 md:px-10 py-20 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <SectionHeading
            className="lg:col-span-8"
            eyebrow="What we do"
            title={"From idea to launch.\n*We handle it all.*"}
          />
          <p data-reveal="" className="lg:col-span-4 text-[15px] leading-relaxed text-steel">
            Strategy, design, engineering and support under one roof — so your product is built by one team
            that understands the whole picture.
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          {services.map((s, i) => {
            const dark = i % 2 === 0;
            return (
              <div
                key={s.number}
                ref={(el) => (cardRefs.current[i] = el)}
                className="sticky mb-5 md:mb-8"
                style={{ top: `calc(${84 + i * 10}px + env(safe-area-inset-top))` }}
              >
                <article
                  className={`relative origin-top overflow-hidden rounded-[1.75rem] md:rounded-[2.25rem] border will-change-transform ${
                    dark ? "bg-graphite text-white border-white/5" : "bg-card text-graphite border-line"
                  } shadow-[0_30px_60px_-30px_rgba(13,15,18,0.35)]`}
                >
                  <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 bg-graphite" style={{ opacity: "var(--dim, 0)" }} />
                  <div className="grid gap-8 p-7 sm:p-10 md:grid-cols-12 md:items-center md:p-14 min-h-[300px] md:min-h-[360px]">
                    <div className="md:col-span-2 flex md:block items-center justify-between">
                      <span className={`font-display text-5xl md:text-7xl ${dark ? "text-white/15" : "text-graphite/10"}`}>{s.number}</span>
                      <span className="grid h-14 w-14 md:mt-6 place-items-center rounded-2xl bg-ember-gradient text-white shadow-lg shadow-ember/30">
                        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {ICONS[s.number]}
                        </svg>
                      </span>
                    </div>
                    <div className="md:col-span-6">
                      <h3 className="font-display text-3xl sm:text-4xl md:text-5xl uppercase leading-[1] tracking-[-0.01em]">{s.title}</h3>
                      <p className={`mt-4 max-w-md text-[15px] md:text-base leading-relaxed ${dark ? "text-white/65" : "text-steel"}`}>{s.description}</p>
                    </div>
                    <div className="md:col-span-4">
                      {s.example ? (
                        <div className={`rounded-2xl border-l-2 border-ember p-5 text-sm leading-relaxed ${dark ? "bg-white/[0.05] text-white/75" : "bg-paper text-steel"}`}>
                          <span className="label mb-2 block text-ember">In practice</span>
                          {s.example}
                        </div>
                      ) : (
                        <Link
                          href="/services"
                          data-cursor="hover"
                          className={`group inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] ${dark ? "text-white/80" : "text-graphite"}`}
                        >
                          Explore service
                          <span className={`grid h-10 w-10 place-items-center rounded-full border transition-all duration-500 ease-out group-hover:bg-ember group-hover:border-ember group-hover:text-white ${dark ? "border-white/20" : "border-graphite/20"}`}>
                            →
                          </span>
                        </Link>
                      )}
                    </div>
                  </div>
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
