import RevealText from "@/components/RevealText";
import Reveal from "@/components/Reveal";

export default function SectionHeading({ eyebrow, title, intro, align = "left", tone = "light", className = "" }) {
  const center = align === "center";
  const muted = tone === "dark" ? "text-white/60" : "text-steel";
  return (
    <div className={`${center ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && (
        <Reveal className={`flex items-center gap-3 mb-6 ${center ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-ember" />
          <span className="label text-ember">{eyebrow}</span>
        </Reveal>
      )}
      <RevealText
        text={title}
        className="font-display font-medium uppercase tracking-[-0.01em] leading-[1.02] text-[2.1rem] sm:text-5xl lg:text-[3.9rem]"
      />
      {intro && (
        <Reveal delay={0.15} as="p" className={`mt-6 max-w-xl text-[15px] md:text-base leading-relaxed ${muted} ${center ? "mx-auto" : ""}`}>
          {intro}
        </Reveal>
      )}
    </div>
  );
}
