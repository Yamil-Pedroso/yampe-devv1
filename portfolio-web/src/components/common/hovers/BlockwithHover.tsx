import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BlockwithhHover = ({ children }: { children: React.ReactNode }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const updateMousePosition = (e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!isHovering) return;
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => updateMousePosition(e));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovering]);

  useEffect(() => {
    const body = document.body;
    if (isHovering) {
      body.classList.add("cursor-hidden");
    } else {
      body.classList.remove("cursor-hidden");
    }
    return () => {
      body.classList.remove("cursor-hidden");
    };
  }, [isHovering]);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className="relative w-full  overflow-hidden"
    >
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute pointer-events-none z-50 flex items-center justify-center text-white font-semibold"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 18 }}
            style={{
              left: coords.x - 64,
              top: coords.y - 64,
              width: "9rem",
              height: "9rem",
              borderRadius: "9999px",
              background: "rgba(255, 255, 255, 0.4)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              position: "absolute",
              transform: "translate(-50%, -50%)",
              fontSize: "1.25rem",
            }}
          >
            <span className="text-2xl uppercase text-black">explore</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default BlockwithhHover;
