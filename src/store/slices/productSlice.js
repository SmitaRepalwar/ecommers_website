import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    allProducts: [],
    visibleProducts: [],
    selectedCategoryOrBrand: "",
    sortOption: "relevance", // new
    filters: {               // new
      category: "",
      brand: "",
      priceRange: [0, Infinity],
      rating: 0,
    },
  },
  reducers: {
    setProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setVisibleProducts: (state, action) => {
      state.visibleProducts = action.payload;
    },
    setSelectedCategoryOrBrand: (state, action) => {
      state.selectedCategoryOrBrand = action.payload;
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
});

export const { setProducts, setVisibleProducts, setSelectedCategoryOrBrand, setSortOption, setFilters } = productsSlice.actions;
export default productsSlice.reducer;
