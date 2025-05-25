import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
// import serviceReducer from "./slices/ServiceSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // services: serviceReducer,
  },
});

// TypeScript helpers
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
