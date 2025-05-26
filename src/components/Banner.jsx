import { useState, useEffect } from "react";

const images = [
  "https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_1215821-T2/images/G/31/img18/HomeImprovement/harsmisc/2025/BBSMay25/_Bath_shelves_3000X1200_2._CB792884748_.jpg",
  "https://m.media-amazon.com/images/I/61xJ9g-aoTL._SX3000_.png",
  "https://images-eu.ssl-images-amazon.com/images/W/MEDIAX_1215821-T2/images/G/31/img22/CEPC/Jupiter/61/MMF_Hero_PC-1._CB794633460_.jpg",
];

const Banner = () =>{
    const [current, setCurrent] = useState(0);
    
      useEffect(() => {
        const interval = setInterval(() => {
          setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
      }, []);
    
    return(
         <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-[500px] xl:h-[600px] rounded-xl overflow-hidden">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Slide ${index}`}
              className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-700 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
    )
}

export default Banner