export function filterProducts(products, filters) {
  return products.filter(product => {
    const inCategory = filters.category ? product.category?.toLowerCase() === filters.category.toLowerCase() : true;
    const inBrand = filters.brand ? product.brand?.toLowerCase() === filters.brand.toLowerCase() : true;
    const inPriceRange = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const meetsRating = product.rating >= filters.rating;

    return inCategory && inBrand && inPriceRange && meetsRating;
  });
}

export function sortProducts(products, sortOption) {
  switch (sortOption) {
    case 'priceLowToHigh':
      return [...products].sort((a, b) => a.price - b.price);
    case 'newest':
      return [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // assumes `createdAt`
    default: // 'relevance'
      return products;
  }
}
