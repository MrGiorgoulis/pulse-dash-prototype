import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock } from "lucide-react";

const portfolioAllocation = [
  { asset: "HVAC Unit A1", org: "Acme Energy", requestedKw: 150, range: "50–200 kW", controlMode: "Direct" },
  { asset: "Chiller Block B", org: "Acme Energy", requestedKw: 300, range: "100–400 kW", controlMode: "Setpoint" },
  { asset: "Pump Station E", org: "PowerCo", requestedKw: 200, range: "80–280 kW", controlMode: "Setpoint" },
  { asset: "Compressor G", org: "IndFlex", requestedKw: 180, range: "60–220 kW", controlMode: "Direct" },
  { asset: "Boiler H", org: "IndFlex", requestedKw: 250, range: "100–350 kW", controlMode: "Setpoint" },
];

const totalAllocated = portfolioAllocation.reduce((s, a) => s + a.requestedKw, 0);
const targetKw = 1200;
const reserveMargin = totalAllocated - targetKw;

export default function EventCreation() {
  return (
    <DashboardLayout>
      <div className="max-w-[1400px] space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Event Creation</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure and dispatch a new curtailment event</p>
        </div>

        {/* Event form */}
        <div className="bg-card rounded-xl border border-border p-6">
          <h3 className="text-sm font-semibold text-card-foreground mb-4">Event Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Product</Label>
              <Select defaultValue="da">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="da">Day-Ahead</SelectItem>
                  <SelectItem value="rt">Real-Time</SelectItem>
                  <SelectItem value="em">Emergency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Strategy</Label>
              <Select defaultValue="pro-rata">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pro-rata">Pro-Rata</SelectItem>
                  <SelectItem value="priority">Priority</SelectItem>
                  <SelectItem value="cost-opt">Cost Optimised</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Target Curtailment (kW)</Label>
              <Input type="number" defaultValue="1200" />
            </div>
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input type="datetime-local" defaultValue="2026-03-09T14:00" />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input type="datetime-local" defaultValue="2026-03-09T16:00" />
            </div>
          </div>
        </div>

        {/* Portfolio allocation */}
        <div className="bg-card rounded-xl border border-border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-card-foreground">Portfolio Allocation</h3>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Allocated</p>
                <p className="text-lg font-bold text-status-good">{totalAllocated} kW</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Reserve Margin</p>
                <p className={`text-lg font-bold ${reserveMargin >= 0 ? "text-status-good" : "text-status-danger"}`}>
                  {reserveMargin >= 0 ? "+" : ""}{reserveMargin} kW
                </p>
              </div>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-xs">Asset</TableHead>
                <TableHead className="text-xs">Organisation</TableHead>
                <TableHead className="text-xs">Requested kW</TableHead>
                <TableHead className="text-xs">Dispatchable Range</TableHead>
                <TableHead className="text-xs">Control Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioAllocation.map((a) => (
                <TableRow key={a.asset}>
                  <TableCell className="text-sm font-medium">{a.asset}</TableCell>
                  <TableCell className="text-sm">{a.org}</TableCell>
                  <TableCell className="text-sm font-semibold">{a.requestedKw}</TableCell>
                  <TableCell className="text-sm">{a.range}</TableCell>
                  <TableCell><Badge variant="secondary" className="text-xs">{a.controlMode}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-end">
          <Button>
            <CalendarClock className="h-4 w-4 mr-2" /> Dispatch Event
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
