import React from "react";
import { resumeData } from "@/data/resumeData";
import { LuBoxes } from "react-icons/lu";
import ElementContainer from "@/components/common/element-container/ElementContainer";

const experienceGroup1 = resumeData.experience
  ?.slice(0, 3)
  .map((exp, index) => (
    <div key={index} className="flex gap-3 mb-6 large:gap-4 large:mb-8">
      <div>
        {exp.icon && (
          <span className="flex items-center justify-center mr-2 text-[1.25rem] w-12 h-12 rounded-full bg-bg2-color text-color3 large:text-[1.6rem] large:w-[3.5rem] large:h-[3.5rem]">
            {React.createElement(exp.icon)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 large:gap-2">
        <p className="text-color4 text-sm large:text-base">{exp.year}</p>
        <div>
          <h4 className="text-[1.25rem] large:text-[1.5rem]">{exp.jobTitle}</h4>
          <p className="text-color3 text-sm large:text-base">{exp.company}</p>
        </div>
      </div>
    </div>
  ));

const experienceGroup2 = resumeData.experience
  ?.slice(3, 6)
  .map((exp, index) => (
    <div key={index} className="flex gap-3 mb-6 large:gap-4 large:mb-8">
      <div>
        {exp.icon && (
          <span className="flex items-center justify-center mr-2 text-[1.25rem] w-12 h-12 rounded-full bg-bg2-color text-color3 large:text-[1.6rem] large:w-[3.5rem] large:h-[3.5rem]">
            {React.createElement(exp.icon)}
          </span>
        )}
      </div>
      <div className="flex flex-col gap-1.5 large:gap-2">
        <p className="text-color4 text-sm large:text-base">{exp.year}</p>
        <div>
          <h4 className="text-[1.25rem] large:text-[1.5rem]">{exp.jobTitle}</h4>
          <p className="text-color3 text-sm large:text-base">{exp.company}</p>
        </div>
      </div>
    </div>
  ));

const Resume = () => {
  return (
    <section className="max-w-[94%] mt-50 flex flex-col  items-center justify-center gap-8 mx-auto large:mx-0 large:flex-row large:items-start large:gap-16">
      {/* Badge circular */}
      <div className=" large:px-10">
        <div className="flex items-center justify-center w-40 h-40 rounded-full bg-bg1-color border border-border-color large:w-[16.875rem] large:h-[16.875rem]">
          <LuBoxes
            size={88}
            className="inline text-[var(--element-bg-color)] large:size-[135px]"
          />
        </div>
      </div>

      {/* Texto + timeline */}
      <div className="flex flex-col gap-8 large:gap-14">
        {/* Header */}
        <div className="flex flex-col gap-3 text-center large:text-left">
          <p className="text-color4">{resumeData.header}</p>
          <p className="text-[2rem] mobile:text-[2.8125rem] max-w-[40rem] text-base/14 mx-auto large:mx-0">
            Real <span className="text-color0">Riddle Solutions</span>{" "}
            Experience
          </p>
        </div>

        {/* Contenedor de experiencias */}
        <ElementContainer className="w-full max-w-screen-xl bg-bg1-color p-6 mobile:p-6 large:p-18">
          {/* En mobile: columna; en large: fila con separador vertical */}
          <div className="flex flex-col gap-10 large:flex-row large:gap-16 mt-4">
            {/* Columna izquierda */}
            <div className="flex flex-col justify-center">
              {experienceGroup1}
            </div>

            {/* Separadores: horizontal en mobile, vertical en large */}
            <div className="h-px bg-border-color my-2 large:hidden" />
            <div className="hidden large:block w-px bg-border-color self-stretch mx-2" />

            {/* Columna derecha */}
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
