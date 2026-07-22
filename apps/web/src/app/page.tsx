export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold tracking-tight">
          LandPilot
        </h1>

        <p className="mt-4 text-xl text-zinc-400">
          Analyze. Invest. Grow.
        </p>

        <button className="mt-10 rounded-xl bg-green-600 px-8 py-4 text-lg font-semibold hover:bg-green-500 transition">
          Start Analysis
        </button>

        <p className="mt-10 text-sm text-zinc-600">
          Version 0.0.1
        </p>
      </div>
    </main>
  );
}