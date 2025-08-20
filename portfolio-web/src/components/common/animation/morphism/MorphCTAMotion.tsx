import { motion } from "framer-motion";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useMemo } from "react";

type MorphCTAMotionProps = {
  label?: string;
  color?: string; // fondo del shape
  textColor?: string; // color del texto/ícono
  widthIdle?: number; // ancho en reposo (círculo)
  widthHover?: number; // ancho en hover (rectángulo)
  height?: number; // alto fijo
};

const MorphCTAMotion: React.FC<MorphCTAMotionProps> = ({
  label = "View Details",
  color = "#FFA41C",
  textColor = "#0D1117",
  widthIdle = 56,
  widthHover = 220,
  height = 56,
}) => {
  // Paths en el mismo viewBox (0..100). Si notas salto, usa el rect FULL (comentado abajo).
  const CIRCLE = useMemo(() => "M50 5 A45 45 0 1 1 49.999 5 Z", []);
  // Rect “más rectangular” (esquinas leves). Para 100% recto: "M12 22 H88 V78 H12 Z"
  const RECT = useMemo(
    () =>
      "M18 22 H82 Q90 22 90 30 V70 Q90 78 82 78 H18 Q10 78 10 70 V30 Q10 22 18 22 Z",
    []
  );

  const wrapVariants = {
    rest: { width: widthIdle, borderRadius: height / 2 },
    hover: {
      width: widthHover,
      borderRadius: 12,
      transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
    },
  };

  const pathVariants = {
    rest: { d: CIRCLE },
    hover: {
      d: RECT,
      transition: { duration: 0.45, ease: "easeInOut" },
    },
  };

  const iconVariants = {
    rest: { opacity: 1, x: 0 },
    hover: {
      opacity: 0,
      x: 10,
      transition: { duration: 0.25, ease: "easeOut", delay: 0.12 },
    },
  };

  const textVariants = {
    rest: { opacity: 0, x: -6 },
    hover: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.28, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <motion.button
      initial="rest"
      whileHover="hover"
      whileFocus="hover"
      animate="rest"
      variants={wrapVariants}
      style={{ height, padding: 0, border: 0, background: "transparent" }}
      className="relative inline-flex items-center justify-center overflow-hidden"
      aria-label={label}
    >
      {/* Shape animado (ocupa todo) */}
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        className="absolute inset-0 block"
        aria-hidden="true"
      >
        <motion.path
          variants={pathVariants}
          fill={color}
          // Si tu path no morfea suave, prueba este rect 100% recto:
          // initial={false} d="M12 22 H88 V78 H12 Z"
        />
      </svg>

      {/* Ícono dentro del círculo (desaparece en hover) */}
      <motion.span
        variants={iconVariants}
        className="relative z-[1] flex items-center justify-center pointer-events-none"
        style={{ color: textColor, fontSize: 22, lineHeight: 0 }}
      >
        <MdOutlineArrowOutward />
      </motion.span>

      {/* Texto centrado (solo visible en rectángulo) */}
      <motion.span
        variants={textVariants}
        className="absolute inset-0 z-[1] flex items-center justify-center select-none"
        style={{
          color: textColor,
          fontWeight: 700,
          fontSize: 14,
          lineHeight: 1,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {label}
      </motion.span>
    </motion.button>
  );
};

export default MorphCTAMotion;
