import { Banknote, Hammer, Landmark, Leaf, LineChart, MapPinned, Zap } from "lucide-react";
import { MARKETING_ENGINES } from "@/features/marketing/data/engines";

const ICONS = [Banknote, MapPinned, Hammer, Leaf, LineChart, Landmark, Zap];

export default function EnginesGrid() {
  return (
    <section className="bg-white/60 py-20">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="max-w-xl">
          <h2 className="text-3xl font-bold tracking-tight text-lp-ink">
            Going further: the full analysis
          </h2>
          <p className="mt-3 text-stone-600">
            The free check reads the public record. Once you add your numbers — asking price, lot
            size, what you plan to build — seven engines score the deal and add up to a single
            1000-point LPS Score.
          </p>
        </div>

        {/* Seven cards in a three-column grid leaves an orphan on the last row. Centering the
            tracks keeps the trailing card visually anchored instead of stranded on the left. */}
        <div className="mt-12 grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {MARKETING_ENGINES.map((engine, index) => {
            const Icon = ICONS[index];
            return (
              <div key={engine.name} className="rounded-2xl border border-lp-border bg-lp-cream p-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lp-forest-light/15 text-lp-forest-light">
                    <Icon size={18} />
                  </div>
                  <span className="rounded-full bg-lp-gold/15 px-2.5 py-1 text-xs font-medium text-lp-gold">
                    {engine.weight} pts
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-lp-ink">{engine.name}</h3>
                <p className="mt-1.5 text-sm text-stone-600">{engine.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
