import { createSlice } from '@reduxjs/toolkit';

const promoSlice = createSlice({
  name: 'promo',
  initialState: {
    code: '',
    discountApplied: false,
  },
  reducers: {
    applyPromo: (state, action) => {
      if (action.payload === 'SAVE10') {
        state.code = 'SAVE10';
        state.discountApplied = true;
      } else {
        alert('Invalid promo code');
      }
    },
  },
});

export const { applyPromo } = promoSlice.actions;
export default promoSlice.reducer;
