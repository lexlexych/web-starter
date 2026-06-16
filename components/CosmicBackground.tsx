"use client";

import { useEffect, useRef } from "react";

/**
 * Animated cosmic backdrop: drifting aurora blobs (CSS) + a lightweight
 * twinkling starfield (canvas) + a subtle grain overlay. Pointer-events are
 * disabled so it never interferes with the UI. Honors prefers-reduced-motion.
 */
export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let dpr = 1;

    type Star = {
      x: number;
      y: number;
      r: number;
      baseAlpha: number;
      twinkle: number;
      speed: number;
    };
    let stars: Star[] = [];

    const buildStars = () => {
      const count = Math.min(180, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.004,
      }));
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildStars();
    };

    let raf = 0;
    let t = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      t += 1;
      for (const s of stars) {
        const alpha = reduceMotion
          ? s.baseAlpha
          : s.baseAlpha + Math.sin(t * s.speed + s.twinkle) * 0.25;
        ctx.beginPath();
        ctx.globalAlpha = Math.max(0, Math.min(1, alpha));
        ctx.fillStyle = "#ffffff";
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (!reduceMotion) raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "radial-gradient(125% 125% at 50% 0%, #0a0a1f 0%, #05060f 55%, #03030a 100%)" }}
    >
      {/* Aurora blobs */}
      <div className="absolute -left-[10%] top-[-15%] h-[55vmax] w-[55vmax] rounded-full bg-aurora-violet/50 blur-[110px] animate-aurora-1" />
      <div className="absolute right-[-15%] top-[5%] h-[50vmax] w-[50vmax] rounded-full bg-aurora-cyan/35 blur-[120px] animate-aurora-2" />
      <div className="absolute bottom-[-25%] left-[20%] h-[55vmax] w-[55vmax] rounded-full bg-aurora-magenta/40 blur-[130px] animate-aurora-3" />
      <div className="absolute left-1/2 top-1/3 h-[40vmax] w-[40vmax] -translate-x-1/2 rounded-full bg-aurora-indigo/30 blur-[100px] animate-float" />

      {/* Starfield */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* Fine grain overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Vignette for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_30%,transparent_60%,rgba(0,0,0,0.45)_100%)]" />
    </div>
  );
}
