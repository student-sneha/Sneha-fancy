import React from "react";
import { assets } from "../assets/assets";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-black mt-40 px-6 sm:px-16">
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 py-12 border-b">
        {/* Logo & About */}
        <div>
          <img src={assets.sneha} alt="Sneha Fancy Logo" className="w-36 mb-4" />
          <p className="text-gray-600 text-sm w-full md:w-2/3">
            Discover elegance and trend with Sneha Fancy – your one-stop shop for fashion & cosmetics.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6 text-gray-700">
            <a href="#" className="hover:text-black transition-colors duration-200"><FaFacebookF /></a>
            <a href="#" className="hover:text-black transition-colors duration-200"><FaInstagram /></a>
            <a href="#" className="hover:text-black transition-colors duration-200"><FaYoutube /></a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-black cursor-pointer">Home</li>
            <li className="hover:text-black cursor-pointer">About Us</li>
            <li className="hover:text-black cursor-pointer">Delivery</li>
            <li className="hover:text-black cursor-pointer">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>📞 9414622174</li>
            <li>📩 snehafancy75@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm py-4">
        <p>© 2025 SnehaFancy. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
