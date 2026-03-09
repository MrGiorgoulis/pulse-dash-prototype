import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { Badge } from "@/components/ui/badge";

const curtailmentData = [
  { time: "06:00", mw: 12 },
  { time: "08:00", mw: 28 },
  { time: "10:00", mw: 45 },
  { time: "12:00", mw: 62 },
  { time: "14:00", mw: 78 },
  { time: "16:00", mw: 55 },
  { time: "18:00", mw: 40 },
  { time: "20:00", mw: 22 },
];

const coverageData = [
  { zone: "North", assets: 42 },
  { zone: "South", assets: 35 },
  { zone: "East", assets: 28 },
  { zone: "West", assets: 51 },
  { zone: "Central", assets: 38 },
];

export function CurtailmentChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">
        Curtailment Delivered (MW)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={curtailmentData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12 }}
              stroke="hsl(220, 9%, 46%)"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Line
              type="monotone"
              dataKey="mw"
              stroke="hsl(217, 71%, 45%)"
              strokeWidth={2.5}
              dot={{ fill: "hsl(217, 71%, 45%)", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function CoverageChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">
        Asset Coverage Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={coverageData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis
              dataKey="zone"
              tick={{ fontSize: 12 }}
              stroke="hsl(220, 9%, 46%)"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="assets"
              fill="hsl(152, 69%, 41%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Customer dashboard: Curtailment Delivered by Event
const curtailmentByEventData = [
  { event: "Summer Peak DR", kw: 420 },
  { event: "Grid Emergency #4", kw: 380 },
  { event: "Voluntary Curtail", kw: 195 },
  { event: "Scheduled Maint.", kw: 110 },
  { event: "Winter Storm", kw: 510 },
];

export function CurtailmentByEventChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">
        Curtailment Delivered by Event
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={curtailmentByEventData}
            layout="vertical"
            margin={{ left: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis
              type="number"
              tick={{ fontSize: 12 }}
              stroke="hsl(220, 9%, 46%)"
              unit=" kW"
            />
            <YAxis
              type="category"
              dataKey="event"
              tick={{ fontSize: 12 }}
              stroke="hsl(220, 9%, 46%)"
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="kw"
              fill="hsl(217, 71%, 45%)"
              radius={[0, 4, 4, 0]}
              name="Delivered (kW)"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Customer dashboard: Asset Health Distribution
const assetHealthData = [
  { status: "Ready", count: 42 },
  { status: "Needs Calibration", count: 8 },
  { status: "Maintenance", count: 3 },
  { status: "Offline", count: 2 },
];

export function AssetHealthChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">
        Asset Health Distribution
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={assetHealthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
            <XAxis
              dataKey="status"
              tick={{ fontSize: 11 }}
              stroke="hsl(220, 9%, 46%)"
            />
            <YAxis tick={{ fontSize: 12 }} stroke="hsl(220, 9%, 46%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(0, 0%, 100%)",
                border: "1px solid hsl(220, 13%, 91%)",
                borderRadius: "8px",
                fontSize: "13px",
              }}
            />
            <Bar
              dataKey="count"
              fill="hsl(152, 69%, 41%)"
              radius={[4, 4, 0, 0]}
              name="Assets"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Status badge helper
export function StatusBadge({
  status,
}: {
  status: "active" | "completed" | "pending" | "failed";
}) {
  const styles: Record<string, string> = {
    active: "bg-status-good-muted text-status-good border-0",
    completed: "bg-status-info-muted text-status-info border-0",
    pending: "bg-status-warning-muted text-status-warning border-0",
    failed: "bg-status-danger-muted text-status-danger border-0",
  };
  return (
    <Badge className={styles[status]} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
