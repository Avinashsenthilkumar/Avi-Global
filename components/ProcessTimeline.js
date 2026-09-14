"use client";

import { motion } from "framer-motion";

export default function ProcessTimeline({ steps }) {
  return (
    <div className="relative">
      <div className="hidden md:block absolute left-6 top-0 bottom-0 w-px bg-white/10" />
      <div className="space-y-10 md:space-y-14">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex gap-6 md:gap-10 pl-0 md:pl-0"
          >
            <div className="hidden md:flex relative z-10 h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-ink font-display text-sm text-gold">
              {step.number}
            </div>
            <div>
              <span className="md:hidden text-gold font-display text-sm">{step.number}</span>
              <h3 className="font-display font-medium uppercase text-xl md:text-2xl tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2 text-sm md:text-base text-muted max-w-xl leading-relaxed">
                {step.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
