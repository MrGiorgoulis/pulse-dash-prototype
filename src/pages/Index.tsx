import {
  Building2,
  Box,
  CalendarClock,
  Zap,
  Package,
  Shield,
  DollarSign,
} from "lucide-react";
import { KpiCard } from "@/components/dashboard/KpiCard";
import {
  CurtailmentChart,
  CoverageChart,
  CurtailmentByEventChart,
  AssetHealthChart,
} from "@/components/dashboard/Charts";
import {
  RecentEventsTable,
  RecentBidsTable,
} from "@/components/dashboard/Tables";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useRole, isOperatorRole } from "@/contexts/RoleContext";

function OperatorDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your demand response operations
        </p>
      </div>
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CurtailmentChart />
        <CoverageChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentEventsTable />
        <RecentBidsTable />
      </div>
    </div>
  );
}

function CustomerDashboard() {
  return (
    <div className="space-y-6 max-w-[1400px]">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your demand response portfolio and performance
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KpiCard
          title="Active Products"
          value={3}
          icon={Package}
          status="info"
        />
        <KpiCard
          title="Coverage Score"
          value="76%"
          subtitle="55 of 72 assets"
          icon={Shield}
          status="good"
        />
        <KpiCard
          title="Assets Covered / Total"
          value="55 / 72"
          icon={Box}
          status="warning"
        />
        <KpiCard
          title="Events Participated"
          value={12}
          subtitle="Last 90 days"
          icon={CalendarClock}
          status="info"
        />
        <KpiCard
          title="Total Curtailment Delivered"
          value="1,615 kW"
          subtitle="YTD"
          icon={Zap}
          status="good"
        />
        <KpiCard
          title="Total Revenue"
          value="$12,440"
          subtitle="YTD"
          icon={DollarSign}
          trend={{ value: "8% vs prior year", positive: true }}
          status="good"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CurtailmentByEventChart />
        <AssetHealthChart />
      </div>
    </div>
  );
}

const Index = () => {
  const { role } = useRole();
  const isOperator = isOperatorRole(role);

  return (
    <DashboardLayout>
      {isOperator ? <OperatorDashboard /> : <CustomerDashboard />}
    </DashboardLayout>
  );
};

export default Index;
