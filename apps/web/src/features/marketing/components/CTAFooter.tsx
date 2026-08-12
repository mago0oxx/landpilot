import TopoPattern from "@/components/shared/TopoPattern";
import AddressCheckForm from "@/features/preview/components/AddressCheckForm";
import { Locale } from "@/i18n/config";
import { getMarketingDictionary } from "@/i18n/marketing";

export default function CTAFooter({ locale = "en" }: { locale?: Locale }) {
  const t = getMarketingDictionary(locale).ctaFooter;

  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="relative overflow-hidden rounded-3xl bg-lp-forest px-8 py-16 text-lp-cream">
        <TopoPattern />
        <div className="relative z-10 mx-auto max-w-xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h2>
          <p className="mx-auto mt-3 text-lp-mint/80">{t.subtitle}</p>
          {/* The old CTA sent people to /register, which is the wall this page exists to
              remove. Closing with the same address field as the hero keeps the promise. */}
          <div className="mt-8 text-left">
            <AddressCheckForm locale={locale} variant="inline" buttonLabel={t.button} />
          </div>
        </div>
      </div>
    </section>
  );
}
