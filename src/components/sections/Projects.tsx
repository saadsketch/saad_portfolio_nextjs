"use client";

import {
  useState, useCallback, useEffect, useRef, useLayoutEffect,
} from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import {
  ChevronLeft, ChevronRight, ArrowUpRight,
  Smartphone, Globe, Monitor,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import FadeIn from "@/components/animations/FadeIn";

// ── Palettes & type config ─────────────────────────────────────────────────────
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

// ── Filter tabs ────────────────────────────────────────────────────────────────
const TABS = ["All", "Mobile", "Web", "Desktop"] as const;
type Tab = (typeof TABS)[number];

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
      {TABS.map((tab) => (
        <button
          key={tab}
          ref={(el) => { refs.current[tab] = el; }}
          onClick={() => onChange(tab)}
          className={`relative z-10 px-4 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 ${
            active === tab ? "text-white" : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

// ── Frame size per project type + viewport ─────────────────────────────────────
type FrameShape = "portrait" | "landscape";
interface FrameSize { w: number; h: number; shape: FrameShape }

function getSize(type: string, vw: number): FrameSize {
  if (vw === 0) return { w: 188, h: 384, shape: "portrait" };   // SSR-safe
  if (vw < 640) return { w: 148, h: 302, shape: "portrait" };   // all frames small on mobile vp

  if (type === "mobile") return { w: 188, h: 384, shape: "portrait" };

  // web / desktop → landscape laptop frame
  if (vw >= 1280) return { w: 440, h: 290, shape: "landscape" };
  if (vw >= 1024) return { w: 360, h: 238, shape: "landscape" };
  return { w: 280, h: 185, shape: "landscape" };                 // tablet
}

// ── Responsive viewport hook ───────────────────────────────────────────────────
function useViewport() {
  const [vw, setVw] = useState(0);
  useEffect(() => {
    const fn = () => setVw(window.innerWidth);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return {
    vw,
    isMobile: vw > 0 && vw < 640,
    isTablet: vw >= 640 && vw < 1024,
  };
}

// ── 3D coverflow transform (dynamic x-offset based on card widths) ─────────────
function getT(
  offset: number,
  isMobile: boolean,
  isTablet: boolean,
  centerW: number,
  sideW: number,
) {
  const abs = Math.abs(offset);
  const dir = offset > 0 ? 1 : -1;
  if (abs === 0) return { x: 0, rotateY: 0, scale: 1, opacity: 1, z: 80, zIdx: 20 };
  if (isMobile)  return null;

  const s1 = 0.78;
  const s2 = 0.62;
  const x1 = dir * (centerW / 2 + 20 + (sideW * s1) / 2);
  const x2 = dir * (Math.abs(x1) + (sideW * s1) / 2 + 14 + (sideW * s2) / 2);

  if (abs === 1) return { x: x1, rotateY: dir * -52, scale: s1,  opacity: 0.72, z: 30, zIdx: 15 };
  if (!isTablet && abs === 2)
                 return { x: x2, rotateY: dir * -68, scale: s2,  opacity: 0.34, z: 8,  zIdx: 10 };
  return null;
}

// ── Phone frame ────────────────────────────────────────────────────────────────
function PhoneFrame({ src, title, w, h }: { src: string; title: string; w: number; h: number }) {
  const pad    = Math.round(w * 0.043);
  const rOuter = Math.round(w * 0.17);
  const rInner = Math.round(w * 0.138);
  const btnH   = Math.round(h * 0.078);

  return (
    <div className="relative flex-shrink-0" style={{ width: w, height: h }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: rOuter,
          background: "linear-gradient(160deg, #2d2d32, #101013)",
          border: "1px solid rgba(255,255,255,0.10)",
          padding: pad,
        }}
      >
        <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: rInner }}>
          <Image src={src} alt={title} fill sizes={`${w}px`} className="object-cover" unoptimized />
          <div
            className="absolute z-10"
            style={{
              top: Math.round(w * 0.04), left: "50%", transform: "translateX(-50%)",
              width: Math.round(w * 0.43), height: Math.round(w * 0.054),
              background: "#000", borderRadius: 999,
            }}
          />
          <div className="absolute inset-x-0 top-0 z-[5]"
            style={{ height: "16%", background: "linear-gradient(to bottom, rgba(0,0,0,0.30), transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 z-[5]"
            style={{ height: "10%", background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)" }} />
        </div>
      </div>
      <div className="absolute rounded-l-full"
        style={{ right: -1, top: h * 0.28, width: 2, height: btnH, background: "rgba(255,255,255,0.10)" }} />
      {[0.22, 0.32].map((t, i) => (
        <div key={i} className="absolute rounded-r-full"
          style={{ left: -1, top: h * t, width: 2, height: Math.round(btnH * 0.75), background: "rgba(255,255,255,0.10)" }} />
      ))}
    </div>
  );
}

// ── Laptop / browser frame (landscape) ────────────────────────────────────────
function LaptopFrame({ src, title, w, h, isDesktop }: {
  src: string; title: string; w: number; h: number; isDesktop: boolean;
}) {
  const bezel  = Math.round(w * 0.022);
  const barH   = Math.round(h * 0.115);
  const radius = Math.round(w * 0.022);
  const innerH = h - bezel * 2 - barH;
  const innerW = w - bezel * 2;

  return (
    <div
      className="relative flex-shrink-0"
      style={{
        width: w, height: h,
        borderRadius: radius + 2,
        background: "linear-gradient(160deg, #3a3a3c 0%, #1c1c1e 100%)",
        border: "1.5px solid rgba(255,255,255,0.12)",
        padding: bezel,
        boxShadow: "0 24px 64px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.04) inset",
      }}
    >
      {/* Screen area */}
      <div
        className="relative overflow-hidden"
        style={{ width: innerW, height: barH + innerH, borderRadius: radius - 2, background: "#0d0d0f" }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-3 flex-shrink-0"
          style={{
            height: barH,
            background: isDesktop ? "#2d2d2f" : "#f0f0f2",
            borderBottom: isDesktop
              ? "1px solid rgba(255,255,255,0.06)"
              : "1px solid rgba(0,0,0,0.08)",
          }}
        >
          {/* Traffic lights */}
          <div className="flex gap-1.5 flex-shrink-0">
            {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
              <div key={c} style={{ width: Math.max(6, Math.round(w * 0.014)), height: Math.max(6, Math.round(w * 0.014)), borderRadius: "50%", background: c }} />
            ))}
          </div>
          {/* URL / title bar */}
          {isDesktop ? (
            <div className="flex items-center gap-2 flex-1 px-2">
              <span style={{ fontSize: Math.max(7, Math.round(w * 0.016)), color: "#6e6e73", fontFamily: "monospace" }}>
                {title}
              </span>
            </div>
          ) : (
            <div
              className="flex-1 flex items-center px-2 mx-2"
              style={{ height: Math.round(barH * 0.55), borderRadius: 999, background: "rgba(0,0,0,0.08)" }}
            >
              <span style={{ fontSize: Math.max(7, Math.round(w * 0.016)), color: "#9ca3af", fontFamily: "monospace" }}>
                {title.toLowerCase().replace(/\s/g, "")}.app
              </span>
            </div>
          )}
        </div>

        {/* Screenshot */}
        <div className="relative" style={{ height: innerH }}>
          <Image
            src={src} alt={title} fill
            sizes={`${w}px`}
            className="object-cover object-top"
            unoptimized
          />
          <div
            className="absolute inset-x-0 bottom-0"
            style={{ height: "12%", background: "linear-gradient(to top, rgba(0,0,0,0.18), transparent)" }}
          />
        </div>
      </div>

      {/* Camera dot */}
      <div
        className="absolute"
        style={{
          top: Math.round(bezel * 0.55),
          left: "50%", transform: "translateX(-50%)",
          width: Math.max(3, Math.round(w * 0.007)),
          height: Math.max(3, Math.round(w * 0.007)),
          borderRadius: "50%",
          background: "rgba(255,255,255,0.15)",
        }}
      />
    </div>
  );
}

// ── Device card: picks frame by type + shape ───────────────────────────────────
function DeviceCard({ project, w, h, shape }: {
  project: (typeof projectsData)[0];
  w: number; h: number; shape: FrameShape;
}) {
  if (shape === "landscape") {
    return (
      <LaptopFrame
        src={project.screenshot}
        title={project.title}
        w={w} h={h}
        isDesktop={project.type === "desktop"}
      />
    );
  }
  return <PhoneFrame src={project.screenshot} title={project.title} w={w} h={h} />;
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Projects() {
  const [tab, setTab]       = useState<Tab>("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const { vw, isMobile, isTablet } = useViewport();

  // Filtered list
  const filtered = tab === "All"
    ? projectsData
    : projectsData.filter((p) => {
        if (tab === "Mobile")  return p.type === "mobile";
        if (tab === "Web")     return p.type === "web";
        if (tab === "Desktop") return p.type === "desktop";
        return false;
      });

  useEffect(() => { setActive(0); setPaused(false); }, [tab]);

  const go = useCallback(
    (dir: 1 | -1) => setActive((p) => ((p + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );

  useEffect(() => {
    if (paused || filtered.length <= 1) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [paused, go, filtered.length]);

  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (info.offset.x < -40) go(1);
    else if (info.offset.x > 40) go(-1);
  }, [go]);

  const project  = filtered[active] ?? projectsData[0];
  const palIdx   = projectsData.indexOf(project);
  const pal      = palettes[palIdx % palettes.length];
  const cfg      = typeConfig[project.type];
  const TypeIcon = cfg.icon;

  // Center card dimensions
  const centerSize = getSize(project.type, vw);

  // Stage height: tallest visible card + padding
  const stageH = Math.max(...filtered.map((p) => getSize(p.type, vw).h)) + 40;

  return (
    <section id="projects" className="section-padding bg-white overflow-hidden">
      <div className="container-max">

        {/* ── Header ── */}
        <FadeIn className="text-center mb-8 sm:mb-10">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Things I&apos;ve Built
          </h2>
          <p className="mt-3 text-gray-400 text-sm max-w-sm mx-auto">
            Mobile apps, web platforms, desktop tools — click a card for the full case study.
          </p>
        </FadeIn>

        {/* ── Filter tabs ── */}
        <motion.div
          className="flex justify-center mb-10"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <TabBar active={tab} onChange={setTab} />
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-10 xl:gap-14">

          {/* ── LEFT: project details ── */}
          <div className="order-2 lg:order-1 lg:w-[42%] mt-8 lg:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${tab}-${project.slug}`}
                initial={{ opacity: 0, x: -22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 22 }}
                transition={{ duration: 0.34, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                {/* Type badge */}
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                  style={{ background: `${pal.a}16`, color: pal.a }}
                >
                  <TypeIcon size={12} />
                  {cfg.label}
                </span>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-snug mb-3">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-500 leading-relaxed mb-5">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-7">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-semibold"
                      style={{ background: `${pal.a}12`, color: pal.a }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                  style={{ background: `linear-gradient(135deg, ${pal.a}, ${pal.b})` }}
                >
                  View Case Study
                  <ArrowUpRight size={15} />
                </Link>

                {/* Counter */}
                <p className="text-xs text-gray-300 mt-5 font-medium">
                  {active + 1} / {filtered.length}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── RIGHT: coverflow ── */}
          <div
            className="order-1 lg:order-2 lg:w-[58%]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Stage */}
            <motion.div
              className="relative overflow-hidden cursor-grab active:cursor-grabbing"
              style={{ height: stageH, perspective: "1200px" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {filtered.map((p, i) => {
                const offset   = i - active;
                const { w, h, shape } = getSize(p.type, vw);
                const tr = getT(offset, isMobile, isTablet, centerSize.w, w);
                if (!tr) return null;

                return (
                  <motion.div
                    key={p.slug}
                    className="absolute"
                    style={{
                      left:       "50%",
                      top:        "50%",
                      marginLeft: -(w / 2),
                      marginTop:  -(h / 2),
                      zIndex:     tr.zIdx,
                      cursor:     offset !== 0 ? "pointer" : "default",
                    }}
                    animate={{
                      x: tr.x, rotateY: tr.rotateY,
                      scale: tr.scale, opacity: tr.opacity, z: tr.z,
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    onClick={() => offset !== 0 && setActive(i)}
                  >
                    <DeviceCard project={p} w={w} h={h} shape={shape} />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Nav arrows + dots */}
            {filtered.length > 1 && (
              <div className="flex items-center justify-center gap-3 mt-5">
                <button
                  onClick={() => { setPaused(true); go(-1); }}
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1.5">
                  {filtered.map((_, i) => (
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
                  className="w-9 h-9 rounded-full bg-gray-100 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 flex items-center justify-center text-gray-500 hover:text-indigo-600 transition-all"
                  aria-label="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
