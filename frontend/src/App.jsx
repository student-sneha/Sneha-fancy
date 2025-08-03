import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import PlaceOrder from "./pages/PlaceOrder";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Verify from "./pages/Verify";


import Navbar from "./components/Navbar"
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ScrollToTop from "./components/SrcollToTop";


const App = () => {
  return (
    <div className="px-2 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
    <ToastContainer/>
     <Navbar />
     <SearchBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/placeOrder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:productId" element={<Product />} />
       <Route path="/verify" element={<Verify />}  />
      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
