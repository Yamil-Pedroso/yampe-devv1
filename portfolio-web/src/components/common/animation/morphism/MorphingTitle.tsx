import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

gsap.registerPlugin(MorphSVGPlugin);

// Monitor (pantalla con base)
const monitorPath = "M15,25 H85 V65 H15 Z M40,70 H60 V75 H40 Z";

// Móvil
const mobilePath =
  "M35,10 H65 Q70,10 70,15 V85 Q70,90 65,90 H35 Q30,90 30,85 V15 Q30,10 35,10 Z M47,82 H53 V86 H47 Z";

// Nube más clara y redondeada
const cloudPath =
  "M30,60 Q25,50 35,45 Q37,35 47,35 Q52,28 60,32 Q67,30 72,36 Q78,36 82,42 Q87,46 85,54 Q90,58 87,64 Q83,70 75,70 H38 Q32,70 30,65 Z";

// Código (</>)
const codePath = "M30,20 L20,50 L30,80 M70,20 L80,50 L70,80 M45,20 L55,80";

// Engranaje ⚙️
const gearPath =
  "M50,30 A20,20 0 1,0 50,70 A20,20 0 1,0 50,30 Z M50,20 L50,10 M50,90 L50,80 M20,50 L10,50 M90,50 L80,50 M30,30 L22,22 M70,70 L78,78 M30,70 L22,78 M70,30 L78,22";

// Servidor / Database 🗄️
const serverPath =
  "M25,25 H75 Q85,25 85,35 V65 Q85,75 75,75 H25 Q15,75 15,65 V35 Q15,25 25,25 Z M25,45 H75 M25,55 H75";

const MorphingDevTitle = () => {
  const pathRef = useRef<SVGPathElement | null>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const tl = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.2, // pausa entre ciclos
      defaults: { duration: 1, ease: "power2.inOut" }, // más lento y fluido
    });

    tl.to(pathRef.current, { morphSVG: mobilePath }, "+=1.4") // espera 1.2s antes de empezar
      .to(pathRef.current, { morphSVG: cloudPath }, "+=1.4")
      .to(pathRef.current, { morphSVG: codePath }, "+=1.4")
      .to(pathRef.current, { morphSVG: gearPath }, "+=1.4")
      .to(pathRef.current, { morphSVG: serverPath }, "+=1.4")
      .to(pathRef.current, { morphSVG: monitorPath }, "+=1.4");

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center h-[320px]">
      {/* SVG de fondo */}
      <svg viewBox="0 0 100 100" className="absolute w-[240px] h-[240px]">
        <path
          ref={pathRef}
          d={monitorPath}
          fill="none"
          stroke="#00D8FF"
          strokeWidth={3}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default MorphingDevTitle;
