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

  return (
    <DarkContainer className="max-w-[90%] mx-auto">
      <div className="flex gap-10">
        {/* Bloque de texto a la izquierda */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col w-[23.125rem] h-[20.5rem]"
        >
          <div className="space-y-5">
            <p className="">{header}</p>

            <h2 className="text-[2.8125rem] text-base/14">
              Clients
              <br />
              <span className="text-color0">Feedback</span>
            </h2>

            <p className="max-w-md text-zinc-400">{description}</p>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <button
              aria-label="Previous"
              className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
              onClick={() => {}}
            >
              <MdOutlineArrowOutward className="text-color4 rotate-[-90deg] text-[21px]" />
            </button>
            <button
              aria-label="Next"
              className="flex h-[70px] w-[70px] items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:bg-zinc-800"
              onClick={() => {}}
            >
              <MdOutlineArrowOutward className="text-color4 rotate-[360deg] text-[21px]" />
            </button>
          </div>
        </motion.div>

        {/* Bloque carrusel a la derecha */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative w-[54rem]"
        >
          <Marquee className="h-full" speed={20} gradient={false} pauseOnHover>
            {testimonials.map((t, i) => (
              <ElementContainer
                key={`${t.author}-${i}`}
                border
                className="group relative mx-4 flex w-[25rem] h-[27rem] flex-col items-center rounded-[28px] border border-zinc-800 bg-[#0B0B0B] p-10 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset] group hover:bg-bg1-color duration-300"
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

                    <div className="absolute -left-12 top-[2rem] flex h-[60px] w-[60px] -translate-y-1/2 items-center justify-center rounded-full bg-[#1f1f1f] group-hover:bg-color0 duration-300">
                      {React.createElement(t.icon || "span", {
                        className:
                          "text-color0 text-[1.1rem] group-hover:text-bg1-color duration-300",
                      })}
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative mt-1 w-full max-w-[21rem] h-[9.5rem]">
                    <p
                      className="text-center text-zinc-300 leading-8 overflow-hidden line-clamp-4"
                      title={t.quote}
                    >
                      {t.quote}
                    </p>

                    <motion.div
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
                      className={`absolute inset-0 z-10 rounded-xl bg-[#0B0B0B] ring-1 ring-white/5 p-4 overflow-auto ${styles.overlayScroll}`}
                    >
                      <p className="text-center text-zinc-200 leading-8">
                        {t.quote}
                      </p>
                    </motion.div>
                  </div>

                  {/* Author */}
                  <div className="mt-8 text-center">
                    <p className="text-white text-[22px] font-semibold leading-tight">
                      {t.author}
                    </p>
                    <p className="mt-2 text-color0 text-[14px] font-medium">
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
