import {
  Building2,
  Box,
  CalendarClock,
  Zap,
  Package,
  Shield,
  DollarSign,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
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
import { getCustomerDashboard } from "@/lib/api";

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

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function CustomerDashboard() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["customer-dashboard"],
    queryFn: getCustomerDashboard,
  });

  if (isLoading) {
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
        <p className="text-muted-foreground">Loading…</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6 max-w-[1400px]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>
        <p className="text-status-danger">
          Failed to load dashboard:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  const { kpis, curtailment_by_event, asset_health } = data;

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
          value={kpis.active_products}
          icon={Package}
          status="info"
        />
        <KpiCard
          title="Coverage Score"
          value={`${kpis.coverage_score_pct}%`}
          subtitle={`${kpis.assets_covered} of ${kpis.assets_total} assets`}
          icon={Shield}
          status="good"
        />
        <KpiCard
          title="Assets Covered / Total"
          value={`${kpis.assets_covered} / ${kpis.assets_total}`}
          icon={Box}
          status="warning"
        />
        <KpiCard
          title="Events Participated"
          value={kpis.events_participated}
          subtitle="Last 90 days"
          icon={CalendarClock}
          status="info"
        />
        <KpiCard
          title="Total Curtailment Delivered"
          value={`${kpis.total_curtailment_delivered_kw.toLocaleString()} kW`}
          subtitle="YTD"
          icon={Zap}
          status="good"
        />
        <KpiCard
          title="Total Revenue"
          value={formatCurrency(kpis.total_revenue)}
          subtitle="YTD"
          icon={DollarSign}
          trend={{ value: "8% vs prior year", positive: true }}
          status="good"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CurtailmentByEventChart data={curtailment_by_event} />
        <AssetHealthChart data={asset_health} />
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
