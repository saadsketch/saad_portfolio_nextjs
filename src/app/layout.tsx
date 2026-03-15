import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saad — Full Stack Developer",
  description:
    "Portfolio of Saad, a Full Stack Developer specializing in React, Next.js, and Node.js. Building fast, accessible, and beautiful web applications.",
  keywords: ["developer", "portfolio", "React", "Next.js", "TypeScript", "Full Stack"],
  authors: [{ name: "Saad" }],
  openGraph: {
    title: "Saad — Full Stack Developer",
    description: "Building fast, accessible, and beautiful web applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
