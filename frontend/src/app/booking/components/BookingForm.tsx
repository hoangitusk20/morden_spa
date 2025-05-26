"use client";

import { useState } from "react";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { createBooking } from "@/lib/createBooking";
import { ServiceItem } from "@/shared/type";
import { clearCart } from "@/store/slices/CartSlice";
export default function BookingForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [customer, setCustomer] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");
  const { items: cart } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const cartItems: ServiceItem[] = cart.map((item) => ({
    _id: item._id,
    name: item.title,
    price: item.price,
    quantity: item.quantity || 1, // Đảm bảo quantity luôn có giá trị
  }));

  const updateTimeString = (hour: string, minute: string, period: string) => {
    if (hour && minute && period) {
      setTime(`${hour}:${minute} ${period}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length == 0) {
      toast.error("Please add service to cart");
      return;
    }
    if (!date || !time || !customer) {
      toast.error("Please fill in required fields");
      return;
    }

    const bookingData = {
      customer,
      services: cartItems,
      date: date.toISOString().split("T")[0], // "2025-06-01"
      time,
      status: "pending",
      amount: cart.reduce((total, item) => {
        return total + item.price * (item.quantity || 1);
      }, 0),
      phone,
      email,
    };

    try {
      await createBooking(bookingData);
      toast.success("Booking successfully created!");
      // Reset form nếu muốn
      dispatch(clearCart());
      setCustomer("");
      setDate(new Date());
      setTime("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create booking");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mx-auto p-6 bg-white ">
      <h1 className="text-4xl font-serif text-[#3c2415] mb-8">
        Your Information
      </h1>

      <div className="mb-10">
        <h2 className="text-2xl font-serif text-[#3c2415] mb-6">
          Choose Date &amp; Time
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full flex items-center py-3 border-1 rounded-md shadow-xs px-2 font-thin justify-start text-left h-12 bg-white"
                  id="date"
                >
                  <CalendarIcon className="mx-3 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-20" align="start">
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="p-4"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Select Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className="w-full flex items-center py-3 border-1 rounded-md shadow-xs px-2 font-thin justify-start text-left h-12 bg-white"
                  id="time"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time ? time : "Select a time"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-4" align="start">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="hours">Hour</Label>
                      <Select
                        value={selectedHour}
                        onValueChange={(value) => {
                          setSelectedHour(value);
                          updateTimeString(
                            value,
                            selectedMinute,
                            selectedPeriod
                          );
                        }}
                      >
                        <SelectTrigger id="hours">
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 12 }, (_, i) =>
                            (i + 1).toString().padStart(2, "0")
                          ).map((hour) => (
                            <SelectItem key={hour} value={hour}>
                              {hour}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="minutes">Minute</Label>
                      <Select
                        value={selectedMinute}
                        onValueChange={(value) => {
                          setSelectedMinute(value);
                          updateTimeString(selectedHour, value, selectedPeriod);
                        }}
                      >
                        <SelectTrigger id="minutes">
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                        <SelectContent>
                          {["00", "15", "30", "45"].map((minute) => (
                            <SelectItem key={minute} value={minute}>
                              {minute}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={selectedPeriod === "AM" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => {
                        setSelectedPeriod("AM");
                        updateTimeString(selectedHour, selectedMinute, "AM");
                      }}
                    >
                      AM
                    </Button>
                    <Button
                      variant={selectedPeriod === "PM" ? "default" : "outline"}
                      className="flex-1"
                      onClick={() => {
                        setSelectedPeriod("PM");
                        updateTimeString(selectedHour, selectedMinute, "PM");
                      }}
                    >
                      PM
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-2xl font-serif text-[#3c2415] mb-6">
          Personal Information
        </h2>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label htmlFor="customer">Name</Label>
            <Input
              id="customer"
              placeholder="Enter your name"
              className="h-12 bg-white"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="h-12 bg-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="h-12 bg-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-10">
        <div className="space-y-2">
          <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
          <Textarea
            id="specialRequests"
            placeholder="Any special requests or notes for your appointment"
            className="min-h-[120px] bg-white"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button className="px-8 py-6 text-lg " type="submit">
          Complete Booking
        </Button>
      </div>
    </form>
  );
}
