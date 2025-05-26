// src/hooks/useProducts.js
import { useQuery } from '@tanstack/react-query';
import { getAllProducts, getProductById } from '../services/productApi';
import { useDispatch } from 'react-redux';
import { setProducts, setVisibleProducts } from '../store/slices/productSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      console.log("Calling getAllProducts");
      const res = await getAllProducts();
      console.log("Fetched data:", res);
      dispatch(setProducts(res.products));
      dispatch(setVisibleProducts(res.products));
      return res;
    },
    // onSuccess: (data) => {
    //   console.log("onSuccess triggered with data:", data);
    //   dispatch(setProducts(data.products));
    //   dispatch(setVisibleProducts(data.products));
    // },
    // onError: (err) => {
    //   console.error("onError triggered", err);
    // }
  });
};

export const useProduct = (id) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // only run if id is truthy
  });
};
