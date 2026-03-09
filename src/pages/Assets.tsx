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

const assetsData = [
  {
    id: "1",
    name: "HVAC Unit A1",
    site: "Site Alpha",
    assetType: "HVAC",
    dispatchableRange: "50–200 kW",
    controlMode: "Direct",
    coverageStatus: "Covered",
    readinessIndicator: "Ready",
    notCoveredReason: null,
  },
  {
    id: "2",
    name: "Chiller Block B",
    site: "Site Alpha",
    assetType: "Chiller",
    dispatchableRange: "100–400 kW",
    controlMode: "Setpoint",
    coverageStatus: "Covered",
    readinessIndicator: "Ready",
    notCoveredReason: null,
  },
  {
    id: "3",
    name: "Pump Station E",
    site: "Site Beta",
    assetType: "Pump",
    dispatchableRange: "80–280 kW",
    controlMode: "Setpoint",
    coverageStatus: "Not Covered",
    readinessIndicator: "—",
    notCoveredReason:
      "This asset requires comfort boundary settings before it can participate.",
  },
  {
    id: "4",
    name: "Compressor G",
    site: "Site Gamma",
    assetType: "Compressor",
    dispatchableRange: "60–220 kW",
    controlMode: "Direct",
    coverageStatus: "Not Covered",
    readinessIndicator: "—",
    notCoveredReason:
      "This asset requires comfort boundary settings before it can participate.",
  },
  {
    id: "5",
    name: "Boiler H",
    site: "Site Gamma",
    assetType: "Boiler",
    dispatchableRange: "100–350 kW",
    controlMode: "Setpoint",
    coverageStatus: "Covered",
    readinessIndicator: "Calibration Due",
    notCoveredReason: null,
  },
];

const NOT_COVERED_TOOLTIP =
  "This asset requires comfort boundary settings before it can participate.";

export default function Assets() {
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

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Asset Name</TableHead>
                  <TableHead className="text-xs">Site</TableHead>
                  <TableHead className="text-xs">Asset Type</TableHead>
                  <TableHead className="text-xs">Dispatchable Range</TableHead>
                  <TableHead className="text-xs">Control Mode</TableHead>
                  <TableHead className="text-xs">Coverage Status</TableHead>
                  <TableHead className="text-xs">Readiness Indicator</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assetsData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.site}
                    </TableCell>
                    <TableCell>{row.assetType}</TableCell>
                    <TableCell>{row.dispatchableRange}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">
                        {row.controlMode}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {row.coverageStatus === "Not Covered" ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="inline-flex items-center gap-1 cursor-help text-status-warning">
                              {row.coverageStatus}
                              <HelpCircle className="h-3.5 w-3.5" />
                            </span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="max-w-xs">
                            {row.notCoveredReason ?? NOT_COVERED_TOOLTIP}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="text-status-good">
                          {row.coverageStatus}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {row.readinessIndicator}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </TooltipProvider>
    </DashboardLayout>
  );
}
