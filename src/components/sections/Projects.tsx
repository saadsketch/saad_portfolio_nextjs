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

// ── Responsive coverflow config ────────────────────────────────────────────────
function useCoverflowConfig() {
  const [vw, setVw] = useState(0);
  useEffect(() => {
    const fn = () => setVw(window.innerWidth);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  const isMobile = vw > 0 && vw < 640;
  const isTablet = vw >= 640 && vw < 1024;
  return {
    phoneW: isMobile ? 148 : 188,
    phoneH: isMobile ? 302 : 384,
    isMobile,
    isTablet,
  };
}

// ── 3D coverflow transform ─────────────────────────────────────────────────────
function getT(offset: number, isMobile: boolean, isTablet: boolean) {
  const abs = Math.abs(offset);
  const dir = offset > 0 ? 1 : -1;
  if (abs === 0) return { x: 0,         rotateY: 0,        scale: 1,    opacity: 1,    z: 80, zIdx: 20 };
  if (isMobile)  return null;
  if (abs === 1) return { x: dir * 190, rotateY: dir * -54, scale: 0.78, opacity: 0.72, z: 30, zIdx: 15 };
  if (!isTablet && abs === 2)
                 return { x: dir * 310, rotateY: dir * -70, scale: 0.62, opacity: 0.36, z: 8,  zIdx: 10 };
  return null;
}

// ── Device frame props ─────────────────────────────────────────────────────────
interface FrameProps {
  src: string;
  title: string;
  phoneW: number;
  phoneH: number;
}

// ── Mobile phone frame ─────────────────────────────────────────────────────────
function PhoneFrame({ src, title, phoneW, phoneH }: FrameProps) {
  const pad    = Math.round(phoneW * 0.043);
  const rOuter = Math.round(phoneW * 0.17);
  const rInner = Math.round(phoneW * 0.138);
  const btnH   = Math.round(phoneH * 0.078);

  return (
    <div className="relative flex-shrink-0" style={{ width: phoneW, height: phoneH }}>
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
          <Image src={src} alt={title} fill sizes={`${phoneW}px`} className="object-cover" unoptimized />
          {/* Dynamic island */}
          <div
            className="absolute z-10"
            style={{
              top: Math.round(phoneW * 0.04), left: "50%", transform: "translateX(-50%)",
              width: Math.round(phoneW * 0.43), height: Math.round(phoneW * 0.054),
              background: "#000", borderRadius: 999,
            }}
          />
          <div className="absolute inset-x-0 top-0 z-[5]"
            style={{ height: "16%", background: "linear-gradient(to bottom, rgba(0,0,0,0.30), transparent)" }} />
          <div className="absolute inset-x-0 bottom-0 z-[5]"
            style={{ height: "10%", background: "linear-gradient(to top, rgba(0,0,0,0.25), transparent)" }} />
        </div>
      </div>
      {/* Buttons */}
      <div className="absolute rounded-l-full"
        style={{ right: -1, top: phoneH * 0.28, width: 2, height: btnH, background: "rgba(255,255,255,0.10)" }} />
      {[0.22, 0.32].map((t, i) => (
        <div key={i} className="absolute rounded-r-full"
          style={{ left: -1, top: phoneH * t, width: 2, height: Math.round(btnH * 0.75), background: "rgba(255,255,255,0.10)" }} />
      ))}
    </div>
  );
}

// ── Browser frame (web apps) ───────────────────────────────────────────────────
function BrowserFrame({ src, title, phoneW, phoneH }: FrameProps) {
  const BAR_H   = 36;
  const screenH = phoneH - BAR_H;

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: phoneW, height: phoneH, borderRadius: 14, border: "1px solid #e5e7eb" }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-2 px-3"
        style={{ height: BAR_H, background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5 flex-shrink-0">
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
          ))}
        </div>
        {/* URL bar */}
        <div
          className="flex-1 flex items-center px-2"
          style={{ height: 18, borderRadius: 9, background: "#e5e7eb" }}
        >
          <span style={{ fontSize: 7, color: "#9ca3af", fontFamily: "monospace", letterSpacing: 0 }}>
            app.example.com
          </span>
        </div>
      </div>

      {/* Screenshot */}
      <div className="relative" style={{ height: screenH }}>
        <Image src={src} alt={title} fill sizes={`${phoneW}px`}
          className="object-cover object-top" unoptimized />
        <div className="absolute inset-x-0 bottom-0"
          style={{ height: "10%", background: "linear-gradient(to top, rgba(0,0,0,0.12), transparent)" }} />
      </div>
    </div>
  );
}

// ── OS Window frame (desktop apps) ────────────────────────────────────────────
function WindowFrame({ src, title, phoneW, phoneH }: FrameProps) {
  const TITLE_H = 28;
  const MENU_H  = 20;
  const screenH = phoneH - TITLE_H - MENU_H;

  return (
    <div
      className="relative flex-shrink-0 overflow-hidden"
      style={{ width: phoneW, height: phoneH, borderRadius: 12, border: "1px solid rgba(0,0,0,0.18)" }}
    >
      {/* Title bar */}
      <div
        className="flex items-center px-3 gap-2"
        style={{ height: TITLE_H, background: "#1c1c1e" }}
      >
        <div className="flex gap-1.5 flex-shrink-0">
          {["#ff5f56", "#ffbd2e", "#27c93f"].map((c) => (
            <div key={c} style={{ width: 7, height: 7, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span
          className="flex-1 text-center"
          style={{ fontSize: 8, color: "#8e8e93", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", paddingRight: 28 }}
        >
          {title}
        </span>
      </div>

      {/* Menu bar */}
      <div
        className="flex items-center gap-3 px-3"
        style={{ height: MENU_H, background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}
      >
        {["File", "Edit", "View", "Window", "Help"].map((m) => (
          <span key={m} style={{ fontSize: 7, color: "#6b7280" }}>{m}</span>
        ))}
      </div>

      {/* Screenshot */}
      <div className="relative" style={{ height: screenH }}>
        <Image src={src} alt={title} fill sizes={`${phoneW}px`}
          className="object-cover object-top" unoptimized />
        <div className="absolute inset-x-0 bottom-0"
          style={{ height: "10%", background: "linear-gradient(to top, rgba(0,0,0,0.12), transparent)" }} />
      </div>
    </div>
  );
}

// ── Device card: picks frame by project type ───────────────────────────────────
function DeviceCard({ project, phoneW, phoneH }: {
  project: (typeof projectsData)[0];
  phoneW: number;
  phoneH: number;
}) {
  const props = { src: project.screenshot, title: project.title, phoneW, phoneH };
  if (project.type === "web")     return <BrowserFrame {...props} />;
  if (project.type === "desktop") return <WindowFrame  {...props} />;
  return <PhoneFrame {...props} />;
}

// ── Main section ───────────────────────────────────────────────────────────────
export default function Projects() {
  const [tab, setTab]     = useState<Tab>("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const { phoneW, phoneH, isMobile, isTablet } = useCoverflowConfig();

  // Filtered list
  const filtered = tab === "All"
    ? projectsData
    : projectsData.filter((p) => {
        if (tab === "Mobile")  return p.type === "mobile";
        if (tab === "Web")     return p.type === "web";
        if (tab === "Desktop") return p.type === "desktop";
        return false;
      });

  // Reset on filter change
  useEffect(() => { setActive(0); setPaused(false); }, [tab]);

  const go = useCallback(
    (dir: 1 | -1) =>
      setActive((p) => ((p + dir + filtered.length) % filtered.length)),
    [filtered.length],
  );

  // Auto-advance
  useEffect(() => {
    if (paused || filtered.length <= 1) return;
    const t = setInterval(() => go(1), 4000);
    return () => clearInterval(t);
  }, [paused, go, filtered.length]);

  // Swipe
  const handleDragEnd = useCallback((_: unknown, info: PanInfo) => {
    if (info.offset.x < -40) go(1);
    else if (info.offset.x > 40) go(-1);
  }, [go]);

  const project  = filtered[active] ?? projectsData[0];
  const palIdx   = projectsData.indexOf(project);
  const pal      = palettes[palIdx % palettes.length];
  const cfg      = typeConfig[project.type];
  const TypeIcon = cfg.icon;
  const stageH   = phoneH + 24;

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
              style={{ height: stageH, perspective: "1100px" }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.1}
              onDragEnd={handleDragEnd}
            >
              {filtered.map((p, i) => {
                const offset = i - active;
                const tr     = getT(offset, isMobile, isTablet);
                if (!tr) return null;

                return (
                  <motion.div
                    key={p.slug}
                    className="absolute"
                    style={{
                      left:       "50%",
                      top:        "50%",
                      marginLeft: -(phoneW / 2),
                      marginTop:  -(phoneH / 2),
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
                    <DeviceCard project={p} phoneW={phoneW} phoneH={phoneH} />
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
