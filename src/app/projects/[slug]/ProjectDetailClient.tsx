"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Smartphone,
  Globe,
  Monitor,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import type { Project } from "@/data/projects";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const tagIcons: Record<string, string> = {
  Flutter:        `${CDN}/flutter/flutter-original.svg`,
  Dart:           `${CDN}/dart/dart-original.svg`,
  Firebase:       `${CDN}/firebase/firebase-plain.svg`,
  React:          `${CDN}/react/react-original.svg`,
  "Next.js":      `${CDN}/nextjs/nextjs-original.svg`,
  TypeScript:     `${CDN}/typescript/typescript-original.svg`,
  JavaScript:     `${CDN}/javascript/javascript-original.svg`,
  "Node.js":      `${CDN}/nodejs/nodejs-original.svg`,
  MongoDB:        `${CDN}/mongodb/mongodb-original.svg`,
  PostgreSQL:     `${CDN}/postgresql/postgresql-original.svg`,
  "Tailwind CSS": `${CDN}/tailwindcss/tailwindcss-original.svg`,
  Prisma:         `${CDN}/prisma/prisma-original.svg`,
  Python:         `${CDN}/python/python-original.svg`,
  Docker:         `${CDN}/docker/docker-original.svg`,
  SQLite:         `${CDN}/sqlite/sqlite-original.svg`,
};

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

// ── Phone frame for screenshot coverflow ──────────────────────────────────────
const PHONE_W = 200;
const PHONE_H = 408;

function PhoneFrame({ src, title }: { src: string; title: string }) {
  const pad    = 9;
  const rOuter = 36;
  const rInner = 28;

  return (
    <div className="relative flex-shrink-0" style={{ width: PHONE_W, height: PHONE_H }}>
      <div
        className="absolute inset-0"
        style={{
          borderRadius: rOuter,
          background:   "linear-gradient(160deg, #2d2d32, #101013)",
          border:       "1px solid rgba(255,255,255,0.10)",
          padding:      pad,
        }}
      >
        <div
          className="relative w-full h-full overflow-hidden"
          style={{ borderRadius: rInner }}
        >
          <Image
            src={src}
            alt={title}
            fill
            sizes={`${PHONE_W}px`}
            className="object-cover"
            unoptimized
          />
          {/* Dynamic island */}
          <div
            className="absolute z-10"
            style={{
              top: 10, left: "50%", transform: "translateX(-50%)",
              width: 86, height: 22,
              background: "#000", borderRadius: 999,
            }}
          />
          {/* Top gradient */}
          <div
            className="absolute inset-x-0 top-0 z-[5]"
            style={{ height: "16%", background: "linear-gradient(to bottom, rgba(0,0,0,0.32), transparent)" }}
          />
          {/* Bottom gradient */}
          <div
            className="absolute inset-x-0 bottom-0 z-[5]"
            style={{ height: "10%", background: "linear-gradient(to top, rgba(0,0,0,0.28), transparent)" }}
          />
        </div>
      </div>
      {/* Power + volume buttons */}
      <div className="absolute rounded-l-full" style={{ right: -1, top: PHONE_H * 0.28, width: 2, height: 32, background: "rgba(255,255,255,0.10)" }} />
      {[0.22, 0.31].map((t, i) => (
        <div key={i} className="absolute rounded-r-full" style={{ left: -1, top: PHONE_H * t, width: 2, height: 24, background: "rgba(255,255,255,0.10)" }} />
      ))}
    </div>
  );
}

// ── Coverflow transform ────────────────────────────────────────────────────────
function getCoverflowT(offset: number) {
  const abs = Math.abs(offset);
  const dir = offset > 0 ? 1 : -1;

  if (abs === 0) return { x: 0,         rotateY: 0,        scale: 1,    opacity: 1,    z: 80, zIdx: 20 };
  if (abs === 1) return { x: dir * 210, rotateY: dir * -52, scale: 0.78, opacity: 0.72, z: 30, zIdx: 15 };
  if (abs === 2) return { x: dir * 350, rotateY: dir * -68, scale: 0.62, opacity: 0.38, z: 8,  zIdx: 10 };
  return null;
}

// ── Screenshot coverflow carousel ─────────────────────────────────────────────
function ScreenshotCoverflow({
  screenshots,
  title,
  pal,
}: {
  screenshots: string[];
  title: string;
  pal: { a: string; b: string };
}) {
  const [active, setActive] = useState(0);
  const total = screenshots.length;

  const go = useCallback(
    (dir: 1 | -1) => setActive((p) => ((p + dir + total) % total)),
    [total],
  );

  const handleDragEnd = useCallback(
    (_: unknown, info: PanInfo) => {
      if (info.offset.x < -40) go(1);
      else if (info.offset.x > 40) go(-1);
    },
    [go],
  );

  const stageH = PHONE_H + 20;

  return (
    <div className="select-none">
      {/* Stage */}
      <motion.div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: stageH, perspective: "1100px" }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
      >
        {screenshots.map((src, i) => {
          const offset = i - active;
          const t      = getCoverflowT(offset);
          if (!t) return null;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left:       "50%",
                top:        "50%",
                marginLeft: -(PHONE_W / 2),
                marginTop:  -(PHONE_H / 2),
                zIndex:     t.zIdx,
                cursor:     offset !== 0 ? "pointer" : "default",
              }}
              animate={{ x: t.x, rotateY: t.rotateY, scale: t.scale, opacity: t.opacity, z: t.z }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              onClick={() => offset !== 0 && setActive(i)}
            >
              <PhoneFrame src={src} title={title} />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Nav */}
      <div className="flex items-center justify-center gap-3 mt-5">
        <button
          onClick={() => go(-1)}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-all"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="flex items-center gap-2">
          {screenshots.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width:      i === active ? 22 : 7,
                height:     7,
                background: i === active ? pal.a : "#D1D5DB",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => go(1)}
          className="w-9 h-9 rounded-full border border-gray-200 bg-white flex items-center justify-center text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-all"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <p className="text-center text-xs text-gray-300 mt-2 font-medium">
        {active + 1} / {total}
      </p>
    </div>
  );
}

// ── Main client component ──────────────────────────────────────────────────────
export default function ProjectDetailClient({
  project,
  idx,
}: {
  project: Project;
  idx: number;
}) {
  const pal      = palettes[idx % palettes.length];
  const cfg      = typeConfig[project.type];
  const TypeIcon = cfg.icon;

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.48, ease: [0.21, 0.47, 0.32, 0.98] } },
  };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Sticky navbar ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/#projects"
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft size={15} />
            All Projects
          </Link>
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-white hover:opacity-90 transition-opacity"
                style={{ background: `linear-gradient(135deg, ${pal.a}, ${pal.b})` }}
              >
                <ExternalLink size={12} />
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Github size={12} />
                Source
              </a>
            )}
          </div>
        </div>
      </header>

      {/* ── Hero: info left + coverflow right ── */}
      <section
        className="relative overflow-hidden py-16 sm:py-20 px-4 sm:px-6 lg:px-8"
        style={{
          background: `radial-gradient(ellipse at 65% 0%, ${pal.a}12 0%, transparent 55%), #f9fafb`,
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12 xl:gap-20">

            {/* Left: project info */}
            <motion.div
              className="lg:w-[44%] mb-14 lg:mb-0"
              variants={stagger}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold mb-4"
                  style={{ background: `${pal.a}18`, color: pal.a }}
                >
                  <TypeIcon size={12} />
                  {cfg.label}
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl xl:text-5xl font-extrabold text-gray-900 leading-tight mb-4"
              >
                {project.title}
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-gray-500 text-sm sm:text-base leading-relaxed mb-8"
              >
                {project.longDescription}
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
                    style={{ background: `linear-gradient(135deg, ${pal.a}, ${pal.b})` }}
                  >
                    <ExternalLink size={15} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    <Github size={15} />
                    View on GitHub
                  </a>
                )}
              </motion.div>
            </motion.div>

            {/* Right: screenshot coverflow */}
            <motion.div
              className="lg:w-[56%]"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.1 }}
            >
              {/* Soft glow behind phones */}
              <div className="relative">
                <div
                  className="absolute inset-x-1/4 top-1/4 bottom-0 blur-3xl rounded-full -z-10"
                  style={{ background: `${pal.a}22` }}
                />
                <ScreenshotCoverflow
                  screenshots={project.screenshots}
                  title={project.title}
                  pal={pal}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── Tech stack ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: pal.a }}>
              Tech Stack
            </span>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">Built With</h2>
          </motion.div>

          <motion.div
            className="flex flex-wrap gap-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            {project.tags.map((tag) => (
              <motion.div
                key={tag}
                variants={fadeUp}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-100 hover:border-gray-200 transition-colors"
              >
                {tagIcons[tag] && (
                  <Image src={tagIcons[tag]} alt={tag} width={22} height={22} unoptimized style={{ objectFit: "contain" }} />
                )}
                <span className="text-sm font-semibold text-gray-700">{tag}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mb-8"
          >
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: pal.a }}>
              Features
            </span>
            <h2 className="mt-1 text-2xl font-bold text-gray-900">Key Highlights</h2>
          </motion.div>

          <motion.div
            className="grid sm:grid-cols-2 gap-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={stagger}
          >
            {project.features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100"
              >
                <div
                  className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: `${pal.a}18` }}
                >
                  <CheckCircle2 size={11} style={{ color: pal.a }} />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <motion.div
          className="max-w-lg mx-auto text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="text-2xl font-bold text-gray-900 mb-2">Interested in this project?</p>
          <p className="text-gray-400 text-sm mb-8">
            Let&apos;s discuss how I can build something similar for you.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${pal.a}, ${pal.b})` }}
            >
              Get in Touch
            </Link>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
