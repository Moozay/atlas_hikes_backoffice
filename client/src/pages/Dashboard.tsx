import { Layout } from "@/components/Layout";
import { MetricCard } from "@/components/MetricCard";
import { useDashboardStats } from "@/hooks/use-stats";
import { BarChart3, Users, Map, DollarSign, Loader2, Calendar, Settings } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

export default function Dashboard() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <Layout>
        <div className="flex h-[50vh] items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!stats) return null;

  return (
    <Layout>
      <header className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview of your tour operations and performance.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          label="Total Bookings"
          value={stats.totalBookings}
          icon={Users}
          trend="+12%"
          trendUp={true}
        />
        <MetricCard
          label="Monthly Revenue"
          value={`$${(stats.monthlyRevenue / 100).toLocaleString()}`}
          icon={DollarSign}
          trend="+8%"
          trendUp={true}
        />
        <MetricCard
          label="Active Tours"
          value={stats.activeTours}
          icon={Map}
        />
        <MetricCard
          label="Pending Bookings"
          value={stats.pendingBookings}
          icon={BarChart3}
          className="border-accent/20 bg-accent/5"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2 bg-card rounded-2xl border border-border/50 p-6 shadow-sm">
          <h3 className="text-lg font-bold font-display mb-6">Revenue Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stats.revenueByMonth}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: 'hsl(var(--muted-foreground))', fontSize: 12}}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    borderColor: 'hsl(var(--border))', 
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-lg)' 
                  }}
                  formatter={(value: number) => [`$${value}`, 'Revenue']}
                />
                <Area 
                  type="monotone" 
                  dataKey="total" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-xl shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <h3 className="text-lg font-bold font-display mb-2 relative z-10">Quick Actions</h3>
          <p className="text-primary-foreground/70 text-sm mb-6 relative z-10">Common tasks you might want to perform.</p>
          
          <div className="space-y-3 relative z-10">
            <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between group">
              <span className="font-medium">Create New Tour</span>
              <Map className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between group">
              <span className="font-medium">Review Pending Bookings</span>
              <Calendar className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="w-full text-left px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-between group">
              <span className="font-medium">Update Settings</span>
              <Settings className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
