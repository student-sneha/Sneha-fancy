import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // ref for dropdown element

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showDropdown && 
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="flex items-center justify-between font-medium relative z-50">
      <Link to={`/`}>
        <img
          src={assets.sneha}
          className="h-25 sm:h-33 object-contain"
          alt="Sneha Logo"
        />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-grey-700">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>

        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => {setShowSearch(true); navigate("/collection")}}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="Search Icon"
        />
        <div className="relative group">
          <img
            onClick={() => {
              if (!token) {
                navigate("/login");
              } else {
                setShowDropdown((prev) => !prev);
              }
            }}
            src={assets.profile_icon}
            alt="Profile Icon"
            className="w-5 cursor-pointer"
          />
          {/* Dropdown Menu */}
          {token && (
            <div
              ref={dropdownRef}
              className={`${
                showDropdown ? "block" : "hidden"
              } group-hover:block absolute right-0 pt-4 z-50`}
            >
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow-md">
                <p
                  onClick={() => {
                    setShowDropdown(false);
                    navigate("/orders");
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/orders");
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Orders
                </p>
                <p
                  onClick={() => {
                    logout();
                    setShowDropdown(false);
                  }}
                  className="cursor-pointer hover:text-black"
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart Icon" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt="Menu Icon"
        />
      </div>

      {/* Sidebar menu for small screen */}
      <div
        className={`fixed top-0 right-0 h-full bg-white z-[999] overflow-hidden transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_icon} className="h-4 rotate-180" alt="Back Icon" />
            <p>Back</p>
          </div>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            className="py-2 pl-6 border"
            onClick={() => setVisible(false)}
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
