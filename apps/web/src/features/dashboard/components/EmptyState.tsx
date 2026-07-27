import { Search } from "lucide-react";

export default function EmptyState() {
  return (
    <section className="mt-10 rounded-3xl border border-dashed border-zinc-700 bg-zinc-900/40 p-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600/15">
        <Search className="text-green-500" size={30} />
      </div>

      <h2 className="mt-6 text-2xl font-bold">
        No analyses yet
      </h2>

      <p className="mx-auto mt-4 max-w-lg text-zinc-400">
        Analyze your first property to receive an investment score,
        projected ROI, zoning information and AI-powered insights.
      </p>

      <button className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-500">
        Analyze Your First Property
      </button>
    </section>
  );
}