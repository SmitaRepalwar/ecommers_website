import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

  const navigate = useNavigate()

  const {
    title,
    description,
    brand,
    category,
    price,
    discountPercentage,
    rating,
    stock,
    images,
    thumbnail,
    availabilityStatus,
    reviews,
    meta,
  } = product;

  const averageRating = rating.toFixed(1);
  const reviewCount = reviews.length;

  return (
    <div  onClick={()=>{navigate(`/products/${product?.id}`)}} className="max-w-md mx-auto bg-white shadow-lg rounded-xl overflow-hidden md:max-w-2xl my-4">
      <div className="md:flex">
        <div className="md:shrink-0">
          <img
            className="h-48 w-full object-cover md:h-full md:w-48"
            src={thumbnail}
            alt={title}
          />
        </div>
        <div className="p-6 flex flex-col justify-between">
          <div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{title}</h2>
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {discountPercentage}% OFF
              </span>
            </div>

            <div className="mt-3 flex-wrap gap-2 text-xs text-gray-500">
              <span>Brand: {brand}</span>
            </div>

            <div className="mt-4 items-center space-x-2">
              <span className="text-lg text-center font-bold text-gray-900">${price}</span>
              <div className="flex items-center justify-center text-yellow-500 text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.round(rating) ? "fill-current" : "text-gray-300"}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.951a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.95c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.37 2.447c-.784.57-1.838-.196-1.539-1.118l1.287-3.95a1 1 0 00-.364-1.118L2.645 9.378c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.951z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-600">({reviewCount} reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
