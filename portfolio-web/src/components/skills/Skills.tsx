/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { skillsData } from "@/data/skillsData";
import ElementContainer from "../common/element-container/ElementContainer";
import type { IconType } from "react-icons";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import DarkContainer from "../common/containers/DarkContainer";
import Button from "../common/buttons/Button";
import { IoIosArrowForward } from "react-icons/io";
import {
  ctaEnter,
  ctaHover,
  ctaTap,
} from "@/components/common/animation/motionTokens";

const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));
const isIconType = (icon: unknown): icon is IconType =>
  typeof icon === "function";

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
const AUTOPLAY_MS = 10000;

const gridStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const card3D = (i: number): Variants => ({
  hidden: {
    opacity: 0,
    y: 22,
    rotateX: 8,
    rotateY: i % 2 === 0 ? -6 : 6,
    scale: 0.98,
    filter: "blur(3px)",
    transformPerspective: 800,
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
});

const iconPop: Variants = {
  hidden: { opacity: 0, scale: 0.7, rotate: -10 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 420, damping: 22, mass: 0.6 },
  },
};

const barVariant = (pct: number): Variants => ({
  hidden: { width: "0%" },
  visible: {
    width: `${pct}%`,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
});

const headerVariant: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const Skills: React.FC = () => {
  const categories = useMemo(() => {
    const src = skillsData.skills ?? {};
    return order
      .map((k) => [k, (src as any)[k]] as const)
      .filter(([, skills]) => Array.isArray(skills) && skills.length > 0);
  }, []);

  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const timerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const next = useCallback(() => {
    setDirection(1);
    setIdx((i) => (i + 1) % categories.length);
  }, [categories.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setIdx((i) => (i - 1 + categories.length) % categories.length);
  }, [categories.length]);

  const resetAutoplay = useCallback(() => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setDirection(1);
      setIdx((i) => (i + 1) % categories.length);
    }, AUTOPLAY_MS);
  }, [categories.length]);

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [resetAutoplay]);

  const handleMouseEnter = () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
  };
  const handleMouseLeave = () => {
    resetAutoplay();
  };

  const tallestIndex = useMemo(() => {
    if (categories.length === 0) return 0;
    let maxI = 0;
    let maxLen = 0;
    categories.forEach(([, skills], i) => {
      const len = (skills as any[]).length;
      if (len > maxLen) {
        maxLen = len;
        maxI = i;
      }
    });
    return maxI;
  }, [categories]);

  const measureRef = useRef<HTMLDivElement | null>(null);
  const [minH, setMinH] = useState<number>(0);

  const measure = useCallback(() => {
    if (measureRef.current) {
      const rect = measureRef.current.getBoundingClientRect();
      setMinH(rect.height);
    }
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure, tallestIndex, categories]);

  useEffect(() => {
    const onResize = () => measure();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measure]);

  if (categories.length === 0) return null;

  const slideVariants = {
    enter: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 40 : -40,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -40 : 40,
      transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
    }),
  };

  const [catKey, skills] = categories[idx];
  const catTitle = titleMap[catKey as string] ?? (catKey as string);

  return (
    <DarkContainer className="max-w-[94%] mx-auto">
      {/* Copy */}
      <motion.div
        id="skills"
        variants={headerVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
        className="flex flex-col max-w-[34rem] mb-30 max-[40rem]:px-4 max-[40rem]:mb-8"
      >
        {skillsData.header && (
          <p className="mb-2 text-color4 max-[40rem]:text-sm">
            {skillsData.header}
          </p>
        )}
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14 max-[40rem]:text-[2rem]">
          Let’s Explore Popular{" "}
          <span className="text-color0">Skills & Experience</span>
        </p>
        {skillsData.title && (
          <h2 className="text-[2.25rem] leading-tight max-[40rem]:text-[1.5rem]">
            {skillsData.title}
          </h2>
        )}
        {skillsData.description && (
          <p className="text-color4/80 mt-2.5 max-[40rem]:text-sm">
            {skillsData.description}
          </p>
        )}

        <div className="mt-8">
          <Button
            initial="hidden"
            animate="show"
            variants={ctaEnter}
            transition={{ delay: 0.35 }}
            whileHover={ctaHover}
            whileTap={ctaTap}
            className="cursor-pointer group"
          >
            <p className="font-bold max-[40rem]:text-sm">Explore More</p>
            <span>
              <IoIosArrowForward
                className="group-hover:ml-2 transition-all duration-300"
                size={20}
              />
            </span>
          </Button>
        </div>
      </motion.div>

      {/* Slider */}
      <div
        ref={containerRef}
        className="flex-1 max-w-[56rem] outline-none max-[40rem]:w-full max-[40rem]:px-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex items-center justify-between mb-4 max-[40rem]:mb-3">
          <h3 className="text-lg font-semibold max-[40rem]:text-base">
            {catTitle}
          </h3>
          <p className="text-sm text-color4/70 max-[40rem]:text-xs">
            {idx + 1} / {categories.length}
          </p>
        </div>

        {/* minHeight para evitar saltos */}
        <div style={{ minHeight: minH || undefined }}>
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={catKey}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              layout
              className="relative w-full h-full"
            >
              {/* Grid con stagger al entrar en viewport */}
              <motion.div
                variants={gridStagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-auto absolute max-[22.5rem]:grid-cols-1"
              >
                {(skills as any[]).map((skill, sidx) => {
                  const key = `${catKey}-${skill.tech ?? skill.title}-${sidx}`;
                  const pct = clamp(skill.level ?? 0);
                  const Icon = isIconType(skill.icon)
                    ? (skill.icon as IconType)
                    : null;

                  return (
                    <motion.div key={key} variants={card3D(sidx)}>
                      <ElementContainer
                        className="
                          group flex flex-col items-center gap-4 p-5 rounded-2xl
                          bg-[#171717] border border-border-color hover:border-color0 transition-colors duration-300
                          max-w-[10rem]
                          max-[40rem]:max-w-[7.5rem] max-[40rem]:p-3 max-[40rem]:gap-3
                        "
                      >
                        {/* Icono con pop */}
                        <motion.div
                          variants={iconPop}
                          className="h-10 flex items-center justify-center max-[40rem]:h-8"
                        >
                          {Icon ? (
                            <Icon className="w-10 h-10 text-color3 max-[40rem]:w-8 max-[40rem]:h-8" />
                          ) : skill.icon ? (
                            <img
                              src={skill.icon}
                              alt={String(skill.tech ?? skill.title)}
                              className="w-[6.5rem] h-[3.4375rem] object-contain max-[40rem]:w-[4.5rem] max-[40rem]:h-[2.4rem]"
                            />
                          ) : (
                            <span className="text-xs text-color4">Icon</span>
                          )}
                        </motion.div>

                        {/* Nombre */}
                        <p className="font-medium text-sm text-center max-[40rem]:text-xs">
                          {skill.tech ?? skill.title}
                        </p>

                        {/* Barra que se rellena al aparecer */}
                        <div className="w-full">
                          <div className="relative w-full h-2 rounded-full bg-border-color/60 overflow-hidden max-[40rem]:h-1.5">
                            <motion.div
                              variants={barVariant(pct)}
                              initial="hidden"
                              whileInView="visible"
                              viewport={{ once: true, amount: 0.6 }}
                              className="h-full rounded-full bg-color3"
                              role="progressbar"
                              aria-valuenow={pct}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                          <div className="mt-4 w-full max-[40rem]:mt-2">
                            <span className="block w-full text-center text-color3 text-[1.25rem] font-semibold bg-bg2-color transition-colors duration-300 group-hover:bg-color0 py-1 rounded-[.8rem] max-[40rem]:text-sm max-[40rem]:py-0.5">
                              {pct}%
                            </span>
                          </div>
                        </div>
                      </ElementContainer>
                    </motion.div>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="mt-22 flex items-center justify-center gap-4 max-[40rem]:mt-10 max-[40rem]:gap-3">
          <button
            onClick={() => {
              prev();
              resetAutoplay();
            }}
            className="rounded-full border border-border-color bg-[#171717] px-4 py-2 hover:bg-[#1f1f1f] transition max-[40rem]:px-3 max-[40rem]:py-1.5"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-5 h-5 max-[40rem]:w-4 max-[40rem]:h-4" />
          </button>

          <div className="flex items-center gap-2 max-[40rem]:gap-1.5">
            {categories.map(([, _], i) => (
              <button
                key={`dot-${i}`}
                onClick={() => {
                  setDirection(i > idx ? 1 : -1);
                  setIdx(i);
                  resetAutoplay();
                }}
                aria-label={`Go to category ${i + 1}`}
                className={[
                  "h-2 w-2 rounded-full transition max-[40rem]:h-1.5 max-[40rem]:w-1.5",
                  i === idx ? "bg-color3" : "bg-border-color",
                ].join(" ")}
              />
            ))}
          </div>

          <button
            onClick={() => {
              next();
              resetAutoplay();
            }}
            className="rounded-full border border-border-color bg-[#171717] px-4 py-2 hover:bg-[#1f1f1f] transition max-[40rem]:px-3 max-[40rem]:py-1.5"
            aria-label="Next category"
          >
            <ChevronRight className="w-5 h-5 max-[40rem]:w-4 max-[40rem]:h-4" />
          </button>
        </div>
      </div>

      {/* Medidor invisible para minHeight */}
      <div
        aria-hidden
        className="absolute opacity-0 pointer-events-none -z-50"
        style={{ visibility: "hidden", position: "absolute", left: -99999 }}
        ref={measureRef}
      >
        {categories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 max-[22.5rem]:grid-cols-1">
            {(categories[tallestIndex][1] as any[]).map(
              (skill: any, sidx: number) => {
                const pct = clamp(skill.level ?? 0);
                const Icon = isIconType(skill.icon)
                  ? (skill.icon as IconType)
                  : null;
                return (
                  <ElementContainer
                    key={`measure-${sidx}`}
                    className="
                    flex flex-col items-center gap-4 p-5 rounded-2xl bg-[#171717] border border-border-color
                    max-w-[10rem]
                    max-[40rem]:max-w-[7.5rem] max-[40rem]:p-3 max-[40rem]:gap-3
                  "
                  >
                    <div className="h-10 flex items-center justify-center max-[40rem]:h-8">
                      {Icon ? (
                        <Icon className="w-10 h-10 text-color3 max-[40rem]:w-8 max-[40rem]:h-8" />
                      ) : skill.icon ? (
                        <img
                          src={skill.icon}
                          alt=""
                          className="w-10 h-10 object-contain max-[40rem]:w-8 max-[40rem]:h-8"
                        />
                      ) : (
                        <span className="text-xs text-color4">Icon</span>
                      )}
                    </div>
                    <p className="font-medium text-sm text-center max-[40rem]:text-xs">
                      {skill.tech ?? skill.title}
                    </p>
                    <div className="w-full">
                      <div className="relative w-full h-2 rounded-full bg-border-color/60 overflow-hidden max-[40rem]:h-1.5">
                        <div
                          className="h-full rounded-full bg-color3"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-2 w-full">
                        <span className="block w-full text-center text-xs font-semibold bg-[#232323] py-1 rounded-md max-[40rem]:py-0.5">
                          {pct}%
                        </span>
                      </div>
                    </div>
                  </ElementContainer>
                );
              }
            )}
          </div>
        )}
      </div>
    </DarkContainer>
  );
};

export default Skills;
