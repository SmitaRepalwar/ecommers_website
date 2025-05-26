import { createSlice } from '@reduxjs/toolkit';

const initialState = {}

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.find((i) => i?.product.id === id);
      if (item) item.quantity = Math.max(1, quantity);
    },
    removeItem: (state, action) => {
      return state.filter((item) => item?.id !== action.payload);
    },
  },
});

export const { addToCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
