import { AlertTriangle, CircleHelp, Check, Info } from "lucide-react";
import Link from "next/link";
import { Finding, FindingStatus } from "../services/findings";

const STYLES: Record<FindingStatus, { icon: typeof Check; iconClass: string; border: string; badge: string; label: string }> = {
  alert: {
    icon: AlertTriangle,
    iconClass: "text-red-600",
    border: "border-red-200 bg-red-50/60",
    badge: "bg-red-100 text-red-800",
    label: "Look at this",
  },
  caution: {
    icon: Info,
    iconClass: "text-amber-600",
    border: "border-amber-200 bg-amber-50/60",
    badge: "bg-amber-100 text-amber-800",
    label: "Worth knowing",
  },
  clear: {
    icon: Check,
    iconClass: "text-emerald-600",
    border: "border-lp-border bg-white",
    badge: "bg-emerald-100 text-emerald-800",
    label: "Checked, looks fine",
  },
  unknown: {
    icon: CircleHelp,
    iconClass: "text-stone-400",
    border: "border-lp-border bg-stone-50",
    badge: "bg-stone-200 text-stone-700",
    label: "Couldn't check",
  },
};

export default function FindingRow({ finding }: { finding: Finding }) {
  const style = STYLES[finding.status];
  const Icon = style.icon;

  return (
    <div className={`rounded-2xl border p-5 ${style.border}`}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={`mt-0.5 shrink-0 ${style.iconClass}`} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-lp-ink">{finding.label}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}>{style.label}</span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">{finding.detail}</p>
          {finding.guideSlug && (
            <Link
              href={`/guides/${finding.guideSlug}`}
              className="mt-2 inline-block text-sm font-medium text-lp-forest-light hover:underline"
            >
              What this means →
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
