import React from "react";
import { heroData } from "@/data/heroData";
import Button from "@/components/common/buttons/Button";

const Hero = () => {
  return (
    <section className="flex items-center justify-between mt-5">
      <div className="w-[30%]">
        <p className="text-[2.8125rem] text-color3">{heroData.greeting}</p>

        <div className="text-base/21">
          <h1 className="text-[4.0625rem] text-color0 font-semibold">
            {heroData.name}
          </h1>
          <h2 className="text-[4.0625rem]">{heroData.role}</h2>
        </div>

        <p className="text-[1rem] text-color2 w-[79%] mt-3.5">
          {heroData.description}
        </p>
        <div className="mt-6 flex gap-4">
          <Button href={heroData.buttons[0].href}>
            <span className="mx-1.5">{heroData.buttons[0].text}</span>
            {heroData.buttons[0].icon && (
              <span className="mr-2">
                {React.createElement(heroData.buttons[0].icon)}
              </span>
            )}
          </Button>

          <a href={heroData.buttons[1].href} className="flex items-center">
            <span className="mx-1.5 underline underline-offset-4">
              {heroData.buttons[1].text}
            </span>
            {heroData.buttons[1].icon && (
              <span className="mr-2 ">
                {React.createElement(heroData.buttons[1].icon)}
              </span>
            )}
          </a>
        </div>
      </div>

      <div className="w-[30.9375rem] h-[33rem] rounded-lg border-2 border-color0 overflow-hidden">
        {/*<img
          src={heroData.image.src}
          alt={heroData.image.alt}
          className="w-full h-full object-cover"
        /> */}
      </div>

      <div className="w-[16.5625rem] h-[24.5625rem] bg-bg1-color p-5">
        <div className="flex flex-col items-center justify-center h-full">
          {heroData.stats.map((stat, i) => (
            <div key={i} className="">
              <div className=" mb-4 text-color0 text-[1rem]">
                <span className="block text-[2.8rem]">{stat.value}</span>
                <span className="text-color2">{stat.label}</span>
              </div>
              {i < heroData.stats.length - 1 && i < 2 && (
                <div className=" mx-auto border-b opacity-20 border-color2 mb-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
