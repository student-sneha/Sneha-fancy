import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller ] = useState([]);

  useEffect(() => {
    const bestProduct = products.filter((item) =>  item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  return (
   <div className="my-16">
  <div className="text-center text-2xl py-6">
    <Title text1="BEST" text2="SELLER" />
    <p className="text-gray-600 text-sm md:text-base w-[90%] sm:w-3/4 mx-auto mt-2">
      Loved by our customers – explore top-rated picks that fly off the shelves!
    </p>
  </div>
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 px-4">
    {bestSeller.map((item, idx) => (
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

export default BestSeller;
