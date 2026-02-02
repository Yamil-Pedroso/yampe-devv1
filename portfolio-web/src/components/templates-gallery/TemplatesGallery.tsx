import React from "react";
import { templatesGalleryData } from "@/data/templatesGalleryData";
import assets from "@/assets";
import VideoComp from "../common/video/VideoComp";
import { MdOutlineArrowOutward } from "react-icons/md";
import RetroButton from "../common/buttons/RetroButton";
import { useSound } from "../common/sounds/SoundComp";
import RetroContainer from "../common/containers/RetroContainer";

const TemplatesGallery = () => {
  const playClickSound = useSound("/sounds/modern-tech-click.wav", 0.2);

  return (
    <section className="flex flex-col justify-center items-center mt-16 sm:mt-20 md:mt-24 lg:mt-30 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 sm:mb-10 max-w-4xl flex flex-col justify-center items-center sm:space-y-[-.6rem]">
        <h2 className="text-sm sm:text-base lg:text-3xl mb-2 sm:mb-[-.5rem]">
          {templatesGalleryData.header}
        </h2>
        <p className="sm:text-2xl md:text-3xl  xl:text-[4rem] max-w-full sm:max-w-[32rem] md:max-w-[40rem] lg:max-w-[45rem] text-base/14 leading-tight mx-auto">
          Discover your
          <span className=" text-green-500  ml-2"> Website</span>
        </p>

        <p className="text-color4/80 mt-2.5 max-[40rem]:text-sm max-w-[31.25rem] lg:text-[1.5rem] text-base/7 mx-auto">
          {templatesGalleryData.description}
        </p>
      </div>

      <div className="flex flex-col xl:flex-row justify-center items-center gap-12 lg:gap-18 w-full">
        <RetroButton
          className="cursor-pointer rounded-full hover:scale-105 transition-transform hover:animate-jelly"
          onClick={(e) => {
            e.preventDefault();
            playClickSound();

            setTimeout(() => {
              window.location.href = "projects-gallery";
            }, 120);
          }}
        >
          <div className="flex flex-col justify-center items-center w-[300px] h-[300px] md:w-[350px] md:h-[350px] rounded-full border border-color4/20 bg-color4/5 text-color4 flex-shrink-0 ">
            <p className="text-[3.5rem] md:text-[4.5rem]">MORE</p>{" "}
            <span>
              <MdOutlineArrowOutward className="text-[4rem] md:text-[6rem] text-green-500" />
            </span>
          </div>
        </RetroButton>

        <RetroContainer className="w-full max-w-4xl p-0 shadow-[8px_8px_0px_#000]">
          <VideoComp
            src={assets.video1}
            className="w-full max-w-4xl h-auto  shadow-lg"
            poster="/images/templates/restaurant-website.jpg"
            preload="auto"
          />
        </RetroContainer>
      </div>
    </section>
  );
};

export default TemplatesGallery;
