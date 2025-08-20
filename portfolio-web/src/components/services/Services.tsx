import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { MdOutlineWeb } from "react-icons/md";
import { AiOutlineCode, AiOutlineMobile, AiOutlineBuild } from "react-icons/ai";
import { LuTabletSmartphone } from "react-icons/lu";
import { GrDeploy } from "react-icons/gr";
import ElementContainer from "../common/element-container/ElementContainer";
import { fetchHome } from "@/services/HomeService";
import type { ServiceDTO, HomeResponse } from "@/services/HomeService";
import { motion, Variants } from "framer-motion";

const iconMap: Record<string, IconType> = {
  MdOutlineWeb: MdOutlineWeb,
  AiOutlineCode: AiOutlineCode,
  AiOutlineMobile: AiOutlineMobile,
  AiOutlineBuild: AiOutlineBuild,
  LuTabletSmartphone: LuTabletSmartphone,
  GrDeploy: GrDeploy,
};

/* ===== Variants ===== */
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

  if (loading) {
    return (
      <section className="mt-50">
        <div className="text-center mb-12">
          <h2 className="text-color4">{header}</h2>
          <p className="text-[2.8125rem] max-w-[45rem] text-base/13 mt-3.5 mx-auto">
            My <span className="text-color0">Special Services</span> For your
            Business Needs
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
          <p className="text-color2">Couldn’t load services. {err}</p>
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
        className="text-center mb-12"
      >
        <h2 className="text-color4">{header}</h2>
        <p className="text-[2.8125rem] max-w-[45rem] text-base/13 mt-3.5 mx-auto">
          My <span className="text-color0">Special Services</span> For your
          Business Needs
        </p>
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
              >
                <ElementContainer
                  border
                  className="w-full h-[8.5rem] rounded-2xl shadow-lg bg-bg1-color flex justify-between items-center px-6"
                >
                  <div className="flex">
                    <h3 className="text-[1.5rem] font-bold">
                      {service.stepNumber}
                    </h3>
                    <div className="mx-6">
                      <p className="text-[1.5rem] font-bold whitespace-nowrap">
                        {service.title}
                      </p>
                      {service.description && (
                        <p className="text-color2">{service.description}</p>
                      )}
                    </div>
                  </div>

                  <motion.div variants={iconVariant}>
                    {Icon && (
                      <span
                        className="flex items-center justify-center mr-2 text-[21px]
                                   w-[4.375rem] h-[4.375rem] rounded-full
                                   bg-bg2-color text-color4"
                      >
                        <Icon />
                      </span>
                    )}
                  </motion.div>
                </ElementContainer>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
