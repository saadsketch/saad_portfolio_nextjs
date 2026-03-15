import { Github, Linkedin, Twitter, Mail } from "lucide-react";

export const siteConfig = {
  name: "Saad",
  title: "Saad — Full Stack Developer",
  description:
    "Portfolio of Saad, a Full Stack Developer specializing in Flutter, React, Next.js, and Node.js. Building fast, accessible, and beautiful cross-platform applications.",
  keywords: ["developer", "portfolio", "Flutter", "React", "Next.js", "TypeScript", "Full Stack"],

  // ── Personal info ─────────────────────────────────────────────────────────────
  roles: [
    "Flutter Mobile Developer",
    "Full Stack Web Developer",
    "Desktop App Developer",
    "UI/UX Enthusiast",
  ],
  bio: "I craft high-performance cross-platform apps with Flutter for mobile & desktop, and build scalable web platforms with Next.js. Turning complex ideas into smooth, user-loved products.",
  yearsExp: "5+",
  availableForWork: true,

  // ── Links ─────────────────────────────────────────────────────────────────────
  email: "your@email.com",
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  cvUrl: "#",
} as const;

// ── Social links array (used in Footer, Hero, Contact) ────────────────────────
export const socialLinks = [
  {
    icon: Github,
    label: "GitHub",
    handle: "@yourusername",
    href: siteConfig.github,
    color: "hover:text-gray-900",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    handle: siteConfig.name,
    href: siteConfig.linkedin,
    color: "hover:text-blue-600",
  },
  {
    icon: Twitter,
    label: "Twitter",
    handle: "@yourusername",
    href: siteConfig.twitter,
    color: "hover:text-sky-500",
  },
  {
    icon: Mail,
    label: "Email",
    handle: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    color: "hover:text-indigo-600",
  },
] as const;
