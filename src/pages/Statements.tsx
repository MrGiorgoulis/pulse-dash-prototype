import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

const statementsData = [
  {
    id: "STMT-001",
    statementDate: "2026-03-08",
    product: "Day-Ahead",
    grossCurtailmentValue: 1840,
    revenueShare: 368,
    netValue: 1472,
    status: "Paid",
  },
  {
    id: "STMT-002",
    statementDate: "2026-03-01",
    product: "Real-Time",
    grossCurtailmentValue: 920,
    revenueShare: 184,
    netValue: 736,
    status: "Paid",
  },
  {
    id: "STMT-003",
    statementDate: "2026-02-22",
    product: "Day-Ahead",
    grossCurtailmentValue: 2100,
    revenueShare: 420,
    netValue: 1680,
    status: "Pending",
  },
  {
    id: "STMT-004",
    statementDate: "2026-02-15",
    product: "Emergency",
    grossCurtailmentValue: 3200,
    revenueShare: 640,
    netValue: 2560,
    status: "Paid",
  },
];

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Statements() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Statements
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Curtailment and revenue share by statement period
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Statement Date</TableHead>
                <TableHead className="text-xs">Product</TableHead>
                <TableHead className="text-xs text-right">
                  Gross Curtailment Value
                </TableHead>
                <TableHead className="text-xs text-right">
                  Revenue Share
                </TableHead>
                <TableHead className="text-xs text-right">Net Value</TableHead>
                <TableHead className="text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {statementsData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">
                    {row.statementDate}
                  </TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(row.grossCurtailmentValue)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(row.revenueShare)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(row.netValue)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={row.status === "Paid" ? "default" : "secondary"}
                      className={
                        row.status === "Paid"
                          ? "bg-status-good-muted text-status-good border-0"
                          : "bg-status-warning-muted text-status-warning border-0"
                      }
                    >
                      {row.status}
                    </Badge>
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
