"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Logo from "@/components/Logo";

// Cinematic opening, shown once per browser session:
//   1. graphite screen, the logo fades up with a thin ember line drawing in
//   2. the brand film plays full-screen (muted, inline, no controls)
//   3. a curtain lifts upward to uncover the light homepage underneath,
//      and the hero's own entrance animation starts as it lifts.
// Rendered through a portal into <body>: the page wrapper animates with a
// transform on each route change, and a transformed ancestor would trap this
// fixed overlay inside the page box (and under the navbar).
// "Skip intro" jumps straight to step 3. If autoplay is blocked or the file
// fails, it goes to step 3 immediately — never a stuck black screen.

const VIDEO_SRC = "/videos/brand-film.mp4";
const POSTER_SRC = "/videos/brand-film-poster.jpg";
const SEEN_KEY = "avi-intro-seen";

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const doneRef = useRef(false);
  const [phase, setPhase] = useState("logo"); // logo | video | lifting | done
  const [mounted, setMounted] = useState(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {}
    setPhase("lifting");
    onComplete?.();
    setTimeout(() => setPhase("done"), 1300);
  };

  useEffect(() => {
    setMounted(true);
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {}
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduced) {
      doneRef.current = true;
      setPhase("done");
      onComplete?.();
      return;
    }
    const t = setTimeout(() => setPhase("video"), 1500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "video") return;
    const v = videoRef.current;
    if (!v) return finish();
    const onEnd = () => finish();
    v.addEventListener("ended", onEnd);
    v.addEventListener("error", onEnd);
    const p = v.play();
    if (p && p.catch) p.catch(onEnd);
    // Safety net: never hold the visitor longer than the film plus a margin.
    const guard = setTimeout(onEnd, 14000);
    return () => {
      v.removeEventListener("ended", onEnd);
      v.removeEventListener("error", onEnd);
      clearTimeout(guard);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  if (phase === "done" || !mounted) return null;

  const lifting = phase === "lifting";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-graphite transition-transform duration-[1200ms] ease-inout"
      style={{ transform: lifting ? "translate3d(0,-100%,0)" : "none" }}
      role="dialog"
      aria-label="AVI GLOBAL SOLUTIONS brand film"
    >
      {/* Logo moment */}
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center gap-8 transition-opacity duration-700 ${
          phase === "logo" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="animate-[fadeLogo_1.2s_cubic-bezier(0.22,1,0.36,1)_both]">
          <Logo variant="full" priority className="h-44 md:h-60 w-auto" />
        </div>
        <div className="h-px w-40 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left bg-ember-gradient animate-[growLine_1.4s_cubic-bezier(0.76,0,0.24,1)_both]" />
        </div>
      </div>

      {/* Brand film */}
      {phase !== "logo" && (
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            phase === "video" ? "opacity-100" : "opacity-0"
          }`}
          src={VIDEO_SRC}
          poster={POSTER_SRC}
          muted
          playsInline
          autoPlay
          preload="metadata"
        />
      )}

      {/* Curtain edge highlight while lifting */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-ember-gradient" />

      <button
        type="button"
        onClick={finish}
        data-cursor="hover"
        className="absolute bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-6 md:bottom-10 md:right-10 rounded-full border border-white/25 px-5 py-2.5 text-[11px] uppercase tracking-[0.2em] text-white/85 backdrop-blur transition-colors duration-300 hover:border-ember hover:text-ember-light"
      >
        Skip intro
      </button>

      <style>{`
        @keyframes fadeLogo { from { opacity: 0; transform: scale(0.94); filter: blur(8px); } to { opacity: 1; transform: none; filter: none; } }
        @keyframes growLine { from { transform: scaleX(0); } to { transform: scaleX(1); } }
      `}</style>
    </div>,
    document.body
  );
}
