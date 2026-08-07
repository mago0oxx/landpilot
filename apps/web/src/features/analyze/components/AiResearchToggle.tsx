"use client";

import { Sparkles } from "lucide-react";

interface AiResearchToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function AiResearchToggle({ checked, onChange }: AiResearchToggleProps) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-lp-gold/25 bg-lp-gold/5 p-4">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 accent-lp-gold"
      />
      <div>
        <div className="flex items-center gap-1.5">
          <Sparkles size={13} className="text-lp-gold" />
          <span className="text-sm font-medium text-lp-ink">Dejar que la IA investigue los datos faltantes</span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-stone-500">
          Claude busca en la web densidad de zonificación, costo de construcción y tendencias de
          mercado típicas de la zona — solo cifras regionales, nunca hechos legales o
          ambientales de la parcela. La confianza del análisis queda limitada a &quot;Medium&quot;
          cuando se usa, y cada motor afectado queda etiquetado.
        </p>
      </div>
    </label>
  );
}
