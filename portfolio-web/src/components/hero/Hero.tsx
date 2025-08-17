import React from "react";
import { heroData } from "@/data/heroData";
import Button from "@/components/common/buttons/Button";
import { motion, Variants } from "framer-motion";
import RoadMapAni from "./RoadMapApi";

const fadeUp: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
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
    mt-16
    w-full max-w-[94%] mx-auto
    grid gap-8
    grid-cols-1
     sm:grid-cols-1
     md:grid-cols-[max-content_max-content] md:justify-center
     xl:grid-cols-[max-content_1fr_max-content] xl:items-start
      "
    >
      {/* LEFT content */}
      <motion.div
        {...fadeUpProps}
        className="
          order-1 xl:order-1
          lg:justify-start
          custom:max-w-[500px]
          max-w-[400px]
          xl:max-w-[30rem] xl:justify-self-start
        "
      >
        <p className="text-[2.8125rem] text-color3 custom:text-[3.4375rem]">
          {heroData.greeting}
        </p>

        <div className="custom:text-base/21 text-base/14">
          <h1 className="custom:text-[4.0625rem] text-[45px] text-color0 font-semibold">
            {heroData.name}
          </h1>
          <h2 className="custom:text-[4.0625rem] text-[45px]">
            {heroData.role}
          </h2>
        </div>

        <p className="text-[1rem] text-color2 w-[79%] mt-3.5">
          {heroData.description}
        </p>

        <div className="mt-6 flex gap-4 custom:flex-row flex-col">
          <Button href={heroData.buttons[0].href} className="h-[3rem]">
            <span className="mx-1.5 font-bold">{heroData.buttons[0].text}</span>
            {heroData.buttons[0].icon && (
              <span className="mr-2">
                {React.createElement(heroData.buttons[0].icon)}
              </span>
            )}
          </Button>

          <a href={heroData.buttons[1].href} className="flex items-center">
            <span className="mx-1.5 underline underline-offset-4">
              {heroData.buttons[1].text}
            </span>
            {heroData.buttons[1].icon && (
              <span className="mr-2">
                {React.createElement(heroData.buttons[1].icon)}
              </span>
            )}
          </a>
        </div>
      </motion.div>

      {/* MIDDLE content (animation) */}
      <div
        className="
          order-3 lg:order-3
          md:col-span-2 md:justify-self-center  md:max- w-full
          xl:order-2 xl:col-span-1
           h-[33rem] rounded-lg overflow-hidden
           flex justify-center items-center
            relative

        "
      >
        <RoadMapAni />
      </div>

      {/* RIGHT content */}
      <motion.div
        {...fadeUpProps}
        className="
          order-2 lg:order-2 xl:order-3
          justify-self-end
          w-full sm:w-full
          h-[24.5625rem] bg-[#070707] p-8 custom:p-12 rounded-2xl
          xl:max-w-[16.5625rem]
        "
      >
        <div className="flex flex-col r custom:justify-center h-full">
          {heroData.stats.map((stat, i) => (
            <div key={i}>
              <div className="mb-4 text-color0 text-[1rem]">
                <span className="block text-[2.8rem]">{stat.value}</span>
                <span className="text-color2">{stat.label}</span>
              </div>
              {i < heroData.stats.length - 1 && i < 2 && (
                <div className="mx-auto border-b opacity-20 border-color2 mb-4" />
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
