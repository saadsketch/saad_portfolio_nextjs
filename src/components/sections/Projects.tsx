"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Smartphone, Globe, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import FadeIn from "@/components/animations/FadeIn";

// ── Palettes ───────────────────────────────────────────────────────────────────
const palettes = [
  { a: "#6366f1", b: "#8B5CF6" },
  { a: "#06B6D4", b: "#3B82F6" },
  { a: "#F59E0B", b: "#F97316" },
  { a: "#10B981", b: "#059669" },
  { a: "#EC4899", b: "#8B5CF6" },
  { a: "#EF4444", b: "#F97316" },
];

const typeConfig = {
  mobile:  { icon: Smartphone, label: "Mobile App"  },
  web:     { icon: Globe,      label: "Web App"      },
  desktop: { icon: Monitor,    label: "Desktop App"  },
};

// ── Responsive sizes ───────────────────────────────────────────────────────────
function useCoverflowConfig() {
  const [vw, setVw] = useState(0);

  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const isMobile = vw > 0 && vw < 600;
  const isTablet = vw >= 600 && vw < 960;

  return {
    phoneW: isMobile ? 148 : 188,
    phoneH: isMobile ? 302 : 384,
    isMobile,
    isTablet,
  };
}

// ── 3D transform per card offset ──────────────────────────────────────────────
function getTransform(
  offset: number,
  isMobile: boolean,
  isTablet: boolean,
) {
  const abs = Math.abs(offset);
  const dir = offset > 0 ? 1 : -1;

  if (abs === 0)
    return { x: 0,         rotateY: 0,        scale: 1,    opacity: 1,    z: 80, zIdx: 20 };

  if (isMobile) return null;   // mobile: only center card

  if (abs === 1)
    return { x: dir * (isTablet ? 158 : 192), rotateY: dir * -54, scale: isTablet ? 0.75 : 0.78, opacity: 0.72, z: 30, zIdx: 15 };

  if (!isTablet && abs === 2)
    return { x: dir * 322, rotateY: dir * -70, scale: 0.62, opacity: 0.38, z: 8, zIdx: 10 };

  return null;
}

// ── Phone frame with screenshot inside ────────────────────────────────────────
function PhoneCard({
  project,
  idx,
  phoneW,
  phoneH,
}: {
  project: (typeof projectsData)[0];
  idx: number;
  phoneW: number;
  phoneH: number;
}) {
  const pal    = palettes[idx % palettes.length];
  const pad    = Math.round(phoneW * 0.043);      // 8px on 188
  const rOuter = Math.round(phoneW * 0.17);       // 32px on 188
  const rInner = Math.round(phoneW * 0.138);      // 26px on 188
  const islandW = Math.round(phoneW * 0.43);
  const islandH = Math.round(phoneW * 0.054);
  const btnH   = Math.round(phoneH * 0.078);

  return (
    <div className="relative flex-shrink-0" style={{ width: phoneW, height: phoneH }}>
      {/* ── Outer shell — NO box-shadow ── */}
      <div
        className="absolute inset-0"
        style={{
          borderRadius: rOuter,
          background:   "linear-gradient(160deg, #2d2d32, #101013)",
          border:       "1px solid rgba(255,255,255,0.10)",
          padding:      pad,
        }}
      >
        {/* ── Screen ── */}
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: rInner }}
        >
          {/* Screenshot image */}
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            sizes={`${phoneW}px`}
            className="object-cover"
            unoptimized
          />

          {/* Dynamic island overlay */}
          <div
            className="absolute z-10"
            style={{
              top:       Math.round(phoneW * 0.04),
              left:      "50%",
              transform: "translateX(-50%)",
              width:     islandW,
              height:    islandH,
              background:"#000",
              borderRadius: 999,
            }}
          />

          {/* Subtle top gradient for visibility */}
          <div
            className="absolute inset-x-0 top-0 z-[5]"
            style={{
              height: "18%",
              background: "linear-gradient(to bottom, rgba(0,0,0,0.35), transparent)",
            }}
          />
          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 z-[5]"
            style={{
              height: "12%",
              background: "linear-gradient(to top, rgba(0,0,0,0.30), transparent)",
            }}
          />
        </div>
      </div>

      {/* Power button */}
      <div
        className="absolute rounded-l-full"
        style={{
          right:      -1,
          top:        phoneH * 0.28,
          width:      2,
          height:     btnH,
          background: "rgba(255,255,255,0.10)",
        }}
      />
      {/* Volume buttons */}
      {[0.22, 0.32].map((t, i) => (
        <div
          key={i}
          className="absolute rounded-r-full"
          style={{
            left:       -1,
            top:        phoneH * t,
            width:      2,
            height:     Math.round(btnH * 0.75),
            background: "rgba(255,255,255,0.10)",
          }}
        />
      ))}
    </div>
  );
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Projects() {
  const [active, setActive] = useState(0);
  const [paused, setPaused]  = useState(false);
  const dragStartX = useRef(0);
  const total = projectsData.length;

  const { phoneW, phoneH, isMobile, isTablet } = useCoverflowConfig();

  const go = useCallback(
    (dir: 1 | -1) => setActive((p) => ((p + dir + total) % total)),
    [total],
  );

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [paused, go]);

  // Touch / drag swipe
  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -40)       go(1);
      else if (info.offset.x > 40)   go(-1);
    },
    [go],
  );

  const project  = projectsData[active];
  const pal      = palettes[active % palettes.length];
  const cfg      = typeConfig[project.type];
  const TypeIcon = cfg.icon;
  const stageH   = phoneH + 24;

  return (
    <section id="projects" className="section-padding bg-white overflow-hidden">
      <div className="container-max">

        {/* ── Header ── */}
        <FadeIn className="text-center mb-10 sm:mb-12">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Things I&apos;ve Built
          </h2>
          <p className="mt-3 text-gray-400 text-sm max-w-sm mx-auto">
            Tap a side card or swipe to browse — click the button for full details.
          </p>
        </FadeIn>

        {/* ── Coverflow stage ── */}
        <motion.div
          className="relative overflow-hidden cursor-grab active:cursor-grabbing"
          style={{ height: stageH, perspective: "1100px" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          onHoverStart={() => setPaused(true)}
          onHoverEnd={() => setPaused(false)}
        >
          {projectsData.map((p, i) => {
            const offset = i - active;
            const t      = getTransform(offset, isMobile, isTablet);
            if (!t) return null;

            return (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  left:       "50%",
                  top:        "50%",
                  marginLeft: -(phoneW / 2),
                  marginTop:  -(phoneH / 2),
                  zIndex:     t.zIdx,
                  cursor:     offset !== 0 ? "pointer" : "default",
                  pointerEvents: "auto",
                }}
                animate={{
                  x:       t.x,
                  rotateY: t.rotateY,
                  scale:   t.scale,
                  opacity: t.opacity,
                  z:       t.z,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                onClick={() => offset !== 0 && setActive(i)}
              >
                <PhoneCard project={p} idx={i} phoneW={phoneW} phoneH={phoneH} />
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Controls + project info ── */}
        <div className="mt-7 sm:mt-8 flex flex-col items-center gap-4 sm:gap-5">

          {/* Arrows + dots */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => { setPaused(true); go(-1); }}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-1.5">
              {projectsData.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPaused(true); setActive(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width:      i === active ? 22 : 7,
                    height:     7,
                    background: i === active ? pal.a : "#D1D5DB",
                  }}
                  aria-label={`Go to project ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => { setPaused(true); go(1); }}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Active project info */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="text-center px-4 w-full max-w-md"
          >
            {/* Type badge */}
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-2"
              style={{ background: `${pal.a}14`, color: pal.a }}
            >
              <TypeIcon size={10} />
              {cfg.label}
            </span>

            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed mb-3 line-clamp-2">
              {project.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap justify-center gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full font-semibold"
                  style={{ background: `${pal.a}12`, color: pal.a }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* CTA */}
            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${pal.a}, ${pal.b})` }}
            >
              View Case Study
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          <p className="text-xs text-gray-300 font-medium tracking-wide">
            {active + 1} / {total}
          </p>
        </div>

      </div>
    </section>
  );
}
