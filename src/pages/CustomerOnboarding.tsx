import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";

const STEPS = ["Organisation Setup", "Sites Setup", "Assets Setup", "Constraints", "Review"];

const mockAssets = [
  { name: "HVAC Unit A1", type: "HVAC", ratedKw: 250, minKw: 50, maxKw: 200, controlMode: "Direct" },
  { name: "Chiller Block B", type: "Chiller", ratedKw: 500, minKw: 100, maxKw: 400, controlMode: "Setpoint" },
  { name: "Lighting Zone C", type: "Lighting", ratedKw: 80, minKw: 20, maxKw: 60, controlMode: "On/Off" },
  { name: "EV Charger D", type: "EV Charger", ratedKw: 150, minKw: 0, maxKw: 150, controlMode: "Direct" },
  { name: "Pump Station E", type: "Pump", ratedKw: 320, minKw: 80, maxKw: 280, controlMode: "Setpoint" },
];

export default function CustomerOnboarding() {
  const [step, setStep] = useState(0);

  return (
    <DashboardLayout>
      <div className="max-w-[1100px] space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customer Onboarding</h1>
          <p className="text-sm text-muted-foreground mt-1">Step-by-step onboarding wizard</p>
        </div>

        {/* Stepper */}
        <div className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors",
                  i < step ? "bg-status-good text-status-good-foreground" :
                  i === step ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                )}>
                  {i < step ? <Check className="h-4 w-4" /> : i + 1}
                </div>
                <span className={cn(
                  "text-sm font-medium truncate hidden sm:block",
                  i === step ? "text-foreground" : "text-muted-foreground"
                )}>{s}</span>
                {i < STEPS.length - 1 && <div className={cn("h-px flex-1", i < step ? "bg-status-good" : "bg-border")} />}
              </div>
            ))}
          </div>

          {/* Step content */}
          {step === 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Organisation Name</Label>
                <Input placeholder="Acme Energy Corp" />
              </div>
              <div className="space-y-2">
                <Label>Registration Number</Label>
                <Input placeholder="REG-00001" />
              </div>
              <div className="space-y-2">
                <Label>Primary Contact</Label>
                <Input placeholder="john@acme.com" />
              </div>
              <div className="space-y-2">
                <Label>Country</Label>
                <Select defaultValue="ie">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ie">Ireland</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Site Name</Label>
                <Input placeholder="Dublin Data Centre" />
              </div>
              <div className="space-y-2">
                <Label>MPRN / Meter ID</Label>
                <Input placeholder="MPRN-123456" />
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Input placeholder="123 Industrial Park, Dublin" />
              </div>
              <div className="space-y-2">
                <Label>Grid Zone</Label>
                <Select defaultValue="north">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North</SelectItem>
                    <SelectItem value="south">South</SelectItem>
                    <SelectItem value="east">East</SelectItem>
                    <SelectItem value="west">West</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs">Asset Name</TableHead>
                  <TableHead className="text-xs">Asset Type</TableHead>
                  <TableHead className="text-xs">Rated kW</TableHead>
                  <TableHead className="text-xs">Disp. Min kW</TableHead>
                  <TableHead className="text-xs">Disp. Max kW</TableHead>
                  <TableHead className="text-xs">Control Mode</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAssets.map((a) => (
                  <TableRow key={a.name}>
                    <TableCell className="text-sm font-medium">{a.name}</TableCell>
                    <TableCell className="text-sm">{a.type}</TableCell>
                    <TableCell className="text-sm">{a.ratedKw}</TableCell>
                    <TableCell className="text-sm">{a.minKw}</TableCell>
                    <TableCell className="text-sm">{a.maxKw}</TableCell>
                    <TableCell><Badge variant="secondary" className="text-xs">{a.controlMode}</Badge></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Max Events Per Day</Label>
                <Input type="number" defaultValue="3" />
              </div>
              <div className="space-y-2">
                <Label>Max Duration (hours)</Label>
                <Input type="number" defaultValue="4" />
              </div>
              <div className="space-y-2">
                <Label>Comfort Bound Min (°C)</Label>
                <Input type="number" defaultValue="18" />
              </div>
              <div className="space-y-2">
                <Label>Comfort Bound Max (°C)</Label>
                <Input type="number" defaultValue="26" />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Organisation</p>
                  <p className="text-sm font-semibold mt-1">Acme Energy Corp</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Sites</p>
                  <p className="text-sm font-semibold mt-1">1</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Assets</p>
                  <p className="text-sm font-semibold mt-1">{mockAssets.length}</p>
                </div>
                <div className="bg-muted rounded-lg p-4">
                  <p className="text-xs text-muted-foreground">Total Dispatchable</p>
                  <p className="text-sm font-semibold mt-1">{mockAssets.reduce((s, a) => s + a.maxKw, 0)} kW</p>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-xs">Asset</TableHead>
                    <TableHead className="text-xs">Type</TableHead>
                    <TableHead className="text-xs">Range</TableHead>
                    <TableHead className="text-xs">Control</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAssets.map((a) => (
                    <TableRow key={a.name}>
                      <TableCell className="text-sm font-medium">{a.name}</TableCell>
                      <TableCell className="text-sm">{a.type}</TableCell>
                      <TableCell className="text-sm">{a.minKw}–{a.maxKw} kW</TableCell>
                      <TableCell><Badge variant="secondary" className="text-xs">{a.controlMode}</Badge></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-8">
            <Button variant="outline" disabled={step === 0} onClick={() => setStep(step - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={() => setStep(Math.min(step + 1, STEPS.length - 1))} disabled={step === STEPS.length - 1}>
              {step === STEPS.length - 2 ? "Review" : "Next"} <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
