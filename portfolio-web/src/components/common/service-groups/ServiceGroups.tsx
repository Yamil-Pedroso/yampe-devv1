/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { AboutDTO, fetchHome, HomeResponse } from "@/services/HomeService";
import { motion } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  FaCheck: FaCheck,
};

const ServiceGroups = () => {
  const [items, setItems] = useState<AboutDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data: HomeResponse = await fetchHome();
        setItems(data?.about ? [data.about] : []);
      } catch (e: any) {
        setErr(e?.message || "Failed to load about data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const about = items[0];
  const features = about?.features ?? [];

  const group1 = features.slice(0, 3).map((feature, index) => (
    <motion.div
      key={index}
      className="flex items-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: index * 0.08 }}
    >
      {feature.icon && iconMap[feature.icon] ? (
        <span className="mr-2 text-color0 text-[1.25rem]">
          {React.createElement(iconMap[feature.icon])}
        </span>
      ) : (
        <span className="mr-2 text-color0 text-[1.25rem]">✔</span>
      )}
      <span className="text-[1.25rem]">{feature.text}</span>
    </motion.div>
  ));

  const group2 = features.slice(3, 6).map((feature, i) => (
    <motion.div
      key={i}
      className="flex items-center"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      transition={{ duration: 0.45, ease: "easeOut", delay: i * 0.08 }}
    >
      {feature.icon && iconMap[feature.icon] ? (
        <span className="mr-2 text-color0 text-[1.25rem]">
          {React.createElement(iconMap[feature.icon])}
        </span>
      ) : (
        <span className="mr-2 text-color0 text-[1.25rem]">✔</span>
      )}
      <span className="text-[1.25rem]">{feature.text}</span>
    </motion.div>
  ));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (err) {
    return <div>Error: {err}</div>;
  }

  return (
    <div className="flex gap-15 desktop-lg:gap-45">
      <div className="flex flex-col gap-3.5">{group1}</div>
      <div className="flex flex-col gap-3.5">{group2}</div>
    </div>
  );
};

export default ServiceGroups;
