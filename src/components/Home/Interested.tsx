import { Button } from "../components";

const Interested: React.FC = () => {
  return (
    <div className="bg-[url('./f6353bb3cf61dd572ac7444cc85d50dd.jpg')] p-5  w-full md:h-80 bg-no-repeat bg-cover flex flex-col justify-center items-center gap-5 text-white rounded-lg  text-center glass
    ">
      <h1 className="text-3xl">
        Interested in working together?Let’s connect!
      </h1>
      <p className="md:w-1/2 ">
        I develop innovative solutions by identifying the problem that needs
        addressing and creating a meaningful experience that meets the needs of
        end-users, aligning it with the context in which the product will be
        used.
      </p>
      <div className="flex justify-between items-center md:gap-20 gap- ">
        <Button className="bg-[#590BAA] hover:bg-[#3e146b] p-2 md:text-xl"> Let's talk</Button>
        <Button className="hover:bg-[#0b0314] md:text-xl"> Learn more</Button>
      </div>
    </div>
  );
};

export default Interested;
