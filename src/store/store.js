import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import cartReducer from "./slices/cartSlice";
import promoReducer from "./slices/promoSlice"
import wishlistReducer from "./slices/wishlistSlice"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart', 'wishlist'], // Only persist the cart slice
};

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    promo: promoReducer,
    wishlist: wishlistReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // needed for redux-persist
    }),
});


export const persistor = persistStore(store);
 