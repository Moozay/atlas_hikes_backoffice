import { useState } from "react";
import { Menu } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isLoading, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 h-14 bg-card border-b border-border/40 flex items-center px-4 gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center leading-none">
          <img src="/logo-black.svg" alt="A" className="h-5 w-5 shrink-0 dark:hidden" />
          <img src="/logo-white.svg" alt="A" className="h-5 w-5 shrink-0 hidden dark:block" />
          <span className="font-display font-bold text-lg tracking-tight text-primary">tlas Hikes</span>
        </div>
      </header>

      <main className="flex-1 lg:ml-64 min-h-screen p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 animate-enter">
        <div className="max-w-7xl mx-auto space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
