import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import ProjectDetailClient from "./ProjectDetailClient";
import { siteConfig } from "@/config/site";

// ── Static params for build-time generation ────────────────────────────────────
export function generateStaticParams() {
  return projectsData.map((p) => ({ slug: p.slug }));
}

// ── Per-page metadata ──────────────────────────────────────────────────────────
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${siteConfig.name}`,
    description: project.description,
  };
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const idx = projectsData.indexOf(project);

  return <ProjectDetailClient project={project} idx={idx} />;
}
