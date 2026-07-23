import AppShell from "@/components/layout/AppShell";
import DashboardHero from "@/features/dashboard/components/DashboardHero";

export default function Home() {
  return (
    <AppShell>
      <DashboardHero userName="Daniel" />
    </AppShell>
  );
}