import { Button } from "../components";

const Interested: React.FC = () => {
  return (
    <div className="bg-[url('./f6353bb3cf61dd572ac7444cc85d50dd.jpg')]  w-full h-80 bg-no-repeat bg-cover flex flex-col justify-center items-center gap-5 text-white rounded-lg  
    ">
      <h1 className="text-3xl">
        Interested in working together?Let’s connect!
      </h1>
      <p className="w-1/2 text-center">
        I develop innovative solutions by identifying the problem that needs
        addressing and creating a meaningful experience that meets the needs of
        end-users, aligning it with the context in which the product will be
        used.
      </p>
      <div className="flex justify-between items-center gap-20 ">
        <Button className="bg-[#590BAA] hover:bg-[#3e146b] text-xl"> Let's talk</Button>
        <Button className="hover:bg-[#0b0314] text-xl"> Learn more</Button>
      </div>
    </div>
  );
};

export default Interested;
