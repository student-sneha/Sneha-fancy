import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom"; // make sure both are imported
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  
const navigate = useNavigate();
const location = useLocation();

 const addToCart = async (itemId, size, quantity = 1) => {
  if (!token) {
    toast.info("Please login first to add items to your cart");
    setTimeout(() => {
      navigate("/login", { state: { from: location.pathname } });
    }, 1500);
    return;
  }

  if (!size) {
    toast.error("Please select a product size");
    return;
  }

  // Clone and update cart
  let cartData = structuredClone(cartItems);
  if (cartData[itemId]) {
    cartData[itemId][size] = (cartData[itemId][size] || 0) + quantity;
  } else {
    cartData[itemId] = { [size]: quantity };
  }

  setCartItems(cartData);

  try {
    await axios.post(
      backendUrl + "/api/cart/add",
      { itemId, size, quantity },
      { headers: { token } }
    );
    toast.success("Item added to cart");
  } catch (error) {
    console.log(error);
    toast.error("Failed to add item. Please try again.");
  }
};

  const getCartCount = () => {
    let totalCount = 0;

    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalCount;
  };

  const updateQuanity = async (itemId, size, quantity) => {
    let cardData = structuredClone(cartItems);

    cardData[itemId][size] = quantity;

    setCartItems(cardData);
    if(token){
      try {
        await axios.post(backendUrl + "/api/cart/update", {itemId,size,quantity} , {headers:{token}});

      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (token) => {
    try {
      const response = await axios.post(backendUrl + "/api/cart/get",{}, {headers:{token}});
      if(response.data.success){
        setCartItems(response.data.cartData);
      }
    } catch (error) {
         console.log(error);
         toast.error(error.message);
    }
  }

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    if(!token && localStorage.getItem("token")){
      setToken(localStorage.getItem("token"))
      getUserCart(localStorage.getItem("token"))
    }
  },[])

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuanity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,token
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
