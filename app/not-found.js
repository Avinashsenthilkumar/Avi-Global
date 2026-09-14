import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24">
      <div className="text-center max-w-lg">
        <p className="text-xs tracking-widest2 uppercase text-gold mb-6">Error 404</p>
        <h1 className="font-display font-medium uppercase text-4xl sm:text-5xl leading-[1.05] tracking-tight">
          This page
          <br />
          doesn&apos;t exist.
        </h1>
        <p className="mt-6 text-sm md:text-base text-muted leading-relaxed">
          The page you&apos;re looking for may have moved or never existed.
          Let&apos;s get you back on track.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            data-cursor-hover
            className="inline-flex items-center rounded-full bg-gold-gradient px-8 py-3.5 text-xs tracking-widest2 uppercase text-ink font-medium"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            data-cursor-hover
            className="inline-flex items-center rounded-full border border-gold/50 px-8 py-3.5 text-xs tracking-widest2 uppercase text-white hover:border-gold hover:text-gold transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
