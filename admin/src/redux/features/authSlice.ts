import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  } | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

// Load state from localStorage on initialization
const loadState = (): AuthState => {
  try {
    const serializedToken = localStorage.getItem('token');
    const serializedUser = localStorage.getItem('user');
    
    if (serializedToken && serializedUser) {
      return {
        token: serializedToken,
        user: JSON.parse(serializedUser),
        isAuthenticated: true,
      };
    }
  } catch (err) {
    console.log('Error loading auth state from localStorage', err);
  }
  
  return initialState;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: AuthState['user']; token: string }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      
      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      
      // Clear localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const selectCurrentUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;