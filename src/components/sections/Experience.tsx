"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase, GraduationCap, MapPin, Award, TrendingUp, Calendar,
} from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { workData, educationData } from "@/data/experience";

// ── Tab config ──────────────────────────────────────────────────────────────
const TABS = [
  { id: "Experience" as const, icon: Briefcase,     tip: "Work Experience" },
  { id: "Education"  as const, icon: GraduationCap, tip: "Education"       },
];
type Tab = "Experience" | "Education";

// ── Animation variants ──────────────────────────────────────────────────────
const listVariants = {
  hidden: {},
  show:  { transition: { staggerChildren: 0.08 } },
  exit:  { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.98 },
  show:  { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] } },
  exit:  { opacity: 0, y: -12, scale: 0.97, transition: { duration: 0.18, ease: "easeIn" } },
};

// ── Stats ───────────────────────────────────────────────────────────────────
const STATS = [
  { value: "5+",    label: "Years" },
  { value: "13+",   label: "Apps"  },
  { value: "100k+", label: "DLs"   },
  { value: "2",     label: "Cos."  },
];

// ── Glass vertical tab rail ─────────────────────────────────────────────────
function GlassTabRail({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
      className="flex flex-col items-center gap-2 p-2 rounded-2xl
        bg-white/40 backdrop-blur-md border border-white/60
        shadow-[0_8px_32px_rgba(99,102,241,0.12)] self-start sticky top-24"
    >
      {TABS.map(({ id, icon: Icon, tip }) => {
        const isActive = active === id;
        return (
          <div key={id} className="relative group">
            <button
              onClick={() => onChange(id)}
              aria-label={tip}
              className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-200 ${
                isActive ? "text-white" : "text-gray-400 hover:text-indigo-500"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="glassActive"
                  className="absolute inset-0 rounded-xl bg-indigo-600 shadow-lg shadow-indigo-300/40"
                  transition={{ type: "spring", stiffness: 400, damping: 28 }}
                />
              )}
              <Icon size={16} className="relative z-10" />
            </button>

            {/* Tooltip */}
            <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3
              px-2.5 py-1.5 bg-gray-900/90 backdrop-blur-sm text-white text-xs font-medium
              rounded-lg whitespace-nowrap z-50
              opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0
              transition-all duration-200">
              {tip}
              <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900/90" />
            </div>
          </div>
        );
      })}

    </motion.div>
  );
}

// ── Work card (compact) ─────────────────────────────────────────────────────
function WorkCard({ item }: { item: (typeof workData)[0] }) {
  const active = item.period.toLowerCase().includes("present");

  return (
    <motion.div variants={itemVariants} className="group">
      <div className="h-full bg-white rounded-xl border border-gray-100 overflow-hidden
        transition-all duration-300
        hover:shadow-lg hover:shadow-gray-100/80 hover:border-gray-200 hover:-translate-y-0.5">

        {/* Top color strip */}
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}35)` }} />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-3">
            <div className="flex items-start gap-2.5">
              <div
                className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-[10px] font-black shadow-sm"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
              >
                {item.company.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="font-bold text-gray-900 text-[13px] leading-tight">{item.role}</h3>
                  {active && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                      <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-semibold mt-0.5" style={{ color: item.color }}>
                  {item.company}
                </p>
              </div>
            </div>
          </div>

          {/* Period + location */}
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <Calendar size={9} /> {item.period}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <MapPin size={9} /> {item.location}
            </span>
          </div>

          {/* Bullets — top 2 only */}
          <ul className="space-y-1.5 mb-3">
            {item.bullets.slice(0, 2).map((b, i) => (
              <li key={i} className="flex gap-2 text-[11px] text-gray-500 leading-relaxed">
                <TrendingUp size={10} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                {b}
              </li>
            ))}
          </ul>

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                style={{ background: `${item.color}12`, color: item.color }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Education card (compact) ────────────────────────────────────────────────
function EducationCard({ item }: { item: (typeof educationData)[0] }) {
  return (
    <motion.div variants={itemVariants} className="group">
      <div className="h-full bg-white rounded-xl border border-gray-100 overflow-hidden
        transition-all duration-300
        hover:shadow-lg hover:shadow-gray-100/80 hover:border-gray-200 hover:-translate-y-0.5">

        {/* Top color strip */}
        <div className="h-[3px]" style={{ background: `linear-gradient(90deg, ${item.color}, ${item.color}35)` }} />

        <div className="p-4">
          {/* Header */}
          <div className="flex items-start gap-2.5 mb-3">
            <div
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white text-[9px] font-black shadow-sm"
              style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}88)` }}
            >
              {item.field}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-[13px] leading-tight">{item.degree}</h3>
              <p className="text-[11px] font-semibold mt-0.5" style={{ color: item.color }}>
                {item.institution}
              </p>
            </div>
          </div>

          {/* Period + location */}
          <div className="flex items-center gap-3 mb-2">
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <Calendar size={9} /> {item.period}
            </span>
            <span className="flex items-center gap-1 text-[10px] text-gray-400">
              <MapPin size={9} /> {item.location}
            </span>
          </div>

          {/* Grade */}
          <div className="flex items-center gap-1.5 mb-3">
            <Award size={11} style={{ color: item.color }} />
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{ background: `${item.color}14`, color: item.color }}
            >
              {item.grade}
            </span>
          </div>

          {/* Bullets — top 2 */}
          <ul className="space-y-1.5">
            {item.bullets.slice(0, 2).map((b, i) => (
              <li key={i} className="flex gap-2 text-[11px] text-gray-500 leading-relaxed">
                <TrendingUp size={10} className="mt-0.5 flex-shrink-0" style={{ color: item.color }} />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ─────────────────────────────────────────────────────────────
export default function Experience() {
  const [tab, setTab] = useState<Tab>("Experience");

  return (
    <section id="experience" className="section-padding bg-slate-50 overflow-hidden">
      <div className="container-max">

        {/* Section header */}
        <FadeIn className="text-center mb-6 sm:mb-8">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em]">
            Background
          </span>
          <h2 className="mt-1.5 text-2xl sm:text-3xl font-bold text-gray-900">
            Experience &amp; Education
          </h2>
          <p className="mt-2 text-gray-400 text-xs max-w-xs mx-auto leading-relaxed">
            My professional journey and the academic foundation behind my skills.
          </p>
        </FadeIn>

        {/* Body: glass rail + cards */}
        <div className="max-w-4xl mx-auto flex gap-5 items-start">

          {/* Glass vertical icon tab rail */}
          <GlassTabRail active={tab} onChange={setTab} />

          {/* Cards area */}
          <div className="flex-1 min-w-0">

            {/* Stats strip */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {STATS.map(({ value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center justify-center py-2.5 rounded-xl
                    bg-white/50 backdrop-blur-sm border border-white/60
                    shadow-[0_4px_16px_rgba(99,102,241,0.07)]"
                >
                  <span className="text-base font-black text-indigo-600 leading-tight">{value}</span>
                  <span className="text-[10px] text-gray-400 font-medium mt-0.5">{label}</span>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {tab === "Experience" ? (
                <motion.div
                  key="work"
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {workData.map((item) => (
                    <WorkCard key={item.company} item={item} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="edu"
                  variants={listVariants}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {educationData.map((item) => (
                    <EducationCard key={item.institution} item={item} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
