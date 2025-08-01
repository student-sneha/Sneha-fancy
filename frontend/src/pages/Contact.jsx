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

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-20 px-4 md:px-10">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px] shadow-xl rounded-lg object-cover"
          alt="Contact Sneha Fancy"
        />

        <div className="flex flex-col justify-center items-start gap-6 max-w-lg">
          <p className="font-semibold text-2xl text-black tracking-wide">
            📍 Our Store
          </p>
          <p className="text-gray-600 text-[17px] leading-relaxed">
            Naya Katla | Hajari Lalji Ka Katla <br /> Gangori Market <br />{" "}
            Lalsot | Dausa
          </p>

          <p className="text-gray-600 text-[17px] leading-relaxed">
            📞 Tel: 9414622174 <br /> ✉️ Email: snehafancy75@gmail.com
          </p>

          <p className="text-black font-semibold text-2xl tracking-wide">
            💼 Want a Website Like This?
          </p>
          <p className="text-gray-600 text-[17px]">
            This site is designed & developed by <b>Sneha</b>. If you'd like a stunning
            website for your fashion, beauty, or small business — feel free to
            reach out!
          </p>

          <a href="mailto:snehakhandelwal373@gmail.com">
            <button className="relative inline-block px-8 py-3 font-semibold text-black border border-black group hover:text-white hover:bg-black transition-all duration-300">
              <span className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-pink-500 to-red-400 opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm z-[-1]" />
              Contact Sneha ✨
            </button>
          </a>
        </div>
      </div>

      <NewsLetter />
    </div>
  );
};

export default Contact;
