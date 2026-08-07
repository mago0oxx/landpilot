import { ReactNode } from "react";
import DisclaimerNote from "@/components/shared/DisclaimerNote";

import Header from "./Header";
import Sidebar from "./Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-lp-cream text-lp-ink">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Header />

        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>

        <footer className="border-t border-lp-border px-8 py-4">
          <DisclaimerNote />
        </footer>
      </div>
    </div>
  );
}