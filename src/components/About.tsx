// src/components/About.tsx
"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SYSTEM_STEPS = [
  { id: "problem", step: "01", label: "PROBLEM", desc: "Start with the right question." },
  { id: "understand", step: "02", label: "UNDERSTAND", desc: "Break the system apart." },
  { id: "build", step: "03", label: "BUILD", desc: "Turn logic into clean architecture." },
  { id: "test", step: "04", label: "TEST", desc: "Stress-test where it breaks." },
  { id: "iterate", step: "05", label: "ITERATE", desc: "Refine for speed and clarity." },
];

const BIO_PARAGRAPH: Array<
  | { type: "text"; text: string }
  | { type: "interactive"; word: string; trailing?: string }
> = [
  { type: "text", text: "I like" },
  { type: "interactive", word: "deconstructing" },
  { type: "text", text: "how systems work under the hood — then rebuilding them" },
  { type: "interactive", word: "cleaner", trailing: "." },
  {
    type: "text",
    text: "Whether it's evaluating live network packets in Java, ranking geospatial embeddings with FastAPI and PostGIS, or crafting responsive interfaces in Next.js, I focus on",
  },
  { type: "interactive", word: "precision" },
  { type: "text", text: "from database query to pixel." },
];

/**
 * Animated counter hook that ticks from 0.00 to target when scrolled into view.
 */
function useCountUp(target: number, decimals: number = 2, duration: number = 2) {
  const [value, setValue] = useState("0." + "0".repeat(decimals));
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        hasAnimated.current = true;
        const obj = { val: 0 };
        gsap.to(obj, {
          val: target,
          duration,
          ease: "power2.out",
          onUpdate: () => setValue(obj.val.toFixed(decimals)),
        });
      },
    });

    return () => trigger.kill();
  }, [target, decimals, duration]);

  return { value, ref };
}

/**
 * 3D Tilt Card component reacting to mouse coordinates.
 */
function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(card, {
      rotateY: x * 15,
      rotateX: -y * 15,
      duration: 0.4,
      ease: "power2.out",
      transformPerspective: 800,
    });
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

/**
 * Interactive keyword with hover scale and left-to-right animated underline.
 */
function InteractiveWord({
  word,
  className = "",
}: {
  word: string;
  className?: string;
}) {
  const wordRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (wordRef.current) {
      gsap.to(wordRef.current, {
        scale: 1.05,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (wordRef.current) {
      gsap.to(wordRef.current, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  return (
    <span
      ref={wordRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative inline-block cursor-pointer font-semibold text-[#1D4ED8] transition-colors duration-300 hover:text-[#FF4D2D] ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {word}
      {/* Resting subtle underline */}
      <span className="absolute -bottom-0.5 left-0 h-px w-full bg-[#1D4ED8]/30" />
      {/* Animated underline expanding from left to right */}
      <span className="absolute -bottom-0.5 left-0 h-[2px] w-full origin-left scale-x-0 bg-[#FF4D2D] transition-transform duration-300 ease-out group-hover:scale-x-100" />
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const pillarsRef = useRef<HTMLDivElement>(null);
  const systemMapRef = useRef<HTMLDivElement>(null);

  const { value: cgpaValue, ref: cgpaRef } = useCountUp(8.63, 2, 2);

  useGSAP(
    () => {
      // 1. Header: slide in from left with clip-path reveal
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            x: -50,
            opacity: 0,
            clipPath: "inset(0 100% 0 0)",
          },
          {
            x: 0,
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 2. Identity badge: scale up from 0.9 with spring
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          {
            scale: 0.9,
            opacity: 0,
            y: 25,
          },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: badgeRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // 3. Headline: line-by-line curtain reveal with clip-path
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll(".about-headline-line");
        gsap.fromTo(
          lines,
          {
            clipPath: "inset(100% 0 0 0)",
            yPercent: 40,
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0 0 0)",
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: "power4.out",
            scrollTrigger: {
              trigger: headlineRef.current,
              start: "top 80%",
              once: true,
            },
          }
        );
      }

      // 4. Bio text: progressive word-by-word reveal scrubbed on scroll
      if (bioRef.current) {
        const words = bioRef.current.querySelectorAll(".reveal-word");
        gsap.fromTo(
          words,
          { opacity: 0.22 },
          {
            opacity: 1,
            stagger: 0.03,
            ease: "none",
            scrollTrigger: {
              trigger: bioRef.current,
              start: "top 80%",
              end: "bottom 60%",
              scrub: 1,
            },
          }
        );
      }

      // 5. Engineering pillars: slide in from right with stagger
      if (pillarsRef.current) {
        const pillars = pillarsRef.current.querySelectorAll(".about-pillar");
        gsap.fromTo(
          pillars,
          {
            x: 60,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: pillarsRef.current,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 6. Process cards: pop up with stagger + spring bounce + tilt
      if (systemMapRef.current) {
        const nodes = systemMapRef.current.querySelectorAll(".system-node");
        gsap.fromTo(
          nodes,
          {
            opacity: 0,
            y: 45,
            scale: 0.88,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "back.out(1.8)",
            scrollTrigger: {
              trigger: systemMapRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="bg-tech-grid relative min-h-screen w-full overflow-hidden border-t border-[#111318]/[0.1] bg-[#F4F3EE] text-[#111318]"
    >
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-24 md:px-10 lg:px-14">
        {/* Section Header */}
        <div
          ref={headerRef}
          className="flex items-center justify-between border-b border-[#111318]/[0.1] pb-6"
        >
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-semibold tracking-[0.3em] text-[#1D4ED8]">
              01 / 04
            </span>
            <span className="h-px w-8 bg-[#111318]/20" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#5A5E6B]">
              ABOUT // HOW I THINK
            </span>
          </div>
          <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-[#FF4D2D] md:block">
            ARCHITECTURE FIRST
          </span>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 flex-col justify-center py-16 lg:py-20">
          {/* Identity / Education Badge with Swiss gradient border */}
          <div
            ref={badgeRef}
            className="gradient-border mb-12 flex w-fit flex-col rounded-xl shadow-[0_14px_34px_-16px_rgba(17,19,24,0.18)]"
          >
            <div className="flex items-center gap-3 border-b border-[#111318]/[0.08] px-5 py-3">
              <span className="relative flex h-2 w-2 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#FF4D2D] opacity-40" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D2D]" />
              </span>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-[#111318]">
                VISHAL CHOUDHARY
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A5E6B] sm:flex-nowrap">
              <span className="font-medium text-[#111318]/80">B.TECH CSIT // 2026</span>
              <span className="hidden h-3 w-px bg-[#111318]/15 sm:block" />
              <span
                className="cursor-help transition-colors hover:text-[#111318]"
                title="Marri Laxman Reddy Institute of Technology and Management"
              >
                MLRITM, HYDERABAD
              </span>
              <span className="hidden h-3 w-px bg-[#111318]/15 sm:block" />
              <span className="font-bold text-[#1D4ED8]">
                CGPA: <span ref={cgpaRef}>{cgpaValue}</span>
              </span>
            </div>
          </div>

          {/* Headline with curtain-lift line-by-line reveal */}
          <h2
            ref={headlineRef}
            className="max-w-5xl text-[clamp(2.5rem,6vw,6.2rem)] font-black leading-[0.95] tracking-[-0.05em] text-[#111318]"
          >
            <span className="block overflow-hidden py-1">
              <span className="about-headline-line block">
                I engineer systems that make
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="about-headline-line block">
                complex logic feel{" "}
                <span className="text-[#1D4ED8]">effortless.</span>
              </span>
            </span>
          </h2>

          {/* Bio & Core Pillars */}
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_380px] lg:gap-20">
            {/* Word-by-word progressive reveal bio */}
            <p
              ref={bioRef}
              className="max-w-2xl text-base leading-relaxed text-[#111318]/80 md:text-xl md:leading-relaxed"
            >
              {BIO_PARAGRAPH.map((segment, sIdx) => {
                if (segment.type === "text") {
                  const words = segment.text.split(" ").filter(Boolean);
                  return words.map((w, wIdx) => (
                    <span
                      key={`text-${sIdx}-${wIdx}`}
                      className="reveal-word mr-[0.28em] inline-block will-change-opacity"
                    >
                      {w}
                    </span>
                  ));
                }
                return (
                  <span
                    key={`interactive-${sIdx}`}
                    className="reveal-word mr-[0.28em] inline-block will-change-opacity"
                  >
                    <InteractiveWord word={segment.word} />
                    {segment.trailing}
                  </span>
                );
              })}
            </p>

            {/* Aligned Engineering Pillars */}
            <div ref={pillarsRef} className="flex flex-col gap-6 font-mono">
              <div className="about-pillar group flex cursor-default flex-col gap-1.5 border-l-2 border-[#111318]/15 pl-4 transition-all duration-300 hover:translate-x-2 hover:border-l-4 hover:border-[#1D4ED8] hover:pl-[14px]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#1D4ED8]">
                  01 / AI &amp; BACKEND SYSTEMS
                </span>
                <span className="text-sm text-[#5A5E6B] transition-colors duration-300 group-hover:text-[#111318]">
                  FastAPI, PostgreSQL/PostGIS &amp; Semantic Search
                </span>
              </div>

              <div className="about-pillar group flex cursor-default flex-col gap-1.5 border-l-2 border-[#111318]/15 pl-4 transition-all duration-300 hover:translate-x-2 hover:border-l-4 hover:border-[#FF4D2D] hover:pl-[14px]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#FF4D2D]">
                  02 / NETWORK &amp; CORE CS
                </span>
                <span className="text-sm text-[#5A5E6B] transition-colors duration-300 group-hover:text-[#111318]">
                  Java, Packet Inspection (Pcap4J) &amp; DSA
                </span>
              </div>

              <div className="about-pillar group flex cursor-default flex-col gap-1.5 border-l-2 border-[#111318]/15 pl-4 transition-all duration-300 hover:translate-x-2 hover:border-l-4 hover:border-[#0F766E] hover:pl-[14px]">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0F766E]">
                  03 / INTERACTIVE FRONTEND
                </span>
                <span className="text-sm text-[#5A5E6B] transition-colors duration-300 group-hover:text-[#111318]">
                  Next.js, TypeScript, GSAP &amp; HTML5 Canvas
                </span>
              </div>
            </div>
          </div>

          {/* 5-Step Engineering Process Cards with 3D Tilt */}
          <div
            ref={systemMapRef}
            className="mt-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-24 lg:grid-cols-5"
          >
            {SYSTEM_STEPS.map((item) => (
              <TiltCard
                key={item.id}
                className="system-node group relative flex flex-col justify-between rounded-2xl border border-[#111318]/12 bg-white/85 p-6 shadow-[0_8px_24px_-14px_rgba(17,19,24,0.12)] transition-all duration-300 hover:border-[#1D4ED8]/50 hover:bg-white hover:shadow-[0_18px_36px_-14px_rgba(29,78,216,0.16)] will-change-transform"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-semibold tracking-[0.2em] text-[#1D4ED8]">
                    STEP // {item.step}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#111318]/15 transition-all duration-300 group-hover:bg-[#FF4D2D] group-hover:shadow-[0_0_8px_rgba(255,77,45,0.5)]" />
                </div>

                <div className="mt-8">
                  <h3 className="font-mono text-sm font-bold tracking-[0.2em] text-[#111318]">
                    {item.label}
                  </h3>
                  <p className="mt-2 text-xs leading-5 text-[#5A5E6B] transition-colors group-hover:text-[#111318]/80">
                    {item.desc}
                  </p>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}