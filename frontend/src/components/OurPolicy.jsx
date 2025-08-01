import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex felx-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-500 mt-12">
      <div>
        <img src={assets.exchange_icon} className="w-12 m-auto mb-5" />
        <p className="font-semibold">Easy Exchange Policy</p>
        <p className="text-gray-400">We offer hassel free exchange policy</p>
      </div>{" "}
      <div>
        <img src={assets.quality_icon} className="w-12 m-auto mb-5" />
        <p className="font-semibold">7 days Return Policy </p>
        <p className="text-gray-400">We Provide 7 days free return Policy </p>
      </div>{" "}
      <div>
        <img src={assets.support_img} className="w-12 m-auto mb-5" />
        <p className="font-semibold">Best customer support</p>
        <p className="text-gray-400">We provide 24/7 cutomer support</p>
      </div>
    </div>
  );
};

export default OurPolicy;
