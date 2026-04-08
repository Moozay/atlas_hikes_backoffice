import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Tours from "@/pages/Tours";
import TourPreview from "@/pages/TourPreview";
import Blogs from "@/pages/Blogs";
import Bookings from "@/pages/Bookings";
import Finance from "@/pages/Finance";
import Settings from "@/pages/Settings";
import Users from "@/pages/Users";
import Profile from "@/pages/Profile";
import Login from "@/pages/Login";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  return <Component />;
}

function PermissionRoute({ component: Component, permission }: { component: React.ComponentType; permission: string }) {
  const { isAuthenticated, isLoading, hasPermission } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login />;
  }

  if (!hasPermission(permission)) {
    return <NotFound />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />

      {/* Dashboard — accessible to all authenticated users */}
      <Route path="/">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>

      {/* Permission-gated routes */}
      <Route path="/tours">
        {() => <PermissionRoute component={Tours} permission="tours:view" />}
      </Route>
      <Route path="/blogs">
        {() => <PermissionRoute component={Blogs} permission="blogs:view" />}
      </Route>
      <Route path="/tours/:id/preview">
        {() => <PermissionRoute component={TourPreview} permission="tours:view" />}
      </Route>
      <Route path="/bookings">
        {() => <PermissionRoute component={Bookings} permission="bookings:view" />}
      </Route>
      <Route path="/finance">
        {() => <PermissionRoute component={Finance} permission="finance:view" />}
      </Route>
      <Route path="/users">
        {() => <PermissionRoute component={Users} permission="users:view" />}
      </Route>
      <Route path="/settings">
        {() => <PermissionRoute component={Settings} permission="settings:edit" />}
      </Route>

      {/* Profile — accessible to all authenticated users */}
      <Route path="/profile">
        {() => <ProtectedRoute component={Profile} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
