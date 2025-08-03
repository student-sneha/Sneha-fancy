import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import WhyChooseUs from "../components/WhyChooseUs";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <WhyChooseUs />
      <OurPolicy />
      <NewsLetter />
    </div>
  );
};

export default Home;
