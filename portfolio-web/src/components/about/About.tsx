/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
//import { aboutMeData } from "@/data/aboutData";

import {
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineArrowOutward,
} from "react-icons/md";
import { fetchHome } from "@/services/HomeService";
import { AboutDTO, HomeResponse } from "@/services/HomeService";
import { FaCheck } from "react-icons/fa6";
import ServiceGroups from "../common/service-groups/ServiceGroups";
import VideoComp from "../common/video/VideoComp";
import RetroContainer from "../common/containers/RetroContainer";
import RetroButton from "../common/buttons/RetroButton";

const iconMap: Record<string, React.ElementType> = {
  FaCheck: FaCheck,
  MdOutlineMailOutline: MdOutlineMailOutline,
  MdOutlinePhone: MdOutlinePhone,
};

const About = () => {
  const [header, setHeader] = useState<string>("About Me");
  const [items, setItems] = useState<AboutDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const leftGroupRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  console.log("Hola About data:", items);

  useEffect(() => {
    (async () => {
      try {
        const data: HomeResponse = await fetchHome();
        setHeader(data?.about?.header ?? "About Me");
        setItems(data?.about ? [data.about] : []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load about data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const { scrollYProgress: leftProgress } = useScroll({
    target: leftGroupRef,
    offset: ["start 90%", "end 10%"],
  });

  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ["start 85%", "end 15%"],
  });

  const leftFloatY1 = useTransform(leftProgress, [0, 1], [40, -40]);
  const leftFloatY2 = useTransform(leftProgress, [0, 1], [30, 20]);
  //const bg = useTransform(leftProgress, [0, 1], ["#ff4d4f", "#1677ff"]);
  const imgY = useTransform(imageProgress, [0, 1], [0, -80]);

  const about = items[0];

  return (
    <RetroContainer className="w-full flex desktop:max-w-[85%] mt-[-10rem] mx-auto md:mt-[-8rem] lg:mt-[13rem]  laptop:h-[calc(100vh-7rem)] shadow-[16px_16px_0px_#000]">
      <div
        id="about"
        className="w-full flex flex-col justify-center items-center large:justify-center large:items-center laptop:flex-row gap-36"
      >
        {/* left group*/}
        <div className="flex flex-col justify-center gap-6 laptop:text-left">
          <motion.h2
            className="text-color4 text-header"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {header}
          </motion.h2>

          <motion.p
            className="text-[2.1875rem] max-w-[45rem] mobile:text-subheader text-base/16 laptop:text-left"
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
          >
            Professional{" "}
            <span className=" text-green-500">Problem Solutions</span> For
            Digital Products
          </motion.p>

          <motion.p
            className="text-color2  max-w-[40rem] text-base/7 text-desc laptop:text-left"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.05 }}
          >
            {about?.description || ""}
          </motion.p>

          <ServiceGroups />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
          >
            <RetroContainer className="about-row shadow-[8px_8px_0px_#000]">
              {about?.infoContact?.map((info, i) => (
                <div key={i} className="flex items-center  ml-12 mobile:ml-0">
                  <RetroButton
                    href=""
                    className="flex justify-center items-center text-[1rem] mr-2 text-bg1-color w-[2.5rem] h-[2.5rem] group hover:bg-green-500"
                  >
                    <span className="text-white group-hover:mt-[-5rem] group-hover:scale-[1.8] group-hover:animate-ring transform transition-all duration-300">
                      {React.createElement(iconMap[info.icon || ""])}
                    </span>
                  </RetroButton>
                  <div className="flex flex-col mx-2.5">
                    <span>{info.text1}</span>
                    <span>{info.text2}</span>
                  </div>
                </div>
              ))}
            </RetroContainer>
          </motion.div>
        </div>

        {/* right group */}
        <div className="w-[442px] flex flex-col items-center relative">
          <motion.div
            ref={leftGroupRef}
            className="flex flex-col absolute top-80 left-[-2rem] desktop:left-[-6.55rem] mt-10 z-10"
            style={{ y: leftFloatY1 }}
          >
            <RetroButton
              href="https://github.com/Yamil-Pedroso"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center bg-yellow-400 rounded-4xl py-1 px-4"
            >
              <div className="w-[2.4rem] rounded-full">
                <img
                  src="/images/about/icons/3d-cube.png"
                  alt="Experience Icon"
                />
              </div>
              <p className="group-hover:text-black text-black ml-2">
                Experience Full Stack Developer
              </p>
              <MdOutlineArrowOutward
                className="text-black group-hover:text-black"
                size={21}
              />
            </RetroButton>

            <motion.div style={{ y: leftFloatY2 }}>
              <RetroButton
                href="https://www.linkedin.com/in/yamil-pedroso/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center bg-yellow-400 rounded-4xl py-1 px-4 w-45"
              >
                <div className="w-[2.4rem] rounded-full overflow-hidden mx-[-6px]">
                  <img
                    src="/images/avatar/yami.jpg"
                    alt="Experience Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="whitespace-nowrap
                  group-hover:text-black text-black ml-4
                "
                >
                  Yamil Pedroso
                </p>
                <MdOutlineArrowOutward
                  className="text-black
                group-hover:text-black"
                  size={21}
                />
              </RetroButton>
            </motion.div>
          </motion.div>

          <RetroContainer ref={imageRef} className="" style={{ y: imgY }}>
            {/* video */}
            <VideoComp
              src="/videos/about/va_1.mp4"
              type="video/mp4"
              className="w-full h-full object-cover"
              poster="/images/about/about-me-poster.jpg"
            />
          </RetroContainer>
        </div>
      </div>
    </RetroContainer>
  );
};

export default About;
