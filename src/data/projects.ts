import type { Project } from "@/types";

export type { Project };

export const projectsData: Project[] = [
  {
    slug: "flutter-ecommerce-app",
    title: "Flutter E-Commerce App",
    description:
      "A full-featured cross-platform shopping app built with Flutter & Dart, featuring product listings, cart, real-time order tracking, and Stripe payment integration.",
    longDescription:
      "A production-ready cross-platform e-commerce application built with Flutter and Dart. The app delivers a seamless shopping experience on both iOS and Android with a single codebase. It integrates Stripe for secure payments, Firebase for real-time data sync, and GetX for scalable state management. The UI follows Material Design 3 principles with custom animations for an engaging user experience.",
    features: [
      "Cross-platform iOS & Android from a single Flutter codebase",
      "Stripe payment gateway with card scanning support",
      "Real-time order tracking with Firebase Firestore",
      "GetX state management for scalable architecture",
      "Product search, filters, and category browsing",
      "Push notifications for order status updates",
      "Offline-first cart with local persistence",
    ],
    tags: ["Flutter", "Dart", "Firebase", "Stripe", "GetX"],
    liveUrl: "https://play.google.com",
    githubUrl: "https://github.com",
    emoji: "🛍️",
    type: "mobile",
    featured: true,
    screenshot:  "https://picsum.photos/seed/ec-main/390/844",
    screenshots: [
      "https://picsum.photos/seed/ec-main/390/844",
      "https://picsum.photos/seed/ec-2/390/844",
      "https://picsum.photos/seed/ec-3/390/844",
      "https://picsum.photos/seed/ec-4/390/844",
    ],
  },
  {
    slug: "health-fitness-tracker",
    title: "Health & Fitness Tracker",
    description:
      "A Flutter mobile app for tracking workouts, calories, and health goals with beautiful charts, push notifications, and HealthKit/Google Fit integration.",
    longDescription:
      "A comprehensive health and fitness companion app built with Flutter. It helps users track daily workouts, monitor calorie intake, and visualize progress through beautiful interactive charts. The app integrates natively with Apple HealthKit and Google Fit to sync health data seamlessly across platforms. SQLite ensures fast local data access even without an internet connection.",
    features: [
      "Apple HealthKit & Google Fit native integration",
      "Custom workout builder with exercise library",
      "Interactive charts for progress visualization",
      "Calorie and macro nutrient tracking",
      "Daily and weekly goal setting with reminders",
      "Offline SQLite database for instant data access",
      "Push notifications for workout reminders",
    ],
    tags: ["Flutter", "Dart", "SQLite", "HealthKit", "Charts"],
    liveUrl: "https://play.google.com",
    githubUrl: "https://github.com",
    emoji: "💪",
    type: "mobile",
    featured: true,
    screenshot:  "https://picsum.photos/seed/hf-main/390/844",
    screenshots: [
      "https://picsum.photos/seed/hf-main/390/844",
      "https://picsum.photos/seed/hf-2/390/844",
      "https://picsum.photos/seed/hf-3/390/844",
      "https://picsum.photos/seed/hf-4/390/844",
    ],
  },
  {
    slug: "real-estate-mobile-app",
    title: "Real Estate Mobile App",
    description:
      "Cross-platform real estate app with map-based property search, AR-powered room visualization, and in-app agent chat using Flutter and Google Maps API.",
    longDescription:
      "A modern real estate platform that transforms how users discover and visualize properties. Built with Flutter, it features an interactive map-based property search powered by Google Maps, AR room visualization that lets buyers see furnished rooms through their phone camera, and a real-time chat system connecting buyers directly with agents. Firebase handles all backend needs including authentication and real-time messaging.",
    features: [
      "Interactive map-based property search with Google Maps",
      "AR-powered room visualization using device camera",
      "Real-time in-app chat between buyers and agents",
      "Advanced filters: price, location, size, amenities",
      "Property photo galleries with zoom and swipe",
      "Saved listings and search alerts",
      "Firebase Authentication with social login",
    ],
    tags: ["Flutter", "Dart", "Google Maps", "Firebase", "AR"],
    liveUrl: "https://play.google.com",
    githubUrl: "https://github.com",
    emoji: "🏠",
    type: "mobile",
    featured: true,
    screenshot:  "https://picsum.photos/seed/re-main/390/844",
    screenshots: [
      "https://picsum.photos/seed/re-main/390/844",
      "https://picsum.photos/seed/re-2/390/844",
      "https://picsum.photos/seed/re-3/390/844",
      "https://picsum.photos/seed/re-4/390/844",
    ],
  },
  {
    slug: "flutter-desktop-crm",
    title: "Flutter Desktop CRM",
    description:
      "A Windows/macOS desktop CRM application built with Flutter, featuring customer management, analytics dashboards, invoice generation, and PDF export.",
    longDescription:
      "A fully-featured Customer Relationship Management desktop application built with Flutter for Windows and macOS. It provides businesses with a centralized hub for managing customer data, tracking sales pipelines, generating invoices, and analyzing business performance through real-time dashboards. The app uses SQLite for local data storage and supports PDF export for reports and invoices.",
    features: [
      "Unified customer database with search and filtering",
      "Visual sales pipeline with drag-and-drop kanban board",
      "Invoice generation with custom branding and PDF export",
      "Analytics dashboard with charts and KPI metrics",
      "Task and follow-up management with reminders",
      "Role-based access control for team collaboration",
      "Offline-first with SQLite local database",
    ],
    tags: ["Flutter", "Dart", "SQLite", "PDF", "Desktop"],
    githubUrl: "https://github.com",
    emoji: "🖥️",
    type: "desktop",
    screenshot:  "https://picsum.photos/seed/crm-main/390/844",
    screenshots: [
      "https://picsum.photos/seed/crm-main/390/844",
      "https://picsum.photos/seed/crm-2/390/844",
      "https://picsum.photos/seed/crm-3/390/844",
      "https://picsum.photos/seed/crm-4/390/844",
    ],
  },
  {
    slug: "nextjs-saas-dashboard",
    title: "Next.js SaaS Dashboard",
    description:
      "A fully responsive SaaS admin dashboard built with Next.js and TypeScript, featuring real-time analytics, user management, and role-based access control.",
    longDescription:
      "A production-grade SaaS administration dashboard built with Next.js 14 and TypeScript. The platform provides businesses with real-time analytics, comprehensive user management, and a robust role-based access control system. It uses PostgreSQL with Prisma ORM for type-safe database operations and Tailwind CSS for a responsive, modern UI that works flawlessly on all screen sizes.",
    features: [
      "Real-time analytics with live data updates via WebSockets",
      "Role-based access control (Admin, Manager, Viewer)",
      "User management with invitations and permissions",
      "Data export to CSV and PDF formats",
      "Responsive design for desktop, tablet, and mobile",
      "PostgreSQL with Prisma for type-safe queries",
      "NextAuth.js authentication with OAuth providers",
    ],
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Prisma"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    emoji: "📊",
    type: "web",
    screenshot:  "https://picsum.photos/seed/saas-main/390/844",
    screenshots: [
      "https://picsum.photos/seed/saas-main/390/844",
      "https://picsum.photos/seed/saas-2/390/844",
      "https://picsum.photos/seed/saas-3/390/844",
      "https://picsum.photos/seed/saas-4/390/844",
    ],
  },
  {
    slug: "realtime-chat-app",
    title: "Chat App with WebSockets",
    description:
      "Real-time chat application available on mobile (Flutter) and web (React), with end-to-end encryption, media sharing, and group channels.",
    longDescription:
      "A cross-platform real-time chat application with a Flutter mobile client and a React web client, both connected to the same Node.js backend via Socket.io. The app supports end-to-end encrypted private messaging, group channels, media file sharing, and read receipts. MongoDB stores message history while Socket.io delivers sub-100ms message delivery for a truly real-time experience.",
    features: [
      "Sub-100ms real-time messaging via Socket.io WebSockets",
      "End-to-end encryption for private conversations",
      "Group channels with roles (admin, member)",
      "Media sharing: images, videos, and files",
      "Read receipts and online presence indicators",
      "Flutter mobile app + React web app sharing the same backend",
      "MongoDB message history with pagination",
    ],
    tags: ["Flutter", "React", "Node.js", "Socket.io", "MongoDB"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com",
    emoji: "💬",
    type: "mobile",
    screenshot:  "https://picsum.photos/seed/chat-main/390/844",
    screenshots: [
      "https://picsum.photos/seed/chat-main/390/844",
      "https://picsum.photos/seed/chat-2/390/844",
      "https://picsum.photos/seed/chat-3/390/844",
      "https://picsum.photos/seed/chat-4/390/844",
    ],
  },
];
