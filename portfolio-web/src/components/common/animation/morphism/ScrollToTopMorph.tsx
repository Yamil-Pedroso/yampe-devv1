import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

type ScrollToTopMorphProps = {
  sizeRem?: number;
  color?: string;
  hoverScale?: number;
  ariaLabel?: string;
  className?: string;
};

const ScrollToTopMorph: React.FC<ScrollToTopMorphProps> = ({
  sizeRem = 5,
  color = "#FFA41C",
  hoverScale = 1.02,
  ariaLabel = "Scroll to top",
  className,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  // Cuadrado con esquinas suaves
  const SQUARE_ROUNDED =
    "M18 22 H82 A6 6 0 0 1 88 28 V72 A6 6 0 0 1 82 78 H18 A6 6 0 0 1 12 72 V28 A6 6 0 0 1 18 22 Z";
  // Flecha hacia arriba con puntas suavizadas
  const TRIANGLE_UP_ROUNDED =
    "M52 17 L88 86 A3 3 0 0 1 85 89 H15 A3 3 0 0 1 12 86 L48 17 A3 3 0 0 1 52 17 Z";

  useEffect(() => {
    if (!btnRef.current || !pathRef.current) return;

    gsap.set(btnRef.current, {
      width: `${sizeRem}rem`,
      height: `${sizeRem}rem`,
    });
    gsap.set(pathRef.current, {
      attr: { d: SQUARE_ROUNDED },
      fill: color,
      y: 0,
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ paused: true });

    // 1) Morph a flecha
    tl.to(
      pathRef.current,
      {
        morphSVG: TRIANGLE_UP_ROUNDED,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0
    )
      // 2) Ligerísimo scale del botón
      .to(
        btnRef.current,
        {
          scale: hoverScale,
          duration: 0.25,
          ease: "power2.out",
        },
        0
      )
      // 3) Empujoncito hacia arriba de la flecha
      .to(
        pathRef.current,
        {
          y: -6, // súbelo más/menos a tu gusto
          duration: 0.25,
          ease: "power2.out",
        },
        0.15
      );

    const enter = () => tl.play();
    const leave = () => tl.reverse();

    const el = btnRef.current;
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    el.addEventListener("focus", enter);
    el.addEventListener("blur", leave);

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      el.removeEventListener("focus", enter);
      el.removeEventListener("blur", leave);
      tl.kill();
    };
  }, [sizeRem, color, hoverScale]);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center  ${className || ""}`}
      style={{
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        className="block"
        aria-hidden="true"
      >
        <path ref={pathRef} d={SQUARE_ROUNDED} />
      </svg>
    </button>
  );
};

export default ScrollToTopMorph;
