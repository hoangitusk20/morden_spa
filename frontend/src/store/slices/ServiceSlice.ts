// import { Service } from "@/shared/type";
// import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// // Định nghĩa kiểu dữ liệu cho state
// interface ServiceState {
//   services: Service[] | [];
//   coreService: Service[] | [];
//   loading: boolean;
//   error: string | null;
// }

// // API URL từ biến môi trường
// const API_URL = process.env.VITE_API_URL || "http://localhost:5000";

// // Async thunk để lấy danh sách services
// export const fetchServices = createAsyncThunk(
//   "services/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch(`${API_URL}/service`);
//       if (!response.ok) {
//         throw new Error("Không thể lấy danh sách dịch vụ");
//       }
//       const data: Service[] = await response.json();

//       return data;
//     } catch (error) {
//       return rejectWithValue(
//         error instanceof Error
//           ? error.message
//           : "Đã xảy ra lỗi khi lấy danh sách dịch vụ"
//       );
//     }
//   }
// );

// // Khởi tạo state ban đầu
// const initialState: ServiceState = {
//   services: [],
//   coreService: [],
//   loading: false,
//   error: null,
// };

// // Tạo slice
// const serviceSlice = createSlice({
//   name: "services",
//   initialState,
//   reducers: {
//     setCoreService: (state, action: PayloadAction<Service[] | []>) => {
//       state.coreService = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       // Xử lý fetchServices
//       .addCase(fetchServices.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchServices.fulfilled, (state, action) => {
//         state.services = action.payload;
//         state.loading = false;
//       })
//       .addCase(fetchServices.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//       });
//   },
// });

// export const { setCoreService, clearError } = serviceSlice.actions;

// export default serviceSlice.reducer;

// // Selectors
// export const selectAllServices = (state: { services: ServiceState }) =>
//   state.services.services;
// export const selectCurrentService = (state: { services: ServiceState }) =>
//   state.services.coreService;
// export const selectServicesLoading = (state: { services: ServiceState }) =>
//   state.services.loading;
// export const selectServicesError = (state: { services: ServiceState }) =>
//   state.services.error;
