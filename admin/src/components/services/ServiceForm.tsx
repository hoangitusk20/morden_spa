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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = <T extends keyof typeof formData>(
    name: T,
    value: (typeof formData)[T]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
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
              <Label htmlFor="title">Service name</Label>
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
                  <SelectValue placeholder="Choose category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Massage">Massage</SelectItem>
                  <SelectItem value="Facial">Facial</SelectItem>
                  <SelectItem value="Body">Body Treatment</SelectItem>
                  <SelectItem value="Hair">Hair & Beauty</SelectItem>
                  <SelectItem value="Nails">Nails</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select
                value={String(formData.duration)}
                onValueChange={(value) =>
                  handleSelectChange("duration", parseInt(value, 10))
                }
              >
                <SelectTrigger id="duration">
                  <SelectValue placeholder="Choose duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 min</SelectItem>
                  <SelectItem value="45">45 min</SelectItem>
                  <SelectItem value="60">60 min</SelectItem>
                  <SelectItem value="90">90 min</SelectItem>
                  <SelectItem value="120">120 min</SelectItem>
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
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              rows={2}
              value={formData.description}
              onChange={handleChange}
              placeholder="Short description of the service"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="detailedDescription">Detail description</Label>
            <Textarea
              id="detailedDescription"
              name="detailedDescription"
              rows={4}
              value={formData.detailDescription}
              onChange={handleChange}
              placeholder="Detailed description of the service"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Service image</Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="cursor-pointer"
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-sm text-muted-foreground">
                  Current Image: {formData.image}
                </p>
                {formData.image.startsWith("http") && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 max-h-40 rounded-md"
                  />
                )}
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Hủy
          </Button>
          <Button type="submit">
            {initialData._id ? "Update service" : "Create service"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ServiceForm;
