import React from "react";
import { aboutMeData } from "@/data/aboutData";
import RoundedBtn from "@/components/common/rounded-btn/RoundedBtn";
import ElementContainer from "../common/element-container/ElementContainer";

const group1 = aboutMeData.features?.slice(0, 3).map((feature, index) => (
  <div key={index} className="flex items-center">
    {feature.icon && (
      <span className="mr-2 text-color0">
        {React.createElement(feature.icon)}
      </span>
    )}
    <span>{feature.text}</span>
  </div>
));

const group2 = aboutMeData.features?.slice(3, 6).map((feature, index) => (
  <div key={index} className="flex items-center">
    {feature.icon && (
      <span className="mr-2 text-color0">
        {React.createElement(feature.icon)}
      </span>
    )}
    <span>{feature.text}</span>
  </div>
));

const About = () => {
  return (
    <section className="flex items-center justify-center mt-50">
      <div className="flex flex-col w-[50%] gap-6">
        <h2>{aboutMeData.header}</h2>
        <p>{aboutMeData.title}</p>
        <p>{aboutMeData.description}</p>

        <div className="flex gap-4">
          <div>{group1}</div>
          <div>{group2}</div>
        </div>

        <ElementContainer className="flex items-center justify-center w-[36.25rem] h-[5.375rem] px-[2.5rem] py-[1rem] gap-10">
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

      <div>
        <div className="w-[27.4375rem] h-[33rem] border-2 border-color0"></div>
      </div>
    </section>
  );
};

export default About;
