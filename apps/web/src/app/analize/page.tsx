import AppShell from "@/components/layout/AppShell";
import AnalyzeForm from "@/features/analyze/components/AnalyzeForm";
import DashboardHero from "@/features/dashboard/components/DashboardHero";
import EmptyState from "@/features/dashboard/components/EmptyState";
import StatsSection from "@/features/dashboard/components/StatsSection";

export default function Home() {
  return (


    <AppShell>
      <DashboardHero userName="Daniel" />
      
      <StatsSection />
      <AnalyzeForm />
      <EmptyState />
    </AppShell>


  );
}