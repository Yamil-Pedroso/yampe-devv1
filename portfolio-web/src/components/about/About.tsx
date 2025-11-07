import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { aboutMeData } from "@/data/aboutData";
import RoundedBtn from "@/components/common/rounded-btn/RoundedBtn";
import ElementContainer from "../common/element-container/ElementContainer";
import ElementContainer2 from "../common/element-container/ElementContainer2";
import {
  MdOutlineMailOutline,
  MdOutlinePhone,
  MdOutlineArrowOutward,
} from "react-icons/md";
import DarkContainer from "../common/containers/DarkContainer";
import { fetchHome } from "@/services/HomeService";
import { AboutDTO, HomeResponse } from "@/services/HomeService";
import { FaCheck } from "react-icons/fa6";
import ServiceGroups from "../common/service-groups/ServiceGroups";
import VideoComp from "../common/video/VideoComp";

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
  const leftFloatY2 = useTransform(leftProgress, [0, 1], [30, 60]);
  const bg = useTransform(leftProgress, [0, 1], ["#ff4d4f", "#1677ff"]);
  const imgY = useTransform(imageProgress, [0, 1], [0, -80]);

  const about = items[0];

  return (
    <DarkContainer className="w-full desktop:max-w-[94%] mt-[-10rem] mx-auto md:mt-[-8rem] lg:mt-[13rem]  laptop:h-[calc(100vh-7rem)]">
      <div
        id="about"
        className="w-full flex flex-col justify-center items-center large:justify-center large:items-center laptop:flex-row gap-36"
      >
        {/* left group*/}
        <div className=" flex flex-col justify-center gap-6 ">
          <motion.h2
            className="text-color4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {header}
          </motion.h2>

          <motion.p
            className="text-[2.1875rem] max-w-[45rem] mobile:text-[2.8125rem] "
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
            className="text-color2  max-w-[40rem] text-base/7"
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
            <ElementContainer border className="about-row">
              {about?.infoContact?.map((info, i) => (
                <div key={i} className="flex items-center  ml-12 mobile:ml-0">
                  <RoundedBtn className=" text-[1rem] mr-2 text-bg1-color w-[2.5rem] h-[2.5rem]">
                    <span className="">
                      {React.createElement(iconMap[info.icon || ""])}
                    </span>
                  </RoundedBtn>

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
          <motion.div
            ref={leftGroupRef}
            className="flex flex-col absolute top-80 left-[-2rem] desktop:left-[-6.55rem] mt-10 z-10"
            style={{ y: leftFloatY1 }}
          >
            <ElementContainer2 className="text-black p-1 mb-[-2rem] mx-20 text-[.8rem] desktop:mb-0 sm:m-0 sm:text-[1rem]">
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
              <ElementContainer2 className="text-black p-1 mt-0  text-[.8rem] mx-60 desktop:ml-[-3rem] sm:mt-[-2rem] sm:m-0 sm:text-[1rem]">
                <div className="w-[2.4rem] bg-black  rounded-full overflow-hidden ">
                  <img
                    src="/images/avatar/yami.jpg"
                    alt="Experience Icon"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="whitespace-nowrap">Yamil Pedroso</p>
                <MdOutlineArrowOutward className="text-black" size={21} />
              </ElementContainer2>
            </motion.div>
          </motion.div>

          <motion.div
            ref={imageRef}
            className="w-[22rem] h-[27rem] desktop:w-[27.5rem] desktop:h-[33.125rem] mt-[0rem] desktop:mt-[5rem] rounded-2xl overflow-hidden"
            style={{ y: imgY }}
          >
            {/* video */}
            <VideoComp
              src="/videos/about/va_1.mp4"
              type="video/mp4"
              className="w-full h-full object-cover"
              poster="/images/about/about-me-poster.jpg"
            />
            {/*<img
              src={aboutMeData.image}
              alt="About Me"
              className="w-full h-full object-cover"
            />*/}
          </motion.div>
        </div>
      </div>
    </DarkContainer>
  );
};

export default About;
