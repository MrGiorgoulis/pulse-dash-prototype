import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  status?: "good" | "warning" | "danger" | "info";
}

export function KpiCard({ title, value, subtitle, icon: Icon, trend, status = "info" }: KpiCardProps) {
  const statusBg: Record<string, string> = {
    good: "bg-status-good-muted text-status-good",
    warning: "bg-status-warning-muted text-status-warning",
    danger: "bg-status-danger-muted text-status-danger",
    info: "bg-status-info-muted text-status-info",
  };

  return (
    <div className="bg-card rounded-xl border border-border p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-muted-foreground">{title}</span>
        <div className={cn("p-2 rounded-lg", statusBg[status])}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold tracking-tight text-card-foreground">{value}</p>
        {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      {trend && (
        <p className={cn("text-xs font-medium", trend.positive ? "text-status-good" : "text-status-danger")}>
          {trend.positive ? "↑" : "↓"} {trend.value}
        </p>
      )}
    </div>
  );
}
