"use client";

import { motion } from "framer-motion";

// Line-by-line "curtain" reveal: each line sits in an overflow-hidden mask
// and rises into view on scroll, staggered. Used for every major heading on
// the site so headline typography itself carries the scroll motion, rather
// than a generic whole-block fade.

export default function RevealText({
  text,
  as = "h2",
  className = "",
  lineClassName = "",
  delay = 0,
  stagger = 0.09,
  once = true,
}) {
  const lines = text.split("\n");
  const Tag = as;

  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className={`block overflow-hidden ${lineClassName}`}>
          <motion.span
            className="block"
            initial={{ y: "115%" }}
            whileInView={{ y: "0%" }}
            viewport={{ once, margin: "-80px" }}
            transition={{
              duration: 0.9,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
