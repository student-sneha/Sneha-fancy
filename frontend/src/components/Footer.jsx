import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaLinkedinIn, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const companyLinks = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/about" },
    { name: "Collection", link: "/collection" },
    { name: "Contact", link: "/contact" },
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white text-black mt-40 px-6 sm:px-16 shadow-inner">
      <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 py-12 border-b border-gray-200">
        {/* Logo & About */}
        <div>
          <img
            src={assets.sneha}
            alt="Sneha Fancy Logo"
            className="w-36 mb-4"
          />
          <p className="text-gray-600 text-sm w-full md:w-2/3 leading-relaxed">
            Discover elegance and trend with Sneha Fancy – your one-stop shop
            for fashion & cosmetics.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-6 text-gray-700">
            <a
              href="https://linkedin.com/in/snehagupta12"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-700 transition-transform duration-300 hover:scale-110"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn size={18} />
            </a>
            <a
              href="https://instagram.com/snehagupta14a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition-transform duration-300 hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://youtube.com/@snehagupta14a"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition-transform duration-300 hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube size={20} />
            </a>
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            {companyLinks.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.link}
                  className="hover:text-black transition-colors duration-200 relative group"
                >
                  {item.name}
                  <span className="absolute left-0 -bottom-0.5 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get In Touch</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>
              <a
                href="tel:9414622174"
                className="hover:text-black transition-colors duration-200"
              >
                📞 9414622174
              </a>
            </li>
            <li>
              <a
                href="mailto:snehafancy75@gmail.com"
                className="hover:text-black transition-colors duration-200"
              >
                📩 snehafancy75@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-gray-500 text-sm py-4">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-black">Sneha Fancy</span>. All
          Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
