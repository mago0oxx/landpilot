import SectionCard from "@/components/ui/SectionCard";
import { pickBestScenarios } from "../services/scenarioComparator";
import { ScenarioResult } from "../types/scenario";

function formatMetric(scenario: ScenarioResult): string {
  if (scenario.exitStrategy === "rent") return `${scenario.roiPercent}%/año`;
  return `${scenario.roiPercent}% total`;
}

export default function ScenarioComparison({ scenarios }: { scenarios: ScenarioResult[] }) {
  const { bestSell, bestRent } = pickBestScenarios(scenarios);

  return (
    <SectionCard
      title="🏗️ Comparación de estrategias"
      description="Qué construir (o no) sobre este mismo lote para maximizar la rentabilidad — vender (ROI total) y alquilar (retorno anual) no son el mismo tipo de número, así que se comparan por separado."
    >
      <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-lp-gold/30 bg-lp-gold/5 p-4">
          <p className="text-[10px] font-bold tracking-wide text-lp-gold">MEJOR PARA VENDER</p>
          {bestSell ? (
            <>
              <p className="mt-1 text-sm font-semibold text-lp-ink">{bestSell.label}</p>
              <p className="mt-0.5 font-mono text-lg font-bold text-emerald-700">{formatMetric(bestSell)}</p>
            </>
          ) : (
            <p className="mt-1 text-sm text-stone-500">Ningún escenario de venta es viable.</p>
          )}
        </div>
        <div className="rounded-xl border border-lp-gold/30 bg-lp-gold/5 p-4">
          <p className="text-[10px] font-bold tracking-wide text-lp-gold">MEJOR PARA ALQUILAR</p>
          {bestRent ? (
            <>
              <p className="mt-1 text-sm font-semibold text-lp-ink">{bestRent.label}</p>
              <p className="mt-0.5 font-mono text-lg font-bold text-emerald-700">{formatMetric(bestRent)}</p>
            </>
          ) : (
            <p className="mt-1 text-sm text-stone-500">Ningún escenario de alquiler es viable.</p>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-lp-border text-left text-[10px] tracking-wide text-stone-500">
              <th className="py-2 font-bold">Estrategia</th>
              <th className="py-2 font-bold">Inversión total</th>
              <th className="py-2 font-bold">Retorno</th>
              <th className="py-2 font-bold">Viabilidad</th>
            </tr>
          </thead>
          <tbody>
            {scenarios.map((scenario) => (
              <tr key={scenario.id} className={`border-b border-lp-border/50 ${scenario.viable ? "" : "opacity-50"}`}>
                <td className="py-2.5 text-lp-ink">{scenario.label}</td>
                <td className="py-2.5 font-mono text-stone-600">${scenario.totalInvestment.toLocaleString()}</td>
                <td className="py-2.5 font-mono text-stone-600">{formatMetric(scenario)}</td>
                <td className="py-2.5 text-xs text-stone-500">
                  {scenario.viable ? (scenario.viabilityNote ?? "Viable") : scenario.viabilityNote}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
}
