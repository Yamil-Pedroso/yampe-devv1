import React from "react";
import { servicesData } from "@/data/servicesData";
import ElementContainer from "../common/element-container/ElementContainer";

const Services = () => {
  return (
    <section className="mt-50">
      <div className="text-center mb-12">
        <h2 className="text-color4">{servicesData.header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/13 mt-3.5 mx-auto">
          My <span className="text-color0">Special Services</span> For your
          Business Needs
        </p>
      </div>

      {/* Contenedor centrado con ancho máximo */}
      <div className="mx-auto px-4 max-w-[1200px]">
        {/* Usa tu breakpoint real: tablet/laptop/desktop/large */}
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-8">
          {servicesData.services?.map((service, i) => (
            <ElementContainer
              border
              key={i}
              // La card ocupa el 100% de su columna y limita por max-width si quieres
              className="w-full h-[8.5rem] rounded-2xl shadow-lg bg-bg1-color
                     flex justify-between items-center px-6"
            >
              <div className="flex">
                <h3 className="text-[1.5rem] font-bold">
                  {service.stepNumber}
                </h3>
                <div className="mx-6">
                  <p className="text-[1.5rem] font-bold">{service.title}</p>
                  <p className="text-color2">{service.description}</p>
                </div>
              </div>

              <div>
                {service.icon && (
                  <span
                    className="flex items-center justify-center mr-2 text-[21px]
                               w-[4.375rem] h-[4.375rem] rounded-full
                               bg-bg2-color text-color4"
                  >
                    {React.createElement(service.icon)}
                  </span>
                )}
              </div>
            </ElementContainer>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
