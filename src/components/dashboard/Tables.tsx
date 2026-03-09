import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StatusBadge } from "./Charts";

const recentEvents = [
  { id: "EVT-001", name: "Summer Peak DR", date: "2026-03-09", mw: "85 MW", status: "active" as const },
  { id: "EVT-002", name: "Grid Emergency #4", date: "2026-03-08", mw: "120 MW", status: "completed" as const },
  { id: "EVT-003", name: "Voluntary Curtail", date: "2026-03-08", mw: "45 MW", status: "completed" as const },
  { id: "EVT-004", name: "Scheduled Maintenance", date: "2026-03-07", mw: "30 MW", status: "pending" as const },
  { id: "EVT-005", name: "Winter Storm Response", date: "2026-03-06", mw: "200 MW", status: "completed" as const },
];

const recentBids = [
  { id: "BID-101", market: "Day-Ahead", zone: "North", mw: "50 MW", price: "$42.50/MWh", status: "active" as const },
  { id: "BID-102", market: "Real-Time", zone: "Central", mw: "30 MW", price: "$38.00/MWh", status: "pending" as const },
  { id: "BID-103", market: "Day-Ahead", zone: "South", mw: "75 MW", price: "$45.00/MWh", status: "completed" as const },
  { id: "BID-104", market: "Real-Time", zone: "West", mw: "20 MW", price: "$55.00/MWh", status: "failed" as const },
  { id: "BID-105", market: "Day-Ahead", zone: "East", mw: "60 MW", price: "$41.00/MWh", status: "active" as const },
];

export function RecentEventsTable() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Recent Events</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">ID</TableHead>
            <TableHead className="text-xs">Event</TableHead>
            <TableHead className="text-xs">Date</TableHead>
            <TableHead className="text-xs">Capacity</TableHead>
            <TableHead className="text-xs">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentEvents.map((e) => (
            <TableRow key={e.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">{e.id}</TableCell>
              <TableCell className="text-sm font-medium">{e.name}</TableCell>
              <TableCell className="text-sm text-muted-foreground">{e.date}</TableCell>
              <TableCell className="text-sm">{e.mw}</TableCell>
              <TableCell><StatusBadge status={e.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function RecentBidsTable() {
  return (
    <div className="bg-card rounded-xl border border-border p-5">
      <h3 className="text-sm font-semibold text-card-foreground mb-4">Recent Bids</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xs">ID</TableHead>
            <TableHead className="text-xs">Market</TableHead>
            <TableHead className="text-xs">Zone</TableHead>
            <TableHead className="text-xs">Capacity</TableHead>
            <TableHead className="text-xs">Price</TableHead>
            <TableHead className="text-xs">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentBids.map((b) => (
            <TableRow key={b.id}>
              <TableCell className="font-mono text-xs text-muted-foreground">{b.id}</TableCell>
              <TableCell className="text-sm">{b.market}</TableCell>
              <TableCell className="text-sm">{b.zone}</TableCell>
              <TableCell className="text-sm">{b.mw}</TableCell>
              <TableCell className="text-sm font-medium">{b.price}</TableCell>
              <TableCell><StatusBadge status={b.status} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
