import Header from "../components/Header";
import ProductDetail from "../components/ProductDetails";
import { useProduct } from "../hooks/ProductHook"; // from previous setup
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams()  
  const { data, isLoading } = useProduct(productId);

  if (isLoading) return <p>Loading...</p>;

  return( 
  <>
  <Header/>
    <ProductDetail product={data} />;
  </>
)};

export default ProductDetails;
