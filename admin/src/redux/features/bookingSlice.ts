import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  Booking,
  BookingResponse,
  CreateBookingRequest,
  UpdateBookingRequest,
} from "@/shared/type";
import { RootState } from "../store";

// Định nghĩa kiểu dữ liệu cho state
interface BookingState {
  bookings: Booking[];
  currentBooking: Booking | null;
  loading: boolean;
  error: string | null;
}

// Định nghĩa kiểu dữ liệu cho response từ API

// API URL từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Helper function để lấy token từ state
const getAuthToken = (state: RootState): string | null => {
  return state.auth.token;
};

// Helper function để tạo headers với token
const createAuthHeaders = (token: string | null): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

// Helper function để chuyển đổi response thành Booking
const mapResponseToBooking = (data: BookingResponse): Booking => ({
  _id: data._id,
  customer: data.customer,
  services: data.services,
  staff: data.staff,
  date: data.date,
  time: data.time,
  status: data.status,
  amount: data.amount,
  phone: data.phone,
  email: data.email,
});

// Helper function để xử lý lỗi
const handleError = (error: unknown, defaultMessage: string) => {
  return error instanceof Error ? error.message : defaultMessage;
};

// Async thunk để lấy danh sách bookings
export const fetchBookings = createAsyncThunk(
  "bookings/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken(getState() as RootState);
      const headers = createAuthHeaders(token);

      const response = await fetch(`${API_URL}/booking`, { headers });

      if (!response.ok) {
        throw new Error("Không thể lấy danh sách đặt lịch");
      }

      const data: BookingResponse[] = await response.json();
      return data.map(mapResponseToBooking);
    } catch (error) {
      return rejectWithValue(
        handleError(error, "Đã xảy ra lỗi khi lấy danh sách đặt lịch")
      );
    }
  }
);

// Async thunk để tạo booking mới
export const createBooking = createAsyncThunk(
  "bookings/create",
  async (bookingData: CreateBookingRequest, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken(getState() as RootState);

      if (!token) {
        throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
      }

      const headers = createAuthHeaders(token);
      console.log(bookingData);
      const response = await fetch(`${API_URL}/booking`, {
        method: "POST",
        headers,
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        throw new Error("Không thể tạo đặt lịch mới");
      }

      const data: BookingResponse = await response.json();
      return mapResponseToBooking(data);
    } catch (error) {
      return rejectWithValue(
        handleError(error, "Đã xảy ra lỗi khi tạo đặt lịch mới")
      );
    }
  }
);

// Async thunk để cập nhật booking
export const updateBooking = createAsyncThunk(
  "bookings/update",
  async (bookingData: UpdateBookingRequest, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken(getState() as RootState);

      if (!token) {
        throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
      }

      const headers = createAuthHeaders(token);
      const { _id, ...bookingDataWithoutId } = bookingData;
      const body = JSON.stringify(bookingDataWithoutId);
      const response = await fetch(`${API_URL}/booking/${bookingData._id}`, {
        method: "PATCH",
        headers,
        body: body,
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật đặt lịch");
      }

      const data: BookingResponse = await response.json();
      return mapResponseToBooking(data);
    } catch (error) {
      return rejectWithValue(
        handleError(error, "Đã xảy ra lỗi khi cập nhật đặt lịch")
      );
    }
  }
);

// Async thunk để xóa booking
export const deleteBooking = createAsyncThunk(
  "bookings/delete",
  async (id: string, { rejectWithValue, getState }) => {
    try {
      const token = getAuthToken(getState() as RootState);

      if (!token) {
        throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
      }

      const headers = createAuthHeaders(token);

      const response = await fetch(`${API_URL}/booking/${id}`, {
        method: "DELETE",
        headers,
      });

      if (!response.ok) {
        throw new Error("Không thể xóa đặt lịch");
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        handleError(error, "Đã xảy ra lỗi khi xóa đặt lịch")
      );
    }
  }
);

// Khởi tạo state
const initialState: BookingState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
};

// Tạo slice
const bookingSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    setCurrentBooking: (state, action: PayloadAction<Booking | null>) => {
      state.currentBooking = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchBookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý createBooking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.loading = false;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý updateBooking
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(
          (booking) => booking._id === action.payload._id
        );
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý deleteBooking
      .addCase(deleteBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(
          (booking) => booking._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const { setCurrentBooking, clearError } = bookingSlice.actions;

// Export selectors
export const selectAllBookings = (state: RootState) => state.bookings.bookings;
export const selectBookingsLoading = (state: RootState) =>
  state.bookings.loading;
export const selectBookingsError = (state: RootState) => state.bookings.error;
export const selectCurrentBooking = (state: RootState) =>
  state.bookings.currentBooking;

// Export reducer
export default bookingSlice.reducer;
