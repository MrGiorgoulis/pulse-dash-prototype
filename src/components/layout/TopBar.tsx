import { Bell, ChevronDown, Zap } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRole, ROLE_LABELS, UserRole } from "@/contexts/RoleContext";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const roles = Object.entries(ROLE_LABELS) as [UserRole, string][];

export function TopBar() {
  const { role, setRole } = useRole();

  return (
    <header className="h-14 border-b border-topbar-border bg-topbar flex items-center justify-between px-5 shrink-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground">
            PULSE <span className="text-primary">DR</span>
          </span>
        </div>

        <div className="h-6 w-px bg-border mx-2" />

        <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
          <SelectTrigger className="w-[200px] h-9 text-sm border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {roles.map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Badge variant="secondary" className="text-xs font-medium">
          default
        </Badge>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-danger" />
        </Button>
        <Avatar className="h-8 w-8 cursor-pointer">
          <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
