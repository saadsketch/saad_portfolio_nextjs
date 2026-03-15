"use client";

import { useState, useRef, useEffect, useCallback, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
  { name: "GraphQL",    logo: `${CDN}/graphql/graphql-plain.svg`,            color: "#E10098", category: "Backend"  },
  { name: "Git",        logo: `${CDN}/git/git-original.svg`,                 color: "#F05032", category: "Tools"    },
  { name: "Docker",     logo: `${CDN}/docker/docker-original.svg`,           color: "#2496ED", category: "Tools"    },
  { name: "Figma",      logo: `${CDN}/figma/figma-original.svg`,             color: "#F24E1E", category: "Tools"    },
  { name: "VS Code",    logo: `${CDN}/vscode/vscode-original.svg`,           color: "#007ACC", category: "Tools"    },
  { name: "Linux",      logo: `${CDN}/linux/linux-original.svg`,             color: "#FCC624", category: "Tools"    },
];

const tabs = ["All", "Mobile", "Frontend", "Backend", "Tools"] as const;
type Tab = (typeof tabs)[number];

// ── Spring tab bar (framer-motion sliding pill) ────────────────────────────────
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
    <div className="relative flex items-center gap-0.5 p-1 bg-white shadow-sm border border-gray-100 rounded-2xl">
      <motion.div
        className="absolute top-1 bottom-1 rounded-xl bg-indigo-600"
        animate={{ left: ind.left, width: ind.width }}
        transition={{ type: "spring", stiffness: 400, damping: 34 }}
      />
      {tabs.map((tab) => (
        <button
          key={tab}
          ref={(el) => { refs.current[tab] = el; }}
          onClick={() => onChange(tab)}
          className={`relative z-10 px-3.5 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 ${
            active === tab ? "text-white" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ── Skill card ─────────────────────────────────────────────────────────────────
function SkillCard({ skill }: { skill: Skill }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleEnter = useCallback(async () => {
    if (!cardRef.current) return;
    const { animate } = await import("animejs");
    animate(cardRef.current, {
      translateY: -8,
      scale: 1.07,
      duration: 280,
      ease: "outBack(2)",
    });
    cardRef.current.style.boxShadow = `0 16px 40px ${skill.color}38, 0 4px 12px rgba(0,0,0,0.08)`;
    cardRef.current.style.borderColor = `${skill.color}60`;
  }, [skill.color]);

  const handleLeave = useCallback(async () => {
    if (!cardRef.current) return;
    const { animate } = await import("animejs");
    animate(cardRef.current, {
      translateY: 0,
      scale: 1,
      duration: 320,
      ease: "outExpo",
    });
    cardRef.current.style.boxShadow = `0 2px 14px ${skill.color}16`;
    cardRef.current.style.borderColor = `${skill.color}28`;
  }, [skill.color]);

  return (
    <div
      ref={cardRef}
      className="sk-card flex flex-col items-center gap-2.5 p-4 sm:p-5
                 rounded-2xl bg-white cursor-default select-none"
      style={{
        width: "clamp(96px, 14vw, 120px)",
        border: `1.5px solid ${skill.color}28`,
        boxShadow: `0 2px 14px ${skill.color}16`,
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Icon bubble */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center"
        style={{ background: `${skill.color}16` }}
      >
        <Image
          src={skill.logo}
          alt={skill.name}
          width={36}
          height={36}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Name */}
      <span className="text-[10.5px] font-semibold text-gray-600 text-center leading-tight">
        {skill.name}
      </span>
    </div>
  );
}

// ── Category count badge ───────────────────────────────────────────────────────
const categoryCounts: Record<Tab, number> = {
  All: skills.length,
  Mobile:   skills.filter((s) => s.category === "Mobile").length,
  Frontend: skills.filter((s) => s.category === "Frontend").length,
  Backend:  skills.filter((s) => s.category === "Backend").length,
  Tools:    skills.filter((s) => s.category === "Tools").length,
};

// ── Main section ───────────────────────────────────────────────────────────────
export default function Skills() {
  const [active, setActive] = useState<Tab>("All");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);
  const inViewRef  = useRef(false);

  const filtered = active === "All"
    ? skills
    : skills.filter((s) => s.category === active);

  // Stagger cards in with anime.js
  const animateCardsIn = useCallback(async () => {
    if (!gridRef.current) return;
    const cards = Array.from(gridRef.current.querySelectorAll<HTMLElement>(".sk-card"));
    if (!cards.length) return;

    const { animate, stagger } = await import("animejs");

    // Reset to start state first (instant)
    animate(cards, { opacity: 0, translateY: 30, scale: 0.88, duration: 0 });

    // Small rAF delay to let React commit the DOM
    requestAnimationFrame(() => {
      animate(cards, {
        opacity:    [0, 1],
        translateY: [30, 0],
        scale:      [0.88, 1],
        delay:      stagger(48, { start: 20 }),
        duration:   560,
        ease:       "outExpo",
      });
    });
  }, []);

  // Scroll-triggered entry (once)
  useEffect(() => {
    if (!sectionRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inViewRef.current = true;
          animateCardsIn();
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, [animateCardsIn]);

  // Tab-switch animation
  useEffect(() => {
    if (inViewRef.current) animateCardsIn();
  }, [active, animateCardsIn]);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-padding overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(99,102,241,0.06) 0%, transparent 60%), #f9fafb",
      }}
    >
      <div className="container-max">

        {/* ── Header ── */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
            Expertise
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900">
            Skills &amp; Technologies
          </h2>
          <p className="mt-3 text-gray-400 text-sm max-w-sm mx-auto">
            {categoryCounts[active]} technologies — from mobile to backend
          </p>
        </motion.div>

        {/* ── Tab bar ── */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.12 }}
        >
          <TabBar active={active} onChange={setActive} />
        </motion.div>

        {/* ── Grid ── */}
        <div
          ref={gridRef}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {filtered.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>

        {/* ── Bottom label ── */}
        <motion.p
          className="text-center text-xs text-gray-300 mt-10 font-medium tracking-wide"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Hover a skill to explore
        </motion.p>

      </div>
    </section>
  );
}
