import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

// A wireframe globe whose meridians, parallels and route arcs draw
// themselves in when the section scrolls into view, with pulsing markers
// for the three regions. Positions are illustrative, not a map projection,
// and no offices are implied — just where the work reaches.

const MARKERS = [
  { label: "India", x: 300, y: 196 },
  { label: "Kenya", x: 232, y: 262 },
  { label: "Worldwide", x: 150, y: 150 },
];

export default function GlobalVision() {
  return (
    <section className="relative overflow-hidden px-4 sm:px-6 md:px-10 py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow="Global vision"
            title={"Local expertise.\n*Global vision.*"}
            intro="Technology without borders. Building digital solutions for businesses locally and globally."
          />
          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-3">
            {MARKERS.map((m) => (
              <span key={m.label} className="inline-flex items-center gap-2 rounded-full border border-graphite/15 bg-white px-4 py-2 text-[11px] uppercase tracking-[0.18em]">
                <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                {m.label}
              </span>
            ))}
          </Reveal>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div className="absolute inset-[8%] rounded-full bg-gradient-to-br from-white to-paper-3 shadow-[inset_-30px_-40px_80px_rgba(13,15,18,0.10),0_40px_80px_-40px_rgba(13,15,18,0.35)]" />
          <svg viewBox="0 0 440 440" className="absolute inset-0 h-full w-full" data-draw="" aria-hidden="true">
            <defs>
              <clipPath id="globe-clip">
                <circle cx="220" cy="220" r="185" />
              </clipPath>
            </defs>
            <g fill="none" stroke="rgba(13,15,18,0.16)" strokeWidth="1" clipPath="url(#globe-clip)">
              <circle cx="220" cy="220" r="185" style={{ "--len": 1170 }} />
              {[40, 80, 120, 160].map((rx, i) => (
                <ellipse key={`m${rx}`} cx="220" cy="220" rx={rx} ry="185" style={{ "--len": 1170, "--d": `${i * 120}ms` }} />
              ))}
              {[60, 120, 175].map((ry, i) => (
                <ellipse key={`p${ry}`} cx="220" cy="220" rx="185" ry={ry * 0.38} transform={`translate(0 ${(i - 1) * 80})`} style={{ "--len": 1170, "--d": `${300 + i * 120}ms` }} />
              ))}
              <line x1="35" y1="220" x2="405" y2="220" style={{ "--len": 370, "--d": "200ms" }} />
            </g>
            <g fill="none" stroke="url(#arc)" strokeWidth="2" strokeLinecap="round">
              <path d="M300 196 Q 280 210 232 262" style={{ "--len": 120, "--d": "1100ms" }} />
              <path d="M232 262 Q 160 230 150 150" style={{ "--len": 200, "--d": "1500ms" }} />
              <path d="M300 196 Q 240 110 150 150" style={{ "--len": 220, "--d": "1900ms" }} />
            </g>
            <defs>
              <linearGradient id="arc" x1="0" x2="1">
                <stop offset="0" stopColor="#FFAA4C" />
                <stop offset="1" stopColor="#B4320F" />
              </linearGradient>
            </defs>
          </svg>
          {MARKERS.map((m, i) => (
            <div
              key={m.label}
              style={{ left: `${(m.x / 440) * 100}%`, top: `${(m.y / 440) * 100}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <div data-reveal="scale" style={{ "--d": `${1200 + i * 250}ms` }}>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-ember animate-[pulse-ring_2s_ease-out_infinite]" />
                <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-ember" />
              </span>
              <span className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-graphite px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white">
                {m.label}
              </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
