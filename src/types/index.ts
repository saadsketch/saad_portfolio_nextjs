// ── Project ───────────────────────────────────────────────────────────────────
export interface Project {
  slug: string;
  title: string;
  description: string;      // short — used in carousel
  longDescription: string;  // full  — used on detail page
  features: string[];       // key highlights for detail page
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  emoji: string;
  type: "mobile" | "web" | "desktop";
  featured?: boolean;
  screenshot: string;       // single image shown in main-page carousel
  screenshots: string[];    // multiple images shown in detail-page coverflow
}

// ── Experience ────────────────────────────────────────────────────────────────
export interface WorkItem {
  role: string;
  company: string;
  period: string;
  location: string;
  color: string;
  tags: string[];
  bullets: string[];
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  period: string;
  location: string;
  grade: string;
  color: string;
  bullets: string[];
}

// ── Skills ────────────────────────────────────────────────────────────────────
export interface SkillCategory {
  name: string;
  icon: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon?: string;
  level?: number; // 1–5
}
