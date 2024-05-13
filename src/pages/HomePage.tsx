import React from "react";
import HeroSection from "../components/Home/HeroSection";
import { serviceHomeContant } from "../components/utils/HomeContant";
import {
  AboutSection,
  FeaturedProjects,
  Interested,
  Services,
} from "../components/components";

// Define the functional component
const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection />
      <div className="mx-10">
        {/* SERVICES */}
        <div className="flex justify-center items-center flex-col text-white mt-16">
          <h1 className="text-center font-semibold text-4xl letter-space">
            SERVICES
          </h1>
          <div className=" md:flex lg:flex flex-none justify-center  items-center p-5">
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
        {/* featureProject */}
        <div className="featureProject">
          <FeaturedProjects />
        </div>
        {/* AboutSecation */}
        <div className="AboutSecation">
          <AboutSection />
        </div>
         {/*Interested */}
        <div className="Interested p-10">
          <Interested/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
