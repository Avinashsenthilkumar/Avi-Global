"use client";

import { useEffect, useRef, useState } from "react";

// Cursor-driven head-turn for the hero mascot.
//
// The frames under /public/images/mascot are cut straight out of the
// supplied character-turn clip at 662x1547 with a proper alpha matte —
// unpremultiplied against the studio backdrop, so there is no grey fringe
// on the dark theme — and with the clip's two blinks dropped, since a
// cursor parked at one spot would otherwise leave him with his eyes shut.
//
// Two things make 38 frames read as a continuous turn rather than a
// flipbook:
//
//   1. Adjacent frames are cross-dissolved. The lower frame paints fully
//      opaque and the next one fades in above it, so the in-betweens are
//      real blends rather than a snap to the nearest pose.
//   2. The frame index is driven by a critically-damped spring instead of
//      a raw lerp, so he settles with weight and never overshoots — on a
//      face, a wobble reads as a glitch, not as momentum.
//
// Desktop only (the frames are a few MB, and the hero hides him below
// md anyway). Touch devices get a slow idle look-around; reduced-motion
// gets a single static frame.

const FRAME_COUNT = 38;
const FRAME_W = 662;
const FRAME_H = 1547;
const FRAME_SRCS = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/images/mascot/frame-${String(i + 1).padStart(2, "0")}.webp`
);

const STIFFNESS = 42;
const DAMPING = 2 * Math.sqrt(STIFFNESS); // critical — no overshoot

export default function HeroCharacter({ className = "" }) {
  const imgRefs = useRef([]);
  const wrapRef = useRef(null);
  const [enabled, setEnabled] = useState(false);
  const [loadState, setLoadState] = useState("loading"); // loading | ok | failed

  // Don't put a few MB of frames on the wire for phones, which never
  // show him in the first place.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let rafId = null;
    let settled = false;
    let disposed = false;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const CENTER = (FRAME_COUNT - 1) / 2;
    let current = CENTER;
    let velocity = 0;
    let target = CENTER;

    // Cursor height drives a small vertical parallax, which sells the turn
    // as 3D rather than as a flat sprite swap.
    let lift = 0;
    let liftTarget = 0;

    let shownLo = -1;
    let shownHi = -1;

    const paint = (value) => {
      const clamped = Math.max(0, Math.min(FRAME_COUNT - 1, value));
      const lo = Math.min(Math.floor(clamped), FRAME_COUNT - 2);
      const hi = lo + 1;
      const frac = clamped - lo;
      const imgs = imgRefs.current;

      if (lo !== shownLo || hi !== shownHi) {
        if (imgs[shownLo]) imgs[shownLo].style.opacity = "0";
        if (imgs[shownHi]) imgs[shownHi].style.opacity = "0";
        shownLo = lo;
        shownHi = hi;
      }
      // Lower frame solid, next frame dissolved in on top of it — a true
      // cross-fade, not two translucent copies over the page background.
      if (imgs[lo]) imgs[lo].style.opacity = "1";
      if (imgs[hi]) imgs[hi].style.opacity = String(frac);
    };

    paint(current);

    // Probe one frame so a missing or renamed folder surfaces visibly
    // instead of leaving an empty box on the hero.
    const probe = new Image();
    probe.onload = () => {
      if (!settled) {
        settled = true;
        setLoadState("ok");
      }
    };
    probe.onerror = () => {
      if (!settled) {
        settled = true;
        setLoadState("failed");
      }
    };
    probe.src = FRAME_SRCS[0];

    // Warm the cache from the middle outwards — the pointer starts near
    // the centre of the viewport, so those frames are needed first.
    const mid = Math.round(CENTER);
    const order = [mid];
    for (let step = 1; step < FRAME_COUNT; step++) {
      if (mid - step >= 0) order.push(mid - step);
      if (mid + step < FRAME_COUNT) order.push(mid + step);
    }
    order.forEach((i) => {
      const img = new Image();
      img.src = FRAME_SRCS[i];
      if (img.decode) img.decode().catch(() => {});
    });

    if (reduced) return;

    let cleanupListeners = () => {};

    if (!coarse) {
      const onMove = (e) => {
        const rx = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
        const ry = Math.min(1, Math.max(0, e.clientY / window.innerHeight));
        target = rx * (FRAME_COUNT - 1);
        liftTarget = (0.5 - ry) * 14;
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      cleanupListeners = () => window.removeEventListener("mousemove", onMove);
    }

    const started = performance.now();
    let last = started;

    const tick = (now) => {
      if (disposed) return;
      // Clamped delta so a backgrounded tab doesn't fling the spring on
      // the first frame after it comes back.
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const t = (now - started) / 1000;

      if (coarse) {
        target = ((Math.sin(t * 0.4) + 1) / 2) * (FRAME_COUNT - 1);
        liftTarget = Math.sin(t * 0.31) * 5;
      }

      const accel = (target - current) * STIFFNESS - velocity * DAMPING;
      velocity += accel * dt;
      current += velocity * dt;
      paint(current);

      lift += (liftTarget - lift) * Math.min(1, dt * 4);
      // Breathing float, so he is never completely inert between moves.
      const breathe = Math.sin(t * 0.8) * 3;
      if (wrapRef.current) {
        wrapRef.current.style.transform =
          "translate3d(0, " + (lift + breathe).toFixed(2) + "px, 0)";
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      disposed = true;
      cleanupListeners();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) return null;

  if (loadState === "failed") {
    return (
      <div className={className + " flex items-center justify-center"}>
        <div className="pointer-events-auto max-w-xs rounded-xl border border-red-500/40 bg-red-950/40 p-5 text-center">
          <p className="text-xs tracking-widest2 uppercase text-red-400 mb-2">
            Character frames not found
          </p>
          <p className="text-xs text-red-200/80 leading-relaxed">
            Expected files at{" "}
            <code className="text-red-300">/public/images/mascot/frame-01.webp</code> through{" "}
            <code className="text-red-300">frame-38.webp</code>. Check that folder exists
            in your project and restart the dev server.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <div ref={wrapRef} className="absolute inset-0 will-change-transform">
        {FRAME_SRCS.map((src, i) => (
          <img
            key={src}
            ref={(el) => (imgRefs.current[i] = el)}
            src={src}
            alt=""
            width={FRAME_W}
            height={FRAME_H}
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none select-none bg-transparent"
            style={{ opacity: 0 }}
          />
        ))}
      </div>
    </div>
  );
}
