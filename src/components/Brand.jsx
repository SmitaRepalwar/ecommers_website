import { useDispatch } from "react-redux";
import { setSelectedCategoryOrBrand } from "../store/slices/productSlice";
import { useNavigate } from "react-router-dom";

 const brands = [
    {
      name: "Velvet Touch",
      images: [
        "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/1.webp",
        "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp",
        "https://cdn.dummyjson.com/product-images/beauty/powder-canister/1.webp",
      ],
    },
    {
      name: "Gucci",
      images: [
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/1.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/2.webp",
        "https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/3.webp",
      ],
    },
    {
      name: "Knoll",
      images: [
        "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/1.webp",
        "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/2.webp",
        "https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/3.webp",
      ],
    },
  ];


export default function Brands() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onBrandClick = (name) =>{
    dispatch(setSelectedCategoryOrBrand(name))
    navigate("/products")
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-left">Top Brands</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {brands.map((brand, index) => (
          <div
            key={index}
            onClick={()=>{onBrandClick(brand.name)}}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-semibold mb-4 text-left">
              {brand.name}
            </h3>
            <div className="flex justify-center gap-2">
              {brand.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${brand.name} ${i}`}
                  className="w-1/3 h-24 object-contain rounded"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
