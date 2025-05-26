export interface Service {
  _id: string;
  title: string;
  duration: number;
  price: number;
  image: string;
  description: string;
  detailDescription: string;
  category: string;
  quantity?: number;
}

export interface ServiceItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Booking {
  customer: string;
  services: ServiceItem[];
  date: string;
  time: string;
  status: string;
  amount: number;
  phone?: string;
  email?: string;
}
