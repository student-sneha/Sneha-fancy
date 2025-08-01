import React from "react";

const NewsLetter = () => {
  const whatsappLink = " https://chat.whatsapp.com/CLpS2ebzI7X8S9islfV0Nm?mode=ac_t"; 

  return (
    <div className="bg-gradient-to-br from-pink-50 to-white text-black py-16 px-4 mt-20 rounded-3xl shadow-lg border border-pink-200">
      <h2 className="text-3xl sm:text-4xl font-bold text-center tracking-wide text-pink-600">
        Join the SnehaFancy Circle 💖
      </h2>
      <p className="text-gray-600 text-center mt-3 text-sm sm:text-base">
        Be the first to know about new trends, beauty tips & exclusive drops – all in our WhatsApp Community!
      </p>

      <div className="mt-8 w-full sm:w-2/3 md:w-1/2 mx-auto flex justify-center">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition-all duration-300 flex items-center gap-2"
        >
          <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-5 h-5" />
          Join on WhatsApp
        </a>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Open to all beauty & fashion lovers. Let’s glow together 💅
      </p>
    </div>
  );
};

export default NewsLetter;
