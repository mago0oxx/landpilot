"use client";

import { Bookmark, BookmarkCheck, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setAnalysisPortfolio } from "../services/analysisApi";

interface PortfolioToggleButtonProps {
  analysisId: string;
  initialInPortfolio: boolean;
  canUsePortfolio: boolean;
}

export default function PortfolioToggleButton({ analysisId, initialInPortfolio, canUsePortfolio }: PortfolioToggleButtonProps) {
  const router = useRouter();
  const [inPortfolio, setInPortfolio] = useState(initialInPortfolio);
  const [isSaving, setIsSaving] = useState(false);

  if (!canUsePortfolio) {
    return (
      <Link
        href="/pricing"
        className="inline-flex items-center gap-2 rounded-xl border border-lp-border px-5 py-3 text-sm font-medium text-stone-500 transition hover:border-lp-forest/50"
      >
        <Lock size={16} /> Portfolio tracking is Pro
      </Link>
    );
  }

  async function handleToggle() {
    const next = !inPortfolio;
    setIsSaving(true);
    try {
      await setAnalysisPortfolio(analysisId, next);
      setInPortfolio(next);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      disabled={isSaving}
      className={`inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-50 ${
        inPortfolio
          ? "bg-lp-forest text-lp-cream hover:brightness-110"
          : "border border-lp-forest/20 text-lp-ink hover:border-lp-forest/50"
      }`}
    >
      {inPortfolio ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
      {inPortfolio ? "In Portfolio" : "Add to Portfolio"}
    </button>
  );
}
