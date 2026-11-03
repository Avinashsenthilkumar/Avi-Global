import Link from "next/link";

export const metadata = { title: "Page Not Found" };

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-x-clip px-6 pt-32 pb-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 glow scale-[1.7] [--glow-a:0.2]" />
      <div className="relative text-center">
        <p className="font-display text-[9rem] md:text-[14rem] leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(13,15,18,0.25)]">404</p>
        <h1 className="mt-2 font-display text-3xl md:text-5xl uppercase">This page doesn&apos;t exist.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-steel">
          The page you&apos;re looking for may have moved or never existed. Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" data-cursor="hover" className="rounded-full bg-graphite px-8 py-4 text-[12px] uppercase tracking-[0.18em] text-white">
            Back to home
          </Link>
          <Link href="/contact" data-cursor="hover" className="rounded-full border border-graphite/20 px-8 py-4 text-[12px] uppercase tracking-[0.18em]">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
