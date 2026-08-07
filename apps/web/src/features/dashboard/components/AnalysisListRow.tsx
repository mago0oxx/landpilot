"use client";

import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Badge from "@/components/ui/Badge";
import { deleteAnalysis, setAnalysisPortfolio } from "@/features/analyze/services/analysisApi";
import { RecentAnalysisItem } from "./RecentAnalyses";

const RECOMMENDATION_VARIANT = {
  "Strong Buy": "success",
  Buy: "info",
  Consider: "warning",
  Pass: "danger",
} as const;

export default function AnalysisListRow({ analysis }: { analysis: RecentAnalysisItem }) {
  const router = useRouter();
  const [inPortfolio, setInPortfolio] = useState(analysis.inPortfolio);
  const [isBusy, setIsBusy] = useState(false);

  async function handleToggle(event: React.MouseEvent) {
    event.preventDefault();
    if (isBusy) return;
    const next = !inPortfolio;
    setIsBusy(true);
    try {
      await setAnalysisPortfolio(analysis.id, next);
      setInPortfolio(next);
      router.refresh();
    } finally {
      setIsBusy(false);
    }
  }

  async function handleDelete(event: React.MouseEvent) {
    event.preventDefault();
    if (isBusy) return;
    if (!window.confirm("Delete this analysis? This can't be undone.")) return;

    setIsBusy(true);
    try {
      await deleteAnalysis(analysis.id);
      router.refresh();
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <Link
      href={`/analyses/${analysis.id}`}
      className="flex items-center justify-between rounded-xl border border-lp-border p-4 transition hover:border-lp-forest-light"
    >
      <div>
        <p className="font-medium text-lp-ink">{analysis.address}</p>
        <p className="text-sm text-stone-400">{analysis.createdAt.toLocaleDateString()}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-lg font-semibold text-lp-ink">{analysis.lpsScore}</span>
        <Badge variant={RECOMMENDATION_VARIANT[analysis.recommendation]}>{analysis.recommendation}</Badge>
        <button
          type="button"
          onClick={handleToggle}
          disabled={isBusy}
          aria-label={inPortfolio ? "Remove from portfolio" : "Add to portfolio"}
          className={`rounded-lg p-2 transition disabled:opacity-50 ${
            inPortfolio ? "text-lp-forest" : "text-stone-300 hover:text-lp-forest"
          }`}
        >
          {inPortfolio ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isBusy}
          aria-label="Delete analysis"
          className="rounded-lg p-2 text-stone-300 transition hover:text-red-700 disabled:opacity-50"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </Link>
  );
}
