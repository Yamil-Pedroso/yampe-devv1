import React from "react";
import { FaCode, FaEnvelope, FaServer, FaLaptopCode } from "react-icons/fa6";
import { AiOutlineApi } from "react-icons/ai";
import { BsBraces, BsBracesAsterisk } from "react-icons/bs";
import { motion } from "framer-motion";

const DEV_ICONS = [
  { Icon: FaCode, base: 32, pos: { top: "0rem", left: "2rem" } },
  { Icon: BsBraces, base: 38, pos: { top: "4rem", right: "30rem" } },
  { Icon: BsBracesAsterisk, base: 34, pos: { top: "30rem", right: "9rem" } },
  { Icon: FaEnvelope, base: 28, pos: { top: "16rem", right: "8rem" } },
  { Icon: FaLaptopCode, base: 30, pos: { bottom: "6rem", left: "6rem" } },
  { Icon: FaServer, base: 26, pos: { bottom: "8rem", right: "12rem" } },
  { Icon: AiOutlineApi, base: 40, pos: { top: "23rem", left: "5rem" } },
];

const GeomShapes = () => {
  return (
    <div className="relative w-full h-[320px]  2xl:h-[320px] ">
      {DEV_ICONS.map(({ Icon, base, pos }, i) => {
        // amplitud y velocidad ligeramente distintas para cada icono
        const amp = 5 + (i % 3) * 2; // 5,7,9...
        const period = 4.6 + (i % 4) * 0.7; // 4.6s, 5.3s, 6.0s, 6.7s...
        const floatDelay = 0.45 + i * 0.12; // inicia flote tras la entrada

        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: pos.top,
              left: pos.left,
              right: pos.right,
              bottom: pos.bottom,
              filter: Math.random() > 0.7 ? "blur(0.4px)" : "none",
            }}
            initial={{ opacity: 0, scale: 0.6, y: 30, rotate: -10 }}
            animate={{
              // quedan visibles siempre
              opacity: 1,
              scale: 1,
              rotate: 0,
              // flote infinito (solo se repite 'y')
              y: [0, -amp, 0, amp, 0],
            }}
            transition={{
              // entrada más rápida (no se repite)
              opacity: { duration: 0.18, ease: "easeOut", delay: i * 0.06 },
              scale: {
                type: "spring",
                stiffness: 520,
                damping: 28,
                delay: i * 0.06,
              },
              rotate: {
                type: "spring",
                stiffness: 420,
                damping: 32,
                delay: i * 0.06,
              },
              // flote asíncrono (se repite solo 'y')
              y: {
                duration: period,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: floatDelay,
              },
            }}
          >
            <Icon
              size={base}
              color={
                ["#e94f37", "#0eb1d2", "#7a7adb", "#f2a541", "#7bd389"][i % 5]
              }
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default GeomShapes;
