import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import CardTotal from "../components/CardTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        if (cartItems[productId] > 0) {
          tempData.push({
            _id: productId,
            quantity: cartItems[productId],
          });
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    toast.info("🚚 Shipping starts from 27 August (Ganesh Chaturthi)!");
  };

  return (
    <div className="border-t pt-14 px-4 sm:px-8">
      <div className="text-2xl mb-3">
        <Title text1="YOUR" text2="CART" />
      </div>

      {/* Permanent info banner */}
      <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6 rounded">
        🚚 Shipping starts from <strong>27 August</strong> (Ganesh Chaturthi).
        You can browse and add items to your cart now!
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
                    <p className="mt-2 text-sm">
                      {currency}
                      {productData.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-start sm:self-center">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    className="border w-16 px-2 py-1 rounded text-sm"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || value === "0") return;
                      updateQuantity(item._id, Number(value));
                    }}
                  />
                  <img
                    src={assets.bin_icon}
                    alt="delete"
                    className="w-5 cursor-pointer"
                    onClick={() => updateQuantity(item._id, 0)}
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
      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CardTotal />
            <div className="w-full text-end">
              <button
                onClick={handleCheckoutClick}
                className="text-sm my-8 px-6 py-3 rounded transition duration-300 bg-gray-400 text-white cursor-not-allowed"
              >
                Proceed to checkout
              </button>
              <p className="text-xs text-gray-500 mt-1">
                Checkout will be available from 27 August
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
