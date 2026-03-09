import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Target, Zap, Percent, AlertTriangle } from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";

const chartData = [
  { time: "14:00", baseline: 1800, target: 1200, delivered: 0 },
  { time: "14:15", baseline: 1780, target: 1200, delivered: 1050 },
  { time: "14:30", baseline: 1790, target: 1200, delivered: 1120 },
  { time: "14:45", baseline: 1810, target: 1200, delivered: 1180 },
  { time: "15:00", baseline: 1800, target: 1200, delivered: 1150 },
  { time: "15:15", baseline: 1820, target: 1200, delivered: 1190 },
  { time: "15:30", baseline: 1795, target: 1200, delivered: 1210 },
  { time: "15:45", baseline: 1805, target: 1200, delivered: 1200 },
];

const assetStatus = [
  { asset: "HVAC Unit A1", requestedKw: 150, deliveredKw: 148, status: "Delivering" as const },
  { asset: "Chiller Block B", requestedKw: 300, deliveredKw: 260, status: "Underperforming" as const },
  { asset: "Pump Station E", requestedKw: 200, deliveredKw: 195, status: "Delivering" as const },
  { asset: "Compressor G", requestedKw: 180, deliveredKw: 0, status: "Offline" as const },
  { asset: "Boiler H", requestedKw: 250, deliveredKw: 0, status: "Skipped" as const },
  { asset: "EV Charger D", requestedKw: 120, deliveredKw: 118, status: "Delivering" as const },
];

const statusStyles: Record<string, string> = {
  Delivering: "bg-status-good-muted text-status-good",
  Underperforming: "bg-status-warning-muted text-status-warning",
  Offline: "bg-status-danger-muted text-status-danger",
  Skipped: "bg-muted text-muted-foreground",
};

const totalRequested = assetStatus.reduce((s, a) => s + a.requestedKw, 0);
const totalDelivered = assetStatus.reduce((s, a) => s + a.deliveredKw, 0);
const deliveryPct = Math.round((totalDelivered / totalRequested) * 100);

export default function ControlRoom() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Control Room</h1>
          <p className="text-sm text-muted-foreground mt-1">Live event operations dashboard</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard title="Target kW" value={`${totalRequested}`} icon={Target} status="info" />
          <KpiCard title="Delivered kW" value={`${totalDelivered}`} icon={Zap} status={deliveryPct >= 90 ? "good" : "warning"} />
          <KpiCard title="Delivery %" value={`${deliveryPct}%`} icon={Percent} status={deliveryPct >= 90 ? "good" : "warning"} />
          <KpiCard
            title="Under-delivery Alert"
            value={deliveryPct < 95 ? "Active" : "None"}
            icon={AlertTriangle}
            status={deliveryPct < 95 ? "danger" : "good"}
          />
        </div>

        {/* Chart */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Baseline vs Target vs Delivered (kW)</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
                <Tooltip contentStyle={{ backgroundColor: "hsl(0,0%,100%)", border: "1px solid hsl(220,13%,91%)", borderRadius: "8px", fontSize: "13px" }} />
                <Legend />
                <Line type="monotone" dataKey="baseline" stroke="hsl(220, 9%, 46%)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                <Line type="monotone" dataKey="target" stroke="hsl(217, 71%, 45%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="delivered" stroke="hsl(152, 69%, 41%)" strokeWidth={2.5} dot={{ r: 3, fill: "hsl(152, 69%, 41%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Asset table */}
        <div className="bg-card rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Asset Delivery Status</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Asset</TableHead>
                <TableHead className="text-xs">Requested kW</TableHead>
                <TableHead className="text-xs">Delivered kW</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assetStatus.map((a) => (
                <TableRow key={a.asset}>
                  <TableCell className="text-sm font-medium">{a.asset}</TableCell>
                  <TableCell className="text-sm">{a.requestedKw}</TableCell>
                  <TableCell className="text-sm font-semibold">{a.deliveredKw}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs border-0", statusStyles[a.status])}>{a.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
