import { AlertTriangle, CircleHelp, Check, Info } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/i18n/config";
import { Finding, FindingStatus } from "../services/findings";

const STYLES: Record<FindingStatus, { icon: typeof Check; iconClass: string; border: string; badge: string }> = {
  alert: {
    icon: AlertTriangle,
    iconClass: "text-red-600",
    border: "border-red-200 bg-red-50/60",
    badge: "bg-red-100 text-red-800",
  },
  caution: {
    icon: Info,
    iconClass: "text-amber-600",
    border: "border-amber-200 bg-amber-50/60",
    badge: "bg-amber-100 text-amber-800",
  },
  clear: {
    icon: Check,
    iconClass: "text-emerald-600",
    border: "border-lp-border bg-white",
    badge: "bg-emerald-100 text-emerald-800",
  },
  unknown: {
    icon: CircleHelp,
    iconClass: "text-stone-400",
    border: "border-lp-border bg-stone-50",
    badge: "bg-stone-200 text-stone-700",
  },
};

const LABELS: Record<Locale, Record<FindingStatus, string>> = {
  en: {
    alert: "Look at this",
    caution: "Worth knowing",
    clear: "Checked, looks fine",
    unknown: "Couldn't check",
  },
  es: {
    alert: "Míralo bien",
    caution: "Conviene saberlo",
    clear: "Revisado, sin problema",
    unknown: "No se pudo revisar",
  },
};

const GUIDE_CTA: Record<Locale, string> = {
  en: "What this means →",
  es: "Qué significa esto →",
};

interface FindingRowProps {
  finding: Finding;
  locale?: Locale;
  /** Guides only exist in English so far — Spanish rows link out only once a translated
   * guide exists, rather than dropping a Spanish reader onto an English page unannounced. */
  guideHrefFor?: (slug: string) => string | null;
}

export default function FindingRow({ finding, locale = "en", guideHrefFor }: FindingRowProps) {
  const style = STYLES[finding.status];
  const Icon = style.icon;
  const guideHref = finding.guideSlug
    ? guideHrefFor
      ? guideHrefFor(finding.guideSlug)
      : `/guides/${finding.guideSlug}`
    : null;

  return (
    <div className={`rounded-2xl border p-5 ${style.border}`}>
      <div className="flex items-start gap-3">
        <Icon size={18} className={`mt-0.5 shrink-0 ${style.iconClass}`} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-lp-ink">{finding.label}</h3>
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${style.badge}`}>
              {LABELS[locale][finding.status]}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">{finding.detail}</p>
          {guideHref && (
            <Link href={guideHref} className="mt-2 inline-block text-sm font-medium text-lp-forest-light hover:underline">
              {GUIDE_CTA[locale]}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
