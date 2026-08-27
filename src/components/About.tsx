"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import React from "react";

gsap.registerPlugin(ScrollTrigger);

const SYSTEM_STEPS = [
  { id: "problem", label: "PROBLEM", desc: "Start with the right question." },
  { id: "understand", label: "UNDERSTAND", desc: "Break the system apart." },
  { id: "build", label: "BUILD", desc: "Turn the idea into something real." },
  { id: "test", label: "TEST", desc: "Find where it breaks." },
  { id: "iterate", label: "ITERATE", desc: "Make it better." },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const systemMapRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // General section reveal
      const reveals = gsap.utils.toArray<HTMLElement>(".about-reveal");
      gsap.from(reveals, {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      // System Map Sequential Animation
      if (systemMapRef.current) {
        const nodes = gsap.utils.toArray<HTMLElement>(".system-node");
        const linesH = gsap.utils.toArray<HTMLElement>(".system-line-h");
        const linesV = gsap.utils.toArray<HTMLElement>(".system-line-v");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: systemMapRef.current,
            start: "top 80%",
          },
        });

        nodes.forEach((node, i) => {
          // Reveal node
          tl.fromTo(
            node,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.5)" }
          );

          // Animate connecting lines to the next node
          if (i < nodes.length - 1) {
            tl.fromTo(
              linesH[i],
              { scaleX: 0 },
              { scaleX: 1, duration: 0.35, ease: "power2.inOut" },
              ">-0.1"
            );
            tl.fromTo(
              linesV[i],
              { scaleY: 0 },
              { scaleY: 1, duration: 0.35, ease: "power2.inOut" },
              "<"
            );
          }
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-[#F6F6F6]"
    >
      {/* Subtle Technical Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #F6F6F6 1px, transparent 1px),
            linear-gradient(to bottom, #F6F6F6 1px, transparent 1px)
          `,
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1700px] flex-col px-6 py-20 sm:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="about-reveal flex items-center justify-between border-b border-white/10 pb-8">
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-[#C6E354]">
              01
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
              ABOUT / HOW I THINK
            </span>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[#4D59E3]/70 md:block">
            MODE: EXPLORATION
          </span>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 flex-col py-16 lg:py-24">
          
          {/* Identity / Education System Badge */}
          <div className="about-reveal mb-12 flex w-fit flex-col border border-white/10 bg-white/[0.015] backdrop-blur-sm">
            {/* Top Row: Name & Status */}
            <div className="flex items-center gap-3 border-b border-white/10 px-5 py-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#C6E354] opacity-40 duration-1000" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C6E354]" />
              </span>
              <span className="font-mono text-[12px] font-bold uppercase tracking-[0.25em] text-[#F6F6F6]">
                VISHAL CHOUDHARY
              </span>
            </div>
            
            {/* Bottom Row: Edu Data */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 sm:flex-nowrap">
              <span className="text-white/60">B.TECH CSIT // 2026</span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" />
              <span 
                className="cursor-help transition-colors hover:text-white" 
                title="Marri Laxman Reddy Institute of Technology and Management"
              >
                MLRITM
              </span>
              <span className="hidden h-3 w-px bg-white/10 sm:block" />
              <span className="text-[#C6E354]/80">CGPA: 8.63</span>
            </div>
          </div>

          {/* Main Headline */}
          <h2 className="about-reveal max-w-5xl text-[clamp(2.5rem,6vw,6.5rem)] font-black leading-[1.05] tracking-[-0.04em]">
            I build things <br />
            that make difficult <br />
            ideas feel{" "}
            <span className="cursor-default text-[#F6F6F6] transition-colors duration-500 hover:text-[#C6E354]">
              simple.
            </span>
          </h2>

          <div className="about-reveal mt-12 grid gap-12 lg:grid-cols-[1fr_350px] lg:gap-20">
            {/* Personal Description with Interactive Words */}
            <p className="max-w-2xl text-lg leading-relaxed text-white/60 md:text-xl">
              I like{" "}
              <InteractiveWord word="understanding" /> how things work — then
              building them{" "}
              <InteractiveWord word="better" />. My focus sits at the
              intersection of software engineering, interactive interfaces, data{" "}
              <InteractiveWord word="systems" />, and algorithms. I enjoy turning complex
              logic into clean, functional architecture.
            </p>

            {/* Personal Stats / Focus Areas */}
            <div className="flex flex-col gap-6 font-mono">
              <div className="group flex flex-col gap-1 border-l border-white/10 pl-4 transition-colors duration-300 hover:border-[#C6E354]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">01 / Focus</span>
                <span className="text-sm text-white/80 transition-colors group-hover:text-white">
                  Advanced Frontend & Next.js
                </span>
              </div>
              
              <div className="group flex flex-col gap-1 border-l border-white/10 pl-4 transition-colors duration-300 hover:border-[#4D59E3]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">02 / Building</span>
                <span className="text-sm text-white/80 transition-colors group-hover:text-white">
                  GSAP Motion, Three.js & Physics
                </span>
              </div>
              
              <div className="group flex flex-col gap-1 border-l border-white/10 pl-4 transition-colors duration-300 hover:border-[#ED4059]">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30">03 / Exploring</span>
                <span className="text-sm text-white/80 transition-colors group-hover:text-white">
                  Python Data Processing & Analytics
                </span>
              </div>
            </div>
          </div>

          {/* System Map Animation */}
          <div 
            ref={systemMapRef} 
            className="mt-24 flex w-full flex-col items-start justify-between lg:mt-32 lg:flex-row lg:items-center"
          >
            {SYSTEM_STEPS.map((step, i) => (
              <React.Fragment key={step.id}>
                {/* Node */}
                <div className="system-node group relative flex cursor-default flex-col items-start lg:items-center">
                  <div className="relative flex h-4 w-4 items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-white/10 transition-transform duration-500 group-hover:scale-[2.5] group-hover:bg-[#C6E354]/10" />
                    <div className="relative h-1.5 w-1.5 rounded-full bg-white/40 transition-all duration-300 group-hover:scale-150 group-hover:bg-[#C6E354] group-hover:shadow-[0_0_12px_#C6E354]" />
                  </div>
                  
                  <span className="mt-4 font-mono text-[11px] font-semibold tracking-widest text-white/40 transition-colors duration-300 group-hover:text-[#F6F6F6]">
                    {step.label}
                  </span>
                  
                  <span className="mt-1 font-mono text-[9px] uppercase tracking-widest text-[#C6E354] opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:absolute lg:top-14 lg:mt-0 lg:w-32 lg:text-center">
                    {step.desc}
                  </span>
                </div>

                {/* Connecting Lines */}
                {i < SYSTEM_STEPS.length - 1 && (
                  <>
                    {/* Desktop Horizontal Line */}
                    <div className="system-line-h hidden h-[1px] flex-1 origin-left bg-gradient-to-r from-white/10 via-white/20 to-white/10 mx-6 lg:block" />
                    
                    {/* Mobile Vertical Line */}
                    <div className="system-line-v my-3 ml-[7px] block h-10 w-[1px] origin-top bg-gradient-to-b from-white/10 via-white/20 to-white/10 lg:hidden" />
                  </>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Bottom Interactive Statement */}
        <div className="about-reveal group mt-auto flex w-fit cursor-pointer items-center gap-4 border-t border-white/10 pt-8 transition-all hover:border-white/30">
          <div className="relative flex h-2 w-2 items-center justify-center">
            <div className="absolute h-full w-full rounded-full bg-[#C6E354] opacity-40 transition-all duration-700 group-hover:animate-ping" />
            <div className="h-1 w-1 rounded-full bg-[#C6E354]" />
          </div>
          <span className="font-mono text-[11px] font-medium tracking-[0.25em] text-white/50 transition-colors duration-300 group-hover:text-white/90">
            ALWAYS LEARNING <span className="inline-block text-[#4D59E3] transition-transform duration-300 group-hover:rotate-12">/</span> ALWAYS BUILDING
          </span>
        </div>
      </div>

      {/* Decorative Metadata */}
      <div className="pointer-events-none absolute bottom-32 left-8 hidden rotate-180 font-mono text-[9px] tracking-[0.3em] text-white/15 [writing-mode:vertical-rl] lg:block">
        SYSTEM_ARCHITECTURE // V1.0
      </div>
    </section>
  );
}

// Helper component for subtle interactive words
function InteractiveWord({ word }: { word: string }) {
  return (
    <span className="group relative inline-block cursor-default text-[#F6F6F6] transition-colors hover:text-[#C6E354]">
      {word}
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-[#C6E354] transition-transform duration-500 ease-out group-hover:scale-x-100" />
      
      {/* Tiny floating technical label */}
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#C6E354] opacity-0 transition-all duration-300 group-hover:-top-5 group-hover:opacity-100">
        [ACTIVE]
      </span>
    </span>
  );
}