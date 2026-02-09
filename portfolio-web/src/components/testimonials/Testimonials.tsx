import React from "react";
import Marquee from "react-fast-marquee";
import ElementContainer from "@/components/common/element-container/ElementContainer";
import DarkContainer from "@/components/common/containers/DarkContainer";
import { testimonialsData } from "@/data/testimonialsData";
import styles from "./testimonials.module.css";
import { motion } from "framer-motion";
import { MdOutlineArrowOutward } from "react-icons/md";

const Testimonials = () => {
  const { header, description, testimonials } = testimonialsData;
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <DarkContainer className="xl:max-w-[94%] mx-auto overflow-hidden">
      <div className="w-full flex flex-col gap-10 xl:flex-row p-6">
        {/* Bloque de texto a la izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col justify-center
               w-full max-w-[23.125rem]
                h-auto sm:w-[23.125rem] sm:h-[22.5rem] my-[-1rem]"
        >
          <div className="flex flex-col gap-5 text-header">
            <p className="">{header}</p>

            <h2 className="text-[2rem] sm:text-[2.8125rem] text-base/14 desktop:text-[3rem]">
              What <span className="text-green-500 font-bold">People</span> Say
            </h2>

            <p className="mt-0  sm:text-[1rem] max-w-md text-zinc-400 xl:text-desc text-base/6">
              {description}
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4">
            <button
              aria-label="Previous"
              className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
              onClick={() => {}}
            >
              <MdOutlineArrowOutward className="text-green-500 rotate-[-90deg] text-[21px]" />
            </button>
            <button
              aria-label="Next"
              className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
              onClick={() => {}}
            >
              <MdOutlineArrowOutward className="text-green-500 rotate-[360deg] text-[21px]" />
            </button>
          </div>
        </motion.div>

        {/* Bloque carrusel a la derecha */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative w-full xl:w-[45rem] 2xl:w-[57rem]"
        >
          <Marquee className="h-full" speed={20} gradient={false} pauseOnHover>
            {testimonials.map((t, i) => (
              <ElementContainer
                key={`${t.author}-${i}`}
                border
                className="group relative mx-4 flex w-[18rem] xl:w-[25rem] xl:h-[27rem] flex-col items-center border border-zinc-800 bg-[#0B0B0B] p-10 group hover:bg-bg1-color duration-300 shadow-[16px_16px_0px_#000] xl:mx-6"
              >
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="contents"
                >
                  {/* Avatar */}
                  <div className="relative mb-8 h-[85px] w-[85px]">
                    <div className="h-full w-full overflow-hidden rounded-full">
                      <img
                        src={t.avatar}
                        alt={`${t.author} avatar`}
                        className="h-full w-full object-cover brightness-85"
                      />
                    </div>

                    <div className="absolute -left-12 top-[2rem] flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-[#1f1f1f]  group-hover:bg-green-500 duration-300">
                      {React.createElement(t.icon || "span", {
                        className:
                          "text-green-500 text-[1.1rem] group-hover:text-bg1-color duration-300",
                      })}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mt-1 w-full max-w-[21rem] h-[10rem]">
                    <p
                      className="text-center text-zinc-300 leading-8 overflow-hidden line-clamp-6 text-desc xl:text-base/7"
                      title={t.quote}
                    >
                      {t.quote}
                    </p>

                    <motion.div
                      ref={overlayRef}
                      onWheelCapture={(e) => {
                        e.stopPropagation();

                        if (!overlayRef.current) return;

                        overlayRef.current.scrollTop += e.deltaY;
                      }}
                      variants={{
                        rest: { opacity: 0, y: 8, pointerEvents: "none" },
                        hover: {
                          opacity: 1,
                          y: 0,
                          pointerEvents: "auto",
                          scale: 1.05,
                        },
                      }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`absolute inset-0 z-10 rounded-xl bg-[#0B0B0B] ring-1 ring-white/5 p-4 overflow-y-auto overscroll-contain ${styles.overlayScroll}`}
                    >
                      <p className="text-center text-zinc-200 leading-5">
                        {t.quote}
                      </p>
                    </motion.div>
                  </div>

                  {/* Author */}
                  <div className="xl:mt-8 text-center flex flex-col items-center leading-2">
                    <p className="text-white font-semibold leading-tight text-[1.4rem]">
                      {t.author}
                    </p>
                    <p className="mt-2 text-green-500 text-[1.2rem] font-medium">
                      {t.position}
                    </p>
                  </div>
                </motion.div>

                <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-white/5" />
              </ElementContainer>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </DarkContainer>
  );
};

export default Testimonials;
