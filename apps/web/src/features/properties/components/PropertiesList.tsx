"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import AnalysisListRow from "@/features/dashboard/components/AnalysisListRow";
import { RecentAnalysisItem } from "@/features/dashboard/components/RecentAnalyses";

type RecommendationFilter = "all" | RecentAnalysisItem["recommendation"];

const RECOMMENDATION_OPTIONS: { value: RecommendationFilter; label: string }[] = [
  { value: "all", label: "All recommendations" },
  { value: "Strong Buy", label: "Strong Buy" },
  { value: "Buy", label: "Buy" },
  { value: "Consider", label: "Consider" },
  { value: "Pass", label: "Pass" },
];

export default function PropertiesList({ analyses }: { analyses: RecentAnalysisItem[] }) {
  const [search, setSearch] = useState("");
  const [recommendation, setRecommendation] = useState<RecommendationFilter>("all");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return analyses.filter((a) => {
      const matchesQuery = !query || a.address.toLowerCase().includes(query);
      const matchesRecommendation = recommendation === "all" || a.recommendation === recommendation;
      return matchesQuery && matchesRecommendation;
    });
  }, [analyses, search, recommendation]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={16} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by address…"
            className="w-full rounded-xl border border-stone-300 bg-white py-3 pr-4 pl-10 text-sm text-lp-ink placeholder:text-stone-400 outline-none transition focus:border-lp-forest"
          />
        </div>
        <select
          value={recommendation}
          onChange={(e) => setRecommendation(e.target.value as RecommendationFilter)}
          className="rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm text-lp-ink outline-none transition focus:border-lp-forest sm:w-56"
        >
          {RECOMMENDATION_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      <p className="mt-3 text-xs text-stone-500">
        {filtered.length} of {analyses.length} propert{analyses.length === 1 ? "y" : "ies"}
      </p>

      <div className="mt-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-lp-forest/25 bg-white/60 p-10 text-center text-sm text-stone-500">
            No properties match your search.
          </div>
        ) : (
          filtered.map((analysis) => <AnalysisListRow key={analysis.id} analysis={analysis} />)
        )}
      </div>
    </div>
  );
}
