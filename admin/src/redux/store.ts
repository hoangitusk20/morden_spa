import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import serviceReducer from './features/serviceSlice';
import staffReducer from './features/staffSlice';
import bookingReducer from './features/bookingSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    staff: staffReducer,
    bookings: bookingReducer,
    // Add other reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;