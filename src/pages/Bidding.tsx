import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

const bids = [
  { date: "2026-03-10", product: "Day-Ahead", committedKw: 500, price: 42.5, status: "Draft" as const },
  { date: "2026-03-10", product: "Real-Time", committedKw: 200, price: 55.0, status: "Submitted" as const },
  { date: "2026-03-09", product: "Day-Ahead", committedKw: 750, price: 40.0, status: "Accepted" as const },
  { date: "2026-03-09", product: "Day-Ahead", committedKw: 300, price: 38.5, status: "Activated" as const },
  { date: "2026-03-08", product: "Real-Time", committedKw: 450, price: 52.0, status: "Settled" as const },
  { date: "2026-03-08", product: "Day-Ahead", committedKw: 600, price: 41.0, status: "Settled" as const },
];

const statusStyles: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Submitted: "bg-status-info-muted text-status-info",
  Accepted: "bg-status-good-muted text-status-good",
  Activated: "bg-status-warning-muted text-status-warning",
  Settled: "bg-secondary text-secondary-foreground",
};

export default function Bidding() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Bidding</h1>
            <p className="text-sm text-muted-foreground mt-1">Trader interface for bid management</p>
          </div>
          <Button><Plus className="h-4 w-4 mr-2" /> Create Bid</Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Session Date</TableHead>
                <TableHead className="text-xs">Product</TableHead>
                <TableHead className="text-xs">Committed kW</TableHead>
                <TableHead className="text-xs">Price EUR/MWh</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bids.map((b, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm">{b.date}</TableCell>
                  <TableCell className="text-sm">{b.product}</TableCell>
                  <TableCell className="text-sm font-semibold">{b.committedKw}</TableCell>
                  <TableCell className="text-sm">€{b.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs border-0", statusStyles[b.status])}>{b.status}</Badge>
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
