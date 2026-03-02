import { Layout } from "@/components/Layout";
import { useBookings, useUpdateBookingStatus, useAddPayment } from "@/hooks/use-bookings";
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
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MoreHorizontal, Loader2, CheckCircle, XCircle, DollarSign } from "lucide-react";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

export default function Bookings() {
  const { data: bookings, isLoading } = useBookings();
  const updateStatus = useUpdateBookingStatus();
  const addPayment = useAddPayment();
  const [selectedBooking, setSelectedBooking] = useState<number | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [paymentRef, setPaymentRef] = useState("");

  const handleStatusUpdate = (id: number, status: 'confirmed' | 'cancelled' | 'refunded') => {
    updateStatus.mutate({ id, status }, {
      onSuccess: () => toast({ title: "Status Updated", description: `Booking marked as ${status}.` }),
      onError: () => toast({ title: "Update Failed", description: "Could not update booking status.", variant: "destructive" }),
    });
  };

  const handleAddPayment = () => {
    if (!selectedBooking || !paymentAmount) return;
    addPayment.mutate({ 
      id: selectedBooking, 
      amount: Math.round(parseFloat(paymentAmount) * 100),
      method: paymentMethod,
      reference: paymentRef
    }, {
      onSuccess: () => {
        toast({ title: "Payment Added", description: "The payment has been recorded successfully." });
        setSelectedBooking(null);
        setPaymentAmount("");
        setPaymentRef("");
      },
      onError: () => toast({ title: "Payment Failed", description: "Could not record payment.", variant: "destructive" }),
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

  const getPaymentStatusColor = (status: string) => {
    switch(status) {
      case 'paid': return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      case 'partially_paid': return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case 'unpaid': return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
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
          <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[80px]">ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Tour</TableHead>
                <TableHead>Travel Date</TableHead>
                <TableHead>People</TableHead>
                <TableHead>Financials</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="sm:text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((booking) => (
                <TableRow key={booking.id} className="hover:bg-muted/5 transition-colors">
                  <TableCell className="font-mono text-xs text-muted-foreground">#{booking.id}</TableCell>
                  <TableCell className="font-medium">Guest User {booking.userId.slice(0, 4)}</TableCell>
                  <TableCell>{booking.tour?.title || "Unknown Tour"}</TableCell>
                  <TableCell>{format(new Date(booking.travelDate), 'MMM d, yyyy')}</TableCell>
                  <TableCell>{booking.participants}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">€{(booking.totalPrice / 100).toLocaleString()}</div>
                      <div className="flex items-center gap-2">
                        <div className="text-xs text-muted-foreground">Paid: €{(booking.amountPaid / 100).toLocaleString()}</div>
                        <Badge variant="outline" className={`text-[10px] px-1 py-0 border-0 ${getPaymentStatusColor(booking.paymentStatus)}`}>
                          {booking.paymentStatus.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`border-0 font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="sm:text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog open={selectedBooking === booking.id} onOpenChange={(open) => !open && setSelectedBooking(null)}>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedBooking(booking.id)} data-testid={`button-add-payment-${booking.id}`}>
                            <DollarSign className="w-4 h-4 mr-1" /> Pay
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Record Manual Payment</DialogTitle>
                            <DialogDescription>
                              Enter the amount received from the customer for booking #{booking.id}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                              <Label htmlFor="amount" className="sm:text-right">Amount (€)</Label>
                              <Input id="amount" type="number" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="col-span-3" placeholder="0.00" />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                              <Label htmlFor="method" className="sm:text-right">Method</Label>
                              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                                <SelectTrigger className="col-span-3">
                                  <SelectValue placeholder="Select method" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                  <SelectItem value="cash">Cash</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                              <Label htmlFor="ref" className="sm:text-right">Reference</Label>
                              <Input id="ref" value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} className="col-span-3" placeholder="e.g. TXN-12345" />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button onClick={handleAddPayment} disabled={addPayment.isPending}>
                              {addPayment.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                              Confirm Payment
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
        )}
      </div>
    </Layout>
  );
}
