import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StaffMember } from "@/shared/type";

// Update the interface to clearly define the id property

interface StaffFormProps {
  initialData?: StaffMember;
  onSubmit: (data: StaffMember) => void;
  onCancel: () => void;
}

// Update default staff data to match the StaffMember interface
const defaultStaffData: StaffMember = {
  name: "",
  email: "",
  phone: "",
  specialties: [],
};

const specialtiesOptions = [
  { id: "massage", label: "Massage Therapy" },
  { id: "facial", label: "Facial Treatments" },
  { id: "body", label: "Body Treatments" },
  { id: "hair", label: "Hair Styling" },
  { id: "nails", label: "Nail Services" },
  { id: "wellness", label: "Wellness Coach" },
  { id: "makeup", label: "Makeup Artist" },
];

const StaffForm: React.FC<StaffFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
}) => {
  // Initialize with either the provided initialData or defaultStaffData
  const [formData, setFormData] = useState<StaffMember>(
    initialData || defaultStaffData
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // const handleCheckboxChange = (day: string, checked: boolean) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     availableHours: {
  //       ...prev.availableHours,
  //       [day]: checked,
  //     },
  //   }));
  // };

  const toggleSpecialty = (specialty: string) => {
    const specialties = [...formData.specialties];
    const index = specialties.indexOf(specialty);

    if (index === -1) {
      specialties.push(specialty);
    } else {
      specialties.splice(index, 1);
    }

    setFormData((prev) => ({ ...prev, specialties }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Safely determine if we're in edit mode
  const isEditMode = Boolean(formData._id);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {isEditMode ? "Edit Staff Member" : "Add New Staff Member"}
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Specialties</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {specialtiesOptions.map((specialty) => (
                <div key={specialty.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty.id}`}
                    checked={formData.specialties.includes(specialty.id)}
                    onCheckedChange={() => toggleSpecialty(specialty.id)}
                  />
                  <Label
                    htmlFor={`specialty-${specialty.id}`}
                    className="text-sm"
                  >
                    {specialty.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditMode ? "Update Staff Member" : "Add Staff Member"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default StaffForm;
