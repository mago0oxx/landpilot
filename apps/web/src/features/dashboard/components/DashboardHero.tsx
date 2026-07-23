type DashboardHeroProps = {
  userName: string;
};

export default function DashboardHero({
  userName,
}: DashboardHeroProps) {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-10">
      <span className="text-sm font-medium uppercase tracking-widest text-green-500">
        Welcome Back
      </span>

      <h2 className="mt-3 text-4xl font-bold tracking-tight">
        Hello, {userName} 👋
      </h2>

      <p className="mt-4 max-w-xl text-zinc-400">
        Ready to discover your next great real estate investment?
      </p>

      <button className="mt-8 rounded-xl bg-green-600 px-6 py-3 font-semibold transition hover:bg-green-500">
        + Start New Analysis
      </button>
    </section>
  );
}