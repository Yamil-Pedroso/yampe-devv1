import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

type Props = {
  opacity?: number; // Opacidad global del layer
  grain?: number; // 0..1
  zIndex?: number; // por encima del layout pero por debajo de modals si quieres
  strong?: boolean; // true = más visible
};

export default function RetroLayerPortal({
  opacity = 0.4,
  grain = 0.35,
  zIndex = 999, // alto para pruebas; ajusta si tu modal usa 1000+
  strong = true,
}: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }

  // montar en body
  useEffect(() => {
    const el = elRef.current!;
    document.body.appendChild(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

  // ruido ligero en canvas
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    let mounted = true;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = Math.floor(w * dpr);
      c.height = Math.floor(h * dpr);
      c.style.width = w + "px";
      c.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const render = () => {
      if (!mounted) return;
      const w = c.width / dpr;
      const h = c.height / dpr;
      const img = ctx.createImageData(w, h);
      const data = img.data;
      const a = Math.floor(255 * Math.min(1, Math.max(0, grain)));
      for (let i = 0; i < data.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = a;
      }
      ctx.putImageData(img, 0, 0);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      mounted = false;
      window.removeEventListener("resize", onResize);
    };
  }, [grain]);

  const node = (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex,
        opacity,
      }}
    >
      {/* GRANO */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: strong ? "soft-light" : "overlay",
          filter: strong ? "contrast(120%) brightness(105%)" : "contrast(108%)",
        }}
      />

      {/* SCANLINES FUERTES (se notan) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            // horizontales marcadas + verticales sutiles
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.22) 0px, rgba(0,0,0,0.22) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0px, rgba(0,0,0,0.08) 1px, transparent 1px, transparent 5px)",
          mixBlendMode: strong ? "multiply" : "overlay",
          opacity: strong ? 0.9 : 0.55,
        }}
      />

      {/* ABERRACIÓN CROMÁTICA SUAVE */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "screen",
          background:
            "radial-gradient(circle at 20% 10%, rgba(255,0,90,0.08), transparent 45%), radial-gradient(circle at 80% 90%, rgba(0,120,255,0.08), transparent 40%)",
          filter: "blur(0.4px)",
          opacity: strong ? 0.9 : 0.6,
        }}
      />

      {/* VIÑETA MARCADA */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: strong
            ? "radial-gradient(ellipse at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.5) 100%)"
            : "radial-gradient(ellipse at center, rgba(0,0,0,0) 58%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* FLICKER */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          animation: "retro-flicker 4s infinite",
          background:
            "linear-gradient(0deg, rgba(255,255,255,0.03), rgba(0,0,0,0.03))",
          mixBlendMode: "overlay",
        }}
      />

      <style>{`
        @keyframes retro-flicker {
          0%, 100% { opacity: 0.0; }
          7% { opacity: 0.12; }
          8% { opacity: 0.03; }
          15% { opacity: 0.08; }
          50% { opacity: 0.04; }
          70% { opacity: 0.07; }
          90% { opacity: 0.02; }
        }
      `}</style>
    </div>
  );

  return createPortal(node, elRef.current!);
}
