"use client";

import { useRef, useState } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import Image from "next/image";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface Badge {
  name: string;
  logo: string;
  color: string;
  angle: number; // initial angle in radians
}

interface Orbit {
  a: number;        // horizontal semi-axis (px)
  b: number;        // vertical semi-axis (px)
  duration: number; // seconds per full revolution
  dir: 1 | -1;      // rotation direction
  badges: Badge[];
}

const orbits: Orbit[] = [
  {
    a: 105,
    b: 62,
    duration: 9,
    dir: 1,
    badges: [
      { name: "Flutter", logo: `${CDN}/flutter/flutter-original.svg`,      color: "#54C5F8", angle: 0 },
      { name: "Dart",    logo: `${CDN}/dart/dart-original.svg`,            color: "#00B4AB", angle: Math.PI },
    ],
  },
  {
    a: 162,
    b: 96,
    duration: 17,
    dir: -1,
    badges: [
      { name: "React",    logo: `${CDN}/react/react-original.svg`,     color: "#61DAFB", angle: 0.6 },
      { name: "Next.js",  logo: `${CDN}/nextjs/nextjs-original.svg`,   color: "#000",    angle: 0.6 + Math.PI },
      { name: "Firebase", logo: `${CDN}/firebase/firebase-plain.svg`,  color: "#FFA000", angle: 0.6 + (Math.PI * 2) / 3 },
    ],
  },
  {
    a: 218,
    b: 130,
    duration: 28,
    dir: 1,
    badges: [
      { name: "TypeScript", logo: `${CDN}/typescript/typescript-original.svg`, color: "#3178C6", angle: 0.3 },
      { name: "Node.js",    logo: `${CDN}/nodejs/nodejs-original.svg`,         color: "#339933", angle: 0.3 + Math.PI / 2 },
      { name: "Docker",     logo: `${CDN}/docker/docker-original.svg`,         color: "#2496ED", angle: 0.3 + Math.PI },
      { name: "Figma",      logo: `${CDN}/figma/figma-original.svg`,           color: "#F24E1E", angle: 0.3 + (Math.PI * 3) / 2 },
    ],
  },
];

// ── Single orbiting badge ─────────────────────────────────────────────────────
function OrbitalBadge({ orbit, badge }: { orbit: Orbit; badge: Badge }) {
  const divRef  = useRef<HTMLDivElement>(null);
  const [tip, setTip] = useState(false);

  useAnimationFrame((ms) => {
    if (!divRef.current) return;
    const t     = ms / 1000;
    const angle = badge.angle + orbit.dir * (t / orbit.duration) * Math.PI * 2;
    const x     = orbit.a * Math.cos(angle);
    const y     = orbit.b * Math.sin(angle);
    // Position element so its centre sits on the ellipse
    divRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
  });

  return (
    <div
      ref={divRef}
      style={{ position: "absolute", top: "50%", left: "50%", willChange: "transform" }}
      onMouseEnter={() => setTip(true)}
      onMouseLeave={() => setTip(false)}
    >
      <motion.div
        whileHover={{ scale: 1.35 }}
        transition={{ type: "spring", stiffness: 420, damping: 18 }}
        className="relative flex items-center justify-center cursor-default"
      >
        {/* Glow ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          animate={tip ? { opacity: 1 } : { opacity: 0 }}
          style={{
            boxShadow: `0 0 18px 4px ${badge.color}55`,
            borderRadius: "14px",
          }}
        />

        <div
          className="w-11 h-11 rounded-2xl bg-white border border-gray-100 shadow-md flex items-center justify-center overflow-hidden"
          style={{ boxShadow: `0 4px 14px ${badge.color}30, 0 1px 3px rgba(0,0,0,0.08)` }}
        >
          <Image
            src={badge.logo}
            alt={badge.name}
            width={28}
            height={28}
            unoptimized
            className="object-contain"
          />
        </div>

        {/* Tooltip */}
        {tip && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-bold text-white bg-gray-800 rounded-full px-2.5 py-0.5 pointer-events-none z-50"
          >
            {badge.name}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
}

// ── Main orbital visual ───────────────────────────────────────────────────────
export default function OrbitalVisual() {
  const SIZE = 480;   // container px
  const cx   = SIZE / 2;
  const cy   = SIZE / 2;

  return (
    <div
      className="relative mx-auto flex-shrink-0 select-none"
      style={{ width: SIZE, height: SIZE }}
    >
      {/* SVG dashed orbit paths */}
      <svg
        width={SIZE}
        height={SIZE}
        className="absolute inset-0 pointer-events-none"
        overflow="visible"
      >
        {orbits.map((o, i) => (
          <ellipse
            key={i}
            cx={cx}
            cy={cy}
            rx={o.a}
            ry={o.b}
            fill="none"
            stroke="rgba(99,102,241,0.13)"
            strokeWidth="1.5"
            strokeDasharray="5 9"
          />
        ))}

        {/* Tiny sparkle dots on outer path at 12 positions */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = cx + orbits[2].a * Math.cos(angle);
          const y = cy + orbits[2].b * Math.sin(angle);
          return (
            <motion.circle
              key={`spark-${i}`}
              cx={x}
              cy={y}
              r={2}
              fill="rgba(99,102,241,0.35)"
              animate={{ opacity: [0.15, 0.9, 0.15] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.21,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* ── Avatar centre ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        {/* Outer expanding pulse ring */}
        <motion.div
          className="absolute rounded-full border-2 border-indigo-300/40"
          style={{ inset: "-16px" }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Second slower pulse */}
        <motion.div
          className="absolute rounded-full border border-violet-200/50"
          style={{ inset: "-32px" }}
          animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
        />

        {/* Rotating conic-gradient ring */}
        <motion.div
          className="absolute rounded-full"
          style={{
            inset: "-5px",
            background:
              "conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #a855f7, #6366f1)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        />

        {/* White inset ring */}
        <div
          className="absolute rounded-full bg-white"
          style={{ inset: "-2px" }}
        />

        {/* Avatar */}
        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-indigo-50 to-violet-100 shadow-2xl flex items-center justify-center overflow-hidden">
          <span className="text-6xl" style={{ lineHeight: 1 }}>👨‍💻</span>
        </div>

        {/* Centre label */}
        <motion.div
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white border border-indigo-100 shadow-md rounded-full px-3 py-1"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-[11px] font-bold gradient-text">Full Stack Dev</span>
        </motion.div>
      </div>

      {/* ── Orbiting badges ── */}
      {orbits.map((orbit, oi) =>
        orbit.badges.map((badge) => (
          <OrbitalBadge key={`${oi}-${badge.name}`} orbit={orbit} badge={badge} />
        ))
      )}
    </div>
  );
}
