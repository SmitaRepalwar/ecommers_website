import { useDispatch } from "react-redux";
import { setSelectedCategoryOrBrand } from "../store/slices/productSlice";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Furniture",
    image: "https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/3.webp",
  },
  {
    name: "Beauty",
    image: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/1.webp",
  },
  {
    name: "Fragrances",
    image: "https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/2.webp",
  },
  {
    name: "Groceries",
    image: "https://cdn.dummyjson.com/product-images/groceries/apple/1.webp",
  },
];

const Categories = () =>{
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onCategoryClick = (name) =>{
    dispatch(setSelectedCategoryOrBrand(name))
    navigate("/products")
  }

    return(
      <>
        <h2 className="text-2xl font-bold mb-6 text-left">Categories</h2>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={()=>{onCategoryClick(category.name)}}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 p-4 text-center cursor-pointer"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-40 object-contain mb-4"
              />
              <h3 className="text-lg font-semibold">{category.name}</h3>
            </div>
          ))}
        </div>
       </> 
    )
}

export default Categories