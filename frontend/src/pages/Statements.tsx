import { useQuery } from "@tanstack/react-query";
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
import { getStatements } from "@/lib/api";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Statements() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["statements"],
    queryFn: getStatements,
  });

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

        {isLoading && (
          <p className="text-muted-foreground">Loading statements…</p>
        )}
        {isError && (
          <p className="text-status-danger">
            Failed to load statements:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        {data && (
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
                  <TableHead className="text-xs text-right">
                    Net Value
                  </TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">
                      {row.statement_date}
                    </TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.gross_curtailment_value)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.revenue_share)}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {formatCurrency(row.net_value)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          row.status === "Paid" ? "default" : "secondary"
                        }
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
        )}
      </div>
    </DashboardLayout>
  );
}
