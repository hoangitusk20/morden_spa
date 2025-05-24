export type ServiceData = {
  _id?: string;
  title: string;
  duration: number;
  price: number;
  description: string;
  detailDescription: string;
  category: string;
  image?: string;
};

export type Booking = {
  _id?: string;
  customer: string;
  services: Array<{ _id: string; name: string; price: number }>;
  staff: string | null;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  amount: number;
  phone?: string;
  email?: string;
};

export type StaffMember = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  avatar?: string;
};

export interface ServiceResponse {
  _id: string;
  title: string;
  duration: number;
  price: number;
  image: string;
  description: string;
  detailDescription: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

// Định nghĩa kiểu dữ liệu cho request tạo service
export interface CreateServiceRequest {
  title: string;
  duration: number;
  price: number;
  description: string;
  detailDescription: string;
  category: string;
  image: File;
}

// Định nghĩa kiểu dữ liệu cho request cập nhật service
export interface UpdateServiceRequest extends Partial<CreateServiceRequest> {
  _id: string;
}

export interface StaffResponse {
  _id: string;
  name: string;
  email: string;
  phone: string;
  skills: string[];
  avatarUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define request type for creating staff
export interface CreateStaffRequest {
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  avatar?: string;
}

// Define request type for updating staff
export interface UpdateStaffRequest extends Partial<CreateStaffRequest> {
  _id: string;
}

export interface BookingResponse {
  _id: string;
  customer: string;
  services: Array<{ _id: string; name: string; price: number }>;
  staff: string | null;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  amount: number;
  phone?: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Định nghĩa kiểu dữ liệu cho request tạo booking
export interface CreateBookingRequest {
  customer: string;
  services: Array<{ _id: string; name: string; price: number }>;
  staff: string | null;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "canceled";
  amount: number;
  phone?: string;
  email?: string;
}

export interface UpdateBookingRequest extends Partial<CreateBookingRequest> {
  _id: string;
}
