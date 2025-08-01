import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";
import { FaHeart, FaLeaf, FaUserCheck, FaStar, FaGem, FaMagic } from "react-icons/fa";

const About = () => {
  return (
<div className="bg-[#f0f9fa] text-gray-800 px-6 md:px-16 font-[Poppins]">
  {/* About Header */}
  <div className="text-2xl text-center pt-10 border-t border-gray-200">
    <Title text1={"ABOUT"} text2={"US"} />
  </div>

  <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
    <img
      className="w-full md:max-w-[500px] rounded-xl shadow-lg border border-[#d1f2f7]"
      src={assets.about}
      alt="Sneha Fancy About"
    />
    <div className="flex flex-col justify-center gap-6 md:w-1/2 text-gray-700">
      <p className="leading-relaxed text-lg">
        Welcome to <span className="text-[#f06292] font-semibold">Sneha Fancy</span> — your colorful beauty destination 💄✨.
        Explore makeup, skincare, accessories, and elegance — all crafted to highlight your charm.
      </p>
      <p className="leading-relaxed text-lg">
        With a bold mix of creativity and glam, we empower every woman to feel beautiful inside and out. Our curated
        collections are all about fun, freedom, and fierce femininity.
      </p>
      <div className="bg-white p-4 rounded-xl shadow-md border border-[#ffe0f0]">
        <h3 className="text-xl font-bold text-[#f06292] flex items-center gap-2">
          <FaStar /> Our Mission
        </h3>
        <p className="leading-relaxed mt-2 text-gray-700">
          To make beauty joyful, expressive, and accessible — because feeling fabulous should be for everyone, every day.
        </p>
      </div>
    </div>
  </div>

  {/* Divider */}
  <div className="h-[2px] bg-gradient-to-r from-[#fce4ec] via-[#e1f5fe] to-[#fce4ec] my-12 rounded-full"></div>

  {/* Why Choose Us */}
  <div className="text-2xl text-center py-4">
    <Title text1={"WHY"} text2={"CHOOSE US"} />
  </div>

  <div className="grid md:grid-cols-3 gap-10 mb-20 text-center">
    <div className="border p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition bg-white">
      <FaUserCheck className="mx-auto text-[#f06292] text-4xl mb-4 animate-pulse" />
      <h4 className="font-bold text-lg text-black mb-2">Glow First</h4>
      <p className="text-gray-600">We put your beauty journey above all 💖.</p>
    </div>

    <div className="border p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition bg-white">
      <FaLeaf className="mx-auto text-green-500 text-4xl mb-4 animate-bounce" />
      <h4 className="font-bold text-lg text-black mb-2">Eco Friendly</h4>
      <p className="text-gray-600">Pretty meets planet-friendly packaging 🌱.</p>
    </div>

    <div className="border p-8 rounded-xl shadow-md hover:shadow-xl hover:scale-105 transition bg-white">
      <FaHeart className="mx-auto text-red-400 text-4xl mb-4 animate-pulse" />
      <h4 className="font-bold text-lg text-black mb-2">Real Beauty</h4>
      <p className="text-gray-600">Confidence, color & care — made just for you 💅.</p>
    </div>
  </div>

  {/* Newsletter */}
  <NewsLetter />
</div>
  );
};

export default About;
