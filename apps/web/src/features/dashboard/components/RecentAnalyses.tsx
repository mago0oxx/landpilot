import SectionCard from "@/components/ui/SectionCard";
import AnalysisListRow from "./AnalysisListRow";

export interface RecentAnalysisItem {
  id: string;
  address: string;
  lpsScore: number;
  riskLevel: "Low" | "Medium" | "High";
  recommendation: "Strong Buy" | "Buy" | "Consider" | "Pass";
  createdAt: Date;
  inPortfolio: boolean;
}

interface RecentAnalysesProps {
  analyses: RecentAnalysisItem[];
  title?: string;
  description?: string;
}

export default function RecentAnalyses({
  analyses,
  title = "Recent Analyses",
  description = "Your most recently analyzed properties.",
}: RecentAnalysesProps) {
  if (analyses.length === 0) return null;

  return (
    <SectionCard title={title} description={description}>
      <div className="space-y-3">
        {analyses.map((analysis) => (
          <AnalysisListRow key={analysis.id} analysis={analysis} />
        ))}
      </div>
    </SectionCard>
  );
}
