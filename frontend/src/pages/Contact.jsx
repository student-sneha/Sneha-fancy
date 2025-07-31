import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsLetter from "../components/NewsLetter";

const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20 ">
        <img src={assets.contact_img} className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6 ">
          <p className="font-semibold text-xl">Our Store</p>
          <p className="text-gray-500">
            180 ojha ji bhag <br /> Shiv Colony
          </p>
          <p className="text-gray-500">
            Tel: (91+) 734-3434 <br /> Email: admin@gmail.com
          </p>
          <p className="text-gray-500 font-semibold text-xl">
            Careers at Forever
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
<button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration">Explore Jobs</button>
          <p></p>
        </div>
      </div>
      <NewsLetter/>
    </div>
  );
};

export default Contact;
