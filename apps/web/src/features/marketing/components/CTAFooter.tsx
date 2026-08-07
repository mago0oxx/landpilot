import Link from "next/link";
import TopoPattern from "@/components/shared/TopoPattern";

export default function CTAFooter() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-lp-forest px-8 py-16 text-center text-lp-cream">
        <TopoPattern />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to analyze your next parcel?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-lp-mint/80">
            Create a free account and run your first LPS Score in minutes.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-flex items-center justify-center rounded-xl bg-lp-gold px-7 py-3.5 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
          >
            Get started free
          </Link>
        </div>
      </div>
    </section>
  );
}
