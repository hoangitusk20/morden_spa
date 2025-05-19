import { useState } from "react";
import AdminLayout from "../components/layouts/AdminLayout";
import BookingsTable from "../components/bookings/BookingsTable";
import CalendarView from "../components/bookings/CalendarView";
import BookingForm from "../components/bookings/BookingForm";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ListIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { Booking } from "@/shared/type";

// Mock data for services
const mockServices = [
  { id: "s1", name: "Deep Tissue Massage", price: 95 },
  { id: "s2", name: "Facial Treatment", price: 80 },
  { id: "s3", name: "Hot Stone Therapy", price: 120 },
  { id: "s4", name: "Aromatherapy", price: 85 },
  { id: "s5", name: "Body Scrub", price: 70 },
];

// Mock data for staff
const mockStaff = [
  { id: "1", name: "Emma Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Sophia Rodriguez" },
  { id: "4", name: "James Wilson" },
];

// Mock data for bookings (updated to use multiple services)
const mockBookings = [
  {
    id: "BK0012",
    customer: "Alice Brown",
    services: [mockServices[0]], // Deep Tissue Massage
    staff: "Emma Johnson",
    date: "May 18, 2025",
    time: "10:00 AM",
    status: "confirmed" as const,
    amount: 95,
  },
  {
    id: "BK0011",
    customer: "Bob Smith",
    services: [mockServices[1]], // Facial Treatment
    staff: "Michael Chen",
    date: "May 18, 2025",
    time: "11:30 AM",
    status: "pending" as const,
    amount: 80,
  },
  {
    id: "BK0010",
    customer: "Carol Davis",
    services: [mockServices[2]], // Hot Stone Therapy
    staff: "Sophia Rodriguez",
    date: "May 17, 2025",
    time: "3:00 PM",
    status: "completed" as const,
    amount: 120,
  },
  {
    id: "BK0009",
    customer: "David Wilson",
    services: [mockServices[3]], // Aromatherapy
    staff: null, // Unassigned
    date: "May 17, 2025",
    time: "1:00 PM",
    status: "canceled" as const,
    amount: 85,
  },
  {
    id: "BK0008",
    customer: "Eva Martin",
    services: [mockServices[4]], // Body Scrub
    staff: null, // Unassigned
    date: "May 16, 2025",
    time: "4:30 PM",
    status: "completed" as const,
    amount: 70,
  },
  {
    id: "BK0007",
    customer: "Frank Thomas",
    services: [mockServices[0], mockServices[3]], // Multiple services
    staff: "Sophia Rodriguez",
    date: "May 16, 2025",
    time: "2:00 PM",
    status: "confirmed" as const,
    amount: 180,
  },
  {
    id: "BK0006",
    customer: "Grace Lee",
    services: [mockServices[1], mockServices[4]], // Multiple services
    staff: "James Wilson",
    date: "May 15, 2025",
    time: "11:00 AM",
    status: "completed" as const,
    amount: 150,
  },
];

const Bookings = () => {
  const [activeView, setActiveView] = useState("list");
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<Booking | undefined>(
    undefined
  );
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  const handleEditBooking = (id: string) => {
    const bookingToEdit = bookings.find((booking) => booking.id === id);
    setCurrentBooking(bookingToEdit);
    setIsFormOpen(true);
  };

  const handleAddBooking = () => {
    setCurrentBooking(undefined);
    setIsFormOpen(true);
  };

  const handleDeleteBooking = (id: string) => {
    setBookingToDelete(id);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      setBookings((prev) =>
        prev.filter((booking) => booking.id !== bookingToDelete)
      );
      toast.success("Booking deleted successfully");
      setBookingToDelete(null);
    }
  };

  const handleSubmitBooking = (bookingData: Booking) => {
    if (bookingData.id) {
      // Update existing booking
      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === bookingData.id ? bookingData : booking
        )
      );
      toast.success("Booking updated successfully");
    } else {
      // Add new booking with a generated ID
      const newBooking = {
        ...bookingData,
        id: `BK${String(Math.floor(Math.random() * 9000) + 1000)}`,
      };
      setBookings((prev) => [newBooking, ...prev]);
      toast.success("Booking created successfully");
    }
    setIsFormOpen(false);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Booking Management
          </h1>
          <p className="text-muted-foreground">
            View and manage all customer bookings.
          </p>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <div className="flex justify-between">
            <TabsList>
              <TabsTrigger value="list" onClick={() => setActiveView("list")}>
                <ListIcon className="h-4 w-4 mr-2" />
                List View
              </TabsTrigger>
              <TabsTrigger
                value="calendar"
                onClick={() => setActiveView("calendar")}
              >
                <CalendarIcon className="h-4 w-4 mr-2" />
                Calendar View
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="list" className="space-y-4">
            <BookingsTable
              bookings={bookings}
              onEdit={handleEditBooking}
              onAdd={handleAddBooking}
              onDelete={handleDeleteBooking}
            />
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView bookings={bookings} staff={mockStaff} />
          </TabsContent>
        </Tabs>
      </div>

      {/* Booking Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>
              {currentBooking ? "Edit Booking" : "Create New Booking"}
            </DialogTitle>
            <DialogDescription>
              {currentBooking
                ? "Make changes to the booking details below."
                : "Fill out the information below to create a new booking."}
            </DialogDescription>
          </DialogHeader>
          <BookingForm
            initialData={currentBooking}
            onSubmit={handleSubmitBooking}
            onCancel={() => setIsFormOpen(false)}
            services={mockServices}
            staff={mockStaff}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={Boolean(bookingToDelete)}
        onOpenChange={(open) => !open && setBookingToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              booking and remove it from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default Bookings;
