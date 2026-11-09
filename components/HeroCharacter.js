"use client";

import { useEffect, useRef, useState } from "react";

// Head-turn sequence cut from the supplied character video, drawn to a
// single <canvas>. Built for speed:
//
//  • One drawing surface instead of 60 stacked <img> layers — the browser
//    composites one layer, and we only redraw when the frame changes.
//  • Progressive loading: the front-facing frame loads first at high
//    priority and is drawn the moment it arrives. The rest stream in after
//    the page has finished loading, nearest-to-centre first, so the frames
//    you're most likely to need next are always ready first. Until a frame
//    arrives, the nearest loaded one is shown — never a blank.
//  • The animation loop sleeps: it stops once the head has settled on the
//    cursor, when the hero is scrolled out of view, and when the tab is
//    hidden. Moving the mouse wakes it.
//  • Phones get a lighter 30-frame set. On touch screens the head follows
//    your finger, real phone tilts, and otherwise looks around on its own.

const SETS = {
  desktop: { dir: "/images/character/desktop", count: 60 },
  mobile: { dir: "/images/character/mobile", count: 30 },
};
const src = (set, i) => `${set.dir}/f${String(i + 1).padStart(2, "0")}.webp`;

export default function HeroCharacter({ className = "" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");

    const small = window.matchMedia("(max-width: 767px)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const set = small ? SETS.mobile : SETS.desktop;
    const N = set.count;
    const mid = Math.floor((N - 1) / 2);

    const frames = new Array(N).fill(null);
    let current = mid;
    let target = mid;
    let drawn = -1;
    let raf = 0;
    let running = false;
    let visible = true;
    let inView = true;
    let disposed = false;
    let lastInput = -Infinity; // time of the last finger / tilt / mouse input
    let lastTick = 0;
    let sweepT = 0;
    let touchSeen = false;
    let gBase = null; // slowly-adapting "resting" tilt of the phone

    // ---- drawing -------------------------------------------------------
    const nearestLoaded = (i) => {
      for (let d = 0; d < N; d++) {
        if (frames[i - d]) return i - d;
        if (frames[i + d]) return i + d;
      }
      return -1;
    };

    const draw = (force = false) => {
      const want = Math.max(0, Math.min(N - 1, Math.round(current)));
      const idx = nearestLoaded(want);
      if (idx < 0 || (idx === drawn && !force)) return;
      const img = frames[idx];
      const cw = canvas.width, ch = canvas.height;
      // object-fit: contain, anchored to the bottom (feet on the floor)
      const s = Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * s, h = img.naturalHeight * s;
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, (cw - w) / 2, ch - h, w, h);
      drawn = idx;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = wrap.getBoundingClientRect();
      const w = Math.max(1, Math.round(r.width * dpr));
      const h = Math.max(1, Math.round(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        ctx.imageSmoothingQuality = "high";
        draw(true);
      }
    };

    // ---- loop (sleeps whenever there's nothing to do) -------------------
    // Mouse: the head follows the cursor and the loop sleeps once it has
    // caught up. Phones and tablets: the head follows your finger while you
    // touch the screen, follows real tilting of the phone, and otherwise
    // keeps looking around on its own — so it is always alive on mobile.
    const tick = (now) => {
      const handsOff = now - lastInput > 2200;
      const idleCapable = coarse || touchSeen;
      const sweeping = handsOff && idleCapable;
      if (sweeping) {
        // Idle look-around, phase-locked so it eases in from wherever the
        // head is instead of snapping.
        sweepT += Math.min(50, now - (lastTick || now)) / 1000;
        const wave = Math.sin(sweepT * 0.7);
        target = ((wave + 1) / 2) * (N - 1);
      }
      lastTick = now;
      const ease = sweeping ? 0.05 : 0.16;
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.02) current = target;
      draw();
      const settled = !idleCapable && current === target;
      if (!visible || settled || disposed) {
        running = false;
        lastTick = 0;
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (running || reduced || !visible || disposed) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    // ---- loading --------------------------------------------------------
    const load = (i, priority = "low") =>
      new Promise((resolve) => {
        const img = new Image();
        img.decoding = "async";
        img.fetchPriority = priority;
        img.onload = async () => {
          try {
            await img.decode();
          } catch {}
          if (!disposed) {
            frames[i] = img;
            // Redraw if this frame is closer to where the head should be.
            const want = Math.round(current);
            if (drawn < 0 || Math.abs(i - want) < Math.abs(drawn - want)) draw(true);
          }
          resolve(true);
        };
        img.onerror = () => resolve(false);
        img.src = src(set, i);
      });

    const loadRest = async () => {
      if (reduced) return;
      // Centre-out order so the frames nearest the resting pose come first.
      const order = [];
      for (let d = 1; d < N; d++) {
        if (mid - d >= 0) order.push(mid - d);
        if (mid + d < N) order.push(mid + d);
      }
      // A few at a time keeps the network free for everything else.
      const queue = order.slice();
      const worker = async () => {
        while (queue.length && !disposed) await load(queue.shift());
      };
      await Promise.all([worker(), worker(), worker()]);
    };

    resize();
    load(mid, "high").then((ok) => {
      if (!ok) return setFailed(true);
      let started = false;
      const start = () => {
        if (started) return;
        started = true;
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 120));
        idle(() => loadRest(), { timeout: 1200 });
      };
      if (document.readyState === "complete") start();
      else {
        window.addEventListener("load", start, { once: true });
        // Phones: don't let a slow third-party asset hold the animation back.
        setTimeout(start, coarse ? 900 : 2500);
      }
    });

    // ---- input ----------------------------------------------------------
    const aim = (clientX) => {
      target = Math.min(1, Math.max(0, clientX / window.innerWidth)) * (N - 1);
      lastInput = performance.now();
      wake();
    };
    const onMove = (e) => aim(e.clientX);
    // Touch: listen passively so vertical scrolling is never blocked. These
    // also make the head respond in the browser's mobile emulation, where
    // the mouse is turned into touches.
    const onTouch = (e) => {
      const t = e.touches && e.touches[0];
      if (!t) return;
      touchSeen = true;
      aim(t.clientX);
    };
    // Tilt: only real movement counts. Android fires orientation events
    // constantly, even with the phone lying still — the old code treated that
    // as "tilt mode" and froze the head in the middle. Now small or steady
    // readings are ignored and the idle look-around carries on.
    const onTilt = (e) => {
      if (e.gamma == null) return;
      if (gBase === null) gBase = e.gamma;
      gBase += (e.gamma - gBase) * 0.02;
      const delta = e.gamma - gBase;
      if (Math.abs(delta) < 4) return;
      target = Math.min(1, Math.max(0, 0.5 + delta / 40)) * (N - 1);
      lastInput = performance.now();
      wake();
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    if (coarse) window.addEventListener("deviceorientation", onTilt, { passive: true });

    // Visible = on screen AND tab in front. Coming back into view catches
    // the head up to wherever the cursor went while it was asleep.
    const refresh = () => {
      visible = inView && document.visibilityState === "visible";
      if (visible) wake();
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      refresh();
    });
    io.observe(wrap);
    const onVis = refresh;
    document.addEventListener("visibilitychange", onVis);

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    if (coarse) wake();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("deviceorientation", onTilt);
      document.removeEventListener("visibilitychange", onVis);
      io.disconnect();
      ro.disconnect();
    };
  }, []);

  if (failed) {
    return (
      <div className={`${className} flex items-center justify-center`}>
        <p className="max-w-[16rem] rounded-xl border border-red-500/40 bg-red-950/40 p-4 text-center text-xs text-red-200/80">
          Character frames not found in <code>/public/images/character/</code>.
        </p>
      </div>
    );
  }

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
