import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

interface HamburgerToXProps {
  isOpen?: boolean;
  toggleMenu?: () => void;
  width?: number;
  height?: number;
}

gsap.registerPlugin(MorphSVGPlugin);

const HamburgerToX: React.FC<HamburgerToXProps> = ({
  isOpen,
  toggleMenu,
  width = 44,
  height = 44,
}) => {
  const [open, setOpen] = useState(false);
  const topRef = useRef<SVGPathElement | null>(null);
  const bottomRef = useRef<SVGPathElement | null>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const TOP_BAR = "M20 34 H80";
  const BOTTOM_BAR = "M20 66 H80";

  const SLASH = "M28 28 L72 72";
  const BACKSLASH = "M28 72 L72 28";

  useEffect(() => {
    if (!topRef.current || !bottomRef.current) return;

    const tl = gsap.timeline({
      paused: true,
      defaults: { duration: 0.45, ease: "power2.inOut" },
    });

    tl.to(topRef.current, { morphSVG: SLASH }, 0)
      .to(bottomRef.current, { morphSVG: BACKSLASH }, 0)

      .to([topRef.current, bottomRef.current], { strokeWidth: 7 }, 0)
      .addPause("+=0");

    tlRef.current = tl;

    gsap.set(topRef.current, { attr: { d: TOP_BAR } });
    gsap.set(bottomRef.current, { attr: { d: BOTTOM_BAR } });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (!tlRef.current) return;
    if (isOpen) tlRef.current.play();
    else tlRef.current.reverse();
  }, [isOpen]);

  return (
    <button
      aria-label={isOpen ? "close menu" : "open menu"}
      onClick={() => {
        setOpen(!open);
        if (toggleMenu) toggleMenu();
      }}
      className="group inline-flex items-center justify-center rounded-full p-2 bg-color0 cursor-pointer"
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      <svg
        viewBox="0 0 100 100"
        width={width}
        height={height}
        className={`block w-8 h-8 sm:w-10 sm:h-10`}
        role="img"
        aria-hidden="true"
      >
        <path
          ref={topRef}
          d={TOP_BAR}
          fill="none"
          stroke="#000"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          ref={bottomRef}
          d={BOTTOM_BAR}
          fill="none"
          stroke="#000"
          strokeWidth={7}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};

export default HamburgerToX;
