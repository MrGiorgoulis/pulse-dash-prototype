import { useState } from "react";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";
import { getPayouts, type PayoutItem } from "@/lib/api";

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

export default function Payouts() {
  const [selectedPayout, setSelectedPayout] = useState<PayoutItem | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["payouts"],
    queryFn: getPayouts,
  });

  const openDetail = (row: PayoutItem) => {
    setSelectedPayout(row);
    setSheetOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Payouts
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Payment history and details
          </p>
        </div>

        {isLoading && <p className="text-muted-foreground">Loading payouts…</p>}
        {isError && (
          <p className="text-status-danger">
            Failed to load payouts:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        {data && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Payout Date</TableHead>
                  <TableHead className="text-xs text-right">
                    Gross Statement Net
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    Imbalance Penalty
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    Adjustments
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    Final Payout
                  </TableHead>
                  <TableHead className="text-xs">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow
                    key={row.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => openDetail(row)}
                  >
                    <TableCell className="font-medium">
                      {row.payout_date}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.gross_statement_net)}
                    </TableCell>
                    <TableCell className="text-right text-muted-foreground">
                      {formatCurrency(row.imbalance_penalty)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right",
                        row.adjustments > 0 && "text-status-good",
                        row.adjustments < 0 && "text-status-danger",
                      )}
                    >
                      {row.adjustments > 0 ? "+" : ""}
                      {formatCurrency(row.adjustments)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(row.final_payout)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          row.status === "Completed"
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

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Payout detail</SheetTitle>
          </SheetHeader>
          {selectedPayout && (
            <div className="mt-6 space-y-4">
              <div className="text-sm text-muted-foreground">
                Payout #{selectedPayout.id} · {selectedPayout.payout_date}
              </div>
              <div className="space-y-3 font-medium">
                <div className="flex justify-between">
                  <span>Gross Statement Net</span>
                  <span>
                    {formatCurrency(selectedPayout.gross_statement_net)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>– Imbalance Penalty</span>
                  <span>
                    -{formatCurrency(selectedPayout.imbalance_penalty)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>± Adjustments</span>
                  <span>
                    {selectedPayout.adjustments >= 0 ? "+" : ""}
                    {formatCurrency(selectedPayout.adjustments)}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-3 text-base">
                  <span>= Final Payout</span>
                  <span>{formatCurrency(selectedPayout.final_payout)}</span>
                </div>
              </div>
              <div className="pt-2">
                <Badge
                  variant="secondary"
                  className={
                    selectedPayout.status === "Completed"
                      ? "bg-status-good-muted text-status-good border-0"
                      : "bg-status-warning-muted text-status-warning border-0"
                  }
                >
                  {selectedPayout.status}
                </Badge>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </DashboardLayout>
  );
}
