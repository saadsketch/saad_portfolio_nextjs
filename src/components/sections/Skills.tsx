"use client";

import {
  useState,
  useRef,
  useLayoutEffect,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// ── Data ───────────────────────────────────────────────────────────────────────
interface Skill {
  name: string;
  logo: string;
  color: string;
  category: "Mobile" | "Frontend" | "Backend" | "Tools";
}

const skills: Skill[] = [
  { name: "Flutter",    logo: `${CDN}/flutter/flutter-original.svg`,         color: "#54C5F8", category: "Mobile"   },
  { name: "Dart",       logo: `${CDN}/dart/dart-original.svg`,               color: "#00B4AB", category: "Mobile"   },
  { name: "Android",    logo: `${CDN}/android/android-original.svg`,         color: "#3DDC84", category: "Mobile"   },
  { name: "Firebase",   logo: `${CDN}/firebase/firebase-plain.svg`,          color: "#FFA000", category: "Mobile"   },
  { name: "Swift",      logo: `${CDN}/swift/swift-original.svg`,             color: "#F05138", category: "Mobile"   },
  { name: "React",      logo: `${CDN}/react/react-original.svg`,             color: "#61DAFB", category: "Frontend" },
  { name: "Next.js",    logo: `${CDN}/nextjs/nextjs-original.svg`,           color: "#6366f1", category: "Frontend" },
  { name: "TypeScript", logo: `${CDN}/typescript/typescript-original.svg`,   color: "#3178C6", category: "Frontend" },
  { name: "JavaScript", logo: `${CDN}/javascript/javascript-original.svg`,   color: "#F7DF1E", category: "Frontend" },
  { name: "Tailwind",   logo: `${CDN}/tailwindcss/tailwindcss-original.svg`, color: "#06B6D4", category: "Frontend" },
  { name: "Node.js",    logo: `${CDN}/nodejs/nodejs-original.svg`,           color: "#339933", category: "Backend"  },
  { name: "Python",     logo: `${CDN}/python/python-original.svg`,           color: "#3776AB", category: "Backend"  },
  { name: "PostgreSQL", logo: `${CDN}/postgresql/postgresql-original.svg`,   color: "#4169E1", category: "Backend"  },
  { name: "MongoDB",    logo: `${CDN}/mongodb/mongodb-original.svg`,         color: "#47A248", category: "Backend"  },
  { name: "Git",        logo: `${CDN}/git/git-original.svg`,                 color: "#F05032", category: "Tools"    },
  { name: "Docker",     logo: `${CDN}/docker/docker-original.svg`,           color: "#2496ED", category: "Tools"    },
  { name: "Figma",      logo: `${CDN}/figma/figma-original.svg`,             color: "#F24E1E", category: "Tools"    },
  { name: "VS Code",    logo: `${CDN}/vscode/vscode-original.svg`,           color: "#007ACC", category: "Tools"    },
];

const tabs = ["All", "Mobile", "Frontend", "Backend", "Tools"] as const;
type Tab = (typeof tabs)[number];

// ── Spring tab bar ─────────────────────────────────────────────────────────────
function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [ind, setInd] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = refs.current[active];
    if (el) {
      const p = el.parentElement!.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      setInd({ left: r.left - p.left, width: r.width });
    }
  }, [active]);

  return (
    <div className="relative flex items-center gap-1 p-1 bg-gray-100/80 rounded-2xl backdrop-blur-sm">
      <motion.div
        className="absolute top-1 bottom-1 rounded-xl bg-white shadow-sm"
        animate={{ left: ind.left, width: ind.width }}
        transition={{ type: "spring", stiffness: 380, damping: 32 }}
      />
      {tabs.map((tab) => (
        <button
          key={tab}
          ref={(el) => { refs.current[tab] = el; }}
          onClick={() => onChange(tab)}
          className={`relative z-10 px-4 py-1.5 text-sm font-semibold rounded-xl transition-colors duration-200 ${
            active === tab ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ── Arc row ────────────────────────────────────────────────────────────────────
// Skills are placed along the top half of an ellipse (a semi-circle arc).
// The center item sits at the apex; edge items rest at the baseline.
function ArcRow({ skills, rowIndex = 0 }: { skills: Skill[]; rowIndex?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [W, setW]    = useState(740);
  const inView       = useInView(containerRef, { once: true, margin: "-40px" });

  useLayoutEffect(() => {
    const measure = () => {
      if (containerRef.current) setW(containerRef.current.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const n      = skills.length;
  const CIRCLE = n <= 5 ? 78 : n <= 8 ? 66 : 56;
  const LOGO   = n <= 5 ? 40 : n <= 8 ? 32 : 28;

  // Ellipse semi-axes: a = horizontal spread, b = arc height (vertical rise)
  const a = Math.min((W - CIRCLE * 2.5) / 2, n <= 5 ? 240 : n <= 8 ? 300 : 330);
  const b = n <= 5 ? 122 : n <= 8 ? 96 : 76;

  // arcBaseY = y of the circle centres for the leftmost/rightmost items
  const arcBaseY = 24 + b + CIRCLE / 2;
  const CONT_H   = arcBaseY + CIRCLE / 2 + 34;

  // Returns the center (cx, cy) for item at index i along the top semi-ellipse
  const pos = useCallback(
    (i: number) => {
      // angle sweeps from 0 (left) → π/2 (top/center) → π (right)
      const angle = n === 1 ? Math.PI / 2 : (Math.PI * i) / (n - 1);
      return {
        cx: W / 2 - a * Math.cos(angle),   // leftmost = W/2 - a, rightmost = W/2 + a
        cy: arcBaseY - b * Math.sin(angle), // baseline at edges, apex at center
      };
    },
    [n, W, a, b, arcBaseY],
  );

  // Build the smooth SVG arc path from 60 interpolated points
  const arcD = useMemo(() => {
    if (n <= 1) return "";
    return Array.from({ length: 60 }, (_, j) => {
      const angle = (Math.PI * j) / 59;
      const x = (W / 2 - a * Math.cos(angle)).toFixed(1);
      const y = (arcBaseY - b * Math.sin(angle)).toFixed(1);
      return `${j === 0 ? "M" : "L"} ${x} ${y}`;
    }).join(" ");
  }, [n, W, a, b, arcBaseY]);

  return (
    <div
      ref={containerRef}
      className="relative w-full select-none"
      style={{ height: CONT_H }}
    >
      {/* Subtle dashed arc guide */}
      {arcD && (
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
          overflow="visible"
        >
          <path
            d={arcD}
            fill="none"
            stroke="rgba(99,102,241,0.09)"
            strokeWidth="1.5"
            strokeDasharray="5 9"
          />
        </svg>
      )}

      {/* Skill circles */}
      {skills.map((skill, i) => {
        const { cx, cy } = pos(i);
        const delay = rowIndex * 0.14 + i * 0.065;

        return (
          <motion.div
            key={skill.name}
            className="absolute flex flex-col items-center"
            style={{ left: cx - CIRCLE / 2, top: cy - CIRCLE / 2, width: CIRCLE }}
            initial={{ opacity: 0, scale: 0.35, y: 32 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay, type: "spring", stiffness: 260, damping: 22 }}
            whileHover={{ scale: 1.22, y: -10 }}
          >
            {/* Circle */}
            <div
              className="rounded-full bg-white flex items-center justify-center cursor-default"
              style={{
                width: CIRCLE,
                height: CIRCLE,
                border: `2px solid ${skill.color}30`,
                boxShadow: `0 4px 20px ${skill.color}22, 0 2px 6px rgba(0,0,0,0.07)`,
              }}
            >
              <Image
                src={skill.logo}
                alt={skill.name}
                width={LOGO}
                height={LOGO}
                unoptimized
                style={{ objectFit: "contain" }}
              />
            </div>

            {/* Name */}
            <span
              className="text-gray-600 font-semibold mt-1.5 text-center leading-tight"
              style={{ fontSize: 9.5, letterSpacing: 0.3, width: CIRCLE }}
            >
              {skill.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Skills() {
  const [active, setActive] = useState<Tab>("All");
  const handleTab = useCallback((t: Tab) => setActive(t), []);

  const filtered = active === "All" ? skills : skills.filter((s) => s.category === active);

  // "All" → two arc rows of 9; specific category → one arc row
  const rows = active === "All"
    ? [filtered.slice(0, 9), filtered.slice(9)]
    : [filtered];

  return (
    <section
      id="skills"
      className="section-padding overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.05) 0%, transparent 58%), #f9fafb",
      }}
    >
      <div className="container-max">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
            Expertise
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 text-gray-400 text-sm">
            Technologies I work with every day
          </p>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <TabBar active={active} onChange={handleTab} />
        </motion.div>

        {/* ── Desktop: arc rows ── */}
        <div className="hidden sm:block">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {rows.map((row, ri) => (
                <ArcRow key={`${active}-${ri}`} skills={row} rowIndex={ri} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Mobile: flex-wrap grid of circles ── */}
        <div className="sm:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="flex flex-wrap justify-center gap-5 py-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              {filtered.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col items-center gap-1.5"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 280, damping: 22 }}
                >
                  <div
                    className="w-14 h-14 rounded-full bg-white flex items-center justify-center"
                    style={{
                      border: `2px solid ${skill.color}28`,
                      boxShadow: `0 4px 12px ${skill.color}18`,
                    }}
                  >
                    <Image
                      src={skill.logo}
                      alt={skill.name}
                      width={28}
                      height={28}
                      unoptimized
                      style={{ objectFit: "contain" }}
                    />
                  </div>
                  <span className="text-[9px] font-semibold text-gray-600 text-center">
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
