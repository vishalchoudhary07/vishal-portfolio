"use client";
import { IconType } from "react-icons";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
  icon?: IconType; // Added icon type
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

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const messageRef = useRef<HTMLSpanElement>(null);

  const [message, setMessage] = useState(
    "CONSTANTLY LEARNING / CONSTANTLY BUILDING"
  );

  /*
   * ---------------------------------------------------------
   * SECTION ANIMATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>("[data-skill-group]");
      const items = gsap.utils.toArray<HTMLElement>("[data-skill-item]");

      gsap.fromTo(
        groups,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 15,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * INTERACTIVE BOTTOM MESSAGE
   * ---------------------------------------------------------
   */

  const handleMessageClick = () => {
    const nextMessage =
      message === "CONSTANTLY LEARNING / CONSTANTLY BUILDING"
        ? "LEARN → BUILD → REPEAT"
        : "CONSTANTLY LEARNING / CONSTANTLY BUILDING";

    if (!messageRef.current) {
      setMessage(nextMessage);
      return;
    }

    const tl = gsap.timeline();

    tl.to(messageRef.current, {
      y: -8,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    })
      .call(() => {
        setMessage(nextMessage);
      })
      .to(messageRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power3.out",
      });
  };

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative w-full overflow-hidden bg-[#0a0a0a] text-white"
    >
      {/* =====================================================
          BACKGROUND GRID
      ===================================================== */}

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

      {/* =====================================================
          HEADER
      ===================================================== */}

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

      {/* =====================================================
          SKILL GROUPS
      ===================================================== */}

      <div className="relative mx-auto grid max-w-[1700px] grid-cols-1 md:grid-cols-2">
        {skillGroups.map((group) => (
          <div
            key={group.number}
            data-skill-group
            className="relative min-h-[300px] border-b border-white/[0.08] px-8 py-12 md:px-12 lg:px-16"
          >
            {/* Group header */}

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
                <div
                  key={skill.name}
                  data-skill-item
                  className="group flex cursor-default items-center gap-3 rounded-full border border-white/[0.12] bg-white/[0.015] px-5 py-3.5 text-[15px] text-white/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#c8ff3d]/40 hover:bg-[#c8ff3d]/[0.04] hover:text-white hover:shadow-[0_10px_30px_rgba(200,255,61,0.06)]"
                >
                  {/* =================================================
                      STABLE TECHNOLOGY MARK (Now with Icon support)
                  ================================================= */}

                  <span className="flex h-6 min-w-6 items-center justify-center rounded-md border border-white/[0.16] bg-white/[0.04] px-1.5 font-mono text-[9px] font-bold tracking-tight text-white/45 transition-all duration-300 group-hover:border-[#c8ff3d]/50 group-hover:bg-[#c8ff3d]/10 group-hover:text-[#c8ff3d]">
                    {skill.icon ? (
                      <skill.icon className="h-3.5 w-3.5" />
                    ) : (
                      skill.mark
                    )}
                  </span>

                  <span>{skill.name}</span>

                  {/* Hover indicator */}

                  <span className="ml-1 h-1 w-1 rounded-full bg-[#c8ff3d] opacity-0 transition-all duration-300 group-hover:opacity-100" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* =====================================================
          BOTTOM INTERACTIVE MESSAGE
      ===================================================== */}

      <div className="relative mx-auto max-w-[1700px] px-8 py-10 md:px-12 lg:px-16">
        <button
          type="button"
          onClick={handleMessageClick}
          className="group flex w-full cursor-pointer items-center justify-between border-t border-white/[0.08] pt-7 text-left"
        >
          <div className="flex items-center gap-5">
            {/* Animated dot */}

            <span className="relative flex h-3 w-3 items-center justify-center">
              <span className="absolute h-3 w-3 rounded-full bg-[#c8ff3d]/20 transition-transform duration-500 group-hover:scale-[2]" />

              <span className="relative h-1.5 w-1.5 rounded-full bg-[#c8ff3d]" />
            </span>

            <span
              ref={messageRef}
              className="font-mono text-[15px] font-medium uppercase tracking-[0.22em] text-white/50 transition-colors duration-300 group-hover:text-white/80 md:text-[17px]"
            >
              {message}
            </span>
          </div>

          {/* Interactive arrow */}

          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white/30 transition-all duration-300 group-hover:border-[#c8ff3d]/40 group-hover:bg-[#c8ff3d]/10 group-hover:text-[#c8ff3d] group-hover:rotate-45">
            ↗
          </span>
        </button>
      </div>

      {/* =====================================================
          STATUS
      ===================================================== */}

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