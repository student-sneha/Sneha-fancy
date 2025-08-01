import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="w-full mt-2">
      <img
        src={assets.homepage}
        alt="Sneha Fancy Hero"
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default Hero;
