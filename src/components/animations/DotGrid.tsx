"use client";

import { useRef, useEffect } from "react";

interface Dot {
  x: number;
  y: number;
  scale: number;
}

export default function DotGrid({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef<number>(0);
  const dotsRef = useRef<Dot[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = window.devicePixelRatio || 1;

    const spacing = 36;

    const resize = () => {
      const parent = canvas.parentElement!;
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);

      // Rebuild dot grid
      const cols = Math.ceil(w / spacing) + 1;
      const rows = Math.ceil(h / spacing) + 1;
      dotsRef.current = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dotsRef.current.push({ x: c * spacing, y: r * spacing, scale: 0.4 });
        }
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const t = Date.now() / 1000;
      const cx = w / 2;
      const cy = h / 2;

      for (const dot of dotsRef.current) {
        // Outward ripple wave from center — the anime.js stagger grid effect
        const dc = Math.sqrt((dot.x - cx) ** 2 + (dot.y - cy) ** 2);
        const wave = 0.5 + 0.5 * Math.sin(dc * 0.045 - t * 2.2);

        // Mouse proximity boost
        const dm = Math.sqrt((dot.x - mouseRef.current.x) ** 2 + (dot.y - mouseRef.current.y) ** 2);
        const mouseBoost = Math.max(0, 1 - dm / 110) * 1.6;

        const target = 0.25 + wave * 0.55 + mouseBoost;
        // Smooth lerp — anime.js "inOutQuad" feel
        dot.scale += (target - dot.scale) * 0.1;

        const radius = Math.max(0.5, 2.8 * dot.scale);
        const alpha = 0.1 + dot.scale * 0.45;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 102, 241, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    const parent = canvas.parentElement!;
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
