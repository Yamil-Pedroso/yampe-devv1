import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { MdOutlineArrowOutward } from "react-icons/md";

gsap.registerPlugin(MorphSVGPlugin);

type MorphCTAProps = {
  label?: string;
  color?: string;
  textColor?: string;
  widthIdle?: number;
  widthHover?: number;
  height?: number;
  onClick?: () => void;
};

const MorphCTA: React.FC<MorphCTAProps> = ({
  label = "View Details",
  color = "#FFA41C",
  textColor = "#0D1117",
  widthIdle = 56,
  widthHover = 220,
  height = 56,
  onClick,
}) => {
  const wrapRef = useRef<HTMLButtonElement | null>(null);
  const shapeRef = useRef<SVGPathElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);

  const CIRCLE = "M50 5 A45 45 0 1 1 49.999 5 Z";
  const RECT =
    "M18 22 H82 Q90 22 90 30 V70 Q90 78 82 78 H18 Q10 78 10 70 V30 Q10 22 18 22 Z";

  useEffect(() => {
    if (
      !wrapRef.current ||
      !shapeRef.current ||
      !textRef.current ||
      !iconRef.current
    )
      return;

    gsap.set(wrapRef.current, {
      width: widthIdle,
      height,
      borderRadius: height / 2,
    });
    gsap.set(shapeRef.current, { attr: { d: CIRCLE }, fill: color });
    gsap.set(iconRef.current, { opacity: 1, x: 0, color: textColor, scale: 1 });
    gsap.set(textRef.current, { opacity: 0, x: -6 });

    const tl = gsap.timeline({ paused: true });

    tl.to(
      wrapRef.current,
      {
        width: widthHover,
        borderRadius: 12,
        duration: 0.35,
        ease: "power2.out",
      },
      0
    );

    tl.to(
      shapeRef.current,
      {
        morphSVG: RECT,
        duration: 0.45,
        ease: "power2.inOut",
      },
      0
    );

    tl.to(
      iconRef.current,
      {
        x: 10,
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.out",
      },
      0.12
    );

    tl.to(
      textRef.current,
      {
        opacity: 1,
        x: 0,
        duration: 0.28,
        ease: "power2.out",
      },
      0.2
    );

    const onEnter = () => tl.play();
    const onLeave = () => tl.reverse();

    const btn = wrapRef.current;
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("focus", onEnter);
    btn.addEventListener("blur", onLeave);

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("focus", onEnter);
      btn.removeEventListener("blur", onLeave);
      tl.kill();
    };
  }, [widthIdle, widthHover, height, color, textColor]);

  return (
    <button
      ref={wrapRef}
      onClick={onClick}
      type="button"
      aria-label={label}
      className="inline-flex items-center justify-center relative overflow-hidden cursor-pointer"
      style={{
        padding: 0,
        border: 0,
        background: "transparent",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <svg
        viewBox="0 0 100 100"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        className="absolute inset-0 block"
        aria-hidden="true"
      >
        <path ref={shapeRef} d={CIRCLE} fill={color} />
      </svg>

      <span
        ref={iconRef}
        className="relative z-[1] flex items-center justify-center pointer-events-none"
        style={{ fontSize: 22, lineHeight: 0, color: textColor }}
      >
        <MdOutlineArrowOutward />
      </span>

      <span
        ref={textRef}
        className="absolute inset-0 z-[1] flex items-center justify-center select-none"
        style={{
          fontWeight: 700,
          fontSize: 14,
          color: textColor,
          lineHeight: 1,
          whiteSpace: "nowrap",
          pointerEvents: "none",
        }}
      >
        {label}
      </span>
    </button>
  );
};

export default MorphCTA;
