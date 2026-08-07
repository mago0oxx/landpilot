import { Check } from "lucide-react";
import { ReactNode } from "react";
import { PLANS } from "@/lib/plans";

interface PricingCardsProps {
  ctaFor: (planId: keyof typeof PLANS) => ReactNode;
}

export default function PricingCards({ ctaFor }: PricingCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {Object.values(PLANS).map((plan) => (
        <div
          key={plan.id}
          className={`relative rounded-2xl border bg-white p-8 ${plan.recommended ? "border-2 border-lp-gold" : "border-lp-border"}`}
        >
          {plan.recommended && (
            <span className="absolute -top-3 left-8 rounded-full bg-lp-gold px-3 py-1 text-xs font-semibold text-lp-gold-ink">
              Recommended
            </span>
          )}
          <h3 className="text-lg font-semibold text-lp-ink">{plan.label}</h3>
          <p className="mt-1 text-3xl font-bold text-lp-ink">
            {plan.priceLabel.includes("/mo") ? (
              <>
                {plan.priceLabel.replace("/mo", "")}
                <span className="text-base font-normal text-stone-500">/mo</span>
              </>
            ) : (
              plan.priceLabel
            )}
          </p>
          <ul className="mt-6 space-y-3 text-sm text-stone-600">
            {plan.features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check size={16} className={`mt-0.5 shrink-0 ${plan.recommended ? "text-lp-gold" : "text-lp-forest-light"}`} /> {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">{ctaFor(plan.id)}</div>
        </div>
      ))}
    </div>
  );
}
