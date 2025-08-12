import React from "react";
import { aboutMeData } from "@/data/aboutData";
import RoundedBtn from "@/components/common/rounded-btn/RoundedBtn";
import ElementContainer from "../common/element-container/ElementContainer";
import ElementContainer2 from "../common/element-container/ElementContainer2";
import { MdOutlineArrowOutward } from "react-icons/md";

const group1 = aboutMeData.features?.slice(0, 3).map((feature, index) => (
  <div key={index} className="flex items-center">
    {feature.icon && (
      <span className="mr-2 text-color0 text-[1.25rem]">
        {React.createElement(feature.icon)}
      </span>
    )}
    <span className="text-[1.25rem]">{feature.text}</span>
  </div>
));

const group2 = aboutMeData.features?.slice(3, 6).map((feature, index) => (
  <div key={index} className="flex items-center">
    {feature.icon && (
      <span className="mr-2 text-color0 text-[20px]">
        {React.createElement(feature.icon)}
      </span>
    )}
    <span className="text-[1.25rem]">{feature.text}</span>
  </div>
));

const About = () => {
  return (
    <section className="flex items-center justify-center mt-50 bg-[#070707] p-[8.125rem] gap-12">
      <div className="flex flex-col gap-6">
        <h2 className="text-color4">{aboutMeData.header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem]">
          Professional <span className="text-color0 ">Problema Solutions</span>{" "}
          For Digital Products
        </p>
        <p className="text-color2 max-w-[40rem] text-base/7">
          {aboutMeData.description}
        </p>

        <div className="flex gap-45">
          <div className="flex flex-col gap-3.5">{group1}</div>
          <div className="flex flex-col gap-3.5">{group2}</div>
        </div>

        <ElementContainer className="flex items-center justify-center w-[36.25rem] h-[5.375rem] px-[2.5rem] py-[1rem] gap-10 mt-3.5">
          {aboutMeData.infoContact?.map((info, index) => (
            <div key={index} className="flex items-center mb-2">
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
      </div>

      <div className="flex flex-col items-center relative">
        <div className="flex flex-col absolute top-70 left-[-6.55rem]">
          <ElementContainer2 className="text-black p-3">
            <div className="w-[2.4rem] h-[2.4rem] rounded-full">
              <img
                src="/images/about/icons/3d-cube.png"
                alt="Experience Icon"
              />
            </div>
            <p>Experience Full Stack Developer</p>
            <MdOutlineArrowOutward className="text-black" size={38} />
          </ElementContainer2>
          <ElementContainer2 className="text-black p-3 mt-2 ml-[-2rem]">
            <div className="w-[2.4rem] h-[2.4rem] bg-black rounded-full overflow-hidden">
              <img
                src="/images/about/yami.jpg"
                alt="Experience Icon"
                className="w-full h-full object-cover"
              />
            </div>
            <p>Yamil Pedroso</p>
            <MdOutlineArrowOutward className="text-black" size={38} />
          </ElementContainer2>
        </div>
        <div className="w-[27.4375rem] h-[33rem]">
          <img
            src={aboutMeData.image}
            alt="About Me"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
