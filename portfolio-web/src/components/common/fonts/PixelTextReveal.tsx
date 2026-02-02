import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PIXEL_FONT } from "./PixelFont";

interface PixelTextAssemblerProps {
  text: string;
  pixelSize?: number;
  mdPixelSize?: number;
  smPixelSize?: number;
}

/* ----------------------------------------
   Hook responsive
----------------------------------------- */
function usePixelSize(desktop: number, tablet: number, mobile: number) {
  const [size, setSize] = useState(desktop);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;

      if (w <= 600) setSize(mobile);
      else if (w <= 768) setSize(tablet);
      else setSize(desktop);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [desktop, tablet, mobile]);

  return size;
}

/* ----------------------------------------
   Componente
----------------------------------------- */
export default function PixelTextAssembler({
  text,
  pixelSize = 7,
  mdPixelSize = 5,
  smPixelSize = 4,
}: PixelTextAssemblerProps) {
  const size = usePixelSize(pixelSize, mdPixelSize, smPixelSize);
  const [activePixel, setActivePixel] = useState<number | null>(null);

  // total de píxeles reales
  const totalPixels = text
    .toUpperCase()
    .split("")
    .reduce((acc, char) => {
      if (char === " ") return acc;
      const grid = PIXEL_FONT[char];
      return acc + (grid ? grid.flat().filter(Boolean).length : 0);
    }, 0);

  const halfPoint = totalPixels / 2;

  // scanner animado
  useEffect(() => {
    const buildDuration = totalPixels * 14;

    const timeout = setTimeout(() => {
      let index = 0;

      const interval = setInterval(() => {
        setActivePixel(index);
        index = (index + 1) % totalPixels;
      }, 140);

      return () => clearInterval(interval);
    }, buildDuration);

    return () => clearTimeout(timeout);
  }, [totalPixels]);

  let realPixelIndex = 0;

  return (
    <div className="flex gap-3 leading-none">
      {text
        .toUpperCase()
        .split("")
        .map((char, charIndex) => {
          if (char === " ")
            return <div key={charIndex} style={{ width: size * 3 }} />;

          const grid = PIXEL_FONT[char];
          if (!grid) return null;

          return (
            <div
              key={charIndex}
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${grid[0].length}, ${size}px)`,
                gap: 1,
              }}
            >
              {grid.flat().map((cell, i) => {
                let isActive = false;
                let delay = 0;
                //let pixelIndex = realPixelIndex;

                if (cell === 1) {
                  delay = realPixelIndex * 0.012;
                  isActive = realPixelIndex === activePixel;
                  realPixelIndex++;
                }

                const activeColor =
                  activePixel !== null && activePixel >= halfPoint
                    ? "#60a0ff"
                    : "#be7dff";

                const activeGlow =
                  activePixel !== null && activePixel >= halfPoint
                    ? "0 0 6px rgba(96,160,255,0.85)"
                    : "0 0 6px rgba(190,125,255,0.85)";

                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: cell ? 1 : 0,
                      backgroundColor: cell
                        ? isActive
                          ? activeColor
                          : "currentColor"
                        : "transparent",
                      boxShadow: isActive ? activeGlow : "none",
                    }}
                    transition={{
                      delay,
                      duration: isActive ? 0.12 : 0.2,
                    }}
                    style={{
                      width: size,
                      height: size,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
