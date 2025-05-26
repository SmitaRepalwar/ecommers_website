// src/pages/ProductsPage.jsx
import React, { useEffect, useState } from 'react';
import { useProducts } from '../hooks/ProductHook';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import { useSelector, useDispatch } from 'react-redux';
import { setProducts, setVisibleProducts, setSortOption, setFilters } from '../store/slices/productSlice';
import { filterProducts, sortProducts } from '../utils/productUtils';
import { FiFilter } from 'react-icons/fi'; // ✅ Add this import

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false); // ✅ Add toggle state

  const dispatch = useDispatch();
  const { data, isLoading, isError } = useProducts();

  const selectedCategoryOrBrand = useSelector((state) => state.products.selectedCategoryOrBrand);
  const { sortOption, filters, allProducts, visibleProducts } = useSelector((state) => state.products);

  useEffect(() => {
    if (allProducts.length > 0) {
      let filtered = filterProducts(allProducts, filters);

      if (selectedCategoryOrBrand !== "") {
        filtered = filtered.filter((product) =>
          product.brand?.toLowerCase() === selectedCategoryOrBrand.toLowerCase() ||
          product.category?.toLowerCase() === selectedCategoryOrBrand.toLowerCase()
        );
      }

      if (searchTerm.trim() !== "") {
        const term = searchTerm.toLowerCase();
        filtered = filtered.filter((product) =>
          product.name?.toLowerCase().includes(term) ||
          product.category?.toLowerCase().includes(term) ||
          product.brand?.toLowerCase().includes(term)
        );
      }

      const sorted = sortProducts(filtered, sortOption);
      dispatch(setVisibleProducts(sorted));
    }
  }, [allProducts, selectedCategoryOrBrand, filters, sortOption, searchTerm]);

  if (isLoading) return <p>Loading products...</p>;
  if (isError) return <p>Failed to load products.</p>;

  return (
    <>
      <Header />

      <div className="flex flex-wrap justify-between items-center mt-6 px-4">
        {/* Sort Dropdown */}
        <select
          className="border p-2 rounded-md"
          onChange={(e) => dispatch(setSortOption(e.target.value))}
        >
          <option value="relevance">Sort by: Relevance</option>
          <option value="priceLowToHigh">Price: Low to High</option>
          <option value="newest">Newest</option>
        </select>

        {/* Filter Toggle Button */}
        <button
          className="flex items-center gap-2 border p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
          onClick={() => setShowFilters(prev => !prev)}
        >
          <FiFilter className="text-xl" />
          <span>Filters</span>
        </button>
      </div>

      {/* Filter Inputs */}
      {showFilters && (
        <div className="flex flex-wrap gap-2 mt-4 px-4">
          <input
            type="text"
            placeholder="Category"
            onChange={(e) => dispatch(setFilters({ category: e.target.value }))}
            className="border px-2 py-1 rounded"
          />
          <input
            type="text"
            placeholder="Brand"
            onChange={(e) => dispatch(setFilters({ brand: e.target.value }))}
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Min Price"
            onChange={(e) =>
              dispatch(setFilters({ priceRange: [+e.target.value || 0, filters.priceRange[1]] }))
            }
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            placeholder="Max Price"
            onChange={(e) =>
              dispatch(setFilters({ priceRange: [filters.priceRange[0], +e.target.value || Infinity] }))
            }
            className="border px-2 py-1 rounded"
          />
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            placeholder="Min Rating"
            onChange={(e) => dispatch(setFilters({ rating: +e.target.value || 0 }))}
            className="border px-2 py-1 rounded"
          />
        </div>
      )}

      {/* Search */}
      <div className="hidden md:flex flex-1 mx-4 max-w-md m-8">
        <input
          type="text"
          placeholder="Search products by name/category/brand"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          className="bg-indigo-600 text-white px-4 rounded-r-md hover:bg-indigo-700 transition"
        >
          Search
        </button>
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {data && visibleProducts.map((product) => (
          <ProductCard product={product} key={product?.id} />
        ))}
      </div>
    </>
  );
}
