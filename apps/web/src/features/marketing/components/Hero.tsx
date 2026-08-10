import Link from "next/link";
import { Database, ShieldCheck, SlidersHorizontal } from "lucide-react";
import TopoPattern from "@/components/shared/TopoPattern";

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
            Paste the address or the listing link. In 60 seconds we&apos;ll tell you if it&apos;s in a
            flood zone, whether it has legal road access, if utilities reach it, and what it&apos;s
            really going to cost you to build.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="inline-flex items-center justify-center rounded-xl bg-lp-gold px-6 py-3.5 text-sm font-medium text-lp-gold-ink transition hover:brightness-105"
            >
              Start a free analysis
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-xl border border-lp-forest/20 px-6 py-3.5 text-sm font-medium text-lp-ink transition hover:border-lp-forest/50"
            >
              Sign in
            </Link>
          </div>

          <p className="mt-4 text-sm text-stone-500">
            Built for first-time land buyers — not professional investors.
          </p>

          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-lp-border pt-6">
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <SlidersHorizontal size={14} /> Engines
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">7</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <ShieldCheck size={14} /> LPS Score
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">/ 1000</dd>
            </div>
            <div>
              <dt className="flex items-center gap-1.5 text-xs font-medium text-stone-500">
                <Database size={14} /> Data sources
              </dt>
              <dd className="mt-1 text-2xl font-bold text-lp-ink">FEMA · Census · GIS</dd>
            </div>
          </dl>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-lp-forest p-8 text-lp-cream shadow-xl">
          <TopoPattern />
          <div className="relative z-10">
            <p className="text-xs font-medium tracking-wide text-lp-mint/70 uppercase">Sample result</p>
            <p className="mt-1 text-sm text-lp-mint/60">9000 Example Ave, Tampa, FL</p>

            <div className="mt-6 flex items-end gap-3">
              <span className="text-6xl font-bold">742</span>
              <span className="mb-2 text-sm text-lp-mint/70">/ 1000</span>
            </div>

            <div className="mt-3 inline-flex items-center rounded-full bg-lp-gold/15 px-3 py-1 text-xs font-medium text-lp-gold">
              Buy · Medium risk
            </div>

            <div className="mt-8 space-y-3">
              {[
                { label: "Financial", value: 82 },
                { label: "Location", value: 76 },
                { label: "Development", value: 64 },
                { label: "Environmental", value: 88 },
              ].map((row) => (
                <div key={row.label}>
                  <div className="flex justify-between text-xs text-lp-mint/70">
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-lp-mint" style={{ width: `${row.value}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
