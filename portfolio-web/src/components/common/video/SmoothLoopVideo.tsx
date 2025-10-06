import React, { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  className?: string;
  /** segundos de solape (crossfade). 0.25–0.5 suele ir bien */
  crossfade?: number;
  /** “early start” para Safari (anticipa el play del segundo) */
  earlyStart?: number;
};

const PerfectLoopVideo: React.FC<Props> = ({
  src,
  className,
  crossfade = 0.35,
  earlyStart = 0.06,
}) => {
  const aRef = useRef<HTMLVideoElement | null>(null);
  const bRef = useRef<HTMLVideoElement | null>(null);
  const [active, setActive] = useState<"a" | "b">("a");

  useEffect(() => {
    const a = aRef.current!;
    const b = bRef.current!;

    // estilos base
    a.style.opacity = "1";
    b.style.opacity = "0";
    a.muted = b.muted = true;
    a.playsInline = b.playsInline = true;

    let raf: number | null = null;
    let running = true;

    const tick = () => {
      if (!running) return;

      const cur = active === "a" ? a : b;
      const nxt = active === "a" ? b : a;

      if (cur.duration && !Number.isNaN(cur.duration)) {
        const remaining = cur.duration - cur.currentTime;

        // Arranca el siguiente un pelín antes para que esté “caliente” (Safari)
        if (remaining <= crossfade + earlyStart && nxt.paused) {
          nxt.currentTime = 0;
          nxt.play().catch(() => {});
        }

        // Inicia crossfade
        if (remaining <= crossfade) {
          const t = 1 - remaining / crossfade; // 0→1
          const eased =
            0.5 - 0.5 * Math.cos(Math.PI * Math.min(Math.max(t, 0), 1));
          // aplica opacidades
          if (active === "a") {
            a.style.opacity = String(1 - eased);
            b.style.opacity = String(eased);
          } else {
            b.style.opacity = String(1 - eased);
            a.style.opacity = String(eased);
          }

          // Cambio de rol al terminar solape
          if (remaining <= 0.001) {
            // resetea el que sale, sin parpadeo
            cur.pause();
            cur.currentTime = 0;
            cur.style.opacity = "0";
            nxt.style.opacity = "1";
            setActive(active === "a" ? "b" : "a");
          }
        }
      }

      raf = requestAnimationFrame(tick);
    };

    // start
    a.play().catch(() => {});
    b.pause();
    b.currentTime = 0;

    raf = requestAnimationFrame(tick);

    // pausa/resume al cambiar de pestaña (más suave en iOS)
    const onVis = () => {
      const vids = [a, b];
      if (document.hidden) vids.forEach((v) => v.pause());
      else vids.forEach((v) => v.play().catch(() => {}));
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [src, crossfade, earlyStart, active]);

  return (
    <div className={`relative overflow-hidden ${className || ""}`}>
      <video
        ref={aRef}
        src={src}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-0"
      />
      <video
        ref={bRef}
        src={src}
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-0"
      />
      {/* wrapper mantiene relación sin reflow */}
      <div className="invisible">
        <video aria-hidden src={src} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default PerfectLoopVideo;
