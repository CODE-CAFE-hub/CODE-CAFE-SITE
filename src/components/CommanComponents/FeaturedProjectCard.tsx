import React from "react";
interface IFeatured {
  img: string;
  title: string;
  description: string;
  year: number;
  role: string;
}

const FeaturedProjectCard: React.FC<IFeatured> = ({
  img,
  title,
  description,
  year,
  role,
}) => {
  return (
    <div className="md:flex md:flex-row gap-5 flex-col w-full mt-14  justify-between  items-center">
      <div className="md:w-1/2">
        <img
          className="rounded-xl md:w-[600px] md:h-[300px]"
          src={img}
          alt={title}
        />
      </div>

      <div className="md:w-1/2 flex flex-col mt-5">
        <h1 className="text-left text-white font-semibold text-xl ">
          {title}
        </h1>
        <p className="text-sm">
        { description}
        </p>
        <div>
          <h3 className="text-sm font-semibold mt-5">PROJECT INFO</h3>
          <hr className="my-5" />
          <span className="flex justify-between text-sm">
            <h6 className=" ">Year</h6>
            <h6 className="mr-10 ">{year}</h6>
          </span>
          <hr className="my-5" />
          <span className="flex justify-between text-sm">
            <h6 className=" ">Role</h6>
            <h6 className="mr-10 ">{role}</h6>
          </span>
          <hr className="my-5" />
        </div>
      </div>
    </div>
  );
};

export default FeaturedProjectCard;
