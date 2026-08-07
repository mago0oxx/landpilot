import { Search } from "lucide-react";
import Link from "next/link";

export default function EmptyState() {
  return (
    <section className="mt-10 rounded-3xl border border-dashed border-lp-forest/25 bg-white/60 p-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lp-forest/10">
        <Search className="text-lp-forest-light" size={30} />
      </div>

      <h2 className="mt-6 text-2xl font-bold text-lp-ink">
        No analyses yet
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-stone-500">
        Analyze your first property to receive an investment score,
        projected ROI, zoning information and AI-powered insights.
      </p>

      <Link
        href="/analize"
        className="mt-8 inline-block rounded-xl bg-lp-gold px-6 py-3 font-semibold text-lp-gold-ink transition hover:brightness-105"
      >
        Analyze Your First Property
      </Link>
    </section>
  );
}
