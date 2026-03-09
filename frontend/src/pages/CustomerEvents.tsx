import { useQuery } from "@tanstack/react-query";
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
import { getEvents } from "@/lib/api";

function effectivenessClass(pct: number): string {
  if (pct >= 90) return "text-status-good font-semibold";
  if (pct >= 75) return "text-amber-600 dark:text-amber-500 font-medium";
  return "text-status-danger font-semibold";
}

export default function CustomerEvents() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

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

        {isLoading && <p className="text-muted-foreground">Loading events…</p>}
        {isError && (
          <p className="text-status-danger">
            Failed to load events:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        )}
        {data && (
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Event Date</TableHead>
                  <TableHead className="text-xs">Window</TableHead>
                  <TableHead className="text-xs">Product</TableHead>
                  <TableHead className="text-xs text-right">
                    Target kW
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    Delivered kW
                  </TableHead>
                  <TableHead className="text-xs text-right">
                    Effectiveness %
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.items.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">
                      {row.event_date}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.window}
                    </TableCell>
                    <TableCell>{row.product}</TableCell>
                    <TableCell className="text-right">
                      {row.target_kw}
                    </TableCell>
                    <TableCell className="text-right">
                      {row.delivered_kw}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right",
                        effectivenessClass(row.effectiveness_pct),
                      )}
                    >
                      {row.effectiveness_pct}%
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
