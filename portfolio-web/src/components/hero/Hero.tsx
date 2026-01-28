import React from "react";
import { heroData } from "@/data/heroData";
import { motion, Variants } from "framer-motion";
import AskMeBox from "@/components/common/ai/AskMeBox";
import { MdArrowOutward } from "react-icons/md";
import TerminalHero from "./ani-terminal/TerminalHero";

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
};

const fadeUpProps = {
  variants: fadeUp,
  initial: "initial",
  animate: "animate",
  exit: "exit",
};

const Hero = () => {
  return (
    <section
      className="
    relative
    mt-16
    w-full max-w-[94%] mx-auto
    grid gap-8
    grid-cols-1
    sm:grid-cols-1
    md:grid-cols-[max-content_max-content]
    md:justify-center
    xl:grid-cols-[minmax(320px,1fr)_minmax(480px,1.2fr)_minmax(360px,1fr)]
    xl:items-start
  "
    >
      <motion.div
        {...fadeUpProps}
        className="
          order-1 xl:order-1
          custom:max-w-[500px]
          max-w-[400px]
          xl:max-w-[30rem]
          justify-self-center xl:justify-self-start
        "
      >
        <p className="text-[2.8125rem] text-color3 custom:text-[3.4375rem]">
          {heroData.greeting}
        </p>

        <div className="custom:text-base/21 text-base/14">
          <h1 className="custom:text-[4.0625rem] text-[45px] text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-blue-400 font-semibold">
            {heroData.name}
          </h1>
          <h2 className="custom:text-[4.0625rem] text-[45px]">
            {heroData.role}
          </h2>
          <p className="text-[3rem] text-color3">{heroData.city}</p>
        </div>

        <p className="text-[1rem] text-color2 w-[79%] mt-3.5">
          {heroData.description}
        </p>

        <a
          href={heroData.buttons[1].href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex gap-4 flex-col relative group w-max"
        >
          <span
            className="
              absolute top-2 left-0 text-sm
              opacity-0 translate-y-1.5
              transition-all duration-300
              group-hover:opacity-100 group-hover:translate-y-[-4rem] group-hover:px-3
              p-2.5 rounded-md bg-[#090909] shadow-lg border border-white/10
            "
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 group-hover:text-[1.1rem]">
              Resume
            </span>
          </span>

          <img
            src="/images/hero/folder_blue.png"
            alt="Hero Image"
            className="w-20 transition-all duration-300 cursor-pointer group-hover:translate-y-[-5px] z-10"
          />

          <MdArrowOutward className="absolute top-7 left-14 text-white opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-[-5px] z-10" />
        </a>
      </motion.div>

      <div
        className="
          order-3 lg:order-3
          md:col-span-2 md:justify-self-center
          xl:order-2 xl:col-span-1
          h-[33rem]
          rounded-lg
          flex justify-center items-center
          relative
          justify-self-center

        "
      >
        <AskMeBox />
      </div>

      <motion.div
        {...fadeUpProps}
        className="
          order-2 lg:order-2 xl:order-3
           md:inline-block
          w-full
          justify-self-center xl:justify-self-end
          mt-15
        "
      >
        <TerminalHero />
      </motion.div>
    </section>
  );
};

export default Hero;
