import React, { useMemo, useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skillsData } from "@/data/skillsData";
import ElementContainer from "../common/element-container/ElementContainer";
import gsap from "gsap";
// InertiaPlugin from GSAP (asegúrate de tenerlo instalado en tu proyecto)
// Si TypeScript se queja de tipos, puedes añadir un d.ts o usar @ts-ignore al registrar
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { InertiaPlugin } from "gsap/InertiaPlugin";

// ---- Utils ----
const clamp = (n: number, min = 0, max = 100) =>
  Math.max(min, Math.min(max, n));
const abbr = (name: string) => {
  const cleaned = name.replaceAll(".", " ").replaceAll("+", " ");
  const parts = cleaned.split(" ").filter(Boolean);
  const first = parts[0] ?? name;
  const firstChar = first.charAt(0).toUpperCase();
  const secondChar = (
    parts[1]?.charAt(0) ||
    first.charAt(1) ||
    ""
  ).toLowerCase();
  return (firstChar + secondChar).slice(0, 2);
};

// ---- Types ----
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

// ---- Variants ----
const makeTileVariants = (noMotion: boolean) => ({
  hidden: { opacity: noMotion ? 1 : 0, y: noMotion ? 0 : 8, scale: 1 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: noMotion
      ? { duration: 0 }
      : { delay: i * 0.015, duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  }),
});

/**
 * SkillsPeriodicGrid (responsive + GSAP inertia hover)
 * - Mantiene tu estilo actual (Tailwind + ElementContainer)
 * - Añade animación GSAP tipo MWG: al entrar el mouse en una "media" se hace un empujón inercial + pequeño giro
 */
const SkillsPeriodicGrid: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const tileVariants = makeTileVariants(!!reduceMotion);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const oldX = useRef(0);
  const oldY = useRef(0);
  const deltaX = useRef(0);
  const deltaY = useRef(0);

  // Aplanamos todas las skills conservando su categoría
  const flat = useMemo(() => {
    const src = (skillsData?.skills ?? {}) as SkillsGroups;
    const items: Array<SkillItem & { category: string }> = [];
    order.forEach((key) => {
      (src[key] || []).forEach((s) => items.push({ ...s, category: key }));
    });
    return items;
  }, []);

  // GSAP setup (mousemove delta + hover timelines)
  useEffect(() => {
    if (!rootRef.current) return;
    gsap.registerPlugin(InertiaPlugin);

    const root = rootRef.current;

    const onMove = (e: MouseEvent) => {
      deltaX.current = e.clientX - oldX.current;
      deltaY.current = e.clientY - oldY.current;
      oldX.current = e.clientX;
      oldY.current = e.clientY;
    };

    root.addEventListener("mousemove", onMove);

    const medias = Array.from(root.querySelectorAll<HTMLElement>(".media"));
    const handlers: Array<{ el: HTMLElement; fn: (e: Event) => void }> = [];

    medias.forEach((el) => {
      const fn = () => {
        const img =
          (el.querySelector(".js-img") as HTMLElement | null) ||
          (el.querySelector("img") as HTMLElement | null) ||
          el; // fallback al contenedor

        if (!img) return;

        const tl = gsap.timeline({ onComplete: () => tl.kill() });
        tl.timeScale(1.2);

        tl.to(img, {
          inertia: {
            x: { velocity: deltaX.current * 30, end: 0 },
            y: { velocity: deltaY.current * 30, end: 0 },
          },
        });

        tl.fromTo(
          img,
          { rotate: 0 },
          {
            duration: 0.4,
            rotate: (Math.random() - 0.5) * 30,
            yoyo: true,
            repeat: 1,
            ease: "power1.inOut",
          },
          "<"
        );
      };

      el.addEventListener("mouseenter", fn);
      handlers.push({ el, fn });
    });

    return () => {
      root.removeEventListener("mousemove", onMove);
      handlers.forEach(({ el, fn }) =>
        el.removeEventListener("mouseenter", fn)
      );
    };
  }, []);

  if (flat.length === 0) return null;

  return (
    <div
      ref={rootRef}
      className="w-full mx-auto px-3 sm:px-4 md:px-6 mwg_effect000"
    >
      <div className="mb-3 sm:mb-4 hidden sm:flex flex-wrap gap-2 text-[11px] sm:text-xs text-color4/80">
        {order.map((k) => (
          <span
            key={k}
            className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-[#171717] border border-border-color"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-color3" />
            {titleMap[k]}
          </span>
        ))}
      </div>

      {/* Grid responsive tipo tabla periódica techs */}
      <div
        role="grid"
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 sm:gap-3 md:gap-4 "
      >
        {flat.map((item, i) => {
          const pct = clamp(item.level ?? 0);
          return (
            <motion.div
              key={`${item.category}-${item.tech}-${i}`}
              className="relative"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={tileVariants}
            >
              <ElementContainer
                className={`relative  flex flex-col min-h-36 sm:min-h-40 md:min-h-44 xl:p-6 xl:min-h-36 rounded-2xl bg-[#151515] border border-border-color hover:border-color0 transition-colors duration-300 overflow-hidden hover:-translate-y-0.5 will-change-transform opacity-50 grayscale-100 hover:opacity-100 hover:grayscale-0 group`}
              >
                <div className="absolute top-2 left-2 text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-md bg-bg2-color/60 border border-border-color">
                  {titleMap[item.category]}
                </div>

                <div className="absolute top-2 right-2 text-[10px] sm:text-xs font-semibold px-1.5 py-0.5 rounded-full bg-color3 text-white shadow-md ring-1 ring-black/30">
                  {pct}%
                </div>

                <div className="flex-1 px-2 grid place-items-center media">
                  {item.icon ? (
                    <img
                      src={item.icon}
                      alt={item.tech}
                      className="js-img block w-[62%] sm:w-[64%] md:w-[66%] max-h-[66%] object-contain pointer-events-none"
                      loading="lazy"
                    />
                  ) : (
                    <div className="js-img flex flex-col items-center justify-center select-none">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
                        {abbr(item.tech)}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-2 sm:p-2.5">
                  <p className="truncate text-[0.78rem] sm:text-[0.82rem] md:text-sm leading-tight text-center">
                    {item.tech}
                  </p>
                  <div className="mt-1.5 sm:mt-2 h-1.5 rounded-full bg-border-color/60 overflow-hidden">
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
    </div>
  );
};

export default SkillsPeriodicGrid;
