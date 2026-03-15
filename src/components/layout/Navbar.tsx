"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About",      href: "#about"      },
  { label: "Skills",     href: "#skills"     },
  { label: "Projects",   href: "#projects"   },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact"    },
];

export default function Navbar() {
  const [scrolled,       setScrolled]       = useState(false);
  const [menuOpen,       setMenuOpen]        = useState(false);
  const [activeSection,  setActiveSection]   = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const ids = navLinks.map((l) => l.href.slice(1));
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ── Desktop / tablet ── */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0,   opacity: 1 }}
        transition={{ duration: 0.6, delay: 3.0, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <motion.header
          animate={{
            marginTop:    scrolled ? 16   : 0,
            borderRadius: scrolled ? 9999 : 0,
            paddingLeft:  scrolled ? 20   : 0,
            paddingRight: scrolled ? 20   : 0,
            boxShadow:    scrolled
              ? "0 8px 32px rgba(99,102,241,0.12), 0 2px 8px rgba(0,0,0,0.08)"
              : "none",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="pointer-events-auto relative overflow-hidden"
          style={{
            background: scrolled
              ? "rgba(255,255,255,0.85)"
              : "transparent",
            backdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(16px) saturate(180%)" : "none",
            border: scrolled ? "1px solid rgba(255,255,255,0.7)" : "none",
          }}
        >
          {/* Gradient top line — only when not floating */}
          <AnimatePresence>
            {!scrolled && (
              <motion.div
                key="topline"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                exit={{ scaleX: 0, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400"
                style={{ transformOrigin: "left" }}
              />
            )}
          </AnimatePresence>

          <nav className="flex items-center gap-6 h-12 px-0">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm font-black tracking-tight shrink-0"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8B5CF6 50%, #06B6D4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontFamily: "monospace",
              }}
            >
              &lt;Saad /&gt;
            </button>

            {/* Links — hidden on mobile */}
            <ul className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link, i) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                  >
                    <button
                      onClick={() => go(link.href)}
                      className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 ${
                        isActive ? "text-indigo-600" : "text-gray-500 hover:text-gray-900"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navPill"
                          className="absolute inset-0 rounded-full bg-indigo-50 border border-indigo-100"
                          transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        />
                      )}
                      <span className="relative z-10">{link.label}</span>
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.35 }}
              onClick={() => go("#contact")}
              className="hidden md:flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold rounded-full text-white shrink-0 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-indigo-200"
              style={{
                background: "linear-gradient(135deg, #6366f1 0%, #8B5CF6 100%)",
              }}
            >
              Hire Me
            </motion.button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden p-1.5 text-gray-600 hover:text-indigo-600 transition-colors ml-auto"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={menuOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{ rotate: 90,    opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {menuOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </nav>
        </motion.header>
      </motion.div>

      {/* ── Mobile drawer ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ opacity: 0, y: -12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,   scale: 1    }}
              exit={{ opacity: 0,   y: -12, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed top-4 left-4 right-4 z-50 md:hidden rounded-2xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.95)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(99,102,241,0.15)",
                boxShadow: "0 20px 60px rgba(99,102,241,0.15), 0 4px 16px rgba(0,0,0,0.08)",
              }}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-gray-100">
                <span
                  className="text-sm font-black tracking-tight"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8B5CF6 50%, #06B6D4 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontFamily: "monospace",
                  }}
                >
                  &lt;Saad /&gt;
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Links */}
              <ul className="px-3 py-3 flex flex-col gap-1">
                {navLinks.map((link, i) => {
                  const isActive = activeSection === link.href.slice(1);
                  return (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.04 }}
                    >
                      <button
                        onClick={() => go(link.href)}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-150 ${
                          isActive
                            ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {link.label}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>

              {/* CTA row */}
              <div className="px-3 pb-4">
                <button
                  onClick={() => go("#contact")}
                  className="w-full py-2.5 text-sm font-bold rounded-xl text-white transition-all duration-200 hover:opacity-90"
                  style={{
                    background: "linear-gradient(135deg, #6366f1 0%, #8B5CF6 100%)",
                  }}
                >
                  Hire Me
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
