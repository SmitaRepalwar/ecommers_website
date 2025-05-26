import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from "./pages/Home"
import ProductsPage from './pages/ProductsPage';
import './App.css'
import ProductDetailsPage from './pages/ProductDetails';
import { Provider } from 'react-redux';
import { store, persistor } from './store/store';
import CartPage from './pages/CartPage';
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const queryClient = new QueryClient();

  return (
   <QueryClientProvider client={queryClient}> 
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:productId" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage/>}/>
        </Routes>
      </BrowserRouter>
      </PersistGate>
    </Provider>
   </QueryClientProvider> 
  )
}

export default App
