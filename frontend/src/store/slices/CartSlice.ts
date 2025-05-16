import { Service } from '@/shared/type';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
  items: Service[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {

    //Set cart from localStorage
    setCart: (state, action: PayloadAction<Service[]>) => {
      state.items = action.payload;
    },

    addService: (state, action: PayloadAction<Service>) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        const newSerivce = action.payload;
        newSerivce.quantity = 1;
        state.items.push(newSerivce);
      }
      else {
        exists.quantity = (exists.quantity || 1) + 1;
      }
    },

    updateService: (state, action: PayloadAction<Service>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id); 
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    removeService: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addService, removeService, clearCart, updateService , setCart } = cartSlice.actions;
export default cartSlice.reducer;
