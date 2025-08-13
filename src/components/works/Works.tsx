import { worksData } from "@/data/worksData";
import React from "react";

const Works = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-30">
      <div className="text-center mb-10">
        <h2>{worksData.header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14">
          Explore my <span className="text-color0">Projects</span>
        </p>
      </div>
      <div>
        {worksData.projects?.map((project, i) => (
          <div key={i} className="mb-20">
            {i % 2 === 0 ? (
              <div className="flex">
                <div className="w-[39.375rem] h-[31.25rem] bg-color3 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex flex-col justify-center w-[39.375rem] h-[31.25rem] px-22 gap-6">
                  <h3 className="text-color0">{project.title}</h3>
                  <h4 className="text-[2.8125rem] text-base/14">
                    {project.subtitle}
                  </h4>
                  <p className="text-color4">{project.description}</p>
                  {project.icon && (
                    <span className="flex items-center justify-center mr-2 text-[1.6rem] w-[3.5rem] h-[3.5rem] rounded-full bg-bg2-color text-color4 border border-neutral-800">
                      {React.createElement(project.icon)}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex">
                <div className="flex flex-col items-end justify-center w-[39.375rem] h-[31.25rem] pr-22">
                  <div className="flex flex-col w-[30rem] gap-6">
                    <h3 className="text-color0">{project.title}</h3>
                    <h4 className="text-[2.8125rem] text-base/14">
                      {project.subtitle}
                    </h4>
                    <p className="text-color4">{project.description}</p>
                    {project.icon && (
                      <span className="flex items-center justify-center mr-2 text-[1.6rem] w-[3.5rem] h-[3.5rem] rounded-full bg-bg2-color text-color4 border border-neutral-800">
                        {React.createElement(project.icon)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="w-[39.375rem] h-[31.25rem] bg-color3 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Works;
