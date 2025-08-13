import { servicesData } from "@/data/servicesData";
import ElementContainer from "../common/element-container/ElementContainer";
import React from "react";

const Services = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-50">
      <div className="text-center mb-12">
        <h2 className="text-color4">{servicesData.header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/13 mt-3.5">
          My <span className="text-color0 ">Special Services</span> For your
          Business Needs
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicesData.services?.map((service, index) => (
            <ElementContainer
              border
              key={index}
              className="flex justify-between items-center px-10  w-[39.375rem] h-[8.5rem] rounded-2xl shadow-lg"
            >
              <div className="flex">
                <h3 className="text-[1.5rem] font-bold mb-2">
                  {service.stepNumber}
                </h3>
                <div className="mx-10">
                  <p className="text-[1.5rem] font-bold">{service.title}</p>
                  <p className="text-color2 ">{service.description}</p>
                </div>
              </div>

              <div>
                {service.icon && (
                  <span className="flex items-center justify-center mr-2 text-[21px] w-[4.375rem] h-[4.375rem] rounded-full bg-bg2-color text-color4">
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
