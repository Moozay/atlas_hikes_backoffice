import { Layout } from "@/components/Layout";
import { useBookings, useUpdateBookingStatus } from "@/hooks/use-bookings";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

export default function Bookings() {
  const { data: bookings, isLoading } = useBookings();
  const updateStatus = useUpdateBookingStatus();

  const handleStatusUpdate = (id: number, status: 'confirmed' | 'cancelled' | 'refunded') => {
    updateStatus.mutate({ id, status }, {
      onSuccess: () => toast({ title: "Status Updated", description: `Booking marked as ${status}.` }),
      onError: () => toast({ title: "Update Failed", description: "Could not update booking status.", variant: "destructive" }),
    });
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case 'pending': return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case 'cancelled': return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case 'completed': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      default: return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground">Bookings</h1>
        <p className="text-muted-foreground mt-1">Track and manage client reservations.</p>
      </div>

      <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-12 flex justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>People</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">#{booking.id}</TableCell>
                  <TableCell className="font-medium">
                    {/* Assuming user details come from join, but we have userId. 
                        In real app, we'd fetch profile or user details. 
                        Using mock name for now since we lack full user profile join in GET /bookings 
                    */}
                    Guest User {booking.userId.slice(0, 4)}
                  </TableCell>
                  <TableCell>{booking.tour?.title || "Unknown Tour"}</TableCell>
                  <TableCell>{format(new Date(booking.travelDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{booking.participants}</TableCell>
                  <TableCell className="font-medium">${(booking.totalPrice / 100).toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`border-0 font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'confirmed')}>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Confirm Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleStatusUpdate(booking.id, 'cancelled')}>
                          <XCircle className="mr-2 h-4 w-4 text-red-500" /> Cancel Booking
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </Layout>
  );
}
