import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Services: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });
  const scleProgess = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgess = useTransform(scrollYProgress, [0, 1], [0.6, 1]);
  return (
    <div className="flex justify-center items-center flex-col text-white mt-16">
      <h1 className="text-center font-semibold text-4xl letter-space">
        SERVICES
      </h1>
      <div className="flex gap-20 justify-center items-center mt-20">
        <motion.div
          ref={ref}
          style={{
            scale: scleProgess,
            opacity: opacityProgess,
          }}
          className="w-[20%] border rounded-lg p-4 relative shadow-2xl bg-[#590BAA]"
        >
          <div className="bg-[#590BAA] border w-24 h-24 absolute -top-10 rounded-full flex text-center items-center justify-center left-[38%]">
            <img src="./web-dev-logo.svg" alt="" className="w-20 h-20" />
          </div>
          <div>
            <h2 className="text-center font-semibold text-xl mt-12 mb-2">
              Web Developement
            </h2>
            <p className="text-center text-sm">
              Absolutely, here are three separate messages, each focusing on one
              aspect of your organization's services: 1. **Web Development:**
              "Explore endless possibilities with our web development expertise
              at [Your Organization]. We specialize in crafting responsive,
              dynamic, and feature-rich websites tailored to your unique
              requirements. From sleek corporate sites to robust e-commerce
              platforms, we ensure that your online presence stands out and
              engages your audience
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          style={{
            scale: scleProgess,
            opacity: opacityProgess,
          }}
          className="w-[20%] border rounded-lg p-4 relative shadow-2xl bg-[#590BAA]"
        >
          <div className="bg-[#590BAA] border w-24 h-24 absolute -top-10 rounded-full flex text-center items-center justify-center left-[38%]">
            <img src="./app-dev-logo.png" alt="" className="w-20 h-20" />
          </div>
          <div>
            <h2 className="text-center font-semibold text-xl mt-12 mb-2">
              App Developement
            </h2>
            <p className="text-center text-sm">
              Absolutely, here are three separate messages, each focusing on one
              aspect of your organization's services: 1. **Web Development:**
              "Explore endless possibilities with our web development expertise
              at [Your Organization]. We specialize in crafting responsive,
              dynamic, and feature-rich websites tailored to your unique
              requirements. From sleek corporate sites to robust e-commerce
              platforms, we ensure that your online presence stands out and
              engages your audience
            </p>
          </div>
        </motion.div>

        <motion.div
          ref={ref}
          style={{
            scale: scleProgess,
            opacity: opacityProgess,
          }}
          className="w-[20%] border rounded-lg p-4 relative shadow-2xl bg-[#590BAA]"
        >
          <div className="bg-[#590BAA] border w-24 h-24 absolute -top-10 rounded-full flex text-center items-center justify-center left-[38%]">
            <img src="./ui-ux-logo.png" alt="" className="w-20 h-20" />
          </div>
          <div>
            <h2 className="text-center font-semibold text-xl mt-12 mb-2">
              Ui/Ux Developement
            </h2>
            <p className="text-center text-sm">
              Absolutely, here are three separate messages, each focusing on one
              aspect of your organization's services: 1. **Web Development:**
              "Explore endless possibilities with our web development expertise
              at [Your Organization]. We specialize in crafting responsive,
              dynamic, and feature-rich websites tailored to your unique
              requirements. From sleek corporate sites to robust e-commerce
              platforms, we ensure that your online presence stands out and
              engages your audience
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
