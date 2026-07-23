import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-800 px-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-zinc-400">
          Welcome back, Daniel 👋
        </p>
      </div>

      <div className="flex items-center gap-5">
        <button className="rounded-xl p-3 transition hover:bg-zinc-900">
          <Search size={20} />
        </button>

        <button className="rounded-xl p-3 transition hover:bg-zinc-900">
          <Bell size={20} />
        </button>

        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-600 text-lg font-bold">
          D
        </div>
      </div>
    </header>
  );
}