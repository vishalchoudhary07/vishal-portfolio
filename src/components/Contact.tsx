// src/components/Contact.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // A clean, heavy slide-up reveal for the final CTA
    gsap.from(textRef.current, {
      y: 100,
      opacity: 0,
      duration: 1.2,
      ease: "power4.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%", // Triggers when the top of the footer hits 80% down the screen
      },
    });
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-[70vh] w-full bg-zinc-950 text-white flex flex-col items-center justify-center border-t border-zinc-900 px-8"
    >
      <div className="max-w-4xl w-full flex flex-col items-center text-center z-10">
        
        <h2 ref={textRef} className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
          Let's build <span className="text-emerald-500">systems</span> together.
        </h2>
        
        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl font-mono">
          I am currently looking for new opportunities. Whether you have a question, a project idea, or just want to chat about code and data architecture, my inbox is always open.
        </p>

        <div className="flex flex-col sm:flex-row gap-6">
          <a 
            href="mailto:your.email@example.com" 
            className="px-8 py-4 bg-emerald-500 text-zinc-950 font-bold rounded-full hover:bg-emerald-400 transition-colors flex items-center justify-center gap-2"
          >
            Initiate Contact
          </a>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer" 
            className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-colors flex items-center justify-center"
          >
            View GitHub
          </a>
        </div>
      </div>
      
      {/* Small terminal-style copyright at the absolute bottom */}
      <div className="absolute bottom-8 text-zinc-600 font-mono text-sm">
        © {new Date().getFullYear()} // System.exit(0)
      </div>
    </section>
  );
}