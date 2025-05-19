import { useState, useEffect } from "react";
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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Plus, Minus, CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Booking } from "@/shared/type";

interface BookingFormProps {
  initialData?: Booking;
  onSubmit: (data: Booking) => void;
  onCancel: () => void;
  services: Array<{ id: string; name: string; price: number }>;
  staff: Array<{ id: string; name: string }>;
}

const emptyBooking: Booking = {
  id: "",
  customer: "",
  services: [],
  staff: null,
  date: format(new Date(), "MMMM d, yyyy"),
  time: "10:00 AM",
  status: "pending",
  amount: 0,
};

const BookingForm: React.FC<BookingFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  services,
  staff,
}) => {
  const [formData, setFormData] = useState<Booking>(
    initialData || emptyBooking
  );
  const [date, setDate] = useState<Date | undefined>(
    initialData?.date ? new Date(initialData.date) : new Date()
  );

  // Update amount when services change
  useEffect(() => {
    const totalAmount = formData.services.reduce(
      (sum, service) => sum + service.price,
      0
    );
    setFormData((prev) => ({ ...prev, amount: totalAmount }));
  }, [formData.services]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setFormData((prev) => ({ ...prev, date: format(date, "MMMM d, yyyy") }));
    }
  };

  const toggleService = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId);
    if (!service) return;

    const serviceIndex = formData.services.findIndex((s) => s.id === serviceId);

    if (serviceIndex === -1) {
      // Add service
      setFormData((prev) => ({
        ...prev,
        services: [...prev.services, service],
      }));
    } else {
      // Remove service
      setFormData((prev) => ({
        ...prev,
        services: prev.services.filter((s) => s.id !== serviceId),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isServiceSelected = (serviceId: string) => {
    return formData.services.some((s) => s.id === serviceId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="max-h-[80vh] overflow-scroll">
        <CardContent className="space-y-4 pt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer Name</Label>
              <Input
                id="customer"
                name="customer"
                value={formData.customer}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone number</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                type="phone"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                type="email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="canceled">Canceled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? (
                      format(date, "MMMM d, yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Select
                value={formData.time}
                onValueChange={(value) => handleSelectChange("time", value)}
              >
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                  <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                  <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                  <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                  <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                  <SelectItem value="11:30 AM">11:30 AM</SelectItem>
                  <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                  <SelectItem value="12:30 PM">12:30 PM</SelectItem>
                  <SelectItem value="1:00 PM">1:00 PM</SelectItem>
                  <SelectItem value="1:30 PM">1:30 PM</SelectItem>
                  <SelectItem value="2:00 PM">2:00 PM</SelectItem>
                  <SelectItem value="2:30 PM">2:30 PM</SelectItem>
                  <SelectItem value="3:00 PM">3:00 PM</SelectItem>
                  <SelectItem value="3:30 PM">3:30 PM</SelectItem>
                  <SelectItem value="4:00 PM">4:00 PM</SelectItem>
                  <SelectItem value="4:30 PM">4:30 PM</SelectItem>
                  <SelectItem value="5:00 PM">5:00 PM</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="staff">Assign to Staff (Optional)</Label>
              <Select
                value={formData.staff || "unassigned"}
                onValueChange={(value) =>
                  handleSelectChange(
                    "staff",
                    value === "unassigned" ? null : value
                  )
                }
              >
                <SelectTrigger id="staff">
                  <SelectValue placeholder="Assign to staff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Unassigned</SelectItem>
                  {staff.map((s) => (
                    <SelectItem key={s.id} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Services</Label>
            <div className="border rounded-md p-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`service-${service.id}`}
                      checked={isServiceSelected(service.id)}
                      onCheckedChange={() => toggleService(service.id)}
                    />
                    <Label
                      htmlFor={`service-${service.id}`}
                      className="flex justify-between w-full"
                    >
                      <span>{service.name}</span>
                      <span className="text-muted-foreground">
                        ${service.price.toFixed(2)}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t flex justify-between">
                <span className="font-medium">Total Amount:</span>
                <span className="font-bold">${formData.amount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update Booking" : "Create Booking"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default BookingForm;
