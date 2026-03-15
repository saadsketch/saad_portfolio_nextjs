"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import TypewriterText from "@/components/animations/TypewriterText";
import DotGrid from "@/components/animations/DotGrid";
import PhoneMockup from "@/components/animations/PhoneMockup";

const roles = [
  "Flutter Mobile Developer",
  "Full Stack Web Developer",
  "Desktop App Developer",
  "UI/UX Enthusiast",
];

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
};

export default function Hero() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50/60">
      {/* Subtle blob accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-56 -right-56 w-[600px] h-[600px] rounded-full bg-indigo-100/40 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-56 -left-56 w-[600px] h-[600px] rounded-full bg-violet-100/40 blur-3xl"
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 w-full container-max section-padding pt-24">
        <div className="grid lg:grid-cols-[1fr_480px] gap-12 xl:gap-20 items-center">

          {/* ── Left column: text ─────────────────────────── */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            {/* Status */}
            <motion.div variants={item} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-green-200 text-green-700 text-sm font-medium shadow-sm">
                <motion.span
                  className="w-2 h-2 rounded-full bg-green-500"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                Open to opportunities
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={item}
              className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-gray-900 mb-4 leading-[1.05]"
            >
              Hi, I&apos;m{" "}
              <span className="relative inline-block gradient-text">
                Saad
                <motion.span
                  className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-indigo-400 to-violet-500 rounded-full origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.7, delay: 0.8 }}
                />
              </span>
            </motion.h1>

            {/* Typewriter */}
            <motion.div
              variants={item}
              className="text-xl sm:text-2xl font-semibold text-gray-500 mb-1 h-9 flex items-center"
            >
              <TypewriterText texts={roles} className="text-indigo-600" />
            </motion.div>

            {/* Years badge */}
            <motion.p variants={item} className="text-sm text-gray-400 font-medium mb-6 tracking-wide">
              5+ Years of Professional Experience
            </motion.p>

            {/* Bio */}
            <motion.p
              variants={item}
              className="text-base sm:text-lg text-gray-500 max-w-xl mb-8 leading-relaxed"
            >
              I craft high-performance cross-platform apps with{" "}
              <span className="font-semibold text-gray-800">Flutter</span> for mobile &amp; desktop,
              and build scalable web platforms with{" "}
              <span className="font-semibold text-gray-800">Next.js</span>. Turning complex ideas
              into smooth, user-loved products.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="flex flex-wrap gap-3 mb-8">
              <Button
                size="lg"
                onClick={() => scrollTo("#projects")}
                className="bg-indigo-600 hover:bg-indigo-700 text-white h-12 px-7 rounded-full shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5 transition-all duration-300 gap-2"
              >
                View My Work
                <ArrowRight size={16} />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="h-12 px-7 rounded-full border-gray-200 hover:border-indigo-300 hover:text-indigo-600 hover:-translate-y-0.5 transition-all duration-300 gap-2"
              >
                <Download size={16} />
                Download CV
              </Button>
            </motion.div>

            {/* Socials */}
            <motion.div variants={item} className="flex items-center gap-3">
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
              <span className="text-xs text-gray-300 ml-1 select-none">·</span>
              <button
                onClick={() => scrollTo("#contact")}
                className="text-sm font-medium text-gray-500 hover:text-indigo-600 underline-offset-4 hover:underline transition-colors"
              >
                Let&apos;s talk →
              </button>
            </motion.div>
          </motion.div>

          {/* ── Right column: Dot grid + Phone ─────────────── */}
          <motion.div
            className="relative hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            {/* Dot grid canvas — fills the right column */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden">
              <DotGrid className="absolute inset-0 w-full h-full" />
              {/* Soft edge fade so dots blend into bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-indigo-50/20 pointer-events-none rounded-3xl" />
            </div>

            {/* Phone mockup on top of the grid */}
            <div className="relative z-10">
              <PhoneMockup />
            </div>
          </motion.div>
        </div>

        {/* ── Mobile-only phone (below text, centered) ──── */}
        <motion.div
          className="lg:hidden flex flex-col items-center mt-12 relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="relative w-full max-w-sm h-80 rounded-3xl overflow-hidden">
            <DotGrid className="absolute inset-0 w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />
          </div>
          <div className="relative -mt-64 z-10 scale-90">
            <PhoneMockup />
          </div>
        </motion.div>

        {/* Mouse scroll indicator — centered at very bottom */}
        <motion.button
          onClick={() => scrollTo("#about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 hover:text-indigo-500 transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.6 }}
          aria-label="Scroll down"
        >
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-gray-300 flex items-start justify-center pt-1.5"
          >
            <div className="w-1 h-2.5 rounded-full bg-indigo-400" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
}
