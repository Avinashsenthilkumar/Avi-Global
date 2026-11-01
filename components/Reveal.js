// Fades/lifts its children in when scrolled into view. Pure markup — the
// site-wide MotionObserver adds `is-in`, and globals.css animates it — so
// this works inside server components too.

export default function Reveal({
  children,
  delay = 0,
  variant = "up", // up | left | scale
  as: Tag = "div",
  className = "",
  style,
  ...rest
}) {
  return (
    <Tag
      data-reveal={variant === "up" ? "" : variant}
      className={className}
      style={{ "--d": `${Math.round(delay * 1000)}ms`, ...style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
