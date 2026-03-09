import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { cn } from "@/lib/utils";

const eventsData = [
  {
    id: "1",
    eventDate: "2026-03-09",
    window: "14:00 – 16:00",
    product: "Day-Ahead",
    targetKw: 450,
    deliveredKw: 420,
    effectivenessPct: 93,
  },
  {
    id: "2",
    eventDate: "2026-03-08",
    window: "10:00 – 12:00",
    product: "Real-Time",
    targetKw: 300,
    deliveredKw: 255,
    effectivenessPct: 85,
  },
  {
    id: "3",
    eventDate: "2026-03-07",
    window: "15:00 – 17:00",
    product: "Emergency",
    targetKw: 500,
    deliveredKw: 340,
    effectivenessPct: 68,
  },
  {
    id: "4",
    eventDate: "2026-03-05",
    window: "09:00 – 11:00",
    product: "Day-Ahead",
    targetKw: 400,
    deliveredKw: 378,
    effectivenessPct: 95,
  },
  {
    id: "5",
    eventDate: "2026-03-02",
    window: "13:00 – 15:00",
    product: "Real-Time",
    targetKw: 280,
    deliveredKw: 215,
    effectivenessPct: 77,
  },
];

function effectivenessClass(pct: number): string {
  if (pct >= 90) return "text-status-good font-semibold";
  if (pct >= 75) return "text-amber-600 dark:text-amber-500 font-medium";
  return "text-status-danger font-semibold";
}

export default function CustomerEvents() {
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px]">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Events
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Your participation and delivery performance
          </p>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Event Date</TableHead>
                <TableHead className="text-xs">Window</TableHead>
                <TableHead className="text-xs">Product</TableHead>
                <TableHead className="text-xs text-right">Target kW</TableHead>
                <TableHead className="text-xs text-right">
                  Delivered kW
                </TableHead>
                <TableHead className="text-xs text-right">
                  Effectiveness %
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventsData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.eventDate}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {row.window}
                  </TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell className="text-right">{row.targetKw}</TableCell>
                  <TableCell className="text-right">
                    {row.deliveredKw}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right",
                      effectivenessClass(row.effectivenessPct),
                    )}
                  >
                    {row.effectivenessPct}%
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
