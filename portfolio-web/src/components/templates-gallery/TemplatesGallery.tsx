import React from "react";
import { templatesGalleryData } from "@/data/templatesGalleryData";
import assets from "@/assets";
import VideoComp from "../common/video/VideoComp";
import { MdOutlineArrowOutward } from "react-icons/md";

const TemplatesGallery = () => {
  return (
    <section className="flex flex-col justify-center items-center mt-16 sm:mt-20 md:mt-24 lg:mt-30 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10 max-w-4xl">
        <h2 className="text-sm sm:text-base lg:text-lg mb-2 sm:mb-3">
          {templatesGalleryData.header}
        </h2>
        <p className="sm:text-2xl md:text-3xl lg:text-4xl xl:text-[2.8125rem] max-w-full sm:max-w-[32rem] md:max-w-[40rem] lg:max-w-[45rem] text-base/14 leading-tight mx-auto">
          Discover your<span className="text-color0"> Website</span>
        </p>

        <p className="text-color4/80 mt-2.5 max-[40rem]:text-sm max-w-[31.25rem]">
          {templatesGalleryData.description}
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-center items-center gap-12 lg:gap-18 w-full">
        <a
          href="projects-gallery"
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <div className="flex flex-col justify-center items-center w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border border-color4/20 bg-color4/5 text-color4 flex-shrink-0 ">
            <p className="text-[3.5rem] md:text-[4.5rem]">MORE</p>{" "}
            <span>
              <MdOutlineArrowOutward className="text-[4rem] md:text-[6rem] text-color0" />
            </span>
          </div>
        </a>

        <VideoComp
          src={assets.video1}
          className="w-full max-w-4xl h-auto rounded-2xl shadow-lg"
          poster="/images/templates/restaurant-website.jpg"
          preload="auto"
        />
      </div>
    </section>
  );
};

export default TemplatesGallery;
