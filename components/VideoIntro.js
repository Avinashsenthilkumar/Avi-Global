"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "@/components/Logo";

// Drop your brand film into /public/videos/brand-film.mp4 and a poster
// frame into /public/videos/brand-film-poster.jpg. Everything else —
// autoplay handling, the skip button, the fallback path, and the
// transition into the Hero — already works around those two files.

const VIDEO_SRC = "/videos/brand-film.mp4";
const POSTER_SRC = "/videos/brand-film-poster.jpg";

export default function VideoIntro({ onComplete }) {
  const videoRef = useRef(null);
  const [phase, setPhase] = useState("logo"); // logo -> video -> done
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem("avi-intro-seen");
    if (seen) {
      setPhase("done");
      onComplete?.();
      return;
    }

    const logoTimer = setTimeout(() => setPhase("video"), 1400);
    return () => clearTimeout(logoTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (phase !== "video") return;
    const video = videoRef.current;
    if (!video) return;

    const finish = () => complete();

    video.addEventListener("ended", finish);
    video.addEventListener("error", () => {
      setVideoAvailable(false);
      finish();
    });

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setVideoAvailable(false);
        finish();
      });
    }

    return () => {
      video.removeEventListener("ended", finish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  function complete() {
    setExiting(true);
    sessionStorage.setItem("avi-intro-seen", "1");
    setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, 700);
  }

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      {!exiting || phase !== "done" ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-ink flex items-center justify-center overflow-hidden"
          animate={exiting ? { opacity: 0, scale: 1.03 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <AnimatePresence mode="wait">
            {phase === "logo" && (
              <motion.div
                key="logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="flex flex-col items-center gap-4"
              >
                <Logo variant="full" priority className="h-40 md:h-56 w-auto" />
              </motion.div>
            )}

            {phase === "video" && videoAvailable && (
              <motion.div
                key="video"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <video
                  ref={videoRef}
                  className="h-full w-full object-cover"
                  src={VIDEO_SRC}
                  poster={POSTER_SRC}
                  muted
                  playsInline
                  preload="metadata"
                  autoPlay
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/20" />
              </motion.div>
            )}

            {phase === "video" && !videoAvailable && (
              <motion.div
                key="poster-fallback"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4"
              >
                <Logo variant="full" priority className="h-40 md:h-56 w-auto" />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            onClick={complete}
            data-cursor-hover
            className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-xs tracking-widest2 uppercase text-white/80 border border-white/25 rounded-full px-5 py-2 bg-transparent hover:text-gold hover:border-gold/60 transition-colors duration-300"
          >
            Skip Intro
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
