import { Booking } from "@/shared/type";

export async function createBooking(booking: Booking): Promise<object> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/booking`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(booking),
  });

  if (!res.ok) {
    throw new Error("Failed to create booking");
  }

  const data: object = await res.json();
  return data;
}
