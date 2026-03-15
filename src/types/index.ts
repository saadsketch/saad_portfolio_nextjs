export interface Project {
  slug: string;
  title: string;
  description: string;       // short — used in carousel
  longDescription: string;   // full — used on detail page
  features: string[];        // key highlights for detail page
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  emoji: string;
  type: "mobile" | "web" | "desktop";
  featured?: boolean;
  // ── Screenshots ──────────────────────────────────────────────────────────────
  // Replace placeholder URLs with your real app screenshots.
  // Recommended size: 390×844 (mobile/desktop) or 1280×800 (web).
  screenshot: string;        // single image shown in main-page carousel
  screenshots: string[];     // multiple images shown in detail-page coverflow
}
