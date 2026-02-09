import { Link, useLocation } from "wouter";
import { LayoutDashboard, Map, Calendar, Settings, LogOut, Mountain, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export function Sidebar() {
  const [location] = useLocation();
  const { logout } = useAuth();

  const links = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/tours", label: "Tours", icon: Map },
    { href: "/bookings", label: "Bookings", icon: Calendar },
    { href: "/finance", label: "Finance", icon: Wallet },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex flex-col h-full w-64 bg-card border-r border-border/40 fixed left-0 top-0 bottom-0 z-50 transition-all duration-300">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25">
          <Mountain className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="font-display font-bold text-xl leading-none tracking-tight text-primary">Atlas</h1>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Back Office</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        {links.map((link) => {
          const isActive = location === link.href;
          const Icon = link.icon;
          
          return (
            <Link key={link.href} href={link.href} className={cn(
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

      <div className="p-4 border-t border-border/40">
        <button 
          onClick={() => logout()}
          className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
}
