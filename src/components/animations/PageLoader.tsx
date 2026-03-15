"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible]   = useState(true);

  useEffect(() => {
    const DURATION = 2000; // ms
    let raf: number;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const pct = Math.min(100, Math.round(((ts - start) / DURATION) * 100));
      setProgress(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        // Small pause, then slide away
        setTimeout(() => setVisible(false), 320);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "#080810" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
            style={{ background: "radial-gradient(ellipse, #6366f1, transparent 70%)" }} />

          {/* Subtle grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-6">

            {/* Logo reveal — letters stagger in */}
            <div className="flex items-center gap-0 overflow-hidden">
              {"<Saad />".split("").map((char, i) => (
                <motion.span
                  key={i}
                  className="text-5xl sm:text-6xl font-black text-white tracking-tight inline-block"
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.1 + i * 0.04,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  }}
                  style={{
                    color: char === "<" || char === "/" || char === ">"
                      ? "#6366f1"
                      : "white",
                    fontFamily: "monospace",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Tagline */}
            <motion.p
              className="text-sm text-white/40 font-medium tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Flutter &amp; Full Stack Developer
            </motion.p>

            {/* Pulsing dots */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Progress bar + counter at bottom */}
          <div className="absolute bottom-10 left-0 right-0 px-8 sm:px-16">
            <div className="flex justify-between items-center mb-2.5">
              <motion.span
                className="text-[11px] text-white/25 font-mono uppercase tracking-widest"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Initializing
              </motion.span>
              <motion.span
                className="text-[11px] text-white/25 font-mono tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {String(progress).padStart(3, "0")}%
              </motion.span>
            </div>

            {/* Track */}
            <div className="h-px bg-white/8 w-full overflow-hidden rounded-full">
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #6366f1, #8B5CF6, #06B6D4)",
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
