import Link from "next/link";
import TopoPattern from "@/components/shared/TopoPattern";

type DashboardHeroProps = {
  userName: string;
};

export default function DashboardHero({
  userName,
}: DashboardHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-lp-forest p-10">
      <TopoPattern />

      <span className="relative z-10 text-sm font-medium uppercase tracking-widest text-lp-mint">
        Welcome Back
      </span>

      <h2 className="relative z-10 mt-3 text-4xl font-bold tracking-tight text-lp-cream">
        Hello, {userName} 👋
      </h2>

      <p className="relative z-10 mt-4 max-w-xl text-lp-mint/70">
        Ready to discover your next great real estate investment?
      </p>

      <Link
        href="/analize"
        className="relative z-10 mt-8 inline-block rounded-xl bg-lp-gold px-6 py-3 font-semibold text-lp-gold-ink transition hover:brightness-105"
      >
        + Start New Analysis
      </Link>
    </section>
  );
}
