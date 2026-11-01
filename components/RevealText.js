// Headline reveal. `mode="lines"` slides each line up out of a mask;
// `mode="words"` staggers word-by-word with a slight rotation. Lines are
// separated with "\n". Wrap any part of a line in *asterisks* to render it
// in the ember gradient italic — e.g. "WE BUILD\n*DIGITAL SOLUTIONS*".

function renderInline(text) {
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="text-ember-gradient font-normal italic pr-[0.06em]">
        {part.slice(1, -1)}
      </em>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function RevealText({
  text,
  as: Tag = "h2",
  className = "",
  mode = "lines",
  delay = 0,
  stagger = 0.08,
  trigger = "inview", // "inview" | "manual" (parent controls .is-in)
}) {
  const lines = text.split("\n");
  const base = Math.round(delay * 1000);
  const triggerProps = trigger === "inview" ? { "data-inview": "" } : {};

  if (mode === "words") {
    let w = 0;
    return (
      <Tag className={className} {...triggerProps}>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(/(\*[^*]+\*)/g).filter(Boolean).flatMap((chunk, ci) => {
              const accent = chunk.startsWith("*") && chunk.endsWith("*");
              const words = (accent ? chunk.slice(1, -1) : chunk).split(" ").filter(Boolean);
              return words.map((word, wi) => {
                const d = base + w++ * Math.round(stagger * 1000);
                return (
                  <span key={`${ci}-${wi}`} className="rw-word mr-[0.25em]">
                    <span
                      style={{ "--d": `${d}ms` }}
                      className={accent ? "text-ember-gradient italic font-normal pr-[0.04em]" : ""}
                    >
                      {word}
                    </span>
                  </span>
                );
              });
            })}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className} {...triggerProps}>
      {lines.map((line, i) => (
        <span key={i} className="rl-line">
          <span style={{ "--d": `${base + i * Math.round(stagger * 1000)}ms` }}>
            {renderInline(line)}
          </span>
        </span>
      ))}
    </Tag>
  );
}
