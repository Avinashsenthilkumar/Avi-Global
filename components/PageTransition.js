"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

// Wraps every route's content so navigating to a new page fades/lifts it in
// instead of a hard cut. Deliberately entrance-only (no AnimatePresence
// exit step): Next.js's App Router already unmounts the outgoing page
// before a wrapper like this ever sees it, so trying to animate the old
// page out here means waiting on an exit that's already happened — which
// left new pages stuck rendering nothing. This version can't get stuck:
// each navigation mounts a freshly-keyed element that just animates in.

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
