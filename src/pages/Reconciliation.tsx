import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const data = [
  { org: "Acme Energy", date: "2026-03-09", activatedKwh: 2400, deliveredKwh: 2280, variance: -5.0, penalty: 120, status: "Draft" as const },
  { org: "GreenGrid Ltd", date: "2026-03-09", activatedKwh: 1800, deliveredKwh: 1650, variance: -8.3, penalty: 310, status: "Draft" as const },
  { org: "PowerCo", date: "2026-03-08", activatedKwh: 3200, deliveredKwh: 3180, variance: -0.6, penalty: 0, status: "Approved" as const },
  { org: "IndFlex", date: "2026-03-08", activatedKwh: 1500, deliveredKwh: 1500, variance: 0, penalty: 0, status: "Closed" as const },
  { org: "Acme Energy", date: "2026-03-07", activatedKwh: 2800, deliveredKwh: 2750, variance: -1.8, penalty: 50, status: "Closed" as const },
];

const statusStyles: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Approved: "bg-status-good-muted text-status-good",
  Closed: "bg-secondary text-secondary-foreground",
};

export default function Reconciliation() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Reconciliation</h1>
          <p className="text-sm text-muted-foreground mt-1">Verify delivered vs activated energy quantities</p>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Organisation</TableHead>
                <TableHead className="text-xs">Date</TableHead>
                <TableHead className="text-xs">Activated kWh</TableHead>
                <TableHead className="text-xs">Delivered kWh</TableHead>
                <TableHead className="text-xs">Variance</TableHead>
                <TableHead className="text-xs">Imbalance Penalty</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((d, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm font-medium">{d.org}</TableCell>
                  <TableCell className="text-sm">{d.date}</TableCell>
                  <TableCell className="text-sm">{d.activatedKwh.toLocaleString()}</TableCell>
                  <TableCell className="text-sm">{d.deliveredKwh.toLocaleString()}</TableCell>
                  <TableCell className={cn("text-sm font-semibold", d.variance < -5 ? "text-status-danger" : d.variance < 0 ? "text-status-warning" : "text-status-good")}>
                    {d.variance}%
                  </TableCell>
                  <TableCell className="text-sm">€{d.penalty.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs border-0", statusStyles[d.status])}>{d.status}</Badge>
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
