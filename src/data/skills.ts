export interface Skill {
  name: string;
  logo: string;
  color: string;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

export const skillsData: SkillCategory[] = [
  {
    category: "Mobile",
    skills: [
      { name: "Flutter", logo: `${CDN}/flutter/flutter-original.svg`, color: "#54C5F8" },
      { name: "Dart", logo: `${CDN}/dart/dart-original.svg`, color: "#00B4AB" },
      { name: "Android", logo: `${CDN}/android/android-original.svg`, color: "#3DDC84" },
      { name: "Swift", logo: `${CDN}/swift/swift-original.svg`, color: "#F05138" },
      { name: "Firebase", logo: `${CDN}/firebase/firebase-plain.svg`, color: "#FFA000" },
    ],
  },
  {
    category: "Frontend",
    skills: [
      { name: "React", logo: `${CDN}/react/react-original.svg`, color: "#61DAFB" },
      { name: "Next.js", logo: `${CDN}/nextjs/nextjs-original.svg`, color: "#000000" },
      { name: "TypeScript", logo: `${CDN}/typescript/typescript-original.svg`, color: "#3178C6" },
      { name: "JavaScript", logo: `${CDN}/javascript/javascript-original.svg`, color: "#F7DF1E" },
      { name: "Tailwind CSS", logo: `${CDN}/tailwindcss/tailwindcss-original.svg`, color: "#06B6D4" },
    ],
  },
  {
    category: "Backend",
    skills: [
      { name: "Node.js", logo: `${CDN}/nodejs/nodejs-original.svg`, color: "#339933" },
      { name: "Python", logo: `${CDN}/python/python-original.svg`, color: "#3776AB" },
      { name: "PostgreSQL", logo: `${CDN}/postgresql/postgresql-original.svg`, color: "#4169E1" },
      { name: "MongoDB", logo: `${CDN}/mongodb/mongodb-original.svg`, color: "#47A248" },
      { name: "GraphQL", logo: `${CDN}/graphql/graphql-plain.svg`, color: "#E10098" },
    ],
  },
  {
    category: "Tools",
    skills: [
      { name: "Git", logo: `${CDN}/git/git-original.svg`, color: "#F05032" },
      { name: "Docker", logo: `${CDN}/docker/docker-original.svg`, color: "#2496ED" },
      { name: "Figma", logo: `${CDN}/figma/figma-original.svg`, color: "#F24E1E" },
      { name: "VS Code", logo: `${CDN}/vscode/vscode-original.svg`, color: "#007ACC" },
      { name: "Linux", logo: `${CDN}/linux/linux-original.svg`, color: "#FCC624" },
    ],
  },
];

export const allSkills = skillsData.flatMap((c) => c.skills);
