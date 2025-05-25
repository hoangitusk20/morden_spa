import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { ServiceData } from "@/shared/type";

interface ServiceFormProps {
  initialData: ServiceData;
  onSubmit: (data: ServiceData) => void;
  onCancel: () => void;
  onFileChange: (file: File) => void;
}

const ServiceForm: React.FC<ServiceFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  onFileChange,
}) => {
  const [formData, setFormData] = useState(initialData);
  console.log("InitalData:", initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle image upload logic
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
      setFormData((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
    console.log("Image selected:", e.target.files?.[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-h-[80vh] overflow-scroll">
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Service Name</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MASSAGE">Massage</SelectItem>
                  <SelectItem value="FACIAL">Facial</SelectItem>
                  <SelectItem value="BODY">Body Treatment</SelectItem>
                  <SelectItem value="HAIR">Hair & Beauty</SelectItem>
                  <SelectItem value="NAILS">Nails</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select
                value={String(formData.duration)}
                onValueChange={(value) => handleSelectChange("duration", value)}
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                  <SelectItem value="120">120 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description for service listings"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailDescription">Detail Description</Label>
            <Textarea
              id="detailDescription"
              name="detailDescription"
              rows={4}
              value={formData.detailDescription}
              onChange={handleChange}
              placeholder="In-depth description including benefits, procedures, etc."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Service Image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">Current image:</p>
                <img
                  src={formData.image}
                  alt="Service"
                  className="max-w-[200px] rounded-md"
                />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData._id ? "Update Service" : "Create Service"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ServiceForm;
