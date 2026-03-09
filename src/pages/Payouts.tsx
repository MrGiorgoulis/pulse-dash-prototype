import { useState } from "react";
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

const payoutsData = [
  {
    id: "PAY-001",
    payoutDate: "2026-03-10",
    grossStatementNet: 4520,
    imbalancePenalty: 120,
    adjustments: 0,
    finalPayout: 4400,
    status: "Completed",
  },
  {
    id: "PAY-002",
    payoutDate: "2026-03-03",
    grossStatementNet: 2890,
    imbalancePenalty: 0,
    adjustments: 50,
    finalPayout: 2940,
    status: "Completed",
  },
  {
    id: "PAY-003",
    payoutDate: "2026-02-25",
    grossStatementNet: 1680,
    imbalancePenalty: 45,
    adjustments: -30,
    finalPayout: 1605,
    status: "Processing",
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

type PayoutRow = (typeof payoutsData)[number];

export default function Payouts() {
  const [selectedPayout, setSelectedPayout] = useState<PayoutRow | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const openDetail = (row: PayoutRow) => {
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
              {payoutsData.map((row) => (
                <TableRow
                  key={row.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => openDetail(row)}
                >
                  <TableCell className="font-medium">
                    {row.payoutDate}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatCurrency(row.grossStatementNet)}
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {formatCurrency(row.imbalancePenalty)}
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
                    {formatCurrency(row.finalPayout)}
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
      </div>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Payout detail</SheetTitle>
          </SheetHeader>
          {selectedPayout && (
            <div className="mt-6 space-y-4">
              <div className="text-sm text-muted-foreground">
                Payout {selectedPayout.id} · {selectedPayout.payoutDate}
              </div>
              <div className="space-y-3 font-medium">
                <div className="flex justify-between">
                  <span>Gross Statement Net</span>
                  <span>
                    {formatCurrency(selectedPayout.grossStatementNet)}
                  </span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>– Imbalance Penalty</span>
                  <span>
                    -{formatCurrency(selectedPayout.imbalancePenalty)}
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
                  <span>{formatCurrency(selectedPayout.finalPayout)}</span>
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
