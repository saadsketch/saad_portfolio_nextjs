export interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  location: string;
  type: "work" | "education";
  bullets: string[];
}

export const experienceData: ExperienceItem[] = [
  {
    role: "Senior Flutter Developer",
    company: "Tech Solutions Ltd.",
    period: "2022 — Present",
    location: "Remote",
    type: "work",
    bullets: [
      "Architected and shipped 5 production Flutter apps (iOS + Android) with 100k+ combined downloads",
      "Led a team of 4 developers, conducting code reviews and defining Flutter best practices",
      "Reduced app startup time by 45% through lazy loading and code splitting",
      "Integrated complex third-party APIs including Stripe, Twilio, and Google Maps",
    ],
  },
  {
    role: "Flutter Mobile Developer",
    company: "Digital Innovations Agency",
    period: "2020 — 2022",
    location: "Lahore, Pakistan",
    type: "work",
    bullets: [
      "Delivered 8 cross-platform mobile applications for clients across e-commerce, health, and fintech sectors",
      "Built reusable Flutter widget libraries that cut development time by 30%",
      "Implemented CI/CD pipelines with GitHub Actions and Fastlane for automated app store deployment",
      "Collaborated closely with UI/UX designers to achieve pixel-perfect implementations",
    ],
  },
  {
    role: "Junior Mobile Developer",
    company: "StartupXYZ",
    period: "2019 — 2020",
    location: "Karachi, Pakistan",
    type: "work",
    bullets: [
      "Built and maintained 3 Flutter mobile applications from scratch",
      "Integrated Firebase (Auth, Firestore, Push Notifications, Crashlytics)",
      "Implemented state management using Provider and later migrated to Riverpod",
    ],
  },
  {
    role: "B.S. Computer Science",
    company: "University of Engineering & Technology",
    period: "2015 — 2019",
    location: "Lahore, Pakistan",
    type: "education",
    bullets: [
      "Graduated with Distinction — GPA: 3.7/4.0",
      "Relevant coursework: Mobile Application Development, Software Engineering, Database Systems",
      "Final year project: Cross-platform food delivery app built with Flutter and Node.js",
    ],
  },
];
