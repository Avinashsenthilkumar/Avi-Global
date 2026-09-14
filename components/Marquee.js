export default function Marquee({ items, className = "" }) {
  const content = [...items, ...items];
  return (
    <div className={`overflow-hidden whitespace-nowrap border-y border-white/10 ${className}`}>
      <div className="inline-flex animate-marquee py-5">
        {content.map((item, i) => (
          <span
            key={i}
            className="mx-7 inline-flex items-center gap-7 font-display text-sm md:text-base uppercase tracking-widest2 text-muted"
          >
            {item}
            <span className="text-gold text-xs">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
