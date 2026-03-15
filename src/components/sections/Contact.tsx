"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Github, Linkedin, Mail, Twitter, Send, CheckCircle } from "lucide-react";
import FadeIn from "@/components/animations/FadeIn";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@yourusername",
    href: "https://github.com",
    color: "hover:text-gray-900",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: "Saad",
    href: "https://linkedin.com",
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    label: "Twitter",
    handle: "@yourusername",
    href: "https://twitter.com",
    color: "hover:text-sky-500",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "your@email.com",
    href: "mailto:your@email.com",
    color: "hover:text-indigo-600",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Opens mailto with pre-filled content — replace with your preferred email service
    const subject = encodeURIComponent(`Portfolio Contact from ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:your@email.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-max">
        {/* Header */}
        <FadeIn className="text-center mb-16">
          <span className="text-sm font-semibold text-indigo-600 uppercase tracking-widest">
            Contact
          </span>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">
            Let&apos;s work together
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto">
            Have a project in mind or just want to chat? I&apos;d love to hear
            from you. Drop me a message below!
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Form */}
          <FadeIn direction="right" delay={0.1}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  {...register("name")}
                  className={errors.name ? "border-red-300 focus-visible:ring-red-300" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                  className={errors.email ? "border-red-300 focus-visible:ring-red-300" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Tell me about your project..."
                  rows={5}
                  {...register("message")}
                  className={errors.message ? "border-red-300 focus-visible:ring-red-300" : ""}
                />
                {errors.message && (
                  <p className="text-xs text-red-500">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting || submitted}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-11 gap-2 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 transition-all duration-300"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={16} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </FadeIn>

          {/* Social Links */}
          <FadeIn direction="left" delay={0.2}>
            <div className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Open to opportunities
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  I&apos;m currently open to freelance projects and full-time
                  opportunities. If you have a project that needs some help,
                  let&apos;s talk!
                </p>
                <div className="mt-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-green-700">
                    Available for work
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest">
                  Find me on
                </p>
                {socialLinks.map(({ icon: Icon, label, handle, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-gray-100 hover:border-indigo-100 hover:shadow-sm transition-all duration-300 group ${color}`}
                  >
                    <div className="w-10 h-10 rounded-lg bg-white border border-gray-100 flex items-center justify-center shadow-sm group-hover:border-indigo-100 transition-colors">
                      <Icon size={18} className="text-gray-500 group-hover:text-current transition-colors" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {label}
                      </p>
                      <p className="text-xs text-gray-400">{handle}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
