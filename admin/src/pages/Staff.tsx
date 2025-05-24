import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminLayout from "../components/layouts/AdminLayout";
import StaffTable from "../components/staff/StaffTable";
import StaffForm from "../components/staff/StaffForm";
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
import { StaffMember, UpdateStaffRequest } from "@/shared/type";
import { AppDispatch } from "../redux/store";
import {
  fetchStaff,
  createStaff,
  updateStaff,
  deleteStaff,
  setCurrentStaff,
  selectAllStaff,
  selectStaffLoading,
  selectStaffError,
  selectCurrentStaff,
} from "../redux/features/staffSlice";

const Staff = () => {
  const dispatch = useDispatch<AppDispatch>();
  const staffMembers = useSelector(selectAllStaff);
  const isLoading = useSelector(selectStaffLoading);
  const error = useSelector(selectStaffError);
  const currentStaff = useSelector(selectCurrentStaff);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Fetch staff when component mounts
  useEffect(() => {
    dispatch(fetchStaff());
  }, [dispatch]);

  useEffect(() => {
    console.log("staffMembers", staffMembers);
  }, [staffMembers]);
  // Show error message if there is one
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleAddClick = () => {
    dispatch(
      setCurrentStaff({
        name: "",
        email: "",
        phone: "",
        specialties: [],
      })
    );
    setIsFormOpen(true);
  };

  const handleEditClick = (id: string) => {
    const staffToEdit = staffMembers.find((staff) => staff._id === id);
    if (staffToEdit) {
      dispatch(setCurrentStaff(staffToEdit));
      setIsFormOpen(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    const staffToDelete = staffMembers.find((staff) => staff._id === id);
    if (staffToDelete) {
      dispatch(setCurrentStaff(staffToDelete));
      setIsDeleteDialogOpen(true);
    }
  };

  const handleSubmit = async (staffData: StaffMember) => {
    try {
      if (staffData._id) {
        // Update existing staff
        const updateData: UpdateStaffRequest = {
          _id: staffData._id,
          name: staffData.name,
          email: staffData.email,
          phone: staffData.phone,
          specialties: staffData.specialties,
        };

        if (selectedFile) {
          updateData.avatar = selectedFile.name;
        }

        await dispatch(updateStaff(updateData)).unwrap();
        toast.success("Staff member updated successfully");
      } else {
        // Add new staff
        await dispatch(
          createStaff({
            name: staffData.name,
            email: staffData.email,
            phone: staffData.phone,
            specialties: staffData.specialties,
            avatar: selectedFile.name || undefined,
          })
        ).unwrap();
        toast.success("Staff member added successfully");
      }
      setIsFormOpen(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Error submitting staff:", error);
    }
  };

  const handleDelete = async () => {
    if (currentStaff?._id) {
      try {
        await dispatch(deleteStaff(currentStaff._id)).unwrap();
        setIsDeleteDialogOpen(false);
        dispatch(setCurrentStaff(null));
        toast.success("Staff member deleted successfully");
      } catch (error) {
        console.error("Error deleting staff:", error);
      }
    }
  };

  const handleFileChange = (file: File) => {
    setSelectedFile(file);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Staff Management
          </h1>
          <p className="text-muted-foreground">
            Manage your spa staff members, schedules, and assignments.
          </p>
        </div>

        {isLoading && staffMembers.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading data...</p>
          </div>
        ) : (
          <StaffTable
            staffMembers={staffMembers}
            onEdit={handleEditClick}
            onAdd={handleAddClick}
            onDelete={handleDeleteClick}
          />
        )}

        {/* Staff Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {currentStaff?._id
                  ? "Edit Staff Member"
                  : "Add New Staff Member"}
              </DialogTitle>
              <DialogDescription>
                {currentStaff?._id
                  ? "Make changes to the staff member's information."
                  : "Fill in the details to add a new staff member."}
              </DialogDescription>
            </DialogHeader>
            {currentStaff && (
              <StaffForm
                initialData={currentStaff}
                onSubmit={handleSubmit}
                onCancel={() => setIsFormOpen(false)}
              />
            )}
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
                staff member "{currentStaff?.name}" and remove their data from
                the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
};

export default Staff;
