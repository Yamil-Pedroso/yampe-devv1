/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useEffect, useState } from "react";
import { worksData } from "@/data/worksData";
import Button from "@/components/common/buttons/Button";
import { IoIosArrowForward } from "react-icons/io";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  ctaEnter,
  ctaHover,
  ctaTap,
} from "@/components/common/animation/motionTokens";
import BlockwithhHover from "../common/hovers/BlockwithHover";

const IMG_DURATION = 1.1;
const IMG_EASE: any = [0.25, 0.1, 0.25, 1];
const TXT_DURATION = 0.85;
const TXT_EASE: any = [0.22, 1, 0.36, 1];

function ProjectRow({ project, i }: { project: any; i: number }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const rowRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(rowRef, { once: true, amount: 0.3 });

  const imgCtrls = useAnimation();
  const txtCtrls = useAnimation();

  const isEven = i % 2 === 0;
  const imgFromX = isEven ? 120 : -120;
  const textFromX = isEven ? -24 : 24;

  useEffect(() => {
    if (!inView) return;
    (async () => {
      await imgCtrls.start({
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: { duration: IMG_DURATION, ease: IMG_EASE },
      });

      await txtCtrls.start({
        opacity: 1,
        x: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        filter: "blur(0px)",
        transition: { duration: TXT_DURATION, ease: TXT_EASE },
      });
    })();
  }, [inView, imgCtrls, txtCtrls]);

  return (
    <div
      ref={rowRef}
      id="works"
      className="mb-12 sm:mb-16 md:mb-20 w-full px-2 sm:px-4 lg:px-0"
    >
      {isEven ? (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer w-full lg:w-1/2 xl:w-[39.375rem] flex-shrink-0"
          >
            <BlockwithhHover>
              <motion.div
                initial={{ opacity: 0, x: imgFromX, y: 50, scale: 0.95 }}
                animate={imgCtrls}
                className="relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[39.375/31.25] bg-bg3-color overflow-hidden"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transition: "filter 0.3s ease",
                  filter:
                    hoveredIndex === i ? "blur(5px) brightness(80%)" : "none",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 m-auto object-contain"
                  style={{ width: "30rem", height: "30rem" }}
                />
              </motion.div>
            </BlockwithhHover>
          </a>

          <motion.div
            initial={{
              opacity: 0,
              x: textFromX,
              clipPath: "inset(0% 100% 0% 0%)",
              filter: "blur(4px)",
            }}
            animate={txtCtrls}
            className="flex flex-col justify-center w-full lg:w-1/2 xl:w-[39.375rem] lg:h-[31.25rem] px-4 sm:px-6 lg:px-8 xl:px-22 py-4 sm:py-6 lg:py-0 gap-3 sm:gap-4 lg:gap-6"
          >
            <h3 className="text-color0 text-sm sm:text-base lg:text-lg xl:text-xl">
              {project.title}
            </h3>
            <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.8125rem] leading-tight">
              {project.subtitle}
            </h4>
            <p className="text-color4 text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
            {project.icon && (
              <span className="flex items-center justify-center text-lg sm:text-xl lg:text-[1.6rem] w-10 h-10 sm:w-12 sm:h-12 lg:w-[3.5rem] lg:h-[3.5rem] rounded-full bg-bg2-color text-color4 border border-neutral-800">
                {React.createElement(project.icon)}
              </span>
            )}
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-center">
          <motion.div
            initial={{
              opacity: 0,
              x: textFromX,
              clipPath: "inset(0% 0% 0% 100%)",
              filter: "blur(4px)",
            }}
            animate={txtCtrls}
            className="flex flex-col items-start lg:items-end justify-center w-full lg:w-1/2 xl:w-[39.375rem] lg:h-[31.25rem] order-2 lg:order-1 px-4 sm:px-6 lg:px-8 xl:pr-22 py-4 sm:py-6 lg:py-0"
          >
            <div className="flex flex-col w-full lg:w-full xl:w-[30rem] gap-3 sm:gap-4 lg:gap-6">
              <h3 className="text-color0 text-sm sm:text-base lg:text-lg xl:text-xl">
                {project.title}
              </h3>
              <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.8125rem] leading-tight">
                {project.subtitle}
              </h4>
              <p className="text-color4 text-sm sm:text-base leading-relaxed">
                {project.description}
              </p>
              {project.icon && (
                <span className="flex items-center justify-center text-lg sm:text-xl lg:text-[1.6rem] w-10 h-10 sm:w-12 sm:h-12 lg:w-[3.5rem] lg:h-[3.5rem] rounded-full bg-bg2-color text-color4 border border-neutral-800">
                  {React.createElement(project.icon)}
                </span>
              )}
            </div>
          </motion.div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer w-full lg:w-1/2 xl:w-[39.375rem] flex-shrink-0 order-1 lg:order-2"
          >
            <BlockwithhHover>
              <motion.div
                initial={{ opacity: 0, x: imgFromX, y: 50, scale: 0.95 }}
                animate={imgCtrls}
                className="relative w-full aspect-[4/3] sm:aspect-[5/4] lg:aspect-[39.375/31.25] bg-bg3-color overflow-hidden"
                onMouseEnter={() => handleMouseEnter(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  transition: "filter 0.3s ease",
                  filter:
                    hoveredIndex === i ? "blur(5px) brightness(80%)" : "none",
                }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="absolute inset-0 m-auto object-contain brightness-90"
                  style={{ width: "30rem", height: "30rem" }}
                />
              </motion.div>
            </BlockwithhHover>
          </a>
        </div>
      )}
    </div>
  );
}

const Works = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-16 sm:mt-20 md:mt-24 lg:mt-30 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10 max-w-4xl">
        <h2 className="text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
          {worksData.header}
        </h2>
        <p className=" sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.8125rem] max-w-full sm:max-w-[32rem] md:max-w-[40rem] lg:max-w-[45rem] text-base/14 leading-tight mx-auto">
          Explore my <span className="text-color0">Projects</span>
        </p>
      </div>

      <div className="w-full max-w-7xl flex flex-col justify-center items-center">
        {worksData.projects?.map((project, i) => (
          <ProjectRow key={i} project={project} i={i} />
        ))}
      </div>

      <div className="mt-8 sm:mt-10">
        <Button
          initial="hidden"
          animate="show"
          variants={ctaEnter}
          transition={{ delay: 0.35 }}
          whileHover={ctaHover}
          whileTap={ctaTap}
          className="cursor-pointer group"
        >
          <span className="font-bold ">Discover More Projects</span>
          <span>
            <IoIosArrowForward
              className="group-hover:ml-2 transition-all duration-300"
              size={20}
            />
          </span>
        </Button>
      </div>
    </section>
  );
};

export default Works;
