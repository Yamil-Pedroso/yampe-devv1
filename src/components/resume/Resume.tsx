import React from "react";
import { resumeData } from "@/data/resumeData";
import { LuBoxes } from "react-icons/lu";
import ElementContainer from "@/components/common/element-container/ElementContainer";

const experienceGroup1 = resumeData.experience
  ?.slice(0, 3)
  .map((exp, index) => (
    <div key={index} className="flex gap-4 mb-8">
      <div>
        {exp.icon && (
          <span className="flex items-center justify-center mr-2 text-[1.6rem] w-[3.5rem] h-[3.5rem] rounded-full bg-bg2-color text-color3">
            {React.createElement(exp.icon)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-color4">{exp.year}</p>
        <div>
          <h4 className="text-[1.5rem]">{exp.jobTitle}</h4>
          <p className="text-color3">{exp.company}</p>
        </div>
      </div>
    </div>
  ));

const experienceGroup2 = resumeData.experience
  ?.slice(3, 6)
  .map((exp, index) => (
    <div key={index} className="flex gap-4 mb-8">
      <div>
        {exp.icon && (
          <span className="flex items-center justify-center mr-2 text-[1.6rem] w-[3.5rem] h-[3.5rem] rounded-full bg-bg2-color text-color3">
            {React.createElement(exp.icon)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-color4">{exp.year}</p>
        <div>
          <h4 className="text-[1.5rem]">{exp.jobTitle}</h4>
          <p className="text-color3">{exp.company}</p>
        </div>
      </div>
    </div>
  ));

const Resume = () => {
  return (
    <section className="flex justify-center mt-50 gap-20">
      <div className="flex items-center justify-center w-[16.875rem] h-[16.875rem] rounded-full bg-bg1-color border border-border-color">
        <LuBoxes size={135} className="inline text-[var(--element-bg-color)]" />
      </div>

      <div className="flex flex-col gap-14">
        <div className="flex flex-col gap-4">
          <p className="text-color4">{resumeData.header}</p>
          <p className="text-[2.8125rem] max-w-[40rem] text-base/14">
            Real <span className="text-color0 ">Riddle Solutions</span>{" "}
            Experience
          </p>
        </div>

        <ElementContainer className="flex items-center justify-center w-[75rem] h-[32rem] bg-bg1-color">
          <div className="flex gap-16 mt-6">
            <div className="flex flex-col justify-center">
              {experienceGroup1}
            </div>

            <div className="w-px bg-border-color self-stretch mx-2" />

            <div className="flex flex-col justify-center">
              {experienceGroup2}
            </div>
          </div>
        </ElementContainer>
      </div>
    </section>
  );
};

export default Resume;
