import React, { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
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

  // ✅ Add to cart without size
  const addToCart = async (itemId, quantity = 1) => {
    if (!token) {
      toast.info("Please login first to add items to your cart");
      setTimeout(() => {
        navigate("/login", { state: { from: location.pathname } });
      }, 1500);
      return;
    }

    let cartData = { ...cartItems };
    cartData[itemId] = (cartData[itemId] || 0) + quantity;
    setCartItems(cartData);

    try {
      await axios.post(
        backendUrl + "/api/cart/add",
        { itemId, quantity },
        { headers: { token } }
      );
      toast.success("Item added to cart");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  // ✅ Get total items count
  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, qty) => total + qty, 0);
  };

  // ✅ Update quantity without size
  const updateQuantity = async (itemId, quantity) => {
    let cartData = { ...cartItems };

    if (quantity === 0) {
      delete cartData[itemId];
    } else {
      cartData[itemId] = quantity;
    }
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
    }
  };

  // ✅ Calculate total amount without size
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      let itemInfo = products.find((product) => product._id === itemId);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

  // ✅ Fetch products
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

  // ✅ Get user cart
  const getUserCart = async (token) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      getUserCart(savedToken);
    }

    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem("cartItems");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error loading cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever cartItems changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

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
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    setToken,
    token,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
