import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SHAPES = [
  // Square
  "M8 8 H56 V56 H8 Z",

  // Code </>
  "M18 20 L10 32 L18 44 M46 20 L54 32 L46 44 M24 48 L40 16",

  // Brackets {}
  "M26 16 Q18 24 26 32 Q18 40 26 48 M38 16 Q46 24 38 32 Q46 40 38 48",

  // Circle (anchor shape for smooth morph)
  "M32 20 A12 12 0 1 0 32 44 A12 12 0 1 0 32 20",
];

export default function DevOrganicRotateLoader() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % SHAPES.length);
    }, 1600); // ritmo orgánico

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.svg
        width="72"
        height="72"
        viewBox="0 0 64 64"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 6,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        <motion.path
          d={SHAPES[index]}
          fill="none"
          stroke="#4ade80"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{ d: SHAPES[index] }}
          transition={{
            duration: 1.2,
            ease: "easeInOut",
          }}
          style={{
            filter: "drop-shadow(0 0 6px rgba(74,222,128,0.45))",
          }}
        />
      </motion.svg>
    </div>
  );
}
