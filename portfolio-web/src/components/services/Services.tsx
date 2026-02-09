/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { MdOutlineWeb } from "react-icons/md";
import { AiOutlineCode, AiOutlineMobile, AiOutlineBuild } from "react-icons/ai";
import { LuTabletSmartphone } from "react-icons/lu";
import { GrDeploy } from "react-icons/gr";

import { fetchHome } from "@/services/HomeService";
import type { ServiceDTO, HomeResponse } from "@/services/HomeService";
import { motion, Variants } from "framer-motion";
import RetroContainer from "../common/containers/RetroContainer";
import LoadingBarDemo from "../common/animation/LoadingBarDemo";
import RetroBtn from "../common/buttons/RetroBtn";
import MiniWeb from "../common/mini-comps/MiniWeb";

const iconMap: Record<string, IconType> = {
  MdOutlineWeb: MdOutlineWeb,
  AiOutlineCode: AiOutlineCode,
  AiOutlineMobile: AiOutlineMobile,
  AiOutlineBuild: AiOutlineBuild,
  LuTabletSmartphone: LuTabletSmartphone,
  GrDeploy: GrDeploy,
};

const cartoonPop: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 2,
    scale: 2,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 18,
      mass: 0.8,
    },
  },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.96,
    transition: {
      duration: 0.2,
      ease: "easeIn" as const,
    },
  },
};

const headerVariant: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const cardVariant = (index: number): Variants => ({
  hidden: { opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 20 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
});

const iconVariant: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 400, damping: 20, delay: 0.1 },
  },
};

const Services: React.FC = () => {
  const [header, setHeader] = useState<string>("My Services");
  const [items, setItems] = useState<ServiceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);
  const [activeServiceIndex, setActiveServiceIndex] = useState<number | null>(
    null,
  );
  const [showLoader, setShowLoader] = useState(false);
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleClick = (index: number) => {
    setActiveServiceIndex(index);
    setShowLoader(true);

    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  };

  useEffect(() => {
    (async () => {
      try {
        const data: HomeResponse = await fetchHome();
        setHeader(data.sections?.servicesHeader ?? "My Services");
        setItems(data.services ?? []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeServiceIndex === null) return;

      const currentRef = serviceRefs.current[activeServiceIndex];

      if (currentRef && !currentRef.contains(event.target as Node)) {
        setActiveServiceIndex(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeServiceIndex]);

  if (loading) {
    return (
      <section className="mt-50">
        <div className="text-center mb-12">
          <h2 className="text-color4 text-header">{header}</h2>
          <p className="text-[2.8125rem] mobile:text-[4rem] max-w-[45rem] text-base/13 mt-3.5 mx-auto">
            My <span className="text-green-500 ">Special Services</span> For
            your Business Needs
          </p>
        </div>
        <div className="mx-auto px-4 max-w-[1200px]">
          <div className="grid grid-cols-1 laptop:grid-cols-2 gap-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-[8.5rem] rounded-2xl bg-bg1-color/60 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (err) {
    return (
      <section className="mt-50">
        <div className="text-center mb-12">
          <h2 className="text-color4">{header}</h2>
          <p className="text-color2">Couldn’t load services.{err}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="mt-50">
      <motion.div
        variants={headerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mb-12 relative"
      >
        <h2 className="text-color4 text-header">{header}</h2>
        <p className="text-subheader max-w-[45rem] text-base/13 mt-3.5 mx-auto">
          My <span className="text-green-500 ">Special Services</span> For your
          Business Needs
        </p>
        <div
          className={`w-full mb-16 ${showLoader ? "flex" : "hidden"} justify-center items-center absolute`}
        >
          <LoadingBarDemo />
        </div>
      </motion.div>

      <div className="mx-auto px-4 max-w-[1200px]">
        <div className="grid grid-cols-1 laptop:grid-cols-2 gap-8">
          {items.map((service, i) => {
            const Icon = service.iconKey ? iconMap[service.iconKey] : undefined;
            return (
              <motion.div
                key={`${service.title}-${service.stepNumber}-${i}`}
                variants={cardVariant(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="shadow-[8px_8px_0px_#000]"
              >
                <RetroContainer
                  ref={(el) => {
                    serviceRefs.current[i] = el;
                  }}
                  className="flex justify-between flex-col w-full h-auto p-12 px-10  bg-bg1-color sm:items-center sm:px-6 sm:flex-row  sm:h-[8.5rem] xl:h-[10.5rem]"
                >
                  <motion.div
                    variants={cartoonPop}
                    initial="hidden"
                    animate={
                      activeServiceIndex === i && !showLoader
                        ? "visible"
                        : "hidden"
                    }
                    className="
    absolute
    font-bold
    w-[20rem] h-[17rem]
    bg-[#2a2a2a]

    z-10
  "
                  >
                    <MiniWeb />
                  </motion.div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <h3 className="text-[1.5rem] font-bold">
                      {service.stepNumber}
                    </h3>
                    <div className="flex flex-col gap-1 sm:mx-6">
                      <p className="text-[1.5rem] font-bold ">
                        {service.title}
                      </p>
                      {service.description && (
                        <p className="text-color2">{service.description}</p>
                      )}
                    </div>
                  </div>

                  <motion.div variants={iconVariant}>
                    {Icon && (
                      <RetroBtn
                        onClick={() => handleClick(i)}
                        className="flex items-center justify-center mt-6 mr-2 text-[21px]
                                   w-[4.375rem] h-[4.375rem] rounded-full  shadow-[2px_2px_0px_#000]
                                   bg-bg2-color text-color4 border border-border-color xs:mb-[-.2rem] cursor-pointer"
                      >
                        <Icon />
                      </RetroBtn>
                    )}
                  </motion.div>
                </RetroContainer>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
