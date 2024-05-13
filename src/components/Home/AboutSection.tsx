import { Button } from "../components";

function AboutSection() {
  return (
    <div className="md:flex md:flex-row gap-5 flex-col w-full p-5  justify-between  items-center">
      <div className="md:w-1/2 flex flex-col gap-5 mt-5 p-5">
        <h1 className="text-left text-white font-semibold text-2xl ">
          ABOUT ME
        </h1>
        <h2 className="text-xl">
          Crafting the Digital World: My Path as a Software Developer
        </h2>
        <p className="text-sm pr-5">
          My passion for development goes beyond the act of writing code; it's
          about solving problems, bringing ideas to life, and continuously
          pushing the boundaries of what's possible. With every application I
          develop, every system I enhance, and every challenge I overcome, I am
          driven by the desire to make an impact, to simplify lives, and to open
          doors to new possibilities.
        </p>
        <Button className="bg-[#590BAA] hover:bg-[#3e146b] ">Learn More</Button>
      </div>
      <div className="md:w-1/2 ">
        <img
          className="rounded-xl md:w-[760px] md:h-[300px]"
          src="./heroBg3.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default AboutSection;
