// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vishal Choudhary — Software Engineer",
  description:
    "Software Engineer building backend systems, AI-powered geospatial applications, network security tools, and interactive web experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-[#F4F3EE] font-sans text-[#111318] antialiased selection:bg-[#1D4ED8] selection:text-white">
        <CustomCursor />
        <ScrollProgress />
        <div className="noise-overlay" aria-hidden="true" />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}