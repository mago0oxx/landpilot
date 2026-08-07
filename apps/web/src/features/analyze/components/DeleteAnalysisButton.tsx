"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteAnalysis } from "../services/analysisApi";

interface DeleteAnalysisButtonProps {
  analysisId: string;
  /** Where to navigate after a successful delete — omit to just refresh in place (e.g. list rows). */
  redirectTo?: string;
}

export default function DeleteAnalysisButton({ analysisId, redirectTo }: DeleteAnalysisButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!window.confirm("Delete this analysis? This can't be undone.")) return;

    setIsDeleting(true);
    try {
      await deleteAnalysis(analysisId);
      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={isDeleting}
      aria-label="Delete analysis"
      className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-3 text-sm font-medium text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 size={16} />
    </button>
  );
}
