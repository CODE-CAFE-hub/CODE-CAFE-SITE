import React from "react";

const Loader: React.FC = () => {
  return (
    <>
      <div className="flex h-screen w-screen justify-center items-center ">
        <img src="./codelogo.png" alt="" className="w-20 h-20" /> 
        <h1 className="text-2xl font-bold text-center ">Code Cafe</h1>
      </div>
    </>
  );
};

export default Loader;
