import { ClipboardCheck, FileSearch, MapPin } from "lucide-react";

const STEPS = [
  {
    icon: MapPin,
    title: "Give it an address",
    description: "Just the address, or a listing link. Add extra details if you have them — it's optional.",
  },
  {
    icon: FileSearch,
    title: "We pull the real data",
    description: "Flood zones, wetlands, parcel records, and county trends are fetched from FEMA, USFWS, Census and county GIS — not guessed.",
  },
  {
    icon: ClipboardCheck,
    title: "You get findings, and the gaps",
    description: "What the public record says about the parcel, plus a straight list of what still needs the county, a surveyor, or a title company.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20">
      <div className="max-w-xl">
        <h2 className="text-3xl font-bold tracking-tight text-lp-ink">How it works</h2>
        <p className="mt-3 text-stone-600">
          No forms, no account, and nothing to pay to get a first read on a parcel.
        </p>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-3">
        {STEPS.map((step, index) => (
          <div key={step.title} className="relative rounded-2xl border border-lp-border bg-white/60 p-6">
            <span className="text-xs font-medium text-lp-gold">Step {index + 1}</span>
            <div className="mt-3 flex h-11 w-11 items-center justify-center rounded-xl bg-lp-forest text-lp-mint">
              <step.icon size={20} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-lp-ink">{step.title}</h3>
            <p className="mt-2 text-sm text-stone-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
