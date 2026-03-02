import { Link, useLocation } from "wouter";
import { LayoutDashboard, Map, Calendar, Settings, LogOut, Wallet, Users, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { user, logout, hasPermission } = useAuth();

  const initials = [user?.firstName, user?.lastName]
    .filter(Boolean)
    .map(n => n![0].toUpperCase())
    .join("") || user?.email?.[0].toUpperCase() || "?";

  const allLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard, perm: null },
    { href: "/tours", label: "Tours", icon: Map, perm: "tours:view" },
    { href: "/bookings", label: "Bookings", icon: Calendar, perm: "bookings:view" },
    { href: "/finance", label: "Finance", icon: Wallet, perm: "finance:view" },
    { href: "/users", label: "Users", icon: Users, perm: "users:view" },
    { href: "/settings", label: "Settings", icon: Settings, perm: "settings:edit" },
  ];

  const links = allLinks.filter(link => link.perm === null || hasPermission(link.perm));

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />
      )}

      <div className={cn(
        "flex flex-col h-full w-64 bg-card border-r border-border/40 fixed left-0 top-0 bottom-0 z-50 transition-transform duration-300",
        "lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex items-center justify-between">
          <div>
            <div className="flex items-center leading-none">
              <img src="/logo-black.svg" alt="A" className="h-6 w-6 shrink-0 dark:hidden" />
              <img src="/logo-white.svg" alt="A" className="h-6 w-6 shrink-0 hidden dark:block" />
              <span className="font-display font-bold text-xl tracking-tight text-primary">tlas Hikes</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-1 ml-0.5">Back Office</p>
          </div>
          <button onClick={onClose} className="lg:hidden p-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const isActive = location === link.href;
            const Icon = link.icon;
            return (
              <Link key={link.href} href={link.href} onClick={onClose} className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                isActive
                  ? "text-primary-foreground bg-primary shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}>
                <Icon className={cn("w-5 h-5 transition-transform", isActive ? "" : "group-hover:scale-110")} />
                <span>{link.label}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/40 space-y-1">
          <Link
            href="/profile"
            onClick={onClose}
            className={cn(
              "flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group",
              location === "/profile"
                ? "bg-secondary text-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="truncate font-medium text-foreground text-xs">
                {user?.firstName ? `${user.firstName} ${user.lastName ?? ""}`.trim() : user?.email}
              </div>
              <div className="text-[11px] text-muted-foreground truncate">My profile</div>
            </div>
            <ChevronRight className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 transition-opacity" />
          </Link>

          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </>
  );
}
