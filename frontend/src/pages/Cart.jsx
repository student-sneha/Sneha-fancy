import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CardTotal from "../components/CardTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuanity, navigate } =
  useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-8">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>

      <div className="space-y-6">
        {cartData.map((item, idx) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          return (
            <div
              key={idx}
              className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            >
              {/* Product Info */}
              <div className="flex gap-4 sm:gap-6">
                <img
                  src={productData.image[0]}
                  className="w-20 h-20 object-cover rounded"
                  alt={productData.name}
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-sm">
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 py-1 border bg-slate-100 rounded text-sm">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity & Delete */}
              <div className="flex items-center gap-4 self-start sm:self-center">
                <input
                  onChange={(e) =>
                    e.target.value === "" || e.target.value === "0"
                      ? null
                      : updateQuanity(
                          item._id,
                          item.size,
                          Number(e.target.value)
                        )
                  }
                  className="border w-16 px-2 py-1 rounded text-sm"
                  type="number"
                  min={1}
                  defaultValue={item.quantity}
                />
                <img
                  onClick={() => updateQuanity(item._id, item.size, 0)}
                  src={assets.bin_icon}
                  className="w-5 cursor-pointer"
                  alt="delete"
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Section */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CardTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("./PlaceOrder")}
              className="bg-black text-white text-sm my-8 px-6 py-3 rounded hover:bg-gray-800 transition duration-300"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
