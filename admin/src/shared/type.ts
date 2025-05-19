export type ServiceData = {
  id?: string;
  title: string;
  duration: string;
  price: number;
  description: string;
  detailedDescription: string;
  category: string;
  image?: string;
}

export interface Booking {
  id: string;
  customer: string;
  services: Array<{id: string, name: string, price: number}>;
  staff: string | null;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  amount: number;
  phone? : string;
  email? :string;
}

export 
interface StaffMember {
  id?: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  specialties: string[];

}