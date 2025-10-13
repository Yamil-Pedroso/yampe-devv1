import React from "react";
import { heroData } from "@/data/heroData";
import Button from "@/components/common/buttons/Button";
import { motion, Variants } from "framer-motion";
import {
  ctaEnter,
  ctaHover,
  ctaTap,
} from "@/components/common/animation/motionTokens";
import AskMeBox from "@/components/common/ai/AskMeBox";
import GeomShapes from "../common/shapes/GeomShapes";
//import { Icon } from "@iconify/react";

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
      className="relative
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
          <p className="text-[3rem] text-color3">{heroData.city}</p>
        </div>

        <p className="text-[1rem] text-color2 w-[79%] mt-3.5">
          {heroData.description}
        </p>

        {/*<div className="flex gap-3 text-color0">
          <Icon icon="pixelarticons:mail" className="w-6 h-6" />
          <Icon icon="pixelarticons:github" className="w-6 h-6" />
          <Icon icon="pixelarticons:arrow-right" className="w-6 h-6" />
        </div>*/}

        <div className="mt-6 flex gap-4 custom:flex-row flex-col">
          <Button
            href={heroData.buttons[1].href}
            className="h-[3rem] group"
            initial="hidden"
            animate="show"
            variants={ctaEnter}
            transition={{ delay: 0.35 }}
            whileHover={ctaHover}
            whileTap={ctaTap}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="font-bold">{heroData.buttons[0].text}</span>

            {heroData.buttons[0].icon && (
              <motion.span
                className={`inline-flex group-hover:ml-2 transition-all duration-300`}
              >
                {React.createElement(heroData.buttons[0].icon)}
              </motion.span>
            )}
          </Button>

          {/*<a href={heroData.buttons[1].href} className="flex items-center">
            <span className="mx-1.5 underline underline-offset-4">
              {heroData.buttons[1].text}
            </span>
            {heroData.buttons[1].icon && (
              <span className="mr-2">
                {React.createElement(heroData.buttons[1].icon)}
              </span>
            )}
          </a>*/}
        </div>
      </motion.div>

      {/* MIDDLE content (animation) */}
      <div
        className="
          order-3 lg:order-3
           md:col-span-2 md:justify-self-center  w-full
          xl:order-2 xl:col-span-1
           h-[33rem] rounded-lg
           flex justify-center items-center mr-70
            relative

        "
      >
        <AskMeBox />
      </div>
      <motion.div
        {...fadeUpProps}
        className="
          order-2 lg:order-2 xl:order-3
          justify-self-end
          w-full
          mr-20
          hidden md:inline-block
        "
      >
        <GeomShapes />
      </motion.div>
    </section>
  );
};

export default Hero;
