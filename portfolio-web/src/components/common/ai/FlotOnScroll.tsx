/* eslint-disable @typescript-eslint/no-explicit-any */
// FlotOnScroll.tsx (GSAP: icono visible en reposo, se borra y se "forma" en hover)
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { gsap } from "gsap";

type Props = {
  threshold?: number;
  floatClass?: string;
  baseClass?: string;
  placeholder?: boolean;
  collapsible?: boolean;
  children: React.ReactNode;
  closeLabel?: string;
  openLabel?: string;
  durIn?: number;
  durOut?: number;
};

export default function FlotOnScroll({
  threshold = 400,
  floatClass = "fixed bottom-4 right-4 w-[22rem] z-[60]",
  baseClass = "relative w-full",
  placeholder = true,
  collapsible = true,
  children,
  closeLabel = "Close chat",
  openLabel = "Open chat",
  durIn = 0.22,
  durOut = 0.18,
}: Props) {
  const [floating, setFloating] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [height, setHeight] = useState(0);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);

  const ticking = useRef(false);
  const ctx = useRef<gsap.Context | null>(null);

  // Scope GSAP
  useLayoutEffect(() => {
    ctx.current = gsap.context(() => {}, rootRef);
    return () => ctx.current?.revert();
  }, []);

  useLayoutEffect(() => {
    if (rootRef.current) {
      setHeight(rootRef.current.getBoundingClientRect().height);
    }
  }, []);

  // detectar scroll
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        ticking.current = false;
        const y = window.scrollY || 0;
        setFloating(y >= threshold);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  useEffect(() => {
    if (!floating) setCollapsed(false);
  }, [floating]);

  // --- Hover / Tap animation: se monta cuando el launcher existe (floating && collapsed) ---
  useEffect(() => {
    if (!floating || !collapsed) return;
    const btn = launcherRef.current;
    if (!btn) return;

    const icon = btn.querySelector<SVGSVGElement>(".message-icon");
    const baseGroup = icon?.querySelector<SVGGElement>(".icon-base");
    const drawGroup = icon?.querySelector<SVGGElement>(".icon-draw");
    const drawPaths = drawGroup
      ? Array.from(drawGroup.querySelectorAll<SVGPathElement>(".draw-path"))
      : [];

    const ring = btn.querySelector<HTMLElement>(".ring-layer");
    const glow = btn.querySelector<HTMLElement>(".glow-layer");

    // Medimos longitudes y configuramos el overlay para "draw"
    const lengths: number[] = [];
    drawPaths.forEach((p, i) => {
      let L = 0;
      try {
        L = (p as any).getTotalLength?.() ?? 0;
      } catch {
        L = 0;
      }
      lengths[i] = L;
      if (L > 0) {
        gsap.set(p, { strokeDasharray: L, strokeDashoffset: L });
      } else {
        // fallback si no se puede medir
        gsap.set(p, { opacity: 0 });
      }
    });

    // Estado inicial: base visible, overlay oculto
    if (baseGroup) gsap.set(baseGroup, { autoAlpha: 1 });
    if (drawGroup) gsap.set(drawGroup, { autoAlpha: 0 });

    // Timeline de hover
    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: "power2.out" },
    });

    // Micro-bounce + tilt + sombra
    tl.to(btn, { scale: 1.08, rotate: -3, duration: 0.18 }, 0)
      .to(
        btn,
        { scale: 1, rotate: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" },
        "<0.02"
      )
      .fromTo(
        btn,
        { boxShadow: "0 8px 18px rgba(0,0,0,0.22)" },
        { boxShadow: "0 14px 32px rgba(0,0,0,0.30)", duration: 0.28 },
        0
      );

    // Glow
    if (glow) tl.to(glow, { autoAlpha: 1, duration: 0.2 }, 0.02);

    // Ripple
    if (ring) {
      gsap.set(ring, { scale: 0.85, transformOrigin: "50% 50%" });
      tl.to(ring, { autoAlpha: 1, duration: 0.12 }, 0.02).to(
        ring,
        { scale: 1.45, autoAlpha: 0, duration: 0.6, ease: "power1.out" },
        "<"
      );
    }

    // Secuencia pedida:
    // 1) Ocultar base rápidamente
    if (baseGroup) tl.to(baseGroup, { autoAlpha: 0, duration: 0.12 }, 0.02);

    // 2) Mostrar overlay y dibujarlo
    if (drawGroup) tl.to(drawGroup, { autoAlpha: 1, duration: 0.1 }, 0.04);
    drawPaths.forEach((p, i) => {
      const L = lengths[i];
      if (L > 0) {
        tl.to(p, { strokeDashoffset: 0, duration: 0.55 }, 0.06);
      } else {
        tl.to(p, { opacity: 1, duration: 0.35 }, 0.06);
      }
    });

    // Handlers
    const onEnter = () => {
      // Reiniciar overlay a estado "no dibujado" antes de animar
      drawPaths.forEach((p, i) => {
        const L = lengths[i];
        if (L > 0) gsap.set(p, { strokeDashoffset: L });
        else gsap.set(p, { opacity: 0 });
      });
      tl.restart();
    };

    const onLeave = () => {
      // Volver a estado reposo: base visible, overlay oculto y reseteado
      gsap.to(btn, {
        scale: 1,
        rotate: 0,
        duration: 0.2,
        ease: "power2.out",
        clearProps: "box-shadow",
      });
      if (glow) gsap.to(glow, { autoAlpha: 0, duration: 0.18 });
      if (ring) gsap.set(ring, { autoAlpha: 0, scale: 0.85 });

      if (drawGroup) gsap.to(drawGroup, { autoAlpha: 0, duration: 0.12 });
      drawPaths.forEach((p, i) => {
        const L = lengths[i];
        if (L > 0) gsap.set(p, { strokeDashoffset: L });
        else gsap.set(p, { opacity: 0 });
      });
      if (baseGroup)
        gsap.to(baseGroup, { autoAlpha: 1, duration: 0.12, delay: 0.02 });
    };

    // Soporte pointer/touch
    const onPointer = () => onEnter();

    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    btn.addEventListener("touchstart", onPointer, { passive: true });
    btn.addEventListener("pointerdown", onPointer);

    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
      btn.removeEventListener("touchstart", onPointer);
      btn.removeEventListener("pointerdown", onPointer);
      tl.kill();
    };
  }, [collapsed, floating]);

  const animatePanelIn = () => {
    if (!panelRef.current) return;
    gsap.killTweensOf(panelRef.current);
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: 12, scale: 0.98, transformOrigin: "right bottom" },
      { autoAlpha: 1, y: 0, scale: 1, duration: durIn, ease: "power2.out" }
    );
  };

  const animatePanelOut = (onDone?: () => void) => {
    if (!panelRef.current) return onDone?.();
    gsap.killTweensOf(panelRef.current);
    gsap.to(panelRef.current, {
      autoAlpha: 0,
      y: 8,
      scale: 0.98,
      duration: durOut,
      ease: "power2.in",
      onComplete: onDone,
    });
  };

  const animateLauncherIn = () => {
    if (!launcherRef.current) return;
    gsap.killTweensOf(launcherRef.current);
    gsap.fromTo(
      launcherRef.current,
      { autoAlpha: 0, scale: 0.9 },
      { autoAlpha: 1, scale: 1, duration: 0.18, ease: "power2.out" }
    );
  };

  const animateLauncherOut = (onDone?: () => void) => {
    if (!launcherRef.current) return onDone?.();
    gsap.killTweensOf(launcherRef.current);
    gsap.to(launcherRef.current, {
      autoAlpha: 0,
      scale: 0.9,
      duration: 0.12,
      ease: "power2.in",
      onComplete: onDone,
    });
  };

  const handleClose = () => {
    animatePanelOut(() => {
      setCollapsed(true);
      requestAnimationFrame(() => animateLauncherIn());
    });
  };

  const handleOpen = () => {
    animateLauncherOut(() => {
      setCollapsed(false);
      requestAnimationFrame(() => animatePanelIn());
    });
  };

  useEffect(() => {
    if (floating && !collapsed) {
      requestAnimationFrame(() => animatePanelIn());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floating]);

  const wrapperClass = floating
    ? collapsed
      ? "fixed bottom-4 right-4 z-[60]"
      : floatClass
    : baseClass;

  return (
    <>
      <div
        ref={rootRef}
        className={`${wrapperClass} transition-[width,transform] duration-300`}
        data-floating={floating ? "true" : "false"}
        data-collapsed={collapsed ? "true" : "false"}
      >
        {/* Modo flotante: panel o lanzador */}
        {floating && collapsible ? (
          collapsed ? (
            <button
              ref={launcherRef}
              aria-label={openLabel}
              onClick={handleOpen}
              className="
                group relative h-14 w-14 rounded-full grid place-items-center
                bg-bg1-color text-white shadow-lg border border-color3/40
                transition will-change-transform
                hover:opacity-100 active:opacity-90
                outline-none cursor-pointer
              "
              style={{ transformOrigin: "50% 50%" }}
              title={openLabel}
            >
              {/* ring/ripple layer */}
              <span
                className="ring-layer pointer-events-none absolute inset-0 rounded-full border border-color3/50 opacity-0"
                aria-hidden="true"
              />

              {/* glow layer */}
              <span
                className="glow-layer pointer-events-none absolute inset-0 rounded-full blur-md opacity-0"
                style={{
                  background:
                    "radial-gradient(circle, rgba(156, 163, 175, 0.28), transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* SVG: base visible + overlay para "draw" */}
              <svg
                className="message-icon w-9 h-9 text-color0 ml-1.5 mt-0.5 transition-all duration-300"
                viewBox="0 0 64 64"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* BASE (visible en reposo) */}
                <g
                  className="icon-base"
                  stroke="currentColor"
                  strokeWidth="3"
                  opacity="0.95"
                >
                  <path d="M50 30c0 10.493-9.402 19-21 19-2.37 0-4.63-.32-6.73-.92l-8.88 6.37c-.82.59-1.94-.14-1.77-1.12l1.69-9.64C9.3 40.05 7 35.26 7 30 7 18.507 16.402 10 28 10s22 8.507 22 20Z" />
                  <path d="M20 24h20" />
                  <path d="M20 30h16" />
                  <path d="M20 36h10" />
                </g>

                {/* OVERLAY (se dibuja en hover) */}
                <g
                  className="icon-draw"
                  stroke="currentColor"
                  strokeWidth="3.2"
                  opacity="0"
                >
                  <path
                    className="draw-path"
                    d="M50 30c0 10.493-9.402 19-21 19-2.37 0-4.63-.32-6.73-.92l-8.88 6.37c-.82.59-1.94-.14-1.77-1.12l1.69-9.64C9.3 40.05 7 35.26 7 30 7 18.507 16.402 10 28 10s22 8.507 22 20Z"
                  />
                  <path className="draw-path" d="M20 24h20" />
                  <path className="draw-path" d="M20 30h16" />
                  <path className="draw-path" d="M20 36h10" />
                </g>
              </svg>
            </button>
          ) : (
            <div ref={panelRef} className="relative">
              {children}

              <button
                aria-label={closeLabel}
                onClick={handleClose}
                className="
                  absolute -top-3 -right-3 h-8 w-8 rounded-full
                  bg-[#1f1f1f] border border-border-color
                  grid place-items-center shadow
                  hover:bg-[#242424] active:scale-95 transition
                "
                title={closeLabel}
              >
                <X className="w-4 h-4 text-color4 cursor-pointer" />
              </button>
            </div>
          )
        ) : (
          <div className="relative">{children}</div>
        )}
      </div>

      {placeholder && floating ? <div style={{ height }} /> : null}
    </>
  );
}
