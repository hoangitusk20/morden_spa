"use client";

import { useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";

export default function BookingForm() {
  const [date, setDate] = useState<Date | undefined>();
  const [time, setTime] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<"AM" | "PM">("AM");

  const updateTimeString = (hour: string, minute: string, period: string) => {
    if (hour && minute && period) {
      setTime(`${hour}:${minute} ${period}`);
    }
  };

  return (
    <div className="w-full mx-auto p-6 bg-white ">
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
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12 bg-white"
                  id="date"
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time">Select Time</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal h-12 bg-white"
                  id="time"
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {time ? time : "Select a time"}
                </Button>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="Enter your first name"
              className="h-12 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Enter your last name"
              className="h-12 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="h-12 bg-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              className="h-12 bg-white"
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
        <Button className="px-8 py-6 text-lg ">Complete Booking</Button>
      </div>
    </div>
  );
}
