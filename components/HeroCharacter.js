"use client";

import { useEffect, useRef, useState } from "react";

// 60-frame head-turn sequence cut from the supplied character video.
//
// Desktop: the frame index tracks the cursor's horizontal position, eased
// with a lerp so it reads as a continuous turn rather than a frame-snap.
// Touch: there is no cursor, so the figure follows the device's tilt where
// the browser exposes orientation, and otherwise plays a slow idle
// look-around — either way it is never inert.
//
// Two frame sets are shipped: full-resolution for desktop, and a ~1/3-scale
// set for phones so mobile users aren't made to download several megabytes
// of hero art. The set is chosen once on mount from the viewport width.

const FRAME_COUNT = 60;
const srcSet = (dir) =>
  Array.from(
    { length: FRAME_COUNT },
    (_, i) => `/images/mascot/${dir}/frame-${String(i + 1).padStart(2, "0")}.webp`
  );

const DESKTOP_SRCS = srcSet("desktop");
const MOBILE_SRCS = srcSet("mobile");

export default function HeroCharacter({ className = "" }) {
  const imgRefs = useRef([]);
  const [srcs, setSrcs] = useState(null);
  const [failed, setFailed] = useState(false);

  // Pick the frame set before painting anything, so we never load both.
  useEffect(() => {
    const isSmall = window.matchMedia("(max-width: 767px)").matches;
    setSrcs(isSmall ? MOBILE_SRCS : DESKTOP_SRCS);
  }, []);

  useEffect(() => {
    if (!srcs) return;

    let rafId = null;
    let cleanup = () => {};

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let current = (FRAME_COUNT - 1) / 2;
    let target = current;
    let lastActive = -1;

    const setActive = (v) => {
      const idx = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(v)));
      if (idx === lastActive) return;
      const imgs = imgRefs.current;
      if (imgs[lastActive]) imgs[lastActive].style.opacity = "0";
      if (imgs[idx]) imgs[idx].style.opacity = "1";
      lastActive = idx;
    };

    setActive(current);

    // Surface a missing-asset problem instead of rendering an empty box.
    const probe = new Image();
    probe.onerror = () => setFailed(true);
    probe.src = srcs[0];

    // Warm the cache so frame swaps never flash an undecoded image.
    srcs.forEach((s) => {
      const im = new Image();
      im.src = s;
      if (im.decode) im.decode().catch(() => {});
    });

    if (reduced) return;

    const run = (fn) => {
      const loop = (t) => {
        fn(t);
        setActive(current);
        rafId = requestAnimationFrame(loop);
      };
      rafId = requestAnimationFrame(loop);
    };

    if (!coarse) {
      const onMove = (e) => {
        const ratio = Math.min(1, Math.max(0, e.clientX / window.innerWidth));
        target = ratio * (FRAME_COUNT - 1);
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      cleanup = () => window.removeEventListener("mousemove", onMove);
      run(() => {
        current += (target - current) * 0.12;
      });
    } else {
      // Touch: tilt-follow when available, gentle idle sweep otherwise.
      let usingTilt = false;
      const onTilt = (e) => {
        if (e.gamma == null) return;
        usingTilt = true;
        const ratio = Math.min(1, Math.max(0, (e.gamma + 40) / 80));
        target = ratio * (FRAME_COUNT - 1);
      };
      window.addEventListener("deviceorientation", onTilt);
      cleanup = () => window.removeEventListener("deviceorientation", onTilt);

      const start = performance.now();
      run((now) => {
        if (!usingTilt) {
          const wave = Math.sin(((now - start) / 1000) * 0.4);
          target = ((wave + 1) / 2) * (FRAME_COUNT - 1);
        }
        current += (target - current) * (usingTilt ? 0.1 : 0.05);
      });
    }

    return () => {
      cleanup();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [srcs]);

  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <div className="max-w-xs rounded-xl border border-red-500/40 bg-red-950/40 p-5 text-center">
          <p className="text-xs tracking-[0.2em] uppercase text-red-400 mb-2">
            Character frames not found
          </p>
          <p className="text-xs text-red-200/80 leading-relaxed">
            Expected <code className="text-red-300">/public/images/mascot/desktop/</code> and
            {" "}<code className="text-red-300">/mobile/</code> to contain frame-01 … frame-60.webp.
          </p>
        </div>
      </div>
    );
  }

  if (!srcs) return <div className={className} aria-hidden="true" />;

  return (
    <div className={className} aria-hidden="true">
      {srcs.map((src, i) => (
        <img
          key={src}
          ref={(el) => (imgRefs.current[i] = el)}
          src={src}
          alt=""
          draggable={false}
          fetchPriority={i === Math.floor(FRAME_COUNT / 2) ? "high" : "low"}
          className="absolute inset-0 h-full w-full object-contain object-bottom pointer-events-none select-none"
          style={{ opacity: 0 }}
        />
      ))}
    </div>
  );
}
