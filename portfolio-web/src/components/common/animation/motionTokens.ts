import type { Variants, TargetAndTransition } from "framer-motion";

const easeOutCubic = [0.16, 1, 0.3, 1] as const;

export const ctaEnter: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.26,
      ease: easeOutCubic,
    },
  },
};

export const ctaHover: TargetAndTransition = {
  transition: { type: "spring", stiffness: 380, damping: 22 },
};

export const ctaTap: TargetAndTransition = {
  transition: { duration: 0.18, ease: easeOutCubic },
};

export const arrowHover: TargetAndTransition = {
  x: 4,
  transition: { type: "spring", stiffness: 300, damping: 18 },
};
