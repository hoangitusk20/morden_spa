import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateServiceRequest,
  ServiceData,
  ServiceResponse,
  UpdateServiceRequest,
} from "@/shared/type";

// Định nghĩa kiểu dữ liệu cho state
interface ServiceState {
  services: ServiceData[];
  currentService: ServiceData | null;
  loading: boolean;
  error: string | null;
}

// API URL từ biến môi trường
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Async thunk để lấy danh sách services
export const fetchServices = createAsyncThunk(
  "services/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/service`);
      if (!response.ok) {
        throw new Error("Không thể lấy danh sách dịch vụ");
      }
      const data: ServiceResponse[] = await response.json();

      // Chuyển đổi dữ liệu từ API sang định dạng ServiceData
      return data.map((service) => ({
        _id: service._id,
        title: service.title,
        duration: service.duration,
        price: service.price,
        description: service.description,
        detailDescription: service.detailDescription,
        category: service.category,
        image: service.image,
      }));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi lấy danh sách dịch vụ"
      );
    }
  }
);

// Async thunk để tạo service mới
export const createService = createAsyncThunk(
  "services/create",
  async (serviceData: CreateServiceRequest, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("title", serviceData.title);
      formData.append("duration", serviceData.duration.toString());
      formData.append("price", serviceData.price.toString());
      formData.append("description", serviceData.description);
      formData.append("detailDescription", serviceData.detailDescription);
      formData.append("category", serviceData.category);
      formData.append("image", serviceData.image);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
      }

      const response = await fetch(`${API_URL}/service`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Không thể tạo dịch vụ mới");
      }

      const data: ServiceResponse = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi tạo dịch vụ mới"
      );
    }
  }
);

// Async thunk để cập nhật service
export const updateService = createAsyncThunk(
  "services/update",
  async (serviceData: UpdateServiceRequest, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (serviceData.title) formData.append("title", serviceData.title);
      if (serviceData.duration)
        formData.append("duration", serviceData.duration.toString());
      if (serviceData.price)
        formData.append("price", serviceData.price.toString());
      if (serviceData.description)
        formData.append("description", serviceData.description);
      if (serviceData.detailDescription)
        formData.append("detailDescription", serviceData.detailDescription);
      if (serviceData.category)
        formData.append("category", serviceData.category);
      if (serviceData.image) formData.append("image", serviceData.image);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
      }

      const response = await fetch(`${API_URL}/service/${serviceData._id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Không thể cập nhật dịch vụ");
      }

      const data: ServiceResponse = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Đã xảy ra lỗi khi cập nhật dịch vụ"
      );
    }
  }
);

// Async thunk để xóa service
export const deleteService = createAsyncThunk(
  "services/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Bạn cần đăng nhập để thực hiện thao tác này");
      }

      const response = await fetch(`${API_URL}/service/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Không thể xóa dịch vụ");
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Đã xảy ra lỗi khi xóa dịch vụ"
      );
    }
  }
);

export const revalidateService = createAsyncThunk(
  "services/revalidate",
  async (tag: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/revalidate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: tag,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể revalidate");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Đã xảy ra lỗi khi revalidate"
      );
    }
  }
);

export const revalidateRelatedService = createAsyncThunk(
  "services/revalidateRelated",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/revalidate/related/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Không thể revalidate");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Đã xảy ra lỗi khi revalidate"
      );
    }
  }
);

// Khởi tạo state ban đầu
const initialState: ServiceState = {
  services: [],
  currentService: null,
  loading: false,
  error: null,
};

// Tạo slice
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setCurrentService: (state, action: PayloadAction<ServiceData | null>) => {
      state.currentService = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Xử lý fetchServices
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.services = action.payload;
        state.loading = false;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý createService
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createService.fulfilled, (state, action) => {
        const payload = action.payload;
        const newService = {
          ...payload,
          price: Number(payload.price),
          duration: Number(payload.duration),
        };
        state.services.push(newService);
        state.loading = false;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý updateService
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          (service) => service._id === action.payload._id
        );
        if (index !== -1) {
          state.services[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý deleteService
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý revalidateService
      .addCase(revalidateService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(revalidateService.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // Xóa lỗi nếu có
      })
      .addCase(revalidateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Xử lý revalidateRelatedService
      .addCase(revalidateRelatedService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(revalidateRelatedService.fulfilled, (state) => {
        state.loading = false;
        state.error = null; // Xóa lỗi nếu có
      })
      .addCase(revalidateRelatedService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentService, clearError } = serviceSlice.actions;

export default serviceSlice.reducer;

// Selectors
export const selectAllServices = (state: { services: ServiceState }) =>
  state.services.services;
export const selectCurrentService = (state: { services: ServiceState }) =>
  state.services.currentService;
export const selectServicesLoading = (state: { services: ServiceState }) =>
  state.services.loading;
export const selectServicesError = (state: { services: ServiceState }) =>
  state.services.error;
