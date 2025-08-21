import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ElementContainer from "../common/element-container/ElementContainer";
import { skillsData } from "@/data/skillsData";

type SkillItem = { tech: string; level: number; icon?: string };
type SkillsGroups = Record<string, SkillItem[]>;

const titleMap: Record<string, string> = {
  frontend: "Frontend",
  backend: "Backend",
  databases: "Databases",
  design: "Design",
  devops: "DevOps",
  architecture: "Architecture",
};

const order = [
  "frontend",
  "backend",
  "databases",
  "design",
  "devops",
  "architecture",
] as const;

const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));

const groupVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.05 * i, duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  }),
};

const bubbleVariants = {
  hidden: { opacity: 0, scale: 0.85, rotate: -4 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 420, damping: 22, mass: 0.6 },
  },
};

const SkillsTechBubbles2: React.FC = () => {
  const groups = useMemo(() => {
    const src = (skillsData?.skills ?? {}) as SkillsGroups;
    return order
      .map((key) => ({
        key,
        title: titleMap[key] ?? key,
        items: src[key] || [],
      }))
      .filter((g) => Array.isArray(g.items) && g.items.length > 0);
  }, []);

  if (groups.length === 0) return null;

  return (
    <div className="w-full max-w-[56rem] mx-auto px-2 md:px-0">
      <div className="space-y-8">
        {groups.map((g, gi) => (
          <motion.div
            key={g.key}
            className="space-y-3"
            custom={gi}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={groupVariants}
          >
            {/* Header del grupo */}
            <div className="flex items-center gap-3">
              <h3 className="text-base md:text-lg font-semibold">{g.title}</h3>
              <span className="text-xs text-color4/70">
                {g.items.length} skills
              </span>
            </div>

            {/* Burbujas circulares */}
            <div className="flex flex-wrap gap-x-6 gap-y-7 md:gap-x-7 md:gap-y-8">
              {g.items.map((item, idx) => {
                const pct = clamp(item.level ?? 0);
                const key = `${g.key}-${item.tech}-${idx}`;
                return (
                  <motion.div
                    key={key}
                    variants={bubbleVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="flex flex-col items-center">
                      {/* Contenedor circular = círculo principal */}
                      <div
                        className="relative grid place-items-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#171717] border border-border-color hover:border-color0 transition-colors duration-300"
                        aria-label={`${item.tech} ${pct}%`}
                      >
                        {item.icon ? (
                          <img
                            src={item.icon}
                            alt={item.tech}
                            className="w-8 h-8 md:w-10 md:h-10 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[11px] md:text-xs text-color4">
                            {item.tech[0]}
                          </span>
                        )}

                        {/* Badge con el level en la esquina superior derecha del círculo */}
                        <span
                          className="absolute -top-1.5 -right-1.5 text-[10px] md:text-xs font-semibold px-1.5 py-0.5 rounded-full  text-color0 shadow-lg ring-1 ring-black/30 select-none"
                          aria-hidden="true"
                        >
                          {pct}%
                        </span>
                      </div>

                      {/* Label debajo del círculo */}
                      <p className="mt-2 text-[0.8rem] md:text-sm text-center leading-none">
                        {item.tech}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillsTechBubbles2;
