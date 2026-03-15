"use client";

import { motion } from "framer-motion";

const projects = [
  { emoji: "🛍️", name: "E-Commerce App", tech: "Flutter · Firebase" },
  { emoji: "💪", name: "Health Tracker", tech: "Flutter · SQLite" },
  { emoji: "🏠", name: "Real Estate", tech: "Flutter · Maps" },
];

const navIcons = ["🏠", "💼", "💬", "👤"];

const leftBadges = [
  { label: "Flutter", color: "bg-sky-50 text-sky-700 border-sky-200", delay: 1.4 },
  { label: "Dart", color: "bg-teal-50 text-teal-700 border-teal-200", delay: 1.55 },
  { label: "Firebase", color: "bg-amber-50 text-amber-700 border-amber-200", delay: 1.7 },
];

const rightBadges = [
  { label: "iOS · Android", color: "bg-purple-50 text-purple-700 border-purple-200", delay: 1.5 },
  { label: "5+ Years", color: "bg-indigo-50 text-indigo-700 border-indigo-200", delay: 1.65 },
  { label: "30+ Apps", color: "bg-rose-50 text-rose-700 border-rose-200", delay: 1.8 },
];

export default function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center py-12 px-20">
      {/* Left floating badges */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {leftBadges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -5, 0],
            }}
            transition={{
              opacity: { delay: b.delay, duration: 0.4 },
              x: { delay: b.delay, duration: 0.4 },
              y: {
                delay: b.delay + 0.4,
                duration: 2.5 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap shadow-sm ${b.color}`}
          >
            {b.label}
          </motion.div>
        ))}
      </div>

      {/* Phone frame */}
      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative w-[210px] h-[430px] flex-shrink-0"
      >
        {/* Glow */}
        <motion.div
          className="absolute inset-6 bg-indigo-400/25 rounded-[40px] blur-2xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Phone body */}
        <div className="relative w-full h-full bg-gray-900 rounded-[38px] border-[3px] border-gray-700 shadow-2xl overflow-hidden">
          {/* Dynamic island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-14 h-3 bg-black rounded-full z-20" />

          {/* Screen content */}
          <div className="absolute inset-0 rounded-[35px] bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden flex flex-col">
            {/* Status bar */}
            <div className="flex justify-between items-center px-5 pt-7 pb-1 text-[8px] font-medium text-gray-400">
              <span>9:41</span>
              <div className="flex gap-1">
                <span>▲</span><span>●●</span>
              </div>
            </div>

            {/* Header */}
            <div className="px-4 py-2">
              <p className="text-[9px] text-gray-400">Good morning 👋</p>
              <p className="text-sm font-extrabold text-gray-900 leading-tight">Saad</p>
            </div>

            {/* Stat cards */}
            <div className="flex gap-2 px-3 mb-3">
              {[
                { v: "30+", l: "Apps", bg: "from-indigo-50 to-blue-50", c: "text-indigo-700" },
                { v: "5+yr", l: "Exp.", bg: "from-violet-50 to-purple-50", c: "text-violet-700" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.12, type: "spring", stiffness: 300 }}
                  className={`flex-1 bg-gradient-to-br ${s.bg} rounded-2xl p-2.5 text-center`}
                >
                  <p className={`text-sm font-extrabold ${s.c}`}>{s.v}</p>
                  <p className="text-[8px] text-gray-500">{s.l}</p>
                </motion.div>
              ))}
            </div>

            {/* Projects list */}
            <div className="px-3 flex-1">
              <p className="text-[8px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                Recent Projects
              </p>
              <div className="space-y-2">
                {projects.map((p, i) => (
                  <motion.div
                    key={p.name}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 1.1 + i * 0.13,
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                    }}
                    className="flex items-center gap-2.5 bg-gray-50/80 border border-gray-100 rounded-2xl px-2.5 py-2"
                  >
                    <span className="text-xl leading-none">{p.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-[9px] font-bold text-gray-800 truncate">{p.name}</p>
                      <p className="text-[7px] text-gray-400">{p.tech}</p>
                    </div>
                    <motion.div
                      className="w-4 h-4 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0"
                      whileHover={{ scale: 1.3 }}
                    >
                      <span className="text-[8px] text-indigo-600 font-bold">›</span>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom nav */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="flex justify-around items-center px-4 py-2.5 border-t border-gray-100 bg-white/90 backdrop-blur-sm"
            >
              {navIcons.map((icon, i) => (
                <motion.div
                  key={i}
                  animate={i === 0 ? { scale: [1, 1.25, 1] } : {}}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                  className={`text-base ${i === 0 ? "opacity-100" : "opacity-35"}`}
                >
                  {icon}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Side button details */}
        <div className="absolute right-[-4px] top-16 w-1 h-8 bg-gray-700 rounded-r-sm" />
        <div className="absolute left-[-4px] top-12 w-1 h-6 bg-gray-700 rounded-l-sm" />
        <div className="absolute left-[-4px] top-20 w-1 h-6 bg-gray-700 rounded-l-sm" />
      </motion.div>

      {/* Right floating badges */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
        {rightBadges.map((b, i) => (
          <motion.div
            key={b.label}
            initial={{ opacity: 0, x: 20 }}
            animate={{
              opacity: 1,
              x: 0,
              y: [0, -6, 0],
            }}
            transition={{
              opacity: { delay: b.delay, duration: 0.4 },
              x: { delay: b.delay, duration: 0.4 },
              y: {
                delay: b.delay + 0.4,
                duration: 2.8 + i * 0.35,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className={`px-3 py-1.5 rounded-full border text-xs font-semibold whitespace-nowrap shadow-sm ${b.color}`}
          >
            {b.label}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
