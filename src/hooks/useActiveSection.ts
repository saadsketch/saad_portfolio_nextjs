"use client";

import { useState, useEffect } from "react";

/**
 * Tracks which section ID is currently visible in the viewport.
 * Used by the Navbar to highlight the active nav link.
 *
 * @param sectionIds  — list of section `id` attributes to observe
 * @param rootMargin  — IntersectionObserver margin (default: top-biased)
 */
export function useActiveSection(
  sectionIds: string[],
  rootMargin = "-40% 0px -55% 0px"
): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds, rootMargin]);

  return activeId;
}
