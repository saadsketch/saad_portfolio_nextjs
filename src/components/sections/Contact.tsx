"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Mail, MapPin, Clock, Zap } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { siteConfig, socialLinks } from "@/config/site";

// ── Schema ────────────────────────────────────────────────────────────────────
const contactSchema = z.object({
  name:    z.string().min(2, "At least 2 characters"),
  email:   z.string().email("Enter a valid email"),
  message: z.string().min(10, "At least 10 characters"),
});
type ContactFormData = z.infer<typeof contactSchema>;

// ── Info tiles ────────────────────────────────────────────────────────────────
const INFO_TILES = [
  { icon: MapPin, label: "LOCATION",     value: "Lahore, Pakistan",  color: "#6366f1" },
  { icon: Mail,   label: "EMAIL",        value: siteConfig.email,    color: "#8B5CF6" },
  { icon: Zap,    label: "AVAILABILITY", value: "Open to work",      color: "#06B6D4" },
  { icon: Clock,  label: "RESPONSE",     value: "Within 24 hours",   color: "#EC4899" },
];

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactFormData) => {
    const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
    const body    = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`);
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialOnly = socialLinks.filter(
    (s) => s.label === "GitHub" || s.label === "LinkedIn"
  );

  return (
    <section
      id="contact"
      className="section-padding relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #eef2ff 0%, #f5f3ff 40%, #fdf4ff 70%, #eff6ff 100%)",
      }}
    >
      {/* ── Decorative blurred orbs (give glass something to blur over) ── */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-indigo-400/20 blur-[80px]" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-violet-400/20 blur-[80px]" />
        <div className="absolute -bottom-20 left-1/3 w-72 h-72 rounded-full bg-cyan-400/15 blur-[80px]" />
        <div className="absolute top-1/4 left-1/2 w-60 h-60 rounded-full bg-pink-400/10 blur-[80px]" />
      </div>

      <div className="container-max relative z-10">

        {/* Header */}
        <FadeIn className="text-center mb-10 sm:mb-14">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em]">
            Contact
          </span>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold text-gray-900">
            Let&apos;s work together
          </h2>
          <p className="mt-2 text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
            Start a conversation to build something great together.
          </p>
        </FadeIn>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">

          {/* ── LEFT ── */}
          <FadeIn direction="right" delay={0.1}>
            <p className="text-xs font-bold text-indigo-500 uppercase tracking-[0.2em] mb-3">
              Get in touch
            </p>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight mb-3">
              Seamless Collaboration,<br className="hidden sm:block" /> Real Results.
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-sm">
              Whether you have a project idea, a question, or just want to connect —
              I&apos;m always open to a good conversation.
            </p>

            {/* Info tiles — glass */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {INFO_TILES.map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="flex items-start gap-3 p-4 rounded-2xl
                    bg-white/40 backdrop-blur-md border border-white/60
                    shadow-[0_4px_24px_rgba(99,102,241,0.08)]
                    hover:bg-white/60 hover:shadow-[0_8px_32px_rgba(99,102,241,0.13)]
                    transition-all duration-300"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-sm"
                    style={{ background: `linear-gradient(135deg, ${color}, ${color}99)` }}
                  >
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">
                      {label}
                    </p>
                    <p className="text-[13px] font-semibold text-gray-800 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/60 mb-6" />

            {/* Find me on — icon only */}
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-3">
                Find me on
              </p>
              <div className="flex items-center gap-2">
                {socialOnly.map(({ icon: Icon, label, href }) => (
                  <div key={label} className="relative group">
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-11 h-11 rounded-2xl flex items-center justify-center
                        bg-white/40 backdrop-blur-md border border-white/60 text-gray-600
                        shadow-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600
                        hover:shadow-lg hover:shadow-indigo-300/40
                        transition-all duration-200"
                    >
                      <Icon size={18} />
                    </a>
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2
                      px-2.5 py-1 bg-gray-900/90 backdrop-blur-sm text-white text-[11px]
                      font-medium rounded-lg whitespace-nowrap z-50
                      opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                      transition-all duration-200">
                      {label}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900/90" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── RIGHT: glass form card ── */}
          <FadeIn direction="left" delay={0.15}>
            <div
              className="rounded-3xl overflow-hidden
                bg-white/30 backdrop-blur-xl border border-white/60
                shadow-[0_8px_40px_rgba(99,102,241,0.15)]"
            >
              {/* Card header */}
              <div className="px-6 pt-6 pb-4 border-b border-white/40">
                <h3 className="text-lg font-bold text-gray-900">Send a message</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center justify-center py-10 text-center gap-3"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-emerald-50/80 backdrop-blur-sm border border-emerald-100/60 flex items-center justify-center">
                        <CheckCircle2 size={28} className="text-emerald-500" />
                      </div>
                      <h4 className="font-bold text-gray-900">Message sent!</h4>
                      <p className="text-xs text-gray-500 max-w-[220px]">
                        Thanks for reaching out. I&apos;ll reply as soon as possible.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      {/* Name + Email */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label htmlFor="name" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Name
                          </label>
                          <input
                            id="name"
                            placeholder="John Doe"
                            {...register("name")}
                            className={`w-full h-10 px-3 rounded-xl text-sm
                              bg-white/50 backdrop-blur-sm border text-gray-800
                              placeholder:text-gray-400 outline-none
                              focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-300
                              transition-all duration-200
                              ${errors.name ? "border-red-300" : "border-white/70"}`}
                          />
                          {errors.name && <p className="text-[11px] text-red-500">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="email" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            {...register("email")}
                            className={`w-full h-10 px-3 rounded-xl text-sm
                              bg-white/50 backdrop-blur-sm border text-gray-800
                              placeholder:text-gray-400 outline-none
                              focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-300
                              transition-all duration-200
                              ${errors.email ? "border-red-300" : "border-white/70"}`}
                          />
                          {errors.email && <p className="text-[11px] text-red-500">{errors.email.message}</p>}
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-1.5">
                        <label htmlFor="message" className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
                          Message
                        </label>
                        <textarea
                          id="message"
                          rows={5}
                          placeholder="Tell me about your project..."
                          {...register("message")}
                          className={`w-full px-3 py-2.5 rounded-xl text-sm resize-none
                            bg-white/50 backdrop-blur-sm border text-gray-800
                            placeholder:text-gray-400 outline-none
                            focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-300
                            transition-all duration-200
                            ${errors.message ? "border-red-300" : "border-white/70"}`}
                        />
                        {errors.message && <p className="text-[11px] text-red-500">{errors.message.message}</p>}
                      </div>

                      {/* Submit */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full h-11 gap-2 rounded-xl text-white font-semibold
                          bg-indigo-600 hover:bg-indigo-700
                          shadow-lg shadow-indigo-300/40 hover:shadow-indigo-400/50
                          transition-all duration-300"
                      >
                        <Send size={15} />
                        Send Message
                      </Button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
