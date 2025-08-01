import React, { useState, useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
   <div className="my-16">
  <div className="text-center py-6 text-2xl">
    <Title text1="LATEST" text2="COLLECTIONS" />
    <p className="text-gray-600 text-sm md:text-base w-[90%] sm:w-3/4 mx-auto mt-2">
      Discover the freshest trends handpicked just for you — from glossy lips to glowing skin.
    </p>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 px-4">
    {latestProducts.map((item, idx) => (
      <ProductItem
        key={idx}
        id={item._id}
        image={item.image}
        name={item.name}
        price={item.price}
      />
    ))}
  </div>
</div>

  );
};

export default LatestCollection;
