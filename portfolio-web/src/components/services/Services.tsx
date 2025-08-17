import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";
import { MdOutlineArrowOutward } from "react-icons/md";
import ElementContainer from "../common/element-container/ElementContainer";
import { fetchHome } from "@/services/HomeService";
import type { ServiceDTO, HomeResponse } from "@/services/HomeService";

const iconMap: Record<string, IconType> = {
  arrowOutward: MdOutlineArrowOutward,
};

const Services: React.FC = () => {
  const [header, setHeader] = useState<string>("Our Services");
  const [items, setItems] = useState<ServiceDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data: HomeResponse = await fetchHome();
        setHeader(data.sections?.servicesHeader ?? "Our Services");
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
          {items.map((service, i) => {
            const Icon = service.iconKey ? iconMap[service.iconKey] : undefined;
            return (
              <ElementContainer
                border
                key={`${service.title}-${service.stepNumber}-${i}`}
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
                      <p className="text-color2 ">{service.description}</p>
                    )}
                  </div>
                </div>

                <div>
                  {Icon && (
                    <span
                      className="flex items-center justify-center mr-2 text-[21px]
                                 w-[4.375rem] h-[4.375rem] rounded-full
                                 bg-bg2-color text-color4"
                    >
                      <Icon />
                    </span>
                  )}
                </div>
              </ElementContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
