import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Load state from localStorage on initialization
const loadState = (): AuthState => {
  try {
    const serializedToken = localStorage.getItem("token");
    const serializedUser = localStorage.getItem("user");

    if (serializedToken && serializedUser) {
      return {
        token: serializedToken,
        user: JSON.parse(serializedUser),
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    }
  } catch (err) {
    console.log("Error loading auth state from localStorage", err);
  }

  return initialState;
};

// API URL from environment variable
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const data = await response.json();

      // Lấy token từ response
      const token = data.access_token;

      // Tạo thông tin người dùng từ token (trong thực tế, bạn có thể cần giải mã JWT hoặc gọi API khác)
      const userData = {
        id: "1", // Trong thực tế, ID nên được lấy từ token hoặc API
        name: "Admin User",
        email: credentials.username,
        role: "admin",
      };

      return { user: userData, token };
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Đăng nhập thất bại"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: loadState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthState["user"]; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, token } = action.payload;
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;

        // Save to localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setCredentials, logout, clearError } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.loading;
export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;
