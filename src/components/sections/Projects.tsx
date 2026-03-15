"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ChevronLeft, ChevronRight, Smartphone, Globe, Monitor } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";

const typeIcons = {
  mobile: { icon: Smartphone, label: "Mobile App", color: "text-blue-500 bg-blue-50" },
  web: { icon: Globe, label: "Web App", color: "text-green-500 bg-green-50" },
  desktop: { icon: Monitor, label: "Desktop App", color: "text-purple-500 bg-purple-50" },
};

const cardColors = [
  "from-indigo-50 to-blue-50",
  "from-violet-50 to-purple-50",
  "from-sky-50 to-cyan-50",
  "from-rose-50 to-pink-50",
  "from-amber-50 to-yellow-50",
  "from-emerald-50 to-teal-50",
];

export default function Projects() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = projectsData.length;

  const go = useCallback(
    (next: number, dir: number) => {
      setDirection(dir);
      setCurrent(((next % total) + total) % total);
    },
    [total]
  );

  const prev = () => go(current - 1, -1);
  const next = () => go(current + 1, 1);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const t = setInterval(() => go(current + 1, 1), 4500);
    return () => clearInterval(t);
  }, [current, isPaused, go]);

  // Get visible card indices (current, prev, next) for the 3-up desktop view
  const getVisible = () => {
    const prev = ((current - 1) + total) % total;
    const next = (current + 1) % total;
    return [prev, current, next];
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.92 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.92 }),
  };

  const project = projectsData[current];
  const typeInfo = typeIcons[project.type];
  const TypeIcon = typeInfo.icon;

  return (
    <section id="projects" className="section-padding bg-white overflow-hidden">
      <div className="container-max">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            Portfolio
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Things I&apos;ve built
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Mobile apps, web platforms, and desktop tools — a selection of my best work.
          </p>
        </FadeIn>

        {/* Desktop 3-card preview */}
        <div className="hidden lg:flex items-center justify-center gap-5 mb-10">
          {getVisible().map((idx, pos) => {
            const p = projectsData[idx];
            const isCenter = pos === 1;
            const ti = typeIcons[p.type];
            const TIcon = ti.icon;
            return (
              <motion.div
                key={idx}
                animate={{
                  scale: isCenter ? 1 : 0.88,
                  opacity: isCenter ? 1 : 0.55,
                  y: isCenter ? 0 : 20,
                }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                onClick={() => !isCenter && go(idx, pos === 0 ? -1 : 1)}
                className={`w-80 flex-shrink-0 rounded-2xl border bg-gradient-to-br ${cardColors[idx % cardColors.length]} p-6 flex flex-col gap-4 ${!isCenter ? "cursor-pointer" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${ti.color}`}>
                    <TIcon size={12} />
                    {ti.label}
                  </div>
                  <span className="text-3xl">{p.emoji}</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">{p.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-500 line-clamp-3">{p.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {p.tags.slice(0, 3).map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs bg-white/60 text-gray-600">
                      {t}
                    </Badge>
                  ))}
                  {p.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs bg-white/60 text-gray-500">
                      +{p.tags.length - 3}
                    </Badge>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile / Focused card */}
        <div
          className="relative max-w-lg mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className={`rounded-3xl border border-gray-100 bg-gradient-to-br ${cardColors[current % cardColors.length]} p-7 shadow-lg`}
            >
              {/* Type + emoji header */}
              <div className="flex items-start justify-between mb-5">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold ${typeInfo.color}`}>
                  <TypeIcon size={13} />
                  {typeInfo.label}
                </div>
                <motion.span
                  className="text-5xl"
                  animate={{ rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {project.emoji}
                </motion.span>
              </div>

              {/* Title + description */}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-white/70 text-gray-600 backdrop-blur-sm">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Links */}
              <div className="flex gap-3">
                {project.liveUrl && (
                  <Button
                    size="sm"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white gap-1.5 rounded-xl"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={13} />
                      Live Demo
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-1.5 rounded-xl border-white/60 bg-white/60 hover:bg-white backdrop-blur-sm"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={13} />
                      Source
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute -left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 z-10"
            aria-label="Previous project"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-lg transition-all duration-200 z-10"
            aria-label="Next project"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {projectsData.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > current ? 1 : -1)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 h-2 bg-indigo-600"
                  : "w-2 h-2 bg-gray-300 hover:bg-indigo-300"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-xs text-gray-400 mt-3 font-medium">
          {current + 1} / {total}
        </p>
      </div>
    </section>
  );
}
