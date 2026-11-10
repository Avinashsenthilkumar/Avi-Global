// Default visual for a project card until a real photo is supplied.
// Each business gets an original illustration reflecting what it actually
// does (a plant for the nursery, a garment rack for the fashion store, a
// drill rig for the drilling company, etc.) — genuinely representative,
// but hand-drawn/original rather than a scraped photograph, since using
// someone else's photography on a commercial site without a license is a
// real copyright risk. Swap in real photos any time by editing this file
// or (better) adding an <img> path per project in lib/projects.js.

const ILLUSTRATIONS = {
  "dinopark-kenya": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 42c2-7 9-11 17-11h5c3 0 5-2 6-5l3-10c1-2 2-3 4-3h3c2 0 3 2 2 3l-2 2h-3l-3 11c-1 5-3 9-6 12" />
      <path d="M12 42c-3 0-6-1-8-3" />
      <path d="M12 42c7 3 19 3 26-1" />
      <path d="M18 43v9M24 44v8M33 43v9M38 41v11" />
      <path d="M46 15h.01" />
      <path d="M6 52h52" />
    </g>
  ),
  "ganesh-nursery": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 54V30" />
      <path d="M32 34c-6-2-10-8-9-15 7 0 12 5 13 11" />
      <path d="M32 30c6-3 9-9 8-16-7 1-11 6-12 12" />
      <path d="M20 54h24" />
      <rect x="24" y="46" width="16" height="8" rx="1.5" />
    </g>
  ),
  "macadamia-nuts": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="24" cy="30" r="9" />
      <circle cx="38" cy="34" r="7" />
      <circle cx="30" cy="42" r="6" />
      <path d="M24 22v-4M38 28v-4" />
    </g>
  ),
  "aara-fashions": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 16a4 4 0 014 4" />
      <path d="M32 20l-11 6 4 5 7-4 7 4 4-5-11-6z" />
      <path d="M25 26l-3 24h20l-3-24" />
      <path d="M12 18h40" />
    </g>
  ),
  "artesia-drilling": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M32 12v40" />
      <path d="M20 52h24" />
      <path d="M22 22l20-6M22 30l20-6M22 38l20-6" />
      <path d="M32 52l-4-8h8l-4 8z" />
    </g>
  ),
  "marudham-veg": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 30c0-6 5-10 10-10s10 4 10 10-5 14-10 14-10-8-10-14z" />
      <path d="M26 20v-6M23 16l3 4 3-4" />
      <path d="M40 34c0-4 3.5-7 7-7s7 3 7 7-3.5 10-7 10-7-6-7-10z" />
      <path d="M14 46h36" />
    </g>
  ),
  "monika-luxe-interiors": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 40v-8a4 4 0 014-4h28a4 4 0 014 4v8" />
      <path d="M12 40h40v6a2 2 0 01-2 2H14a2 2 0 01-2-2v-6z" />
      <path d="M16 48v4M48 48v4" />
      <path d="M46 12l4 4-4 4M50 16h-8" />
    </g>
  ),
  "face-flow-attendance": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <rect x="18" y="12" width="28" height="40" rx="4" />
      <circle cx="32" cy="30" r="7" />
      <path d="M25 40c1.5-3 4-5 7-5s5.5 2 7 5" />
      <path d="M22 18h4M38 18h4" />
    </g>
  ),
  "gym-management": (
    <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 32h6M44 32h6" />
      <path d="M20 24v16M44 24v16" />
      <path d="M20 32h24" />
      <rect x="10" y="27" width="4" height="10" rx="1" />
      <rect x="50" y="27" width="4" height="10" rx="1" />
    </g>
  ),
};

const FALLBACK = (
  <g stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <rect x="12" y="14" width="40" height="28" rx="3" />
    <path d="M12 22h40" />
    <path d="M22 32l-4 4 4 4M42 32l4 4-4 4M30 30l-2 12" />
  </g>
);

// NOTE: the wrapper deliberately sets no position class of its own — every
// call site passes `absolute inset-0 ...`, and hardcoding `relative` here
// would silently win the Tailwind cascade and break that positioning.

// Real photography, where the client has supplied it. Drop a file at
// /public/images/projects/<slug>.webp and add the slug here — it takes
// priority over the generated illustration below.
const PHOTOS = {
  "ganesh-nursery": "/images/projects/ganesh-nursery.webp",
  "aara-fashions": "/images/projects/aara-fashions.webp",
};

export default function ProjectThumb({ slug, name, className = "", zoom = true }) {
  const photo = PHOTOS[slug];

  if (photo) {
    return (
      <div className={`overflow-hidden bg-paper-3 ${className}`}>
        <img
          src={photo}
          alt={name ? `${name} project` : ""}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out ${
            zoom ? "group-hover:scale-[1.06]" : ""
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-graphite/50 via-transparent to-transparent" />
      </div>
    );
  }

  // Generated tile: graphite panel, ember line illustration of the
  // business, and the project initial as a large ghost letter.
  const illustration = ILLUSTRATIONS[slug] || FALLBACK;
  const initial = (name || "?").trim().charAt(0).toUpperCase();
  return (
    <div className={`overflow-hidden bg-graphite flex items-center justify-center ${className}`}>
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(circle at 50% 45%, rgba(232,93,16,0.28), transparent 60%)" }}
      />
      <div
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <span
        aria-hidden="true"
        className="absolute -bottom-[0.18em] -right-[0.05em] font-display text-[11rem] leading-none text-white/[0.05] select-none"
      >
        {initial}
      </span>
      <svg
        viewBox="0 0 64 64"
        className={`relative z-10 h-[38%] w-[38%] max-h-36 max-w-36 text-ember-light transition-transform duration-700 ease-out ${
          zoom ? "group-hover:scale-110 group-hover:-rotate-3" : ""
        }`}
        aria-hidden="true"
      >
        {illustration}
      </svg>
    </div>
  );
}
