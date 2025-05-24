import { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Booking, StaffMember } from "@/shared/type";

// Setup the localizer for React Big Calendar
const localizer = momentLocalizer(moment);

// Custom event styling
const eventStyleGetter = (event) => {
  let backgroundColor;
  switch (event.status) {
    case "confirmed":
      backgroundColor = "#4CAF50";
      break; // Green
    case "pending":
      backgroundColor = "#FFC107";
      break; // Yellow
    case "completed":
      backgroundColor = "#2196F3";
      break; // Blue
    case "canceled":
      backgroundColor = "#F44336";
      break; // Red
    default:
      backgroundColor = "#9E9E9E"; // Grey
  }

  return {
    style: {
      backgroundColor,
      borderRadius: "5px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
    },
  };
};

// Custom toolbar component
const CustomToolbar = ({ label, onNavigate, onView, views }) => {
  return (
    <div className="flex justify-between items-center mb-4 p-2 bg-gray-50 rounded">
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded mr-2"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded mr-2"
          onClick={() => onNavigate("PREV")}
        >
          &lt;
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
          onClick={() => onNavigate("NEXT")}
        >
          &gt;
        </button>
      </div>
      <div className="font-bold text-lg">{label}</div>
      <div>
        {views.map((view) => (
          <button
            key={view}
            className="ml-2 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => onView(view)}
          >
            {view.charAt(0).toUpperCase() + view.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

// Custom tooltip component
const CustomTooltip = ({ event, position }) => {
  if (!event) return null;

  return (
    <div
      className="absolute z-50 bg-gray-800 text-white p-3 rounded shadow-lg text-sm"
      style={{ top: position.top, left: position.left }}
    >
      <div className="font-bold mb-1">{event.title}</div>
      <div>
        <strong>Services:</strong> {event.serviceNames}
      </div>
      <div>
        <strong>Staff:</strong> {event.staff}
      </div>
      <div>
        <strong>Status:</strong> {event.status}
      </div>
      <div>
        <strong>Amount:</strong> ${event.amount}
      </div>
    </div>
  );
};

// Main component
interface CalendarViewProps {
  bookings: Booking[];
  staff: StaffMember[];
}

export default function CalendarView({ bookings, staff }: CalendarViewProps) {
  const [selectedStaff, setSelectedStaff] = useState("all");
  const [events, setEvents] = useState([]);
  const [tooltipEvent, setTooltipEvent] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  // Convert bookings to calendar events
  useEffect(() => {
    const filteredBookings =
      selectedStaff === "all"
        ? bookings.filter((booking) => booking.staff !== null)
        : bookings.filter((booking) => booking.staff === selectedStaff);

    const formattedEvents = filteredBookings.map((booking) => {
      // Parse date and time
      const bookingDate = moment(
        `${booking.date} ${booking.time}`,
        "MMM D, YYYY h:mm A"
      ).toDate();

      // Calculate end time (1 hour per service)
      const endDate = new Date(bookingDate);
      endDate.setHours(endDate.getHours() + booking.services.length);

      // Format service names
      const serviceNames = booking.services.map((s) => s.name).join(", ");

      return {
        _id: booking._id,
        title: `${booking.customer} - ${serviceNames}`,
        start: bookingDate,
        end: endDate,
        customer: booking.customer,
        serviceNames: serviceNames,
        staff: booking.staff,
        status: booking.status,
        amount: booking.amount,
      };
    });

    setEvents(formattedEvents);
  }, [selectedStaff, bookings]);

  // Handle event selection to show tooltip
  const handleSelectEvent = (event, e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      top: rect.bottom + window.scrollY + 5,
      left: rect.left + window.scrollX,
    });
    setTooltipEvent(event);

    // Hide tooltip after 3 seconds
    setTimeout(() => {
      setTooltipEvent(null);
    }, 3000);
  };

  // Handle mouse leave to hide tooltip
  const handleMouseLeave = () => {
    setTooltipEvent(null);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Staff Calendar</h2>
        <div className="w-64">
          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Staff</option>
            {staff.map((staffMember) => (
              <option key={staffMember._id} value={staffMember.name}>
                {staffMember.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div
        className="calendar-container h-screen max-h-96"
        onMouseLeave={handleMouseLeave}
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          views={["month", "week", "day"]}
          defaultView="week"
          min={moment().hours(8).minutes(0).toDate()} // 8:00 AM
          max={moment().hours(20).minutes(0).toDate()} // 8:00 PM
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          components={{
            toolbar: CustomToolbar,
          }}
        />

        {tooltipEvent && (
          <CustomTooltip event={tooltipEvent} position={tooltipPosition} />
        )}
      </div>

      <div className="mt-4 flex gap-4 text-sm">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-500 rounded mr-1"></div>
          <span>Confirmed</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-1"></div>
          <span>Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-500 rounded mr-1"></div>
          <span>Completed</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-red-500 rounded mr-1"></div>
          <span>Canceled</span>
        </div>
      </div>
    </div>
  );
}
