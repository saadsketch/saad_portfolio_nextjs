"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// ── Data ───────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  logo: string;
  color: string;
  level: number; // 0–100 shown as circular progress
}

interface Category {
  id: string;
  label: string;
  angle: number; // radians from center (0 = right, -π/2 = top)
  color: string;
  skills: Skill[];
}

const categories: Category[] = [
  {
    id: "mobile",
    label: "Mobile",
    angle: -Math.PI / 2, // top
    color: "#0EA5E9",
    skills: [
      { name: "Flutter",  logo: `${CDN}/flutter/flutter-original.svg`,         color: "#54C5F8", level: 95 },
      { name: "Dart",     logo: `${CDN}/dart/dart-original.svg`,               color: "#00B4AB", level: 90 },
      { name: "Android",  logo: `${CDN}/android/android-original.svg`,         color: "#3DDC84", level: 82 },
      { name: "Firebase", logo: `${CDN}/firebase/firebase-plain.svg`,          color: "#FFA000", level: 88 },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    angle: 0, // right
    color: "#6366F1",
    skills: [
      { name: "React",      logo: `${CDN}/react/react-original.svg`,              color: "#61DAFB", level: 85 },
      { name: "Next.js",    logo: `${CDN}/nextjs/nextjs-original.svg`,            color: "#555555", level: 83 },
      { name: "TypeScript", logo: `${CDN}/typescript/typescript-original.svg`,    color: "#3178C6", level: 88 },
      { name: "Tailwind",   logo: `${CDN}/tailwindcss/tailwindcss-original.svg`,  color: "#06B6D4", level: 90 },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    angle: Math.PI / 2, // bottom
    color: "#10B981",
    skills: [
      { name: "Node.js",    logo: `${CDN}/nodejs/nodejs-original.svg`,          color: "#339933", level: 80 },
      { name: "Python",     logo: `${CDN}/python/python-original.svg`,          color: "#3776AB", level: 72 },
      { name: "PostgreSQL", logo: `${CDN}/postgresql/postgresql-original.svg`,  color: "#4169E1", level: 76 },
      { name: "MongoDB",    logo: `${CDN}/mongodb/mongodb-original.svg`,        color: "#47A248", level: 74 },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    angle: Math.PI, // left
    color: "#F59E0B",
    skills: [
      { name: "Git",     logo: `${CDN}/git/git-original.svg`,      color: "#F05032", level: 92 },
      { name: "Docker",  logo: `${CDN}/docker/docker-original.svg`, color: "#2496ED", level: 78 },
      { name: "Figma",   logo: `${CDN}/figma/figma-original.svg`,  color: "#F24E1E", level: 82 },
      { name: "VS Code", logo: `${CDN}/vscode/vscode-original.svg`, color: "#007ACC", level: 95 },
    ],
  },
];

// ── Layout constants ───────────────────────────────────────────────────────────
const SZ       = 680;          // SVG viewBox size
const CX       = SZ / 2;       // 340 — center X
const CY       = SZ / 2;       // 340 — center Y
const CAT_R    = 148;          // radius to category nodes
const SKILL_R  = 276;          // radius to skill nodes
const HALF_SPREAD = 0.48;      // ±radians spread for 4 skills (~27.5° each side)
const RING_R   = 22;           // skill progress-ring radius
const CIRC     = 2 * Math.PI * RING_R;

function polar(r: number, angle: number) {
  return { x: CX + r * Math.cos(angle), y: CY + r * Math.sin(angle) };
}

function skillAngles(catAngle: number, count: number): number[] {
  const step = count > 1 ? (HALF_SPREAD * 2) / (count - 1) : 0;
  return Array.from({ length: count }, (_, i) => catAngle - HALF_SPREAD + i * step);
}

// ── Skill node: progress ring + logo + label ───────────────────────────────────
function SkillNode({
  skill,
  gx,
  gy,
  delay,
  inView,
}: {
  skill: Skill;
  gx: number;
  gy: number;
  delay: number;
  inView: boolean;
}) {
  const dash = (skill.level / 100) * CIRC;

  return (
    /* Translate g to node center — scale happens around (0,0) = node center */
    <motion.g
      transform={`translate(${gx},${gy})`}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 340, damping: 20 }}
      style={{ transformOrigin: "0px 0px" }}
      whileHover={{ scale: 1.22 }}
    >
      <title>{skill.name} — {skill.level}% proficiency</title>

      {/* White bg disc */}
      <circle r={RING_R + 3} fill="white" stroke="rgba(0,0,0,0.06)" strokeWidth={1} />

      {/* Progress track */}
      <circle r={RING_R} fill="none" stroke="rgba(200,200,200,0.25)" strokeWidth={3} />

      {/* Progress arc — draws in after node appears */}
      <motion.circle
        r={RING_R}
        fill="none"
        stroke={skill.color}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeDasharray={CIRC}
        initial={{ strokeDashoffset: CIRC }}
        animate={inView ? { strokeDashoffset: CIRC - dash } : {}}
        transition={{ delay: delay + 0.35, duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
        transform="rotate(-90)"
      />

      {/* Logo via SVG <image> */}
      <image
        href={skill.logo}
        x={-11}
        y={-11}
        width={22}
        height={22}
        style={{ imageRendering: "crisp-edges" }}
      />

      {/* Name label below ring */}
      <text
        y={RING_R + 13}
        textAnchor="middle"
        fontSize={9}
        fontWeight={700}
        fill="#6B7280"
        fontFamily="ui-sans-serif,system-ui,sans-serif"
        letterSpacing={0.3}
      >
        {skill.name}
      </text>

      {/* Level badge top-right */}
      <motion.g
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: delay + 0.7, type: "spring", stiffness: 500, damping: 22 }}
        style={{ transformOrigin: `${RING_R - 2}px ${-(RING_R - 2)}px` }}
      >
        <circle cx={RING_R - 2} cy={-(RING_R - 2)} r={9} fill={skill.color} />
        <text
          x={RING_R - 2}
          y={-(RING_R - 5.5)}
          textAnchor="middle"
          fontSize={6.5}
          fontWeight={800}
          fill="white"
          fontFamily="ui-sans-serif,system-ui,sans-serif"
        >
          {skill.level}
        </text>
      </motion.g>
    </motion.g>
  );
}

// ── Category node: labeled circle ──────────────────────────────────────────────
function CatNode({
  cat,
  gx,
  gy,
  delay,
  inView,
}: {
  cat: Category;
  gx: number;
  gy: number;
  delay: number;
  inView: boolean;
}) {
  return (
    <motion.g
      transform={`translate(${gx},${gy})`}
      initial={{ opacity: 0, scale: 0 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, type: "spring", stiffness: 300, damping: 18 }}
      style={{ transformOrigin: "0px 0px" }}
      whileHover={{ scale: 1.12 }}
    >
      {/* Outer glow ring */}
      <circle r={34} fill={`${cat.color}14`} stroke={`${cat.color}40`} strokeWidth={1.5} />
      {/* Inner fill */}
      <circle r={28} fill={`${cat.color}20`} stroke={cat.color} strokeWidth={2} />
      <text
        textAnchor="middle"
        fontSize={10.5}
        fontWeight={800}
        fill={cat.color}
        fontFamily="ui-sans-serif,system-ui,sans-serif"
        dy={4}
      >
        {cat.label}
      </text>
    </motion.g>
  );
}

// ── Main export ────────────────────────────────────────────────────────────────
export default function SkillTree() {
  const svgRef = useRef<SVGSVGElement>(null);
  const inView = useInView(svgRef, { once: true, margin: "-80px" });

  // Precompute layout
  const layout = categories.map((cat) => {
    const catPos = polar(CAT_R, cat.angle);
    const sAngles = skillAngles(cat.angle, cat.skills.length);
    return { cat, catPos, skillPositions: sAngles.map((a) => polar(SKILL_R, a)) };
  });

  return (
    <div className="w-full flex justify-center">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${SZ} ${SZ}`}
        style={{ width: "100%", maxWidth: SZ, height: "auto" }}
        overflow="visible"
      >
        <defs>
          {/* Radial gradient for root node */}
          <radialGradient id="rootGrad" cx="40%" cy="35%">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#4f46e5" />
          </radialGradient>
          {/* Soft drop-shadow filter */}
          <filter id="nodeShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="3" stdDeviation="4" floodColor="rgba(0,0,0,0.10)" />
          </filter>
        </defs>

        {/* ── Background grid (subtle, anime.js feel) ── */}
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(99,102,241,0.06)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={SZ} height={SZ} fill="url(#grid)" rx={24} />

        {/* ── Root → Category paths (draw in first) ── */}
        {layout.map(({ cat, catPos }, ci) => (
          <motion.path
            key={`rc-${cat.id}`}
            d={`M ${CX} ${CY} L ${catPos.x} ${catPos.y}`}
            stroke={cat.color}
            strokeWidth={2.5}
            strokeLinecap="round"
            fill="none"
            opacity={0.55}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 0.55 } : {}}
            transition={{ duration: 0.5, delay: 0.3 + ci * 0.1, ease: "easeInOut" }}
          />
        ))}

        {/* ── Category → Skill paths (draw in after categories appear) ── */}
        {layout.map(({ cat, catPos, skillPositions }, ci) =>
          skillPositions.map((sp, si) => (
            <motion.path
              key={`cs-${cat.id}-${si}`}
              d={`M ${catPos.x} ${catPos.y} L ${sp.x} ${sp.y}`}
              stroke={cat.color}
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeDasharray="4 3"
              fill="none"
              opacity={0.35}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 0.35 } : {}}
              transition={{ duration: 0.4, delay: 0.95 + ci * 0.22 + si * 0.07, ease: "easeOut" }}
            />
          ))
        )}

        {/* ── Skill nodes ── */}
        {layout.map(({ cat, skillPositions }, ci) =>
          cat.skills.map((skill, si) => (
            <SkillNode
              key={`sn-${cat.id}-${si}`}
              skill={skill}
              gx={skillPositions[si].x}
              gy={skillPositions[si].y}
              delay={1.35 + ci * 0.22 + si * 0.07}
              inView={inView}
            />
          ))
        )}

        {/* ── Category nodes (on top of paths) ── */}
        {layout.map(({ cat, catPos }, ci) => (
          <CatNode
            key={`cn-${cat.id}`}
            cat={cat}
            gx={catPos.x}
            gy={catPos.y}
            delay={0.8 + ci * 0.1}
            inView={inView}
          />
        ))}

        {/* ── Root node (center, always on top) ── */}
        <motion.g
          transform={`translate(${CX},${CY})`}
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.05, type: "spring", stiffness: 260, damping: 20 }}
          style={{ transformOrigin: "0px 0px" }}
        >
          {/* Outer pulse ring — anime.js expand-fade */}
          <motion.circle
            r={46}
            fill="none"
            stroke="rgba(99,102,241,0.25)"
            strokeWidth={2}
            animate={inView ? { r: [46, 62, 46], opacity: [0.25, 0, 0.25] } : {}}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeOut", delay: 0.8 }}
          />
          {/* Second softer pulse */}
          <motion.circle
            r={52}
            fill="none"
            stroke="rgba(99,102,241,0.12)"
            strokeWidth={1.5}
            animate={inView ? { r: [52, 70, 52], opacity: [0.12, 0, 0.12] } : {}}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeOut", delay: 1.4 }}
          />

          {/* White border ring */}
          <circle r={40} fill="white" filter="url(#nodeShadow)" />

          {/* Gradient fill */}
          <circle r={37} fill="url(#rootGrad)" />

          {/* Rotating conic ring */}
          <motion.circle
            r={40}
            fill="none"
            stroke="url(#rootGrad)"
            strokeWidth={2.5}
            strokeDasharray="8 4"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "0px 0px" }}
          />

          <text
            textAnchor="middle"
            fontSize={9}
            fontWeight={800}
            fill="white"
            fontFamily="ui-sans-serif,system-ui,sans-serif"
            dy={-4}
            letterSpacing={0.5}
          >
            SAAD
          </text>
          <text
            textAnchor="middle"
            fontSize={7.5}
            fontWeight={600}
            fill="rgba(255,255,255,0.75)"
            fontFamily="ui-sans-serif,system-ui,sans-serif"
            dy={7}
            letterSpacing={0.3}
          >
            Full Stack
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
