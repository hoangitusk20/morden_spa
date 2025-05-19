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
import { cn } from "@/lib/utils";
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
  position: "",
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
  const isEditMode = Boolean(formData.id);

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
              <Label htmlFor="position">Position</Label>
              <Select
                value={formData.position}
                onValueChange={(value) => handleSelectChange("position", value)}
              >
                <SelectTrigger id="position">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="massage_therapist">
                    Massage Therapist
                  </SelectItem>
                  <SelectItem value="esthetician">Esthetician</SelectItem>
                  <SelectItem value="hair_stylist">Hair Stylist</SelectItem>
                  <SelectItem value="nail_technician">
                    Nail Technician
                  </SelectItem>
                  <SelectItem value="wellness_coach">Wellness Coach</SelectItem>
                  <SelectItem value="makeup_artist">Makeup Artist</SelectItem>
                </SelectContent>
              </Select>
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

          {/* <div>
            <Label className="mb-2 block">Available Days</Label>
            <div className="grid grid-cols-7 gap-2">
              {[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
              ].map((day) => (
                // <div
                //   key={day}
                //   className={cn(
                //     "flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer transition-colors",
                //     formData.availableHours[
                //       day as keyof typeof formData.availableHours
                //     ]
                //       ? "bg-spa-100 border-spa-500"
                //       : "bg-white hover:bg-muted"
                //   )}
                //   onClick={() =>
                //     handleCheckboxChange(
                //       day,
                //       !formData.availableHours[
                //         day as keyof typeof formData.availableHours
                //       ]
                //     )
                //   }
                // >
                //   <span className="text-xs uppercase">
                //     {day.substring(0, 3)}
                //   </span>
                // </div>
              ))}
            </div>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="space-y-2">
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                name="startTime"
                type="time"
                value={formData.startTime}
                onChange={handleChange}
              />
            </div>  */}

          {/* <div className="space-y-2">
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                name="endTime"
                type="time"
                value={formData.endTime}
                onChange={handleChange}
              />
            </div> */}

          {/* <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on leave">On Leave</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div> */}
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
