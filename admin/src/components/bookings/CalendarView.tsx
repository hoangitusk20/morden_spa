
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, addDays, startOfWeek, addWeeks, subWeeks } from "date-fns";

// Mock data
const timeSlots = [
  "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
];

const staffMembers = [
  { id: "1", name: "Emma Johnson" },
  { id: "2", name: "Michael Chen" },
  { id: "3", name: "Sophia Rodriguez" },
  { id: "all", name: "All Staff" },
];

// Mock bookings data
const bookingsData = [
  { 
    id: "1",
    dayIndex: 0, 
    startTime: "10:00 AM", 
    endTime: "11:00 AM", 
    customer: "Alice Brown", 
    service: "Deep Tissue Massage",
    staffId: "1",
    status: "confirmed" 
  },
  { 
    id: "2",
    dayIndex: 1, 
    startTime: "2:00 PM", 
    endTime: "3:00 PM", 
    customer: "Bob Smith", 
    service: "Facial Treatment",
    staffId: "2",
    status: "pending" 
  },
  { 
    id: "3",
    dayIndex: 2, 
    startTime: "11:30 AM", 
    endTime: "12:30 PM", 
    customer: "Carol Davis", 
    service: "Hot Stone Therapy",
    staffId: "3",
    status: "confirmed" 
  },
  { 
    id: "4",
    dayIndex: 4, 
    startTime: "3:30 PM", 
    endTime: "4:30 PM", 
    customer: "David Wilson", 
    service: "Aromatherapy",
    staffId: "1",
    status: "completed" 
  },
  { 
    id: "5",
    dayIndex: 3, 
    startTime: "9:30 AM", 
    endTime: "10:30 AM", 
    customer: "Eva Martin", 
    service: "Body Scrub",
    staffId: "2",
    status: "canceled" 
  },
];

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState("week");
  const [selectedStaff, setSelectedStaff] = useState("all");
  
  const startDate = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
  
  // Generate days of the week
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    const date = addDays(startDate, index);
    return {
      date,
      dayName: format(date, "EEE"),
      dayNumber: format(date, "d"),
      month: format(date, "MMM"),
    };
  });

  const navigateWeek = (direction: "prev" | "next") => {
    setCurrentDate(
      direction === "prev" 
        ? subWeeks(currentDate, 1)
        : addWeeks(currentDate, 1)
    );
  };

  const getBookingForTimeSlot = (dayIndex: number, time: string) => {
    return bookingsData.find(booking => 
      booking.dayIndex === dayIndex &&
      booking.startTime === time &&
      (selectedStaff === "all" || booking.staffId === selectedStaff)
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 border-yellow-300 text-yellow-800";
      case "confirmed": return "bg-blue-100 border-blue-300 text-blue-800";
      case "completed": return "bg-green-100 border-green-300 text-green-800";
      case "canceled": return "bg-red-100 border-red-300 text-red-800";
      default: return "bg-gray-100 border-gray-300 text-gray-800";
    }
  };

  return (
    <div className="spa-card">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => navigateWeek("prev")}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="font-medium">
            {format(startDate, "MMMM d")} - {format(addDays(startDate, 6), "MMMM d, yyyy")}
          </div>
          
          <Button 
            variant="outline"
            size="icon"
            onClick={() => navigateWeek("next")}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            value={selectedStaff}
            onValueChange={setSelectedStaff}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select staff" />
            </SelectTrigger>
            <SelectContent>
              {staffMembers.map(staff => (
                <SelectItem key={staff.id} value={staff.id}>{staff.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Today
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <div className="min-w-[900px] grid grid-cols-8 gap-1">
          {/* Time column */}
          <div className="col-span-1">
            <div className="h-12"></div> {/* Empty cell for header alignment */}
            {timeSlots.map((time) => (
              <div key={time} className="h-16 flex items-center justify-end pr-4 text-sm text-muted-foreground">
                {time}
              </div>
            ))}
          </div>
          
          {/* Days columns */}
          {weekDays.map((day, dayIndex) => (
            <div key={dayIndex} className="col-span-1">
              <div className="h-12 flex flex-col items-center justify-center border-b">
                <div className="text-sm font-medium">{day.dayName}</div>
                <div className="text-lg">{day.dayNumber}</div>
              </div>
              
              {timeSlots.map((time) => {
                const booking = getBookingForTimeSlot(dayIndex, time);
                return (
                  <div 
                    key={`${dayIndex}-${time}`} 
                    className={cn(
                      "h-16 border border-dashed border-border p-1",
                      !booking && "hover:bg-muted/50 cursor-pointer"
                    )}
                  >
                    {booking && (
                      <div className={cn(
                        "h-full rounded-md border p-2 text-xs overflow-hidden",
                        getStatusColor(booking.status)
                      )}>
                        <div className="font-medium truncate">{booking.customer}</div>
                        <div className="truncate">{booking.service}</div>
                        <div>{booking.startTime} - {booking.endTime}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
