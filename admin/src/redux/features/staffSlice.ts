import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  CreateStaffRequest,
  StaffMember,
  StaffResponse,
  UpdateStaffRequest,
} from "@/shared/type";

// Define state type
interface StaffState {
  staffMembers: StaffMember[];
  currentStaff: StaffMember | null;
  loading: boolean;
  error: string | null;
}

// API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Async thunk to fetch all staff members
export const fetchStaff = createAsyncThunk(
  "staff/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/staff`);
      if (!response.ok) {
        throw new Error("Failed to fetch staff members");
      }
      const data: StaffResponse[] = await response.json();

      // Convert API data to StaffMember format
      return data.map((staff) => ({
        _id: staff._id,
        name: staff.name,
        email: staff.email || "",
        phone: staff.phone || "",
        specialties: staff.skills,
        avatarUrl: staff.avatarUrl,
      }));
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred while fetching staff members"
      );
    }
  }
);

// Async thunk to create a new staff member
export const createStaff = createAsyncThunk(
  "staff/create",
  async (staffData: CreateStaffRequest, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("name", staffData.name);
      formData.append("email", staffData.email);
      formData.append("phone", staffData.phone);

      // Combine position and specialties into skills array
      const skills = [...staffData.specialties];
      formData.append("skills", JSON.stringify(skills));

      if (staffData.avatar) {
        formData.append("avatar", staffData.avatar);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You need to be logged in to perform this action");
      }

      const response = await fetch(`${API_URL}/staff`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to create staff member");
      }

      const data: StaffResponse = await response.json();

      return {
        _id: data._id,
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        specialties: data.skills,
        avatar: data.avatarUrl,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred while creating staff member"
      );
    }
  }
);

// Async thunk to update a staff member
export const updateStaff = createAsyncThunk(
  "staff/update",
  async (staffData: UpdateStaffRequest, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      if (staffData.name) formData.append("name", staffData.name);
      if (staffData.email) formData.append("email", staffData.email);
      if (staffData.phone) formData.append("phone", staffData.phone);

      // Combine position and specialties into skills array if provided
      if (staffData.specialties) {
        const skills = [...(staffData.specialties || [])].filter(Boolean);
        formData.append("skills", JSON.stringify(skills));
      }

      if (staffData.avatar) {
        formData.append("avatar", staffData.avatar);
      }

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You need to be logged in to perform this action");
      }

      const response = await fetch(`${API_URL}/staff/${staffData._id}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update staff member");
      }

      const data: StaffResponse = await response.json();

      return {
        _id: data._id,
        name: data.name,
        email: data.email || "",
        phone: data.phone || "",
        specialties: data.skills,
        avatar: data.avatarUrl,
      };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred while updating staff member"
      );
    }
  }
);

// Async thunk to delete a staff member
export const deleteStaff = createAsyncThunk(
  "staff/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("You need to be logged in to perform this action");
      }

      const response = await fetch(`${API_URL}/staff/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete staff member");
      }

      return id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "An error occurred while deleting staff member"
      );
    }
  }
);

// Initialize state
const initialState: StaffState = {
  staffMembers: [],
  currentStaff: null,
  loading: false,
  error: null,
};

// Create slice
const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setCurrentStaff: (state, action: PayloadAction<StaffMember | null>) => {
      state.currentStaff = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchStaff
      .addCase(fetchStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStaff.fulfilled, (state, action) => {
        state.staffMembers = action.payload;
        state.loading = false;
      })
      .addCase(fetchStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle createStaff
      .addCase(createStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createStaff.fulfilled, (state, action) => {
        state.staffMembers.push(action.payload);
        state.loading = false;
      })
      .addCase(createStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle updateStaff
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        const index = state.staffMembers.findIndex(
          (staff) => staff._id === action.payload._id
        );
        if (index !== -1) {
          state.staffMembers[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Handle deleteStaff
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.staffMembers = state.staffMembers.filter(
          (staff) => staff._id !== action.payload
        );
        state.loading = false;
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCurrentStaff, clearError } = staffSlice.actions;

export default staffSlice.reducer;

// Selectors
export const selectAllStaff = (state: { staff: StaffState }) =>
  state.staff.staffMembers;
export const selectCurrentStaff = (state: { staff: StaffState }) =>
  state.staff.currentStaff;
export const selectStaffLoading = (state: { staff: StaffState }) =>
  state.staff.loading;
export const selectStaffError = (state: { staff: StaffState }) =>
  state.staff.error;
