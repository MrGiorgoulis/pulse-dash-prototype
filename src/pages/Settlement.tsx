import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";

const statements = [
  { org: "Acme Energy", period: "Mar 2026", gross: 12400, revenueShare: 2480, net: 9920, status: "Draft" as const },
  { org: "GreenGrid Ltd", period: "Mar 2026", gross: 8600, revenueShare: 1720, net: 6880, status: "Draft" as const },
  { org: "PowerCo", period: "Feb 2026", gross: 15200, revenueShare: 3040, net: 12160, status: "Issued" as const },
  { org: "IndFlex", period: "Feb 2026", gross: 9800, revenueShare: 1960, net: 7840, status: "Paid" as const },
  { org: "Acme Energy", period: "Feb 2026", gross: 11500, revenueShare: 2300, net: 9200, status: "Paid" as const },
];

const statusStyles: Record<string, string> = {
  Draft: "bg-muted text-muted-foreground",
  Issued: "bg-status-info-muted text-status-info",
  Paid: "bg-status-good-muted text-status-good",
};

export default function Settlement() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Settlement</h1>
            <p className="text-sm text-muted-foreground mt-1">Financial settlement statements</p>
          </div>
          <Button><Play className="h-4 w-4 mr-2" /> Run Clearing</Button>
        </div>

        <div className="bg-card rounded-xl border border-border p-5">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Organisation</TableHead>
                <TableHead className="text-xs">Period</TableHead>
                <TableHead className="text-xs">Gross Value</TableHead>
                <TableHead className="text-xs">Revenue Share</TableHead>
                <TableHead className="text-xs">Net Statement</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statements.map((s, i) => (
                <TableRow key={i}>
                  <TableCell className="text-sm font-medium">{s.org}</TableCell>
                  <TableCell className="text-sm">{s.period}</TableCell>
                  <TableCell className="text-sm">€{s.gross.toLocaleString()}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">€{s.revenueShare.toLocaleString()}</TableCell>
                  <TableCell className="text-sm font-semibold">€{s.net.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs border-0", statusStyles[s.status])}>{s.status}</Badge>
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
