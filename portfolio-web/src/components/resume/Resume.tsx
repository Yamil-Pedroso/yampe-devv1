import React from "react";
import { resumeData } from "@/data/resumeData";
import { motion, Variants } from "framer-motion";
import ElementContainer from "@/components/common/element-container/ElementContainer";

/* ===== Variants reutilizables ===== */
const containerStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      // primero aparecen los hijos con un goteo
      when: "beforeChildren",
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const popIcon: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -6 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 420, damping: 24, mass: 0.6 },
  },
};

const dividerGrowY: Variants = {
  hidden: { scaleY: 0, opacity: 0, transformOrigin: "top" },
  visible: {
    scaleY: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const dividerGrowX: Variants = {
  hidden: { scaleX: 0, opacity: 0, transformOrigin: "left" },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ===== Helper para reducir repetición ===== */
const Reveal: React.FC<
  React.PropsWithChildren<{ className?: string; variants?: Variants }>
> = ({ children, className, variants = itemFadeUp }) => (
  <motion.div
    className={className}
    variants={variants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.25 }}
  >
    {children}
  </motion.div>
);

const Resume = () => {
  return (
    <section className="max-w-[94%] mt-50 flex flex-col items-center justify-center gap-8 mx-auto large:mx-0 large:flex-row large:items-start large:gap-16">
      {/* Badge circular */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="large:px-10"
      >
        <Reveal variants={popIcon}>
          <div className="flex items-center justify-center w-[16rem] h-[16rem] rounded-full bg-bg1-color border border-border-color shadow-sm large:w-[17rem] large:h-[17rem]">
            <img
              src="/images/logo/cubi_logo.png"
              alt="Yampe.dev"
              className="w-35 h-35"
            />
          </div>
        </Reveal>
      </motion.div>

      {/* Texto + timeline */}
      <motion.div
        variants={containerStagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="flex flex-col gap-8 large:gap-14"
      >
        {/* Header */}
        <Reveal className="flex flex-col gap-3 text-center large:text-left">
          <p className="text-color4">{resumeData.header}</p>
          <p className="text-[2rem] mobile:text-[2.8125rem] max-w-[40rem] text-base/14 mx-auto large:mx-0">
            Real <span className="text-color0">Riddle Solutions</span>{" "}
            Experience
          </p>
        </Reveal>

        {/* Contenedor de experiencias */}
        <Reveal>
          <ElementContainer className="w-full max-w-screen-xl bg-bg1-color p-6 mobile:p-6 large:p-18">
            <motion.div
              variants={containerStagger}
              className="flex flex-col gap-10 large:flex-row large:gap-16 mt-4"
            >
              {/* Columna izquierda */}
              <motion.div
                variants={containerStagger}
                className="flex flex-col justify-center"
              >
                {resumeData.experience?.slice(0, 3).map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeUp}
                    className="flex gap-3 mb-6 large:gap-4 large:mb-8"
                  >
                    <Reveal variants={popIcon}>
                      {exp.icon && (
                        <span className="flex items-center justify-center mr-2 text-[1.25rem] w-12 h-12 rounded-full bg-bg2-color text-color3 large:text-[1.6rem] large:w-[3.5rem] large:h-[3.5rem] shadow-sm">
                          {React.createElement(exp.icon)}
                        </span>
                      )}
                    </Reveal>
                    <div className="flex flex-col gap-1.5 large:gap-2">
                      <p className="text-color4 text-sm large:text-base">
                        {exp.year}
                      </p>
                      <div>
                        <h4 className="text-[1.25rem] large:text-[1.5rem]">
                          {exp.jobTitle}
                        </h4>
                        <p className="text-color3 text-sm large:text-base">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Separadores */}
              <motion.div
                variants={dividerGrowX}
                className="h-px bg-border-color my-2 large:hidden"
              />
              <motion.div
                variants={dividerGrowY}
                className="hidden large:block w-px bg-border-color self-stretch mx-2"
              />

              {/* Columna derecha */}
              <motion.div
                variants={containerStagger}
                className="flex flex-col justify-center"
              >
                {resumeData.experience?.slice(3, 6).map((exp, index) => (
                  <motion.div
                    key={index}
                    variants={itemFadeUp}
                    className="flex gap-3 mb-6 large:gap-4 large:mb-8"
                  >
                    <Reveal variants={popIcon}>
                      {exp.icon && (
                        <span className="flex items-center justify-center mr-2 text-[1.25rem] w-12 h-12 rounded-full bg-bg2-color text-color3 large:text-[1.6rem] large:w-[3.5rem] large:h-[3.5rem] shadow-sm">
                          {React.createElement(exp.icon)}
                        </span>
                      )}
                    </Reveal>
                    <div className="flex flex-col gap-1.5 large:gap-2">
                      <p className="text-color4 text-sm large:text-base">
                        {exp.year}
                      </p>
                      <div>
                        <h4 className="text-[1.25rem] large:text-[1.5rem]">
                          {exp.jobTitle}
                        </h4>
                        <p className="text-color3 text-sm large:text-base">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </ElementContainer>
        </Reveal>
      </motion.div>
    </section>
  );
};

export default Resume;
