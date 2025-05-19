
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Booking {
  id: string;
  customer: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  amount: string;
}

interface RecentBookingsProps {
  bookings: Booking[];
  className?: string;
}

const getStatusColor = (status: Booking["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "confirmed":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "canceled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
  }
};

const RecentBookings: React.FC<RecentBookingsProps> = ({ bookings, className }) => {
  return (
    <div className={cn("data-table-container", className)}>
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-medium">Recent Bookings</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.customer}</TableCell>
                <TableCell>{booking.service}</TableCell>
                <TableCell>
                  {booking.date} <span className="text-muted-foreground">at</span> {booking.time}
                </TableCell>
                <TableCell>
                  <Badge className={cn("font-normal", getStatusColor(booking.status))}>
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">{booking.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RecentBookings;
