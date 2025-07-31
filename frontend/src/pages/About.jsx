import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} />
        <div className="flex flex-col justify-center gap-6 md:w/2/4 text-gray-600">
          <p>
           Welcome to <strong>Trendylo</strong> — your one-stop destination for stylish clothing, chic accessories, elegant jewelry, trendy bags, and statement earrings. We're not just a brand, we're a vibe that celebrates self-expression and everyday confidence.
          </p>
          <p>
            Founded with a passion for fashion and creativity, Trendylo was built to make fashion feel personal, accessible, and fun. Whether you're dressing for a casual day out or a special occasion, we’ve got something that fits your style.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To empower individuals to express their unique style with confidence — through thoughtfully curated collections that combine modern trends with timeless charm. We believe that fashion should be for everyone, every day.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <Title text1={'WHY'} text2={"CHOOSE US"}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb:20">
        <div className="border px-10 md:px-16 py-8 sm-py-20 flex flex-col gap-5">
          <b>Customer First</b>
          <p className="text-gray-600">Customer First: Your satisfaction is our top priority.</p>
        </div>
         <div className="border px-10 md:px-16 py-8 sm-py-20 flex flex-col gap-5">
          <b>Sustainability</b>
          <p className="text-gray-600">We strive to reduce our environmental impact.</p>
        </div>
         <div className="border px-10 md:px-16 py-8 sm-py-20 flex flex-col gap-5">
          <b>Authenticity</b>
          <p className="text-gray-600">We believe in real style for real people.</p>
        </div>
      </div>
      <NewsLetter />
    </div>
  );
};

export default About;
