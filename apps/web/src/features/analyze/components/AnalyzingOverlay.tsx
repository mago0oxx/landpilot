"use client";

import { useEffect, useState } from "react";
import TopoPattern from "@/components/shared/TopoPattern";

interface AnalyzingOverlayProps {
  address: string;
  aiResearchEnabled: boolean;
  /** Flip to true once the API response has arrived, to snap the remaining steps to done. */
  done: boolean;
}

const BASE_STEPS = [
  "Geocoding the address",
  "Checking flood zone (FEMA)",
  "Checking county parcel records",
  "Checking population growth (Census)",
];

const AI_STEP = "Researching regional data with AI (web search)";

const FINAL_STEPS = ["Calculating the LPS Score", "Generating AI summary"];

export default function AnalyzingOverlay({ address, aiResearchEnabled, done }: AnalyzingOverlayProps) {
  const steps = aiResearchEnabled ? [...BASE_STEPS, AI_STEP, ...FINAL_STEPS] : [...BASE_STEPS, ...FINAL_STEPS];
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (done) return;
    // Steady, honest pacing — not synced to the real per-step network timing (this is a
    // single request), just a truthful list of the work actually happening server-side.
    const interval = setInterval(() => {
      setActiveIndex((i) => (i < steps.length - 1 ? i + 1 : i));
    }, aiResearchEnabled ? 1100 : 650);
    return () => clearInterval(interval);
  }, [done, steps.length, aiResearchEnabled]);

  const displayIndex = done ? steps.length : activeIndex;
  const progressPercent = Math.round((Math.min(displayIndex, steps.length) / steps.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-lp-ink/40 p-6 backdrop-blur-sm">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-lp-forest p-8 shadow-2xl">
        <TopoPattern />

        <div className="relative z-10">
          <p className="text-xs font-semibold tracking-wide text-lp-mint">ANALYZING YOUR PROPERTY</p>
          <h2 className="mt-1 truncate text-lg font-semibold text-lp-cream">{address || "Property"}</h2>

          <div className="mt-5 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-lp-gold transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-6 space-y-3">
            {steps.map((step, i) => {
              const state = i < displayIndex ? "done" : i === displayIndex ? "active" : "pending";
              return (
                <div key={step} className={`flex items-center gap-3 transition-opacity ${state === "pending" ? "opacity-40" : "opacity-100"}`}>
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                    {state === "done" && <span className="text-lp-mint">✓</span>}
                    {state === "active" && (
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/25 border-t-lp-gold" />
                    )}
                    {state === "pending" && <span className="h-1.5 w-1.5 rounded-full bg-white/30" />}
                  </span>
                  <span className="text-sm text-lp-mint/90">{step}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
