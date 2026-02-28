import { Layout } from "@/components/Layout";
import { useFinanceStats } from "@/hooks/use-stats";
import { MetricCard } from "@/components/MetricCard";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { DollarSign, ArrowUpRight, ArrowDownRight, Clock, Loader2 } from "lucide-react";
import { format } from "date-fns";

export default function Finance() {
  const { data: stats, isLoading } = useFinanceStats();

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Finance</h1>
        <p className="text-muted-foreground mt-1">Monitor revenue and manage manual transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MetricCard
          title="Total Revenue"
          value={`$${((stats?.totalRevenue || 0) / 100).toLocaleString()}`}
          description="Total value of all bookings"
          icon={DollarSign}
        />
        <MetricCard
          title="Collected Revenue"
          value={`$${((stats?.collectedRevenue || 0) / 100).toLocaleString()}`}
          description="Payments received to date"
          icon={ArrowUpRight}
          trend={{ value: "Confirmed", positive: true }}
        />
        <MetricCard
          title="Pending Revenue"
          value={`$${((stats?.pendingRevenue || 0) / 100).toLocaleString()}`}
          description="Awaiting collection"
          icon={Clock}
          trend={{ value: "Outstanding", positive: false }}
        />
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-border/50">
          <h2 className="text-xl font-semibold">Transaction History</h2>
        </div>
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Booking ID</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats?.transactions?.map((tx) => (
                <TableRow key={tx.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell>{format(new Date(tx.createdAt || Date.now()), 'MMM d, yyyy HH:mm')}</TableCell>
                  <TableCell className="font-mono text-xs">#{tx.bookingId}</TableCell>
                  <TableCell className="capitalize">{tx.method.replace('_', ' ')}</TableCell>
                  <TableCell className="text-muted-foreground">{tx.reference || '-'}</TableCell>
                  <TableCell className="text-right font-medium text-green-600 dark:text-green-400">
                    +${(tx.amount / 100).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
              {(!stats?.transactions || stats.transactions.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                    No transactions found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </Layout>
  );
}
