import Link from "next/link";
import { AlertTriangle, Check, Database, LockOpen, Wallet } from "lucide-react";
import TopoPattern from "@/components/shared/TopoPattern";
import AddressCheckForm from "@/features/preview/components/AddressCheckForm";

const SAMPLE_FINDINGS = [
  { label: "FEMA flood zone", tone: "alert", detail: "Zone AE — high risk. Flood insurance required with a federal mortgage." },
  { label: "Wetlands", tone: "clear", detail: "None mapped on this parcel in the USFWS inventory." },
  { label: "County population & jobs", tone: "clear", detail: "Census ACS: population +1.6%, employment +2.4%." },
  { label: "Nearby services", tone: "clear", detail: "66 mapped shops, schools and healthcare nearby." },
] as const;

export default function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-10 pb-20">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div>
          <span className="inline-block rounded-full border border-lp-forest/15 bg-white/60 px-4 py-1.5 text-xs font-medium tracking-wide text-lp-forest-light uppercase">
            Buying your first piece of land?
          </span>

          <h1 className="mt-6 text-4xl leading-tight font-bold tracking-tight text-lp-ink sm:text-5xl">
            Don&apos;t buy land you can&apos;t build on.
          </h1>

          <p className="mt-5 max-w-xl text-lg text-stone-600">
            Paste the address. In 60 seconds we&apos;ll pull the parcel&apos;s FEMA flood zone, its
            wetlands status, and how the county is trending — straight from government records. Then
            we&apos;ll tell you plainly what still needs a human to check.
          </p>

          <div className="mt-8">
            <AddressCheckForm />
          </div>

          <p className="mt-4 text-sm text-stone-500">
            Built for first-time land buyers — not professional investors.{" "}
            <Link href="/login" className="font-medium text-lp-forest-light hover:underline">
              Sign in
            </Link>
          </p>

          {/* These describe the free check sitting directly above them. Engine count and the
              1000-point score belong to the paid analysis, further down the page. */}
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-lp-border pt-6">
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Wallet size={14} /> Cost
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">Free</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <LockOpen size={14} /> Account
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">Not needed</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Database size={14} /> Sources
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">FEMA · USFWS · Census</dd>
            </div>
          </dl>
        </div>

        {/* Mirrors exactly what a free check returns — real findings, no score. The score is
            the paid product, and putting it here made the hero promise something the address
            field below it doesn't deliver. */}
        <div className="relative overflow-hidden rounded-3xl bg-lp-forest p-8 text-lp-cream shadow-xl">
          <TopoPattern />
          <div className="relative z-10">
            <p className="text-xs font-medium tracking-wide text-lp-mint/70 uppercase">Sample check</p>
            <p className="mt-1 text-sm text-lp-mint/60">9000 Example Ave, Tampa, FL</p>

            <div className="mt-6 space-y-4">
              {SAMPLE_FINDINGS.map((finding) => (
                <div key={finding.label} className="flex items-start gap-3">
                  {finding.tone === "alert" ? (
                    <AlertTriangle size={16} className="mt-0.5 shrink-0 text-lp-gold" />
                  ) : (
                    <Check size={16} className="mt-0.5 shrink-0 text-lp-mint" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{finding.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-lp-mint/60">{finding.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4">
              <p className="text-xs text-lp-mint/50">
                Still needs a human: perc test, legal access, zoning, title.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
