import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { aboutMeData } from "@/data/aboutData";
import RoundedBtn from "@/components/common/rounded-btn/RoundedBtn";
import ElementContainer from "../common/element-container/ElementContainer";
import ElementContainer2 from "../common/element-container/ElementContainer2";
import { MdOutlineArrowOutward } from "react-icons/md";
import DarkContainer from "../common/containers/DarkContainer";

const group1 = aboutMeData.features?.slice(0, 3).map((feature, index) => (
  <motion.div
    key={index}
    className="flex items-center"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
    transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
  >
    {feature.icon && (
      <span className="mr-2 text-color0 text-[1.25rem]">
        {React.createElement(feature.icon)}
      </span>
    )}
    <span className="text-[1.25rem]">{feature.text}</span>
  </motion.div>
));

const group2 = aboutMeData.features?.slice(3, 6).map((feature, index) => (
  <motion.div
    key={index}
    className="flex items-center"
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
    transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
  >
    {feature.icon && (
      <span className="mr-2 text-color0 text-[20px]">
        {React.createElement(feature.icon)}
      </span>
    )}
    <span className="text-[1.25rem]">{feature.text}</span>
  </motion.div>
));

const About = () => {
  // Refs a contenedores EXISTENTES (no cambiamos estructura)
  const leftGroupRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  // Progreso de scroll relativo al grupo izquierdo (absoluto)
  const { scrollYProgress: leftProgress } = useScroll({
    target: leftGroupRef,
    offset: ["start 90%", "end 10%"], // empieza a moverse cuando entra al viewport
  });

  // Progreso de scroll relativo al contenedor de la imagen
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start 85%", "end 15%"],
  });

  // Parallax y offsets usando LOS progress locales
  const leftFloatY1 = useTransform(leftProgress, [0, 1], [40, -40]);
  const leftFloatY2 = useTransform(leftProgress, [0, 1], [80, -20]);
  const imgY = useTransform(imageProgress, [0, 1], [0, -80]);

  return (
    <DarkContainer className="w-full desktop:max-w-[94%] laptop:h-[calc(100vh-10rem)] mx-auto mt-30">
      <div className="w-full flex justify-center items-center large:justify-center large:items-center flex-col laptop:flex-row gap-10">
        {/* left group*/}
        <div className="flex flex-col justify-center gap-6  w-[500px] mobile:w-[710px]">
          <motion.h2
            className="text-color4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {aboutMeData.header}
          </motion.h2>

          <motion.p
            className="text-[2.1875rem] mobile:text-[2.8125rem] max-w-[45rem]"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Professional{" "}
            <span className="text-color0 ">Problema Solutions</span> For Digital
            Products
          </motion.p>

          <motion.p
            className="text-color2 max-w-[40rem] text-base/7"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          >
            {aboutMeData.description}
          </motion.p>

          <div className="flex gap-15 desktop-lg:gap-45">
            <div className="flex flex-col gap-3.5">{group1}</div>
            <div className="flex flex-col gap-3.5">{group2}</div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <ElementContainer border className="about-row">
              {aboutMeData.infoContact?.map((info, index) => (
                <div
                  key={index}
                  className="flex items-center  ml-12 mobile:ml-0"
                >
                  {typeof info.icon === "string" ? (
                    <img src={info.icon} alt={info.text1} className="mr-2" />
                  ) : (
                    <RoundedBtn className=" text-[1rem] mr-2 text-bg1-color w-[2.5rem] h-[2.5rem]">
                      <span className="">{React.createElement(info.icon)}</span>
                    </RoundedBtn>
                  )}
                  <div className="flex flex-col mx-2.5">
                    <span>{info.text1}</span>
                    <span>{info.text2}</span>
                  </div>
                </div>
              ))}
            </ElementContainer>
          </motion.div>
        </div>

        {/* right group */}
        <div className="w-[442px] flex flex-col items-center relative">
          {/* Mismo contenedor; solo añadimos ref + motion + style */}
          <motion.div
            ref={leftGroupRef}
            className="flex flex-col absolute top-80 left-[-2rem] desktop:left-[-6.55rem] z-10"
            style={{ y: leftFloatY1 }}
          >
            <ElementContainer2 className="text-black p-1 mb-[-2rem] desktop:mb-0">
              <div className="w-[2.4rem] rounded-full">
                <img
                  src="/images/about/icons/3d-cube.png"
                  alt="Experience Icon"
                />
              </div>
              <p>Experience Full Stack Developer</p>
              <MdOutlineArrowOutward className="text-black" size={21} />
            </ElementContainer2>

            <motion.div style={{ y: leftFloatY2 }}>
              <ElementContainer2 className="text-black p-1 mt-0 ml-0 desktop:ml-[-3rem]">
                <div className="w-[2.4rem] bg-black rounded-full overflow-hidden ">
                  <img
                    src="/images/avatar/yami.jpg"
                    alt="Experience Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p>Yamil Pedroso</p>
                <MdOutlineArrowOutward className="text-black" size={21} />
              </ElementContainer2>
            </motion.div>
          </motion.div>

          <motion.div
            ref={imageRef}
            className="w-[20.75rem] h-[25rem] desktop:w-[27.5rem] desktop:h-[33.125rem] mt-[5rem] overflow-hidden"
            style={{ y: imgY }}
          >
            <img
              src={aboutMeData.image}
              alt="About Me"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </DarkContainer>
  );
};

export default About;
