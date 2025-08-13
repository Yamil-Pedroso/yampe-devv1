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
import { AnimatePresence, motion } from "framer-motion";

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

const Skills: React.FC = () => {
  // Normaliza y ordena categorías
  const categories = useMemo(() => {
    const src = skillsData.skills ?? {};
    return order
      .map((k) => [k, (src as any)[k]] as const)
      .filter(([, skills]) => Array.isArray(skills) && skills.length > 0);
  }, []);

  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1); // 1 next, -1 prev
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

  // Autoplay
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

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.matches(":focus-within,:hover")) return;
      if (e.key === "ArrowRight") {
        next();
        resetAutoplay();
      } else if (e.key === "ArrowLeft") {
        prev();
        resetAutoplay();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev, resetAutoplay]);

  // --- ALTURA FIJA DEL SLIDE ---
  // Calcula cuál categoría es la más alta (por cantidad de items)
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

  // Medición de altura de la categoría más alta
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

  const [catKey, skills] = categories[idx];
  const catTitle = titleMap[catKey as string] ?? (catKey as string);

  return (
    <section className="flex mt-50 bg-[#070707] h-auto p-[6rem] gap-12">
      {/* Izquierda: copy */}
      <div className="flex flex-col mx-auto max-w-[34rem]">
        {skillsData.header && (
          <p className="mb-2 text-color4">{skillsData.header}</p>
        )}
        <p className="text-[2.8125rem] max-w-[45rem] text-base/14">
          Let’s Explore Popular{" "}
          <span className="text-color0">Skills & Experience</span>
        </p>
        {skillsData.title && (
          <h2 className="text-[2.25rem] leading-tight ">{skillsData.title}</h2>
        )}
        {skillsData.description && (
          <p className="text-color4/80 mt-2.5">{skillsData.description}</p>
        )}
      </div>

      {/* Derecha: Slider */}
      <div
        ref={containerRef}
        className="flex-1 max-w-[56rem] outline-none"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Header del grupo */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">{catTitle}</h3>
          <p className="text-sm text-color4/70">
            {idx + 1} / {categories.length}
          </p>
        </div>

        {/* Contenedor con altura mínima fija (medida) */}
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
              {/* Grid del slide actual */}
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 h-auto absolute">
                {(skills as any[]).map((skill, sidx) => {
                  const key = `${catKey}-${skill.tech ?? skill.title}-${sidx}`;
                  const pct = clamp(skill.level ?? 0);
                  const Icon = isIconType(skill.icon)
                    ? (skill.icon as IconType)
                    : null;

                  return (
                    <ElementContainer
                      key={key}
                      className={`group flex flex-col max-w-[10rem] items-center gap-4 p-5 rounded-2xl bg-[#171717] border border-border-color hover:border-color0 transition-colors duration-300`}
                    >
                      {/* Icono */}
                      <div className="h-10 flex items-center justify-center">
                        {Icon ? (
                          <Icon className="w-10 h-10 text-color3" />
                        ) : skill.icon ? (
                          <img
                            src={skill.icon}
                            alt={String(skill.tech ?? skill.title)}
                            className="w-[6.5rem] h-[3.4375rem] object-contain"
                          />
                        ) : (
                          <span className="text-xs text-color4">Icon</span>
                        )}
                      </div>

                      {/* Nombre */}
                      <p className="font-medium text-sm text-center">
                        {skill.tech ?? skill.title}
                      </p>

                      {/* Porcentaje */}
                      <div className="w-full">
                        <div className="relative w-full h-2 rounded-full bg-border-color/60 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-color3 transition-[width] duration-500"
                            style={{ width: `${pct}%` }}
                            role="progressbar"
                            aria-valuenow={pct}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <div className="mt-4 w-full">
                          <span className="block w-full text-center text-color3 text-[1.25rem] font-semibold bg-bg2-color transition-colors duration-300 group-hover:bg-color0 py-1 rounded-[.8rem]">
                            {pct}%
                          </span>
                        </div>
                      </div>
                    </ElementContainer>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controles */}
        <div className="mt-22 flex items-center justify-center gap-4">
          <button
            onClick={() => {
              prev();
              resetAutoplay();
            }}
            className="rounded-full border border-border-color bg-[#171717] px-4 py-2 hover:bg-[#1f1f1f] transition"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
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
                  "h-2 w-2 rounded-full transition",
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
            className="rounded-full border border-border-color bg-[#171717] px-4 py-2 hover:bg-[#1f1f1f] transition"
            aria-label="Next category"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ---- Medidor invisible para altura máxima ---- */}
      <div
        aria-hidden
        className="absolute opacity-0 pointer-events-none -z-50"
        style={{ visibility: "hidden", position: "absolute", left: -99999 }}
        ref={measureRef}
      >
        {categories.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {(categories[tallestIndex][1] as string[]).map(
              (skill: any, sidx: number) => {
                const pct = clamp(skill.level ?? 0);
                const Icon = isIconType(skill.icon)
                  ? (skill.icon as IconType)
                  : null;
                return (
                  <ElementContainer
                    key={`measure-${sidx}`}
                    className="flex flex-col max-w-[10rem] items-center gap-4 p-5 rounded-2xl bg-[#171717] border border-border-color"
                  >
                    <div className="h-10 flex items-center justify-center">
                      {Icon ? (
                        <Icon className="w-10 h-10 text-color3" />
                      ) : skill.icon ? (
                        <img
                          src={skill.icon}
                          alt=""
                          className="w-10 h-10 object-contain"
                        />
                      ) : (
                        <span className="text-xs text-color4">Icon</span>
                      )}
                    </div>
                    <p className="font-medium text-sm text-center">
                      {skill.tech ?? skill.title}
                    </p>
                    <div className="w-full">
                      <div className="relative w-full h-2 rounded-full bg-border-color/60 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-color3"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="mt-2 w-full">
                        <span className="block w-full text-center text-xs font-semibold bg-[#232323] py-1 rounded-md">
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
    </section>
  );
};

export default Skills;
