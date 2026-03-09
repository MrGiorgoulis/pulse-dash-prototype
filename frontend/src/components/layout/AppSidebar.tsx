import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CalendarClock,
  Radio,
  TrendingUp,
  FileCheck,
  Receipt,
  MonitorCog,
  Settings,
  Box,
  FileText,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRole, isOperatorRole } from "@/contexts/RoleContext";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface NavItem {
  label: string;
  icon: React.ElementType;
  path: string;
}

const operatorNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Customer Onboarding", icon: Users, path: "/onboarding" },
  { label: "Coverage & Readiness", icon: ShieldCheck, path: "/coverage" },
  { label: "Events", icon: CalendarClock, path: "/events" },
  { label: "Control Room", icon: Radio, path: "/control-room" },
  { label: "Bidding", icon: TrendingUp, path: "/bidding" },
  { label: "Reconciliation", icon: FileCheck, path: "/reconciliation" },
  { label: "Settlement", icon: Receipt, path: "/settlement" },
  { label: "NOC Command Center", icon: MonitorCog, path: "/noc" },
  { label: "Admin Configuration", icon: Settings, path: "/admin" },
];

const customerNav: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Assets", icon: Box, path: "/assets" },
  { label: "Events", icon: CalendarClock, path: "/events" },
  { label: "Statements", icon: FileText, path: "/statements" },
  { label: "Payouts", icon: Wallet, path: "/payouts" },
];

export function AppSidebar() {
  const { role } = useRole();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navItems = isOperatorRole(role) ? operatorNav : customerNav;

  return (
    <aside
      className={cn(
        "flex flex-col bg-sidebar border-r border-sidebar-border shrink-0 transition-all duration-200",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <Link
              key={item.path + item.label}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-[18px] w-[18px] shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center justify-center h-10 border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-accent-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}
