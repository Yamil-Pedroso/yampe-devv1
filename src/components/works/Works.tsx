import React from "react";
import { worksData } from "@/data/worksData";
import Button from "@/components/common/buttons/Button";
import { IoIosArrowForward } from "react-icons/io";

const Works = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-30 max-[60rem]:px-4">
      <div className="text-center mb-10">
        <h2>{worksData.header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14 max-[40rem]:text-[2rem]">
          Explore my <span className="text-color0">Projects</span>
        </p>
      </div>

      <div className="max-w-sreen-xl flex flex-col justify-center items-center">
        {worksData.projects?.map((project, i) => (
          <div key={i} className="mb-20 max-[60rem]:mb-14">
            {/* PAR (imagen izquierda, texto derecha) */}
            {i % 2 === 0 ? (
              <div className="flex max-[60rem]:flex-col max-[60rem]:gap-4 max-[60rem]:items-center">
                {/* Imagen */}
                <div className="w-[39.375rem] h-[31.25rem] bg-color3 overflow-hidden max-[60rem]:w-full max-[60rem]:h-[18rem] max-[40rem]:h-[14rem]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Texto (título ya queda debajo de la imagen en flex-col) */}
                <div className="flex flex-col justify-center w-[39.375rem] h-[31.25rem] px-22 gap-6
                                max-[60rem]:w-full max-[60rem]:h-auto max-[60rem]:px-4 max-[60rem]:py-4 max-[60rem]:gap-3">
                  <h3 className="text-color0 max-[40rem]:text-[1.125rem]">{project.title}</h3>
                  <h4 className="text-[2.8125rem] text-base/14 max-[40rem]:text-[1.875rem]">
                    {project.subtitle}
                  </h4>
                  <p className="text-color4 max-[40rem]:text-sm">{project.description}</p>
                  {project.icon && (
                    <span className="flex items-center justify-center mr-2 text-[1.6rem] w-[3.5rem] h-[3.5rem] rounded-full bg-bg2-color text-color4 border border-neutral-800 max-[40rem]:w-12 max-[40rem]:h-12 max-[40rem]:text-[1.25rem]">
                      {React.createElement(project.icon)}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              /* IMPAR (texto izquierda, imagen derecha) -> en móvil: imagen primero */
              <div className="flex max-[60rem]:flex-col max-[60rem]:gap-4 max-[60rem]:items-center">
                {/* Texto (en móvil pasa debajo) */}
                <div className="flex flex-col items-end justify-center w-[39.375rem] h-[31.25rem] pr-22
                                max-[60rem]:order-2 max-[60rem]:items-start max-[60rem]:w-full max-[60rem]:h-auto max-[60rem]:px-4 max-[60rem]:py-4">
                  <div className="flex flex-col w-[30rem] gap-6 max-[60rem]:w-full max-[60rem]:gap-3">
                    <h3 className="text-color0 max-[40rem]:text-[1.125rem]">{project.title}</h3>
                    <h4 className="text-[2.8125rem] text-base/14 max-[40rem]:text-[1.875rem]">
                      {project.subtitle}
                    </h4>
                    <p className="text-color4 max-[40rem]:text-sm">{project.description}</p>
                    {project.icon && (
                      <span className="flex items-center justify-center mr-2 text-[1.6rem] w-[3.5rem] h-[3.5rem] rounded-full bg-bg2-color text-color4 border border-neutral-800 max-[40rem]:w-12 max-[40rem]:h-12 max-[40rem]:text-[1.25rem]">
                        {React.createElement(project.icon)}
                      </span>
                    )}
                  </div>
                </div>

                {/* Imagen (en móvil primero) */}
                <div className="w-[39.375rem] h-[31.25rem] bg-color3 overflow-hidden
                                max-[60rem]:order-1 max-[60rem]:w-full max-[60rem]:h-[18rem] max-[40rem]:h-[14rem]">
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

      <div className="mt-10">
        <Button className="w-[14.625rem] h-[3.125rem] max-[40rem]:w-[12rem] max-[40rem]:h-[2.75rem]">
          <span className="font-bold max-[40rem]:text-sm">Discover More Projects</span>
          <IoIosArrowForward className="ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default Works;
