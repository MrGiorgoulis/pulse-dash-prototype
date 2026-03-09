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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { HelpCircle } from "lucide-react";
import { getAssets } from "@/lib/api";

const NOT_COVERED_TOOLTIP =
  "This asset requires comfort boundary settings before it can participate.";

export default function Assets() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["assets"],
    queryFn: getAssets,
  });

  return (
    <DashboardLayout>
      <TooltipProvider>
        <div className="space-y-6 max-w-[1400px]">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              Assets
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Your registered assets and coverage status
            </p>
          </div>

          {isLoading && (
            <p className="text-muted-foreground">Loading assets…</p>
          )}
          {isError && (
            <p className="text-status-danger">
              Failed to load assets:{" "}
              {error instanceof Error ? error.message : "Unknown error"}
            </p>
          )}
          {data && (
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Asset Name</TableHead>
                    <TableHead className="text-xs">Site</TableHead>
                    <TableHead className="text-xs">Asset Type</TableHead>
                    <TableHead className="text-xs">
                      Dispatchable Range
                    </TableHead>
                    <TableHead className="text-xs">Control Mode</TableHead>
                    <TableHead className="text-xs">Coverage Status</TableHead>
                    <TableHead className="text-xs">
                      Readiness Indicator
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.items.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.name}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.site}
                      </TableCell>
                      <TableCell>{row.asset_type}</TableCell>
                      <TableCell>{row.dispatchable_range}</TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="text-xs">
                          {row.control_mode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {row.coverage_status === "Not Covered" ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <span className="inline-flex items-center gap-1 cursor-help text-status-warning">
                                {row.coverage_status}
                                <HelpCircle className="h-3.5 w-3.5" />
                              </span>
                            </TooltipTrigger>
                            <TooltipContent side="top" className="max-w-xs">
                              {row.not_covered_reason ?? NOT_COVERED_TOOLTIP}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span className="text-status-good">
                            {row.coverage_status}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {row.readiness_indicator ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </TooltipProvider>
    </DashboardLayout>
  );
}
