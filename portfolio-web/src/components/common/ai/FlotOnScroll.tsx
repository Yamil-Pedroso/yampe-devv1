// FlotOnScroll.tsx (GSAP smooth close/open)
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { X, MessageCircle } from "lucide-react";
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
                h-12 w-12 rounded-full grid place-items-center
                bg-bg1-color text-white shadow-lg border border-color3/40
                hover:opacity-90 active:opacity-80 transition
              "
              title={openLabel}
            >
              <MessageCircle className="w-5 h-5 text-color0 cursor-pointer" />
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
