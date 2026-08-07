import Link from "next/link";
import PricingCards from "./PricingCards";

function getStartedCta() {
  return (
    <Link
      href="/register"
      className="inline-flex items-center justify-center rounded-xl bg-lp-gold px-5 py-3 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
    >
      Get started
    </Link>
  );
}

export default function PricingSection() {
  return (
    <section id="pricing" className="bg-white/60 py-20">
      <div className="mx-auto w-full max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-lp-ink">Simple pricing</h2>
          <p className="mt-3 text-stone-600">Start free. Upgrade as your portfolio grows.</p>
        </div>

        <div className="mt-12">
          <PricingCards ctaFor={() => getStartedCta()} />
        </div>
      </div>
    </section>
  );
}
