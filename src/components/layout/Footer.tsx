"use client";

import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Mail, label: "Email", href: "mailto:your@email.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="container-max section-padding py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Saad. Built with Next.js & Tailwind CSS.
        </p>

        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
            >
              <Icon size={18} />
            </a>
          ))}

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            aria-label="Back to top"
            className="p-2 text-gray-400 hover:text-indigo-600 transition-colors duration-200"
          >
            <ArrowUp size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
