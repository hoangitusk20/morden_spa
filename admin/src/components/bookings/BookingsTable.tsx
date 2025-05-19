import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format, isWithinInterval, parse } from "date-fns";
import {
  CalendarIcon,
  Edit,
  Plus,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Booking } from "@/shared/type";

interface BookingsTableProps {
  bookings: Booking[];
  onEdit: (id: string) => void;
  onAdd: () => void;
  onDelete?: (id: string) => void;
}

const ITEMS_PER_PAGE = 5;

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  onEdit,
  onAdd,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredBookings = bookings.filter((booking) => {
    // Filter by search term (customer name or ID)
    const matchesSearch =
      booking.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter by status
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;

    // Filter by date range
    let matchesDateRange = true;
    if (dateRange.from || dateRange.to) {
      const bookingDate = parse(booking.date, "MMMM d, yyyy", new Date());

      if (dateRange.from && dateRange.to) {
        // Both from and to dates are set
        matchesDateRange = isWithinInterval(bookingDate, {
          start: dateRange.from,
          end: dateRange.to,
        });
      } else if (dateRange.from) {
        // Only from date is set
        matchesDateRange = bookingDate >= dateRange.from;
      } else if (dateRange.to) {
        // Only to date is set
        matchesDateRange = bookingDate <= dateRange.to;
      }
    }

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  // Calculate total pages
  const totalPages = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);

  // Get current page items
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentBookings = filteredBookings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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

  const clearDateRange = () => {
    setDateRange({ from: undefined, to: undefined });
  };

  // Generate page numbers for pagination
  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // If we have 5 or fewer pages, show all page numbers
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              isActive={i === currentPage}
              onClick={() => goToPage(i)}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // If we have more than 5 pages, show a condensed version
      if (currentPage <= 3) {
        // We are near the start
        for (let i = 1; i <= 3; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i === currentPage}
                onClick={() => goToPage(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationLink className="cursor-default">...</PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink onClick={() => goToPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (currentPage >= totalPages - 2) {
        // We are near the end
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationLink className="cursor-default">...</PaginationLink>
          </PaginationItem>
        );
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pages.push(
            <PaginationItem key={i}>
              <PaginationLink
                isActive={i === currentPage}
                onClick={() => goToPage(i)}
              >
                {i}
              </PaginationLink>
            </PaginationItem>
          );
        }
      } else {
        // We are in the middle
        pages.push(
          <PaginationItem key={1}>
            <PaginationLink onClick={() => goToPage(1)}>1</PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationLink className="cursor-default">...</PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={currentPage - 1}>
            <PaginationLink onClick={() => goToPage(currentPage - 1)}>
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={currentPage}>
            <PaginationLink isActive onClick={() => goToPage(currentPage)}>
              {currentPage}
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={currentPage + 1}>
            <PaginationLink onClick={() => goToPage(currentPage + 1)}>
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key="ellipsis2">
            <PaginationLink className="cursor-default">...</PaginationLink>
          </PaginationItem>
        );
        pages.push(
          <PaginationItem key={totalPages}>
            <PaginationLink onClick={() => goToPage(totalPages)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }

    return pages;
  };

  return (
    <div className="data-table-container">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-border gap-4">
        <h2 className="text-xl font-semibold">Bookings</h2>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-[200px]"
            />

            <div className="relative">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "justify-start text-left font-normal",
                    !dateRange.from && !dateRange.to && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "MMM d")} -{" "}
                        {format(dateRange.to, "MMM d, yyyy")}
                      </>
                    ) : (
                      format(dateRange.from, "MMM d, yyyy")
                    )
                  ) : dateRange.to ? (
                    format(dateRange.to, "MMM d, yyyy")
                  ) : (
                    <span>Filter by date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearDateRange}
                    className="h-7 text-xs"
                  >
                    <X className="mr-1 h-3 w-3" />
                    Clear
                  </Button>
                </div>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button onClick={onAdd} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" /> New Booking
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Staff</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentBookings.length > 0 ? (
              currentBookings.map((booking) => (
                <TableRow key={booking.id}>
                  <TableCell className="font-mono text-xs">
                    {booking.id}
                  </TableCell>
                  <TableCell className="font-medium">
                    {booking.customer}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {booking.services &&
                        booking.services.map((service, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="bg-primary/5"
                          >
                            {service.name}
                          </Badge>
                        ))}
                    </div>
                  </TableCell>
                  <TableCell>{booking.staff || "Unassigned"}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    {booking.date} at {booking.time}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "font-normal",
                        getStatusColor(booking.status)
                      )}
                    >
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>${booking.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(booking.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      {onDelete && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onDelete(booking.id)}
                          className="text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-24 text-center">
                  No bookings match the current filters
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {filteredBookings.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => currentPage > 1 && goToPage(currentPage - 1)}
                  className={
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }
                  aria-disabled={currentPage === 1}
                />
              </PaginationItem>

              {renderPageNumbers()}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    currentPage < totalPages && goToPage(currentPage + 1)
                  }
                  className={
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                  aria-disabled={currentPage === totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default BookingsTable;
