/* components/MwgEffect000.tsx */
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";
gsap.registerPlugin(InertiaPlugin);

type Props = {
  className?: string;
  images?: string[]; // si no pasas, usa las 12 por defecto
};

const defaultImages = [
  "/images/works/work_1.png",
  "/images/works/work_1.png",
  "/images/works/work_1.png",
  "/images/works/work_1.png",
];

const AniElements: React.FC<Props> = ({
  className = "",
  images = defaultImages,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    let oldX = 0;
    let oldY = 0;
    let deltaX = 0;
    let deltaY = 0;

    const root = rootRef.current;

    const onMove = (e: MouseEvent) => {
      deltaX = e.clientX - oldX;
      deltaY = e.clientY - oldY;
      oldX = e.clientX;
      oldY = e.clientY;
    };

    root.addEventListener("mousemove", onMove, { passive: true });

    const medias = Array.from(root.querySelectorAll<HTMLDivElement>(".media"));

    const onEnter = (el: HTMLDivElement) => {
      const img = el.querySelector("img");
      if (!img) return;

      const tl = gsap.timeline({
        onComplete: () => {
          tl.kill();
        },
      });

      // “latigazo” con inercia: vuelve a (0,0)
      tl.to(img, {
        x: 0,
        y: 0,
        inertia: {
          x: { velocity: deltaX * 30, end: 0 },
          y: { velocity: deltaY * 30, end: 0 },
        },
      });

      // pequeño twist aleatorio
      tl.fromTo(
        img,
        { rotate: 0 },
        {
          duration: 0.4,
          rotate: (Math.random() - 0.5) * 30, // -15°..15°
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        },
        "<"
      );
    };

    medias.forEach((el) => {
      el.addEventListener("mouseenter", () => onEnter(el));
    });

    return () => {
      root.removeEventListener("mousemove", onMove);
      medias.forEach((el) => el.replaceWith(el.cloneNode(true))); // limpia listeners
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className={`relative grid place-items-center  bg-[#121212] text-[#F1F1F1] font-[Inter,ui-sans-serif,system-ui] ${className}`}
    >
      <div className="medias grid grid-cols-4 md:gap-[1vw] gap-[2vw]">
        {images.map((src, i) => (
          <div key={i} className="media ">
            <img
              src={src}
              alt={`media-${i + 1}`}
              className="md:w-[11vw] md:h-[11vw] w-[18vw] h-[18vw]  rounded-[4%] block pointer-events-none will-change-transform select-none full full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default AniElements;
