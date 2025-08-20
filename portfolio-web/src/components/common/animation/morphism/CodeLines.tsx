// components/ProgrammerCurvyBurst.tsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  className?: string;
  stroke?: string;
  strokeWidth?: number;
  width?: number;
  height?: number;
};

const CodeLines: React.FC<Props> = ({
  className = " ",
  stroke = "#E6EDF3",
  strokeWidth = 8,
  width = 800,
  height = 800,
}) => {
  const root = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const viewBox = { w: 800, h: 300 };
  const cx = viewBox.w / 4;
  const cy = viewBox.h / 2;

  // Aquí usamos paths curvos con Q (quadratic Bézier)
  const paths = [
    // MacBook (contorno curvo y base)
    "M190 220 Q280 240 370 220 Q360 230 200 230 Z",
    // pantalla con bordes redondeados
    "M200 120 Q200 110 210 110 H350 Q360 110 360 120 V210 Q360 220 350 220 H210 Q200 220 200 210 Z",
    // cabeza curva
    "M260 65 Q280 40 300 65 Q310 85 280 105 Q250 85 260 65 Z",
    // cuello redondeado
    "M270 108 Q278 118 286 108 Q280 122 274 122 Z",
    // hombros
    "M230 140 Q280 150 330 140 Q310 160 250 160 Z",
    // brazos apoyados
    "M220 185 Q250 200 260 215 Q240 210 220 200 Z",
    "M300 215 Q310 200 340 185 Q320 210 300 215 Z",
    // teclado suelto
    "M220 225 Q280 240 340 225",
    // logo mini
    "M278 168 Q280 165 282 168 Q280 171 278 168 Z",
  ];

  useLayoutEffect(() => {
    if (!svgRef.current) return;

    const ctx = gsap.context(() => {
      const elems = gsap.utils.toArray<SVGPathElement>("path[data-part]");
      gsap.set(elems, { transformOrigin: "80% 80%" });

      let oldX = 0,
        oldY = 0,
        vX = 0,
        vY = 0;

      const onMove = (e: MouseEvent) => {
        vX = e.clientX - oldX;
        vY = e.clientY - oldY;
        oldX = e.clientX;
        oldY = e.clientY;
      };
      svgRef.current!.addEventListener("mousemove", onMove);

      const onEnter = () => {
        gsap
          .to(elems, {
            x: (i, el: any) => {
              const bb = el.getBBox();
              const dx = bb.x + bb.width / 2 - cx;
              return dx * 0.15 + vX * 0.6 + gsap.utils.random(-15, 15);
            },
            y: (i, el: any) => {
              const bb = el.getBBox();
              const dy = bb.y + bb.height / 2 - cy;
              return dy * 0.15 + vY * 0.6 + gsap.utils.random(-15, 15);
            },
            rotate: () => gsap.utils.random(-12, 12, 0.5),
            ease: "power2.out",
            duration: 0.4,
            stagger: { each: 0.01, from: "center" },
          })
          .then(() => {
            gsap.to(elems, {
              x: 0,
              y: 0,
              rotate: 0,
              ease: "elastic.out(1,0.6)",
              duration: 1.1,
              stagger: { each: 0.004, from: "edges" },
            });
          });
      };

      svgRef.current!.addEventListener("mouseenter", onEnter);

      return () => {
        svgRef.current?.removeEventListener("mousemove", onMove);
        svgRef.current?.removeEventListener("mouseenter", onEnter);
      };
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width, height }}
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewBox.w} ${viewBox.h}`}
        width="100%"
        height="100%"
        aria-label="Curvy developer with MacBook"
      >
        <g
          stroke={stroke}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#2a2a2a"
          transform="scale(1.8) translate(-100 -70)"
        >
          {paths.map((d, i) => (
            <path key={i} data-part d={d} />
          ))}
        </g>
      </svg>
    </div>
  );
};

export default CodeLines;
