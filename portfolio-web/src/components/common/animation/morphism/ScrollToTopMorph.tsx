import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

type ScrollToTopMorphProps = {
  sizeRem?: number;
  hoverScale?: number;
  ariaLabel?: string;
  className?: string;
};

const ScrollToTopMorph: React.FC<ScrollToTopMorphProps> = ({
  sizeRem = 5,
  hoverScale = 1.02,
  ariaLabel = "Scroll to top",
  className,
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);

  const SQUARE_ROUNDED =
    "M18 22 H82 A6 6 0 0 1 88 28 V72 A6 6 0 0 1 82 78 H18 A6 6 0 0 1 12 72 V28 A6 6 0 0 1 18 22 Z";

  const TRIANGLE_UP_ROUNDED =
    "M52 17 L88 86 A3 3 0 0 1 85 89 H15 A3 3 0 0 1 12 86 L48 17 A3 3 0 0 1 52 17 Z";

  useEffect(() => {
    if (!btnRef.current || !pathRef.current) return;

    gsap.set(btnRef.current, {
      width: `${sizeRem}rem`,
      height: `${sizeRem}rem`,
    });

    // Important: fill must reference the gradient in SVG
    gsap.set(pathRef.current, {
      attr: { d: SQUARE_ROUNDED },
      fill: "url(#scrollGradient)",
      y: 0,
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ paused: true });

    tl.to(
      pathRef.current,
      {
        morphSVG: TRIANGLE_UP_ROUNDED,
        duration: 0.5,
        ease: "power2.inOut",
      },
      0
    )
      .to(
        btnRef.current,
        {
          scale: hoverScale,
          duration: 0.25,
          ease: "power2.out",
        },
        0
      )
      .to(
        pathRef.current,
        {
          y: -6,
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

    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
      tl.kill();
    };
  }, [sizeRem, hoverScale]);

  const handleClick = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      ref={btnRef}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={`inline-flex items-center justify-center ${className || ""}`}
      style={{
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
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
        <defs>
          {/* Your purple → blue brand gradient */}
          <linearGradient
            id="scrollGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#a855f7" /> {/* purple-500 */}
            <stop offset="100%" stopColor="#3b82f6" /> {/* blue-500 */}
          </linearGradient>
        </defs>

        <path ref={pathRef} d={SQUARE_ROUNDED} />
      </svg>
    </button>
  );
};

export default ScrollToTopMorph;
