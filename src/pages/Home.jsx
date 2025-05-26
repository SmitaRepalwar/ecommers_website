import Header from "../components/Header";
import Banner from "../components/Banner";
import Categories from "../components/Categories";
import Brands from "../components/Brand";

export default function Home() {
  
  return (
    <>
      <Header />
      <div className="w-full max-w-screen-xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
         <Banner/>
         <Categories/>
         <Brands/>
      </div>
    </>
  );
}
