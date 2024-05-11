import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";

// Define the functional component
const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <HeroSection />
    </div>
  );
};

export default HomePage;
