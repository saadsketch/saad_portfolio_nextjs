import type { WorkItem, EducationItem } from "@/types";
export type { WorkItem, EducationItem };

export const workData: WorkItem[] = [
  {
    role: "Senior Flutter Developer",
    company: "Tech Solutions Ltd.",
    period: "2022 — Present",
    location: "Remote",
    color: "#6366f1",
    tags: ["Flutter", "Dart", "Firebase", "GetX", "Stripe"],
    bullets: [
      "Architected and shipped 5 production Flutter apps (iOS + Android) with 100k+ combined downloads",
      "Led a team of 4 developers, conducting code reviews and defining Flutter best practices",
      "Reduced app startup time by 45% through lazy loading and Dart isolates",
      "Integrated complex third-party APIs including Stripe, Twilio, and Google Maps",
    ],
  },
  {
    role: "Flutter Mobile Developer",
    company: "Digital Innovations Agency",
    period: "2020 — 2022",
    location: "Lahore, Pakistan",
    color: "#06B6D4",
    tags: ["Flutter", "Dart", "REST APIs", "CI/CD", "Fastlane"],
    bullets: [
      "Delivered 8 cross-platform mobile apps for e-commerce, health, and fintech clients",
      "Built reusable Flutter widget libraries that cut development time by 30%",
      "Implemented CI/CD pipelines with GitHub Actions and Fastlane for automated deployments",
      "Collaborated with UI/UX designers to achieve pixel-perfect, accessible interfaces",
    ],
  },
];

export const educationData: EducationItem[] = [
  {
    degree: "Master of Computer Applications",
    field: "MCA",
    institution: "University of Engineering & Technology",
    period: "2021 — 2023",
    location: "Lahore, Pakistan",
    grade: "GPA: 3.8 / 4.0",
    color: "#8B5CF6",
    bullets: [
      "Specialized in Mobile & Cloud Computing with a focus on cross-platform development",
      "Thesis: Performance optimization techniques for Flutter applications on low-end devices",
      "Recipient of Academic Excellence Award — two consecutive semesters",
    ],
  },
  {
    degree: "Bachelor of Computer Applications",
    field: "BCA",
    institution: "Government College University",
    period: "2018 — 2021",
    location: "Lahore, Pakistan",
    grade: "GPA: 3.6 / 4.0",
    color: "#EC4899",
    bullets: [
      "Graduated with Distinction — top 5% of graduating class",
      "Core coursework: Data Structures, OOP, DBMS, Software Engineering, Web Technologies",
      "Final project: Flutter-based campus management app adopted by the college administration",
    ],
  },
];
