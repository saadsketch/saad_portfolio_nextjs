export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  emoji: string;
  type: "mobile" | "web" | "desktop";
  featured?: boolean;
}

export const projectsData: Project[] = [
  {
    title: "Flutter E-Commerce App",
    description:
      "A full-featured cross-platform shopping app built with Flutter & Dart, featuring product listings, cart, real-time order tracking, and Stripe payment integration.",
    tags: ["Flutter", "Dart", "Firebase", "Stripe", "GetX"],
    liveUrl: "https://play.google.com",
    githubUrl: "https://github.com",
    emoji: "🛍️",
    type: "mobile",
    featured: true,
  },
  {
    title: "Health & Fitness Tracker",
    description:
      "A Flutter mobile app for tracking workouts, calories, and health goals with beautiful charts, push notifications, and HealthKit/Google Fit integration.",
    tags: ["Flutter", "Dart", "SQLite", "HealthKit", "Charts"],
    liveUrl: "https://play.google.com",
    githubUrl: "https://github.com",
    emoji: "💪",
    type: "mobile",
    featured: true,
  },
  {
    title: "Real Estate Mobile App",
    description:
      "Cross-platform real estate app with map-based property search, AR-powered room visualization, and in-app agent chat using Flutter and Google Maps API.",
    tags: ["Flutter", "Dart", "Google Maps", "Firebase", "AR"],
    liveUrl: "https://play.google.com",
    githubUrl: "https://github.com",
    emoji: "🏠",
    type: "mobile",
    featured: true,
  },
  {
    title: "Flutter Desktop CRM",
    description:
      "A Windows/macOS desktop CRM application built with Flutter, featuring customer management, analytics dashboards, invoice generation, and PDF export.",
    tags: ["Flutter", "Dart", "SQLite", "PDF", "Desktop"],
    githubUrl: "https://github.com",
    emoji: "🖥️",
    type: "desktop",
  },
  {
    title: "Next.js SaaS Dashboard",
    description:
      "A fully responsive SaaS admin dashboard built with Next.js and TypeScript, featuring real-time analytics, user management, and role-based access control.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    emoji: "📊",
    type: "web",
  },
  {
    title: "Chat App with WebSockets",
    description:
      "Real-time chat application available on mobile (Flutter) and web (React), with end-to-end encryption, media sharing, and group channels.",
    tags: ["Flutter", "React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    emoji: "💬",
    type: "mobile",
  },
];
