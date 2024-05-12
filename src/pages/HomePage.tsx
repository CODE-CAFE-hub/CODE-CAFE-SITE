import React from "react";
import HeroSection from "../components/HeroSection";
import Services from "../components/Serviecs";
import { serviceHomeContant } from "../components/utils/serviceHomeContant";

// Define the functional component
const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <div className="flex justify-center items-center flex-col text-white mt-16">
        <h1 className="text-center font-semibold text-4xl letter-space">
          SERVICES
        </h1>
        <div className=" md:flex lg:flex flex-none justify-center items-center p-5">
          {serviceHomeContant.map((item: any, index: number) => (
            <div key={index}>
              <Services
                titel={item.titel}
                description={item.description}
                img={item.img}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
