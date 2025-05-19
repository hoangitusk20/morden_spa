import { useState } from "react";
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
import { StaffMember } from "@/shared/type";

// Mock data
const mockStaff = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.j@example.com",
    phone: "(555) 123-4567",
    position: "massage_therapist",
    specialties: ["massage", "wellness"],
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.c@example.com",
    phone: "(555) 234-5678",
    position: "esthetician",
    specialties: ["facial", "body"],
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia.r@example.com",
    phone: "(555) 345-6789",
    position: "massage_therapist",
    specialties: ["massage", "wellness"],
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.w@example.com",
    phone: "(555) 456-7890",
    position: "wellness_coach",
    specialties: ["wellness"],
  },
  {
    id: "5",
    name: "Olivia Taylor",
    email: "olivia.t@example.com",
    phone: "(555) 567-8901",
    position: "hair_stylist",
    specialties: ["hair", "makeup"],
  },
];

const Staff = () => {
  const [staff, setStaff] = useState(mockStaff);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState<StaffMember>(null);
  const [staffToDelete, setStaffToDelete] = useState<string | null>(null);

  const handleAddClick = () => {
    setCurrentStaff(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (id: string) => {
    const staffToEdit = staff.find((member) => member.id === id);
    setCurrentStaff(staffToEdit);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (id: string) => {
    setStaffToDelete(id);
  };

  const confirmDelete = () => {
    if (staffToDelete) {
      setStaff((prev) => prev.filter((member) => member.id !== staffToDelete));
      toast.success("Staff member deleted successfully");
      setStaffToDelete(null);
    }
  };

  const handleSubmit = (staffData: StaffMember) => {
    if (staffData.id) {
      // Update existing staff
      setStaff((prev) =>
        prev.map((member) => (member.id === staffData.id ? staffData : member))
      );
      toast.success("Staff member updated successfully");
    } else {
      // Add new staff with a generated ID
      const newStaff = {
        ...staffData,
        id: `${staff.length + 1}`,
      };
      setStaff((prev) => [...prev, newStaff]);
      toast.success("Staff member added successfully");
    }
    setIsFormOpen(false);
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

        <StaffTable
          staffMembers={staff}
          onEdit={handleEditClick}
          onAdd={handleAddClick}
          onDelete={handleDeleteClick}
        />

        {/* Staff Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[800px]">
            <DialogHeader>
              <DialogTitle>
                {currentStaff ? "Edit Staff Member" : "Add New Staff Member"}
              </DialogTitle>
              <DialogDescription>
                {currentStaff
                  ? "Make changes to the staff member's information."
                  : "Fill in the details to add a new staff member."}
              </DialogDescription>
            </DialogHeader>
            <StaffForm
              initialData={currentStaff}
              onSubmit={handleSubmit}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <AlertDialog
          open={Boolean(staffToDelete)}
          onOpenChange={(open) => !open && setStaffToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                staff member and remove their data from the system.
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
      </div>
    </AdminLayout>
  );
};

export default Staff;
