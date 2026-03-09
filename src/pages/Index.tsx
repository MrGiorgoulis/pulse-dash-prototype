import { Building2, Box, CalendarClock, Zap } from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { CurtailmentChart, CoverageChart } from "@/components/dashboard/Charts";
import { RecentEventsTable, RecentBidsTable } from "@/components/dashboard/Tables";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        {/* Page header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Overview of your demand response operations
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            title="Organisations"
            value={24}
            subtitle="3 pending onboarding"
            icon={Building2}
            trend={{ value: "12% from last month", positive: true }}
            status="info"
          />
          <KpiCard
            title="Dispatchable Assets"
            value={194}
            subtitle="Across 5 zones"
            icon={Box}
            trend={{ value: "8% from last month", positive: true }}
            status="good"
          />
          <KpiCard
            title="Active Events"
            value={3}
            subtitle="1 emergency, 2 scheduled"
            icon={CalendarClock}
            status="warning"
          />
          <KpiCard
            title="Curtailment Today"
            value="342 MW"
            subtitle="Target: 400 MW"
            icon={Zap}
            trend={{ value: "85% of target", positive: false }}
            status="danger"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <CurtailmentChart />
          <CoverageChart />
        </div>

        {/* Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentEventsTable />
          <RecentBidsTable />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
