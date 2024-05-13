import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
interface servicesProps {
  titel:string,
  description:React.ReactNode,
  img:string
}
const Services: React.FC<servicesProps> = ({titel,description,img}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  return (
    <div className="flex  w-full justify-center items-center mt-20">
        <motion.div
          ref={ref}
          style={{
            scale: scleProgess,
            opacity: opacityProgess,
          }}
          className=" border rounded-lg p-4 relative shadow-2xl bg-[#590BAA]  w-auto items-center justify-center flex md:mx-5 "
        >

          <div className="bg-[#590BAA] border w-24 h-24 absolute -top-10 rounded-full flex items-center justify-center">
            <img src={img} alt={titel}className="w-20 h-20 self-center " />
          </div>
          <div>
            <h2 className="text-center font-semibold text-xl mt-12 mb-2">
              {titel}
            </h2>
            <p className="text-center text-sm">
              {description}
            </p>
          </div>
        </motion.div>
 
      </div>
    
  );
};

export default Services;
