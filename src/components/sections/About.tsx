"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Smartphone, Globe, Monitor, Flame } from "lucide-react";
import OrbitalVisual from "@/components/animations/OrbitalVisual";

// ── Count-up stat ──────────────────────────────────────────────────────────────
function CountUpStat({
  target,
  suffix = "",
  label,
  delay = 0,
}: {
  target: number;
  suffix?: string;
  label: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1600;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime - delay * 1000;
      if (elapsed < 0) { requestAnimationFrame(tick); return; }
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo — anime.js feel
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, delay]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-4xl font-extrabold gradient-text leading-none">
        {count}
        <span className="text-3xl">{suffix}</span>
      </p>
      <p className="text-xs font-semibold text-gray-400 mt-1.5 uppercase tracking-widest">
        {label}
      </p>
    </div>
  );
}

// ── What I build cards ─────────────────────────────────────────────────────────
const services = [
  {
    icon: Smartphone,
    title: "Mobile Apps",
    desc: "Cross-platform iOS & Android apps with Flutter — one codebase, native performance.",
    color: "text-sky-600 bg-sky-50",
  },
  {
    icon: Globe,
    title: "Web Platforms",
    desc: "Full-stack web apps with Next.js, TypeScript, and scalable backend APIs.",
    color: "text-indigo-600 bg-indigo-50",
  },
  {
    icon: Monitor,
    title: "Desktop Apps",
    desc: "Windows & macOS apps built with Flutter Desktop — same code, every platform.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: Flame,
    title: "Firebase & Cloud",
    desc: "Real-time databases, Auth, push notifications, and cloud functions at scale.",
    color: "text-amber-600 bg-amber-50",
  },
];

// ── Stagger container ──────────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, x: -18 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

// ── Section ────────────────────────────────────────────────────────────────────
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding bg-white overflow-hidden">
      <div ref={sectionRef} className="container-max">

        {/* ── Two-column: orbital LEFT, text RIGHT ── */}
        <div className="grid lg:grid-cols-[480px_1fr] gap-12 xl:gap-20 items-center mb-20">

          {/* LEFT — Orbital visual */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <OrbitalVisual />
          </motion.div>

          {/* RIGHT — Text content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="flex flex-col"
          >
            <motion.span
              variants={lineVariants}
              className="text-sm font-bold text-indigo-600 uppercase tracking-widest mb-2"
            >
              About Me
            </motion.span>

            <motion.h2
              variants={lineVariants}
              className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight mb-5"
            >
              Crafting apps people{" "}
              <span className="gradient-text">actually love</span>
            </motion.h2>

            <motion.p variants={lineVariants} className="text-gray-500 leading-relaxed mb-4">
              I&apos;m <span className="font-semibold text-gray-800">Saad</span>, a Full Stack
              Mobile Application Developer with{" "}
              <span className="font-semibold text-gray-800">5+ years</span> of professional
              experience specialising in{" "}
              <span className="font-semibold text-indigo-600">Flutter</span>. From idea to
              App Store — I handle the full lifecycle: architecture, UI, APIs, deployment.
            </motion.p>

            <motion.p variants={lineVariants} className="text-gray-500 leading-relaxed mb-8">
              I&apos;ve shipped 30+ apps across mobile, web and desktop for clients in
              e-commerce, health, fintech and real estate. When I&apos;m not coding I&apos;m
              exploring new Flutter packages, contributing to open-source, or experimenting
              with creative animations.
            </motion.p>

            {/* Tags */}
            <motion.div variants={lineVariants} className="flex flex-wrap gap-2 mb-10">
              {["Flutter", "Dart", "Firebase", "Next.js", "TypeScript", "REST APIs"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full border border-indigo-100"
                  >
                    {tag}
                  </span>
                )
              )}
            </motion.div>

            {/* Count-up stats */}
            <motion.div
              variants={lineVariants}
              className="grid grid-cols-3 gap-4 p-5 bg-gradient-to-br from-slate-50 to-white border border-gray-100 rounded-2xl shadow-sm"
            >
              <CountUpStat target={30}  suffix="+" label="Apps Shipped"  delay={0} />
              <CountUpStat target={5}   suffix="+" label="Years Exp."    delay={0.1} />
              <CountUpStat target={100} suffix="k+" label="Downloads"    delay={0.2} />
            </motion.div>
          </motion.div>
        </div>

        {/* ── Mobile orbital (below text, visible only on small screens) ── */}
        <motion.div
          className="lg:hidden flex justify-center mb-16 overflow-hidden"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <div className="scale-[0.65] origin-center" style={{ height: 320 }}>
            <OrbitalVisual />
          </div>
        </motion.div>

        {/* ── "What I build" service cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          <motion.p
            variants={lineVariants}
            className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8"
          >
            What I Build
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  show: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: i * 0.08,
                      duration: 0.5,
                      ease: [0.21, 0.47, 0.32, 0.98],
                    },
                  },
                }}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 340, damping: 22 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-gray-100 hover:border-indigo-100 hover:shadow-lg transition-colors duration-300 group cursor-default"
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${s.color} group-hover:scale-110 transition-transform duration-300`}
                >
                  <s.icon size={22} />
                </div>
                <h4 className="font-bold text-gray-900 mb-1.5">{s.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
