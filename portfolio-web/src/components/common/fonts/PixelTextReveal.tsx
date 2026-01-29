import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PIXEL_FONT } from "./pixelFont";

interface PixelTextAssemblerProps {
  text: string;
  pixelSize?: number;
}

export default function PixelTextAssembler({
  text,
  pixelSize = 6,
}: PixelTextAssemblerProps) {
  const [activePixel, setActivePixel] = useState<number | null>(null);

  // total de píxeles reales (solo los "1")
  const totalPixels = text
    .toUpperCase()
    .split("")
    .reduce((acc, char) => {
      if (char === " ") return acc;
      const grid = PIXEL_FONT[char];
      return acc + (grid ? grid.flat().filter(Boolean).length : 0);
    }, 0);

  // inicia el scanner cuando termina el build
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
    <div className="flex gap-3">
      {text
        .toUpperCase()
        .split("")
        .map((char, charIndex) => {
          if (char === " ")
            return <div key={charIndex} style={{ width: pixelSize * 3 }} />;

          const grid = PIXEL_FONT[char];
          if (!grid) return null;

          return (
            <div
              key={charIndex}
              className="grid"
              style={{
                gridTemplateColumns: `repeat(${grid[0].length}, ${pixelSize}px)`,
                gap: 1,
              }}
            >
              {grid.flat().map((cell, i) => {
                let isActive = false;
                let delay = 0;

                if (cell === 1) {
                  delay = realPixelIndex * 0.012; // 🔥 BUILD progresivo
                  isActive = realPixelIndex === activePixel;
                  realPixelIndex++;
                }

                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: cell ? 1 : 0,
                      backgroundColor: cell
                        ? isActive
                          ? "#22c55e"
                          : "currentColor"
                        : "transparent",
                      boxShadow: isActive
                        ? "0 0 6px rgba(34,197,94,0.85)"
                        : "none",
                    }}
                    transition={{
                      delay,
                      duration: isActive ? 0.12 : 0.2,
                    }}
                    style={{
                      width: pixelSize,
                      height: pixelSize,
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
