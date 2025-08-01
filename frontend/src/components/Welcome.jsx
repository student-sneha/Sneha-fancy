// WelcomePopup.jsx
import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const WelcomePopup = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    if (showPopup) {
      confetti({
        particleCount: 1000,
        spread: 100,
        origin:{y:0.7}
      });

      setTimeout(() => {
        setShowPopup(false);
      }, 3000); 
    }
  }, [showPopup]);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-100 ">
      <div className="p-6 rounded-lg shadow-lg text-center animate-bounce w-4/5 sm:w-1/3">
        <h2 className="text-white text-xl sm:text-3xl font-bold mb-2 welcome">🎉 Welcome to SnehaFancy! 🎉</h2>
      </div>
    </div>
  );
};

export default WelcomePopup;
