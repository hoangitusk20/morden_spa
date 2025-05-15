import Banner from "@/shared/Banner";
import BookingSummary from "./components/BookingSummary";
import BookingForm from "./components/BookingForm";
import { Suspense } from "react";

export default function Bookingpage() {
  return (
    <div className="my-20">
      <Banner
        title="Complete Your Booking"
        image="/images/BookingBanner.jpg"
        description="Review your selected services and provide your information to complete your booking"
      />

      <Suspense fallback={<div>Loading...</div>}>
        <div className="container-custom grid grid-cols-1 lg:grid-cols-2 gap-8 mt-15">
          <BookingSummary />
          <BookingForm />
        </div>
      </Suspense>
    </div>
  );
}
