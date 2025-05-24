import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../components/layouts/AdminLayout";
import BookingsTable from "../components/bookings/BookingsTable";
import CalendarView from "../components/bookings/CalendarView";
import BookingForm from "../components/bookings/BookingForm";
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
import {
  Booking,
  CreateBookingRequest,
  UpdateBookingRequest,
} from "@/shared/type";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchBookings,
  createBooking,
  updateBooking,
  deleteBooking,
  setCurrentBooking,
  selectAllBookings,
  selectBookingsLoading,
  selectBookingsError,
  selectCurrentBooking,
} from "../redux/features/bookingSlice";
import {
  fetchServices,
  selectAllServices,
} from "@/redux/features/serviceSlice";
import { fetchStaff } from "@/redux/features/staffSlice";

const Bookings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const bookings = useSelector(selectAllBookings);
  const isLoading = useSelector(selectBookingsLoading);
  const staff = useSelector((state: RootState) => state.staff.staffMembers);
  const error = useSelector(selectBookingsError);
  const currentBooking = useSelector(selectCurrentBooking);
  const services = useSelector(selectAllServices);
  const shortServices = services.map((service) => ({
    _id: service._id,
    name: service.title,
    price: service.price,
  }));
  const [activeView, setActiveView] = useState("list");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Lấy danh sách đặt lịch khi component mount
  useEffect(() => {
    dispatch(fetchBookings());
  }, [dispatch]);

  useEffect(() => {
    if (staff.length === 0) {
      dispatch(fetchStaff());
    }

    if (services.length === 0) {
      dispatch(fetchServices());
    }
  }, []);

  // Hiển thị thông báo lỗi nếu có
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleEditBooking = (id: string) => {
    const bookingToEdit = bookings.find((booking) => booking._id === id);
    if (bookingToEdit) {
      dispatch(setCurrentBooking(bookingToEdit));
      setIsFormOpen(true);
    }
  };

  const handleAddBooking = () => {
    dispatch(setCurrentBooking(null));
    setIsFormOpen(true);
  };

  const handleDeleteBooking = (id: string) => {
    const bookingToDelete = bookings.find((booking) => booking._id === id);
    if (bookingToDelete) {
      dispatch(setCurrentBooking(bookingToDelete));
      setIsDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (currentBooking?._id) {
      try {
        await dispatch(deleteBooking(currentBooking._id)).unwrap();
        setIsDeleteDialogOpen(false);
        dispatch(setCurrentBooking(null));
        toast.success("Đặt lịch đã được xóa thành công");
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const handleSubmitBooking = async (bookingData: Booking) => {
    try {
      console.log("Booking data:", bookingData);
      if (bookingData._id) {
        // Cập nhật đặt lịch hiện có
        const updateData: UpdateBookingRequest =
          bookingData as UpdateBookingRequest;
        await dispatch(updateBooking(updateData)).unwrap();
        toast.success("Cập nhật đặt lịch thành công");
      } else {
        // Thêm đặt lịch mới
        const createData: CreateBookingRequest =
          bookingData as CreateBookingRequest;
        await dispatch(createBooking(createData)).unwrap();
        toast.success("Tạo đặt lịch mới thành công");
      }
      setIsFormOpen(false);
    } catch (error) {
      console.error("Error submitting booking:", error);
    }
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
            {isLoading && bookings.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p>Đang tải dữ liệu...</p>
              </div>
            ) : (
              <BookingsTable
                bookings={bookings}
                onEdit={handleEditBooking}
                onAdd={handleAddBooking}
                onDelete={handleDeleteBooking}
              />
            )}
          </TabsContent>

          <TabsContent value="calendar">
            <CalendarView bookings={bookings} staff={staff} />
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
            services={shortServices}
            staff={staff}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
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
