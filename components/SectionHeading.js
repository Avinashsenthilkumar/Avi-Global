import Reveal from "@/components/Reveal";
import RevealText from "@/components/RevealText";

export default function SectionHeading({ eyebrow, title, align = "left", className = "" }) {
  return (
    <div className={`${align === "center" ? "text-center mx-auto" : ""} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="block text-xs tracking-widest2 uppercase text-gold mb-4">
            {eyebrow}
          </span>
        </Reveal>
      )}
      <RevealText
        text={title}
        as="h2"
        className="font-display font-medium uppercase text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-tight"
      />
    </div>
  );
}
