"use client";
import { useEffect, useState } from "react";

export function useScrollThreshold(threshold = 300) {
  const [passed, setPassed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      const y =
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
      setPassed(y >= threshold);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };

    // escuchar ambos, por si usas Lenis u otro smooth scroll
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true });

    update(); // estado inicial

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll);
    };
  }, [threshold]);

  return passed;
}
