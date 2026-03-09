import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const coverageData = [
  { asset: "HVAC Unit A1", org: "Acme Energy", type: "HVAC", range: "50–200 kW", covered: true, reason: null, readiness: 92 },
  { asset: "Chiller Block B", org: "Acme Energy", type: "Chiller", range: "100–400 kW", covered: true, reason: null, readiness: 87 },
  { asset: "Lighting Zone C", org: "GreenGrid Ltd", type: "Lighting", range: "20–60 kW", covered: false, reason: "Ineligible asset type", readiness: 34 },
  { asset: "EV Charger D", org: "GreenGrid Ltd", type: "EV Charger", range: "0–150 kW", covered: false, reason: "Missing comfort bounds", readiness: 45 },
  { asset: "Pump Station E", org: "PowerCo", type: "Pump", range: "80–280 kW", covered: true, reason: null, readiness: 78 },
  { asset: "Generator F", org: "PowerCo", type: "Generator", range: "200–800 kW", covered: false, reason: "Outside allowed manufacturing window", readiness: 12 },
  { asset: "Compressor G", org: "IndFlex", type: "Compressor", range: "60–220 kW", covered: true, reason: null, readiness: 95 },
  { asset: "Boiler H", org: "IndFlex", type: "Boiler", range: "100–350 kW", covered: true, reason: null, readiness: 81 },
];

function ReadinessBar({ score }: { score: number }) {
  const color = score >= 75 ? "bg-status-good" : score >= 50 ? "bg-status-warning" : "bg-status-danger";
  return (
    <div className="flex items-center gap-2 min-w-[120px]">
      <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", color)} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-medium text-muted-foreground w-8 text-right">{score}</span>
    </div>
  );
}

export default function CoverageReadiness() {
  const avgReadiness = Math.round(coverageData.reduce((s, d) => s + d.readiness, 0) / coverageData.length);
  const coveredCount = coverageData.filter(d => d.covered).length;

  return (
    <DashboardLayout>
      <div className="max-w-[1400px] space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Coverage & Readiness</h1>
          <p className="text-sm text-muted-foreground mt-1">Asset coverage status and readiness scores</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Total Assets</p>
            <p className="text-3xl font-bold mt-1">{coverageData.length}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Covered</p>
            <p className="text-3xl font-bold mt-1 text-status-good">{coveredCount}</p>
          </div>
          <div className="bg-card rounded-xl border border-border p-5">
            <p className="text-sm text-muted-foreground">Avg Readiness</p>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-3xl font-bold">{avgReadiness}</p>
              <div className="flex-1 max-w-[200px]">
                <ReadinessBar score={avgReadiness} />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Asset</TableHead>
                <TableHead className="text-xs">Organisation</TableHead>
                <TableHead className="text-xs">Asset Type</TableHead>
                <TableHead className="text-xs">Dispatchable Range</TableHead>
                <TableHead className="text-xs">Coverage Status</TableHead>
                <TableHead className="text-xs">Readiness Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coverageData.map((d) => (
                <TableRow key={d.asset}>
                  <TableCell className="text-sm font-medium">{d.asset}</TableCell>
                  <TableCell className="text-sm">{d.org}</TableCell>
                  <TableCell className="text-sm">{d.type}</TableCell>
                  <TableCell className="text-sm">{d.range}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge className={cn("text-xs border-0", d.covered ? "bg-status-good-muted text-status-good" : "bg-status-danger-muted text-status-danger")}>
                        {d.covered ? "Covered" : "Not Covered"}
                      </Badge>
                      {d.reason && (
                        <Badge variant="outline" className="text-xs text-status-warning border-status-warning">
                          {d.reason}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell><ReadinessBar score={d.readiness} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
