import React from "react";

const WhyChooseUs = () => {
  const benefits = [
    {
      title: "All Things Beautiful",
      description:
        "From bangles to bags, makeup to mangalsutra – Sneha Fancy is your one-stop fashion destination.",
      icon: "💄",
    },
    {
      title: "Trendy & Handpicked",
      description:
        "Each item is selected with love, style, and tradition in mind – only the best for our girls and women.",
      icon: "✨",
    },
    {
      title: "Affordable Luxury",
      description:
        "Look gorgeous without spending a fortune – beauty is for everyone.",
      icon: "💰",
    },
    {
      title: "Personal In-Store Experience",
      description:
        "Step into our store for a warm, personalized shopping vibe you’ll never forget.",
      icon: "🛍️",
    },
  ];

  return (
    <div className="bg-pink-50 py-12 px-6 sm:px-12 lg:px-24 text-center">
      <h2 className="text-3xl font-bold mb-8 text-pink-700">Why Sneha Fancy?</h2>
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
        {benefits.map((item, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseUs;
