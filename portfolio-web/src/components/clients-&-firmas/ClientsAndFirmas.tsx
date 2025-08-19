import { clientsAndFirmasData } from "@/data/clientsAndFirmasData";
import { motion, Variants } from "framer-motion";
//const listStagger: Variants = {
//  hidden: {},
//  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
//};

const colUp: Variants = {
  hidden: { opacity: 0, y: 80, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: [0.25, 0.8, 0.25, 1], delay: 0.3 },
  },
};

const ClientsAndFirmas = () => {
  return (
    <section className="flex flex-col items-center justify-center mt-30 px-4">
      <p className="text-[1.125rem] max-w-[52rem] text-center leading-relaxed">
        Companies, startups, and organizations{" "}
        <span className="text-color0">
          where I’ve studied and offered my services.
        </span>
      </p>

      {/* Contenedor con stagger */}
      <motion.div
        variants={colUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mt-12 w-full max-w-[85rem] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-16 justify-items-center cursor-pointer"
      >
        {clientsAndFirmasData.institutions.map((institution, i) => {
          const alt =
            institution.logo
              .split("/")
              .pop()
              ?.replace(/\.\w+$/, "")
              .replace(/[_-]/g, " ") ?? "client logo";

          return (
            <a
              key={i}
              href={institution.link}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-40 h-40 sm:w-44 sm:h-44 md:w-55 md:h-55 aspect-square flex items-center justify-center p-4 hover:shadow-md transition-all"
            >
              <img
                src={institution.logo}
                alt={alt}
                loading="lazy"
                className="max-w-full max-h-full object-contain brightness-30 hover:brightness-75 transition-all duration-300"
              />
            </a>
          );
        })}
      </motion.div>
    </section>
  );
};

export default ClientsAndFirmas;
