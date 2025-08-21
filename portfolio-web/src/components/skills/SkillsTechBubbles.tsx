import React, { useMemo } from "react";
import { motion } from "framer-motion";
import ElementContainer from "../common/element-container/ElementContainer";
import { skillsData } from "@/data/skillsData";

// If you already have this type somewhere, feel free to remove/adjust.
type SkillItem = {
  tech: string;
  level: number;
  icon?: string;
};

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

// Tiny entrance animations
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

const SkillsTechBubbles: React.FC = () => {
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
    <div className="flex justify-center items-center mx-auto">
      <div className="space-y-8">
        {groups.map((g, gi) => (
          <motion.div
            key={g.key}
            className=""
            custom={gi}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={groupVariants}
          >
            {/* Group header */}
            <div className="flex items-center gap-3">
              <h3 className="text-base text-color3 md:text-lg font-semibold">
                {g.title}
              </h3>
              <span className="text-xs text-color4/70">
                {g.items.length} skills
              </span>
            </div>

            {/* Tech bubbles row */}
            <div className="flex flex-wrap justify-center gap-4 ">
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
                    <ElementContainer className="relative group flex items-center gap-3 md:gap-4 p-3 pr-5 rounded-2xl bg-[#171717] border border-border-color hover:border-color0 transition-colors duration-300">
                      {/* Circle with icon */}
                      <div className="relative shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-bg2-color/60 border border-border-color overflow-hidden flex items-center justify-center">
                        {item.icon ? (
                          <img
                            src={item.icon}
                            alt={item.tech}
                            className="w-8 h-8 md:w-9 md:h-9 object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <span className="text-[10px] text-color4">
                            {item.tech[0]}
                          </span>
                        )}

                        {/* Absolute numeric level on the right side of the circle */}
                        <span
                          className="absolute left-full ml-2 top-1/2 -translate-y-1/2 text-sm md:text-base font-semibold text-color3"
                          aria-hidden="true"
                        >
                          {pct}%
                        </span>
                      </div>

                      {/* Tech label (kept short; can be hidden on very small screens) */}
                      <div className="min-w-[4rem] pr-2">
                        <p className="text-sm md:text-base leading-none font-medium">
                          {item.tech}
                        </p>
                        <div className="mt-2 w-24 md:w-28 h-1.5 rounded-full bg-border-color/60 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-color3"
                            style={{ width: `${pct}%` }}
                            role="progressbar"
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </ElementContainer>
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

export default SkillsTechBubbles;
