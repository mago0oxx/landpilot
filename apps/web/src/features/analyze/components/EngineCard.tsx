import { EngineResult } from "../types/scoring";

function scoreTone(score: number): { text: string; bar: string } {
  if (score >= 75) return { text: "text-emerald-700", bar: "bg-emerald-500" };
  if (score >= 50) return { text: "text-amber-700", bar: "bg-amber-500" };
  return { text: "text-red-700", bar: "bg-red-500" };
}

interface EngineCardProps {
  engine: EngineResult;
  aiResearched?: boolean;
  onClick?: () => void;
}

export default function EngineCard({ engine, aiResearched, onClick }: EngineCardProps) {
  const tone = scoreTone(engine.score);
  const topFactors = [...engine.factors].sort((a, b) => b.weight - a.weight).slice(0, 3);

  return (
    <button
      type="button"
      onClick={onClick}
      className="relative rounded-xl border border-lp-border bg-white p-3 text-left transition hover:border-lp-forest"
    >
      {aiResearched && (
        <span
          className="absolute top-2 right-2 rounded-full bg-lp-gold/15 px-1.5 py-0.5 text-[8px] font-bold tracking-wide text-lp-gold"
          title="Incluye datos investigados por IA (búsqueda web)"
        >
          IA
        </span>
      )}
      <p className="mb-1.5 text-[9px] font-bold tracking-wide text-stone-500">{engine.label.toUpperCase()}</p>
      <div className="mb-1.5 flex items-baseline gap-0.5">
        <span className={`font-mono text-xl font-bold leading-none ${tone.text}`}>{Math.round(engine.score)}</span>
        <span className="font-mono text-[9px] text-stone-400">/100</span>
      </div>
      <div className="mb-2 h-[3px] overflow-hidden rounded-full bg-stone-200">
        <div className={`h-full rounded-full ${tone.bar}`} style={{ width: `${engine.score}%` }} />
      </div>
      <div className="flex flex-col gap-0.5">
        {topFactors.map((factor) => (
          <span key={factor.id} className="text-[9.5px] leading-tight text-stone-500">
            {factor.label}: {Math.round(factor.score)}/100
          </span>
        ))}
      </div>
    </button>
  );
}
