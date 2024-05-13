import React from "react";
import FeaturedProjectCard from "../CommanComponents/FeaturedProjectCard";
import { FeaturedProjectContant } from "../utils/HomeContant";

const FeaturedProjects: React.FC = () => {
  return (
    <div className="flex md:block justify-center items-center flex-col p-10">
      <h1 className="text-left text-white font-semibold text-4xl   ">
        Featured Projects
      </h1>
      <h2 className="my-2 line-clamp-2 tracking-wide">
        Here are some of the selected projects that showcase my passion for
        <br />
        front-end development.
      </h2>
      <div>
        {FeaturedProjectContant.map((item: any, index) => (
          <div key={index}>
            <FeaturedProjectCard
              title={item.titel}
              description={item.description}
              role={item.role}
              img={item.img}
              year={item.year}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProjects;
