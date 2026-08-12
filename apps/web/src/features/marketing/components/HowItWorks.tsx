import { ClipboardCheck, FileSearch, MapPin } from "lucide-react";
import { Locale } from "@/i18n/config";
import { getMarketingDictionary } from "@/i18n/marketing";

const ICONS = [MapPin, FileSearch, ClipboardCheck];

export default function HowItWorks({ locale = "en" }: { locale?: Locale }) {
  const t = getMarketingDictionary(locale).howItWorks;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-lp-ink">{t.title}</h2>
        <p className="mt-3 text-stone-600">{t.subtitle}</p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {t.steps.map((step, index) => {
          const Icon = ICONS[index]!;
          return (
            <div key={step.title} className="relative rounded-2xl border border-lp-border bg-white/60 p-6">
              <span className="text-xs font-medium text-lp-gold">
                {t.stepLabel} {index + 1}
              </span>
              <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-lp-forest text-lp-mint">
                <Icon size={20} />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-lp-ink">{step.title}</h3>
              <p className="mt-2 text-sm text-stone-600">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
