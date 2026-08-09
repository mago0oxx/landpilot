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
          <span className="text-sm font-medium text-lp-ink">Let AI research the missing data</span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-stone-500">
          Claude searches the web for typical zoning density, construction cost, and market
          trends for the area — only regional figures, never legal or environmental facts
          about the parcel. Analysis confidence is capped at &quot;Medium&quot; when used, and
          each affected engine is labeled.
        </p>
      </div>
    </label>
  );
}
