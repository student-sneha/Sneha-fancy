import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import CardTotal from "../components/CardTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuanity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  // Prepare cart data from cartItems
  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];

      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }

      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14 px-4 sm:px-8">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Cart items */}
      {cartData.length > 0 ? (
        <div className="space-y-6">
          {cartData.map((item, idx) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null;

            return (
              <div
                key={idx}
                className="py-4 border-t border-b text-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                {/* Product info */}
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

                {/* Quantity and delete */}
                <div className="flex items-center gap-4 self-start sm:self-center">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border w-16 px-2 py-1 rounded text-sm"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || value === "0") return;
                      updateQuanity(item._id, item.size, Number(value));
                    }}
                  />
                  <img
                    src={assets.bin_icon}
                    alt="delete"
                    className="w-5 cursor-pointer"
                    onClick={() => updateQuanity(item._id, item.size, 0)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
       <div className="text-center text-gray-500 py-10 text-lg">
  <p className="mb-4">You have no orders yet.</p>
  <Link to="/collection" className="shop-now-btn">
    Shop Now
  </Link>
</div>
      )}

      {/* Total and Checkout */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CardTotal />
          <div className="w-full text-end">
            <button
              disabled={cartData.length === 0}
              onClick={() => navigate("./PlaceOrder")}
              className={`text-sm my-8 px-6 py-3 rounded transition duration-300 ${
                cartData.length === 0
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
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
