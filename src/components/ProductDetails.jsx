import React, { useEffect, useId } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/slices/cartSlice"; // adjust path as needed
import { addToWishlist, removeFromWishlist } from "../store/slices/wishlistSlice";
import { v4 as uuidv4 } from 'uuid';


const ProductDetail = ({ product }) => {

  const isWishlisted = useSelector((state) =>
      state.wishlist.items.some((item) => item.id === product.id)
    );
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  // let isWishlisted

  // useEffect(()=>{
  //    if(wishlistItems){
  //      isWishlisted = wishlistItems?.some((item) => item.id === product?.id);
  //    }
  // }, [wishlistItems])

  if (!product) return <p>No product data.</p>;

  const {
    title,
    brand,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    availabilityStatus,
    weight,
    dimensions,
    tags,
    reviews,
    warrantyInformation,
    shippingInformation,
    returnPolicy,
    minimumOrderQuantity,
    meta,
    images,
    thumbnail,
  } = product;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left: Product Images */}
      <div>
         <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">Brand: {brand}</p>
        <p className="text-lg font-semibold text-green-600">${price.toFixed(2)} <span className="line-through text-red-400 ml-2">${(price / (1 - discountPercentage / 100)).toFixed(2)}</span></p>
        <p className="text-yellow-600">Rating: {rating} ⭐</p>
          <div className="relative"> 
           <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={10}
              slidesPerView={1}
              className="w-full h-96"
            >
            {images.slice(0, 3).map((img, index) => (
            <SwiperSlide key={index}>
              <img src={img} alt={`Slide ${index + 1}`} className="w-full h-96 object-contain rounded shadow" />
              </SwiperSlide>
              ))}
           </Swiper>
           <button
              onClick={() =>
                dispatch(
                  isWishlisted
                    ? removeFromWishlist(product.id)
                    : addToWishlist(product)
                )
              }
              className="absolute top-4 right-4 text-red-500 text-2xl z-10"
              title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            >
              {isWishlisted ? <AiFillHeart /> : <AiOutlineHeart />}
            </button>
          </div> 
        <div className="flex gap-2 mt-4 overflow-x-auto">
            {images.map((img, index) => (
                <img
                key={index}
                src={img}
                alt={`Preview ${index + 1}`}
                className="w-20 h-20 object-cover border rounded shrink-0"
                />
            ))}
            </div>

             {/* Variant selectors */}
              {product.variants?.colors?.length > 0 && (
                <div className="mt-4">
                  <label className="block text-sm font-medium">Color:</label>
                  <select className="border p-1 rounded w-full">
                    {product.variants.colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {product.variants?.sizes?.length > 0 && (
                <div className="mt-2">
                  <label className="block text-sm font-medium">Size:</label>
                  <select className="border p-1 rounded w-full">
                    {product.variants.sizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>
              )}


             <div className="flex items-center gap-4 mt-4">
            <label className="text-sm font-medium">Quantity:</label>
           <select
                className="border p-1 rounded"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              >
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            <button onClick={() => dispatch(addToCart({product, quantity, id: uuidv4()}))} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
            </button>
        </div>

       {product?.similarProducts && <div className="mt-10">
          <h3 className="text-lg font-bold mb-4">Similar Products</h3>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={16}
            slidesPerView={3}
            className="w-full"
          >
            {product.similarProducts?.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="border rounded p-3 shadow hover:shadow-md transition duration-300">
                  <img src={item.thumbnail} alt={item.title} className="h-40 w-full object-contain mb-2" />
                  <p className="font-semibold text-sm">{item.title}</p>
                  <p className="text-sm text-green-600">${item.price.toFixed(2)}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>}
      </div>

      {/* Right: Details */}
      <div className="space-y-4  text-left">
        <div>
          <p className="text-gray-700">{description}</p>
        </div>
        <p className="text-sm">Status: <span className="font-medium">{availabilityStatus}</span></p>
        <p className="text-sm">Stock: {stock}</p>
        <p className="text-sm">Weight: {weight}g</p>
        <p className="text-sm">
          Dimensions: {dimensions.width} × {dimensions.height} × {dimensions.depth} cm
        </p>
        <p className="text-sm">Min. Order Quantity: {minimumOrderQuantity}</p>
        <p className="text-sm text-gray-600">Tags: {tags.join(', ')}</p>

        <div className="mt-4">
          <h3 className="font-semibold">Warranty</h3>
          <p className="text-sm">{warrantyInformation}</p>
        </div>

        <div>
          <h3 className="font-semibold">Shipping</h3>
          <p className="text-sm">{shippingInformation}</p>
        </div>

        <div>
          <h3 className="font-semibold">Return Policy</h3>
          <p className="text-sm">{returnPolicy}</p>
        </div>

        <div>
          <h3 className="font-semibold mt-6">QR Code</h3>
          <img src={meta.qrCode} alt="QR Code" className="w-24 h-24" />
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Reviews</h3>
          <ul className="space-y-2">
            {reviews.map((review, idx) => (
              <li key={idx} className="border rounded p-3">
                <p className="font-semibold">{review.reviewerName}</p>
                <p className="text-yellow-600">Rating: {review.rating} ⭐</p>
                <p className="text-sm text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
       </div>
        <Accordion title="Warranty Information">{warrantyInformation}</Accordion>
        <Accordion title="Shipping Information">{shippingInformation}</Accordion>
        <Accordion title="Return Policy">{returnPolicy}</Accordion>
      </div>
    </div>
  );
};


const Accordion = ({ title, children }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border rounded mb-2">
      <button
        className="w-full text-left px-4 py-2 bg-gray-100 font-medium"
        onClick={() => setOpen(!open)}
      >
        {title}
      </button>
      {open && <div className="px-4 py-2 text-sm">{children}</div>}
    </div>
  );
};

export default ProductDetail;
