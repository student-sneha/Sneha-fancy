import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="relative w-full h-[100vh] overflow-hidden">
      {/* Background Image */}
      <img
        src={assets.hero2}
        alt="Hero"
        className="w-full h-full object-cover"
      />

      {/* Dark overlay for better contrast */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-16 z-10">
        <div className="text-white max-w-2xl text-center sm:text-left">
          <p className="text-sm sm:text-base tracking-widest uppercase text-white mb-4">
            <span className="inline-block w-10 h-[2px] bg-white align-middle mr-2"></span>
            Our Bestseller
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-snug mb-6 drop-shadow-md">
            Discover the <span className="text-pink-400">Latest Arrivals</span>
          </h1>

          <p className="text-sm sm:text-lg text-white mb-8">
            Fashion-forward pieces curated just for you. Shop new drops and timeless styles all in one place.
          </p>

          <button className="bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
