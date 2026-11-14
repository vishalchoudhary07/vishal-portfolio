"use client";

import { IconType } from "react-icons";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Import brand logos and icons
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiSqlalchemy,
  SiGithub,
} from "react-icons/si";
import {
  FaJava,
  FaMapMarkedAlt,
  FaCode,
  FaCube,
  FaNetworkWired,
  FaBrain,
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

type Skill = {
  name: string;
  mark: string;
  icon?: IconType;
};

type SkillGroup = {
  number: string;
  label: string;
  skills: Skill[];
};

const skillGroups: SkillGroup[] = [
  {
    number: "01",
    label: "LANGUAGES",
    skills: [
      { name: "Java", mark: "JV", icon: FaJava },
      { name: "Python", mark: "PY", icon: SiPython },
      { name: "JavaScript", mark: "JS", icon: SiJavascript },
      { name: "TypeScript", mark: "TS", icon: SiTypescript },
    ],
  },
  {
    number: "02",
    label: "FRONTEND",
    skills: [
      { name: "React", mark: "R", icon: SiReact },
      { name: "Next.js", mark: "N", icon: SiNextdotjs },
      { name: "Tailwind CSS", mark: "TW", icon: SiTailwindcss },
      { name: "HTML5 Canvas", mark: "H5", icon: SiHtml5 },
    ],
  },
  {
    number: "03",
    label: "BACKEND & DATABASE",
    skills: [
      { name: "FastAPI", mark: "FA", icon: SiFastapi },
      { name: "PostgreSQL", mark: "PG", icon: SiPostgresql },
      { name: "MySQL", mark: "SQL", icon: SiMysql },
      { name: "SQLAlchemy", mark: "SA", icon: SiSqlalchemy },
      { name: "PostGIS", mark: "GIS", icon: FaMapMarkedAlt },
    ],
  },
  {
    number: "04",
    label: "SYSTEMS & TOOLS",
    skills: [
      { name: "Data Structures & Algorithms", mark: "DS", icon: FaCode },
      { name: "OOP", mark: "OP", icon: FaCube },
      { name: "Git / GitHub", mark: "GH", icon: SiGithub },
      { name: "Pcap4J", mark: "PC", icon: FaNetworkWired },
      { name: "Sentence Transformers", mark: "AI", icon: FaBrain },
    ],
  },
];

/**
 * Continuous Tech Logo Marquee
 */
function TechMarquee() {
  const allSkills = skillGroups.flatMap((g) => g.skills);
  // Duplicate for seamless loop
  const doubled = [...allSkills, ...allSkills];

  return (
    <div className="relative w-full overflow-hidden border-b border-white/[0.08] py-6">
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Edge gradient masks */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#0a0a0a] to-transparent"
      />

      <div className="flex w-max animate-marquee items-center gap-12">
        {doubled.map((skill, i) => (
          <div
            key={`${skill.name}-${i}`}
            className="flex shrink-0 items-center gap-3 text-white/20 transition-colors duration-300 hover:text-white/70"
          >
            {skill.icon && <skill.icon className="h-5 w-5" />}
            <span className="font-mono text-xs uppercase tracking-widest">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Skill Pill with Magnetic Hover + Radial Glow
 */
function SkillPill({ skill }: { skill: Skill }) {
  const pillRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = pillRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    // Magnitude ~5px toward cursor
    const moveX = (x / (rect.width / 2)) * 5;
    const moveY = (y / (rect.height / 2)) * 5;

    gsap.to(el, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const el = pillRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={pillRef}
      data-skill-item
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative flex cursor-default select-none items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.015] px-5 py-3.5 text-[15px] text-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#c8ff3d]/50 hover:bg-[#c8ff3d]/[0.04] hover:text-white hover:shadow-[0_10px_30px_rgba(200,255,61,0.08)]"
    >
      {/* Interactive Radial Glow on Hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-0 transition-all duration-500 ease-out group-hover:scale-110 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(200,255,61,0.18) 0%, rgba(200,255,61,0.03) 50%, transparent 70%)",
        }}
      />

      {/* Technology Mark / Icon */}
      <span className="flex h-6 min-w-6 items-center justify-center rounded-md border border-white/[0.16] bg-white/[0.04] px-1.5 font-mono text-[9px] font-bold tracking-tight text-white/45 transition-all duration-300 group-hover:border-[#c8ff3d]/60 group-hover:bg-[#c8ff3d]/15 group-hover:text-[#c8ff3d]">
        {skill.icon ? (
          <skill.icon className="h-3.5 w-3.5" />
        ) : (
          skill.mark
        )}
      </span>

      <span>{skill.name}</span>

      {/* Hover indicator dot */}
      <span className="ml-1 h-1.5 w-1.5 rounded-full bg-[#c8ff3d] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:shadow-[0_0_8px_#c8ff3d]" />
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  // Typewriter Bottom Message State
  const [displayedText, setDisplayedText] = useState(
    "CONSTANTLY LEARNING / CONSTANTLY BUILDING"
  );
  const [messageIndex, setMessageIndex] = useState(0);
  const isTypingRef = useRef(false);
  const intervalRefs = useRef<{ erase?: NodeJS.Timeout; type?: NodeJS.Timeout }>({});

  useEffect(() => {
    const intervals = intervalRefs.current;
    return () => {
      if (intervals.erase) clearInterval(intervals.erase);
      if (intervals.type) clearInterval(intervals.type);
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * SECTION ENTRANCE & STAGGER ANIMATIONS (useGSAP)
   * ---------------------------------------------------------
   */
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const groups = gsap.utils.toArray<HTMLElement>("[data-skill-group]");

      groups.forEach((group, groupIdx) => {
        // Group card clip-path reveal (curtain lift)
        gsap.fromTo(
          group,
          {
            clipPath: "inset(100% 0 0 0)",
            opacity: 0,
            y: 35,
          },
          {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: groupIdx * 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              once: true,
            },
          }
        );

        // Skill pills bounce in with elastic easing
        const pills = group.querySelectorAll<HTMLElement>("[data-skill-item]");
        gsap.fromTo(
          pills,
          {
            opacity: 0,
            scale: 0.8,
            y: 18,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            delay: groupIdx * 0.15 + 0.15,
            stagger: 0.05,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: group,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    },
    { scope: sectionRef }
  );

  /*
   * ---------------------------------------------------------
   * TYPEWRITER BOTTOM MESSAGE
   * ---------------------------------------------------------
   */
  const handleMessageClick = () => {
    if (isTypingRef.current) return;
    isTypingRef.current = true;

    const messages = [
      "CONSTANTLY LEARNING / CONSTANTLY BUILDING",
      "LEARN → BUILD → REPEAT",
    ];
    const nextIdx = (messageIndex + 1) % messages.length;
    setMessageIndex(nextIdx);
    const targetText = messages[nextIdx];

    // Erase character by character
    let current = displayedText;
    intervalRefs.current.erase = setInterval(() => {
      if (current.length > 0) {
        current = current.slice(0, -2);
        setDisplayedText(current);
      } else {
        if (intervalRefs.current.erase) clearInterval(intervalRefs.current.erase);
        // Type character by character
        let charIndex = 0;
        intervalRefs.current.type = setInterval(() => {
          if (charIndex <= targetText.length) {
            setDisplayedText(targetText.slice(0, charIndex));
            charIndex++;
          } else {
            if (intervalRefs.current.type) clearInterval(intervalRefs.current.type);
            isTypingRef.current = false;
          }
        }, 28);
      }
    }, 16);
  };

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="bg-tech-grid relative w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* Background Grid Pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #ffffff 1px, transparent 1px),
            linear-gradient(to bottom, #ffffff 1px, transparent 1px)
          `,
          backgroundSize: "86px 86px",
        }}
      />

      {/* HEADER */}
      <div className="relative mx-auto max-w-[1700px] px-8 pt-28 md:px-12 lg:px-16">
        <div className="flex items-end justify-between border-b border-white/[0.08] pb-8">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-10 bg-[#c8ff3d]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
                Technical Stack
              </span>
            </div>

            <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-black leading-[0.85] tracking-[-0.07em]">
              Tools I{" "}
              <span className="text-white/25">build with.</span>
            </h2>
          </div>

          <div className="hidden pb-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25 md:block">
            STACK / 2026
          </div>
        </div>
      </div>

      {/* 1. TECH LOGO MARQUEE */}
      <TechMarquee />

      {/* SKILL GROUPS */}
      <div className="relative mx-auto grid max-w-[1700px] grid-cols-1 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.number}
            data-skill-group
            className="relative min-h-[300px] border-b border-white/[0.08] px-8 py-12 md:px-12 lg:px-16"
          >
            {/* Group Header */}
            <div className="mb-14 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-mono text-[12px] font-medium tracking-[0.25em] text-[#c8ff3d]">
                  {group.number}
                </span>
                <span className="h-px w-12 bg-white/15" />
              </div>

              <span className="font-mono text-[16px] font-semibold uppercase tracking-[0.25em] text-white/55">
                {group.label}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <SkillPill key={skill.name} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* BOTTOM INTERACTIVE MESSAGE */}
      <div className="relative mx-auto max-w-[1700px] px-8 py-10 md:px-12 lg:px-16">
        <button
          type="button"
          onClick={handleMessageClick}
          aria-label="Toggle philosophy statement"
          className="group flex w-full cursor-pointer items-center justify-between border-t border-white/[0.08] pt-7 text-left"
        >
          <div className="flex items-center gap-5">
            {/* Animated Dot */}
            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-[#c8ff3d]/20 transition-transform duration-500 group-hover:scale-[2]" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-[#c8ff3d]" />
            </span>

            <span className="font-mono text-[15px] font-medium uppercase tracking-[0.22em] text-white/50 transition-colors duration-300 group-hover:text-white/80 md:text-[17px]">
              {displayedText}
              <span className="ml-1 inline-block h-3.5 w-1.5 animate-pulse bg-[#c8ff3d]/70 align-middle" />
            </span>
          </div>

          {/* Interactive Arrow */}
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white/30 transition-all duration-300 group-hover:rotate-45 group-hover:border-[#c8ff3d]/40 group-hover:bg-[#c8ff3d]/10 group-hover:text-[#c8ff3d]">
            ↗
          </span>
        </button>
      </div>

      {/* STATUS */}
      <div className="relative mx-auto flex max-w-[1700px] items-center justify-between px-8 pb-8 md:px-12 lg:px-16">
        <span className="font-mono text-[12px] uppercase tracking-[0.3em] text-white/35">
          Always learning. Always building.
        </span>

        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-white/25">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] shadow-[0_0_10px_rgba(200,255,61,0.5)]" />
          Stack online
        </span>
      </div>
    </section>
  );
}
