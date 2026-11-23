// src/components/Projects.tsx
"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  number: string;
  category: string;
  title: string;
  titleAccent: string;
  description: string;
  tech: string[];
  accent: string;
  cardAccent: string;
  note: string;
  noteText: string;
  github: string;
  live?: string;
}

const projects: ProjectItem[] = [
  {
    number: "01",
    category: "NETWORK SECURITY",
    title: "Context-Aware",
    titleAccent: "Firewall.",
    description:
      "A Java-based packet inspection firewall that captures live network traffic via Pcap4J and evaluates protocol context before allowing or blocking packets.",
    tech: ["Java", "Pcap4J", "Packet Analysis", "Security Rules"],
    accent: "#FF4D2D",
    cardAccent: "#FF5E40",
    note: "PACKETS → CONTEXT → DECISION",
    noteText:
      "Security should evaluate application context, not just static port numbers.",
    github: "https://github.com/vishalchoudhary07/Centralized-Application---Context-Aware-Firewall",
  },
  {
    number: "02",
    category: "AI / GEOSPATIAL SEARCH",
    title: "AI-Powered",
    titleAccent: "Post Office Search.",
    description:
      "A hybrid semantic and geospatial retrieval engine built to resolve ambiguous natural-language queries to exact Indian post offices.",
    tech: ["FastAPI", "PostgreSQL", "PostGIS", "Sentence Transformers"],
    accent: "#1D4ED8",
    cardAccent: "#60A5FA",
    note: "SEMANTIC + GEOSPATIAL",
    noteText:
      "Vector embeddings capture intent; PostGIS spatial indexing grounds it in reality.",
    github: "https://github.com/vishalchoudhary07/AI-Powered-Delivery-Post-Office-Identification--DPO-System",
  },
  {
    number: "03",
    category: "ALGORITHM VISUALIZATION",
    title: "Algorithms,",
    titleAccent: "made visible.",
    description:
      "An interactive sorting and algorithm sandbox built with JavaScript and HTML5 Canvas to make time complexity and array mutations tangible.",
    tech: ["JavaScript", "HTML5 Canvas", "Data Structures"],
    accent: "#0F766E",
    cardAccent: "#34D399",
    note: "INTERACTIVE SANDBOX",
    noteText:
      "Click the algorithm pills or press RUN in the panel to test the live visualizer.",
    github: "https://github.com/vishalchoudhary07/sorting-visualizer",
    live: "https://your-sorting-visualizer-url.com",
  },
];

/**
 * Magnetic Button following cursor with elastic recoil
 */
function MagneticSourceButton({
  href,
  variant = "solid",
  children,
}: {
  href: string;
  variant?: "solid" | "live";
  children: React.ReactNode;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const moveX = (x / (rect.width / 2)) * 10;
    const moveY = (y / (rect.height / 2)) * 10;

    gsap.to(el, {
      x: moveX,
      y: moveY,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const el = buttonRef.current;
    if (!el) return;
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  const variantClasses =
    variant === "live"
      ? "border border-[#FF4D2D]/50 bg-[#FF4D2D]/10 text-[#FF4D2D] hover:bg-[#FF4D2D] hover:text-white"
      : "bg-[#111318] text-[#F4F3EE] hover:bg-[#1D4ED8]";

  return (
    <a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group flex items-center gap-3 rounded-full px-6 py-3 font-mono text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${variantClasses}`}
    >
      {children}
    </a>
  );
}

/**
 * Interactive Module Card — dark hardware instrument panel floating on light paper
 */
function InteractiveCard({
  accent,
  number,
  children,
}: {
  accent: string;
  number: string;
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    gsap.to(el, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    setIsHovered(false);
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="interactive-card relative min-h-[380px] overflow-hidden rounded-[24px] border bg-[#111318] p-6 text-[#F4F3EE] transition-shadow duration-500 sm:p-8 md:min-h-[440px]"
      style={{
        transformStyle: "preserve-3d",
        boxShadow: isHovered
          ? `0 28px 60px -18px rgba(17,19,24,0.38), 0 0 0 1px ${accent}66`
          : "0 20px 45px -18px rgba(17,19,24,0.28)",
        borderColor: isHovered ? `${accent}80` : "rgba(17,19,24,0.9)",
      }}
    >
      {/* Top Bar */}
      <div className="mb-6 flex items-center justify-between border-b border-white/[0.08] pb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
          {"INTERACTIVE_MODULE // "}
          {number}
        </span>
        <span
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span
              className="absolute h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: accent }}
            />
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: accent,
                boxShadow: `0 0 8px ${accent}`,
              }}
            />
          </span>
          LIVE
        </span>
      </div>

      {children}
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);

  const [cursorAccent, setCursorAccent] = useState("#1D4ED8");

  const handlePanelMouseMove = (e: React.MouseEvent, accent: string) => {
    if (!cursorFollowerRef.current) return;
    setCursorAccent(accent);
    gsap.to(cursorFollowerRef.current, {
      x: e.clientX,
      y: e.clientY,
      scale: 1,
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const handlePanelMouseLeave = () => {
    if (!cursorFollowerRef.current) return;
    gsap.to(cursorFollowerRef.current, {
      scale: 0,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      overwrite: "auto",
    });
  };

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      const progress = progressRef.current;
      const counter = counterRef.current;

      if (!section || !track) return;

      if (cursorFollowerRef.current) {
        gsap.set(cursorFollowerRef.current, {
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          opacity: 0,
        });
      }

      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
      const watermarks = gsap.utils.toArray<HTMLElement>(".project-watermark");
      const cards = gsap.utils.toArray<HTMLElement>(".interactive-card");

      cards.forEach((card, idx) => {
        gsap.to(card, {
          y: -8,
          duration: 3 + idx * 0.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: idx * 0.3,
        });
      });

      const mm = gsap.matchMedia();

      // DESKTOP ONLY: Pinned Horizontal Scroll
      mm.add("(min-width: 1024px)", () => {
        let lastActiveIndex = -1;
        const getHorizontalDistance = () =>
          window.innerWidth * (panels.length - 1);

        gsap.to(track, {
          x: () => -getHorizontalDistance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getHorizontalDistance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              if (progress) {
                gsap.set(progress, {
                  scaleX: p,
                  transformOrigin: "left center",
                });
              }

              const activeIndex = Math.min(
                panels.length - 1,
                Math.floor(p * panels.length)
              );

              if (activeIndex !== lastActiveIndex) {
                lastActiveIndex = activeIndex;
                const nextText = `0${activeIndex + 1}`;

                if (counter) {
                  gsap.timeline()
                    .to(counter, {
                      yPercent: -100,
                      opacity: 0,
                      duration: 0.16,
                      ease: "power2.in",
                      onComplete: () => {
                        counter.textContent = nextText;
                      },
                    })
                    .set(counter, { yPercent: 100, opacity: 0 })
                    .to(counter, {
                      yPercent: 0,
                      opacity: 1,
                      duration: 0.22,
                      ease: "power3.out",
                    });
                }

                panels.forEach((panel, idx) => {
                  gsap.to(panel, {
                    opacity: idx === activeIndex ? 1 : 0.45,
                    duration: 0.3,
                    overwrite: "auto",
                  });
                });
              }
            },
          },
        });

        watermarks.forEach((wm) => {
          gsap.fromTo(
            wm,
            { x: 50 },
            {
              x: -50,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${getHorizontalDistance()}`,
                scrub: 1,
              },
            }
          );
        });
      });

      // MOBILE & TABLET: Vertical Reveal
      mm.add("(max-width: 1023px)", () => {
        panels.forEach((panel) => {
          const category = panel.querySelector(".project-category");
          const title = panel.querySelector(".project-title");
          const desc = panel.querySelector(".project-desc");
          const pills = panel.querySelectorAll(".project-pill");
          const interactiveModule = panel.querySelector(".interactive-card");
          const watermark = panel.querySelector(".project-watermark");

          if (watermark) {
            gsap.to(watermark, {
              y: -50,
              ease: "none",
              scrollTrigger: {
                trigger: panel,
                start: "top bottom",
                end: "bottom top",
                scrub: 1,
              },
            });
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 80%",
              once: true,
            },
          });

          if (category) {
            tl.fromTo(
              category,
              { opacity: 0, x: -30 },
              { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
            );
          }

          if (title) {
            tl.fromTo(
              title,
              { clipPath: "inset(100% 0 0 0)", y: 30, opacity: 0 },
              {
                clipPath: "inset(0% 0 0 0)",
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power4.out",
              },
              "-=0.35"
            );
          }

          if (desc) {
            tl.fromTo(
              desc,
              { opacity: 0, filter: "blur(8px)", y: 15 },
              {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: 0.7,
                ease: "power3.out",
              },
              "-=0.35"
            );
          }

          if (pills.length > 0) {
            tl.fromTo(
              pills,
              { opacity: 0, scale: 0.8, y: 10 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.04,
                ease: "elastic.out(1, 0.5)",
              },
              "-=0.25"
            );
          }

          if (interactiveModule) {
            tl.fromTo(
              interactiveModule,
              { opacity: 0, scale: 0.95, y: 30 },
              {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out",
              },
              "-=0.35"
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-tech-grid relative min-h-screen w-full overflow-hidden border-t border-[#111318]/[0.1] bg-[#F4F3EE] text-[#111318] lg:h-screen"
    >
      {/* CURSOR "VIEW" FOLLOWER */}
      <div
        ref={cursorFollowerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-20 w-20 items-center justify-center rounded-full shadow-xl lg:flex"
        style={{
          backgroundColor: cursorAccent,
          boxShadow: `0 12px 30px ${cursorAccent}44`,
        }}
      >
        <span className="font-mono text-xs font-bold tracking-widest text-white">
          VIEW →
        </span>
      </div>

      {/* Top Section Header */}
      <div className="relative z-30 mx-auto flex max-w-[1500px] items-center justify-between px-6 pt-20 md:px-10 lg:absolute lg:left-0 lg:right-0 lg:top-20 lg:px-14 lg:pt-0">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs font-semibold tracking-[0.3em] text-[#1D4ED8]">
            02 / 04
          </span>
          <span className="h-px w-8 bg-[#111318]/20" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#5A5E6B]">
            SELECTED WORK
          </span>
        </div>

        <span className="hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[#5A5E6B]/80 lg:block">
          SCROLL TO EXPLORE →
        </span>
      </div>

      {/* Horizontal / Vertical Track */}
      <div
        ref={trackRef}
        className="relative z-10 flex flex-col gap-20 py-12 lg:h-full lg:w-[300vw] lg:flex-row lg:gap-0 lg:py-0"
      >
        {projects.map((project, index) => (
          <article
            key={project.number}
            onMouseMove={(e) => handlePanelMouseMove(e, project.accent)}
            onMouseLeave={handlePanelMouseLeave}
            className="project-panel relative flex w-full shrink-0 items-center lg:h-screen lg:w-screen"
          >
            {/* Giant Watermark Number */}
            <div
              aria-hidden="true"
              className="project-watermark pointer-events-none absolute -bottom-10 left-5 font-black leading-none tracking-[-0.09em] text-[#111318]/[0.04] lg:left-14"
              style={{ fontSize: "clamp(12rem, 26vw, 30rem)" }}
            >
              {project.number}
            </div>

            <div className="relative mx-auto flex w-full max-w-[1500px] flex-col justify-center px-6 md:px-10 lg:px-14 lg:pt-10">
              <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
                {/* Left Column: Project Details */}
                <div className="relative z-20">
                  <div className="project-category mb-5 flex items-center gap-3">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-[#5A5E6B]">
                      {project.number} {"//"} {project.category}
                    </span>
                  </div>

                  <h2 className="project-title max-w-[700px] text-[clamp(2.8rem,6vw,6.8rem)] font-black leading-[0.88] tracking-[-0.06em]">
                    <span className="block text-[#111318]">{project.title}</span>
                    <span className="block" style={{ color: project.accent }}>
                      {project.titleAccent}
                    </span>
                  </h2>

                  <p className="project-desc mt-6 max-w-[580px] text-base leading-7 text-[#5A5E6B] md:text-lg md:leading-8">
                    {project.description}
                  </p>

                  {/* Tech Stack Pills */}
                  <div className="mt-7 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="project-pill rounded-full border border-[#111318]/15 bg-white/80 px-3.5 py-1.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-[#111318]/75"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <MagneticSourceButton href={project.github}>
                      Source Code
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        ↗
                      </span>
                    </MagneticSourceButton>

                    {project.live && (
                      <MagneticSourceButton href={project.live} variant="live">
                        <span className="relative flex h-2 w-2 items-center justify-center">
                          <span className="absolute h-full w-full animate-ping rounded-full bg-current opacity-75" />
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        </span>
                        Live Demo
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          ↗
                        </span>
                      </MagneticSourceButton>
                    )}
                  </div>
                </div>

                {/* Right Column: Dark Interactive System Module */}
                <div className="relative z-10">
                  <InteractiveCard accent={project.cardAccent} number={project.number}>
                    {index === 0 && <FirewallVisual accent={project.cardAccent} />}
                    {index === 1 && <PostOfficeVisual accent={project.cardAccent} />}
                    {index === 2 && <SortingVisual accent={project.cardAccent} />}
                  </InteractiveCard>

                  {/* Architectural Note */}
                  <div className="mt-4 flex items-start gap-3 pl-2">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ backgroundColor: project.accent }}
                    />
                    <p className="font-mono text-[11px] text-[#5A5E6B]">
                      <strong
                        className="mr-2 uppercase tracking-wider"
                        style={{ color: project.accent }}
                      >
                        [{project.note}]
                      </strong>
                      {project.noteText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Desktop Bottom Progress Bar */}
      <div className="absolute bottom-7 left-14 right-14 z-30 hidden lg:block">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em]">
            <div className="relative h-5 w-7 overflow-hidden">
              <span
                ref={counterRef}
                className="absolute inset-0 flex items-center justify-center font-bold text-[#1D4ED8]"
              >
                01
              </span>
            </div>
            <span className="text-[#111318]/25">/</span>
            <span className="text-[#5A5E6B]">03</span>
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#5A5E6B]/80">
            INTERACTIVE SYSTEM PREVIEWS
          </span>
        </div>

        <div className="mt-3 h-[1.5px] w-full bg-[#111318]/[0.1]">
          <div
            ref={progressRef}
            className="h-full w-full scale-x-0 bg-[#1D4ED8]"
          />
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
1. INTERACTIVE FIREWALL PACKET MONITOR
================================================================== */
const INITIAL_PACKETS = [
  { id: 1, ip: "192.168.1.14", proto: "TCP :443", context: "TLS Handshake", status: "ALLOW" },
  { id: 2, ip: "10.0.0.42", proto: "UDP :53", context: "DNS Tunneling Sig", status: "BLOCK" },
  { id: 3, ip: "172.16.4.9", proto: "TCP :8080", context: "Auth Token Valid", status: "ALLOW" },
  { id: 4, ip: "192.168.1.88", proto: "HTTP :80", context: "SQLi Payload", status: "BLOCK" },
  { id: 5, ip: "10.24.1.105", proto: "SSH :22", context: "Brute Force Rate", status: "BLOCK" },
];

function FirewallVisual({ accent }: { accent: string }) {
  const [filter, setFilter] = useState<"ALL" | "ALLOW" | "BLOCK">("ALL");

  const filtered = INITIAL_PACKETS.filter((pkt) =>
    filter === "ALL" ? true : pkt.status === filter
  );

  return (
    <div className="flex flex-col justify-between">
      <div className="mb-5 flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          FILTER STREAM:
        </span>
        <div className="flex gap-2">
          {(["ALL", "ALLOW", "BLOCK"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setFilter(mode)}
              className="cursor-pointer rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.15em] transition-all"
              style={{
                borderColor:
                  filter === mode ? accent : "rgba(255,255,255,0.12)",
                backgroundColor:
                  filter === mode ? `${accent}24` : "transparent",
                color: filter === mode ? "#fff" : "rgba(255,255,255,0.5)",
              }}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2.5">
        {filtered.map((pkt) => (
          <div
            key={pkt.id}
            className="grid grid-cols-[1.1fr_0.8fr_1.2fr_auto] items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.02] px-3.5 py-2.5 font-mono text-[11px]"
          >
            <span className="text-white/80">{pkt.ip}</span>
            <span className="text-white/40">{pkt.proto}</span>
            <span className="truncate text-white/55">{pkt.context}</span>
            <span
              className="rounded px-2 py-0.5 text-[10px] font-bold"
              style={{
                color: pkt.status === "BLOCK" ? accent : "#34D399",
                backgroundColor:
                  pkt.status === "BLOCK" ? `${accent}1F` : "#34D3991F",
              }}
            >
              {pkt.status}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-4 font-mono text-[10px] text-white/35">
        <span>PCAP4J_INTERFACE: eth0</span>
        <span>SHOWING {filtered.length} / 5 PACKETS</span>
      </div>
    </div>
  );
}

/* ==================================================================
02. INTERACTIVE AI POST OFFICE SEMANTIC SEARCH
================================================================== */
const SAMPLE_QUERIES = [
  {
    label: "Airport Area",
    query: "Post office near Hyderabad international airport",
    results: [
      { name: "Shamshabad S.O (501218)", dist: "4.2 km", score: "0.94" },
      { name: "RGIA Airport B.O (500108)", dist: "0.8 km", score: "0.91" },
      { name: "Rajendranagar S.O (500030)", dist: "11.5 km", score: "0.78" },
    ],
  },
  {
    label: "IT Corridor",
    query: "Speed post center near HITEC City & Cyber Towers",
    results: [
      { name: "Madhapur S.O (500081)", dist: "1.1 km", score: "0.96" },
      { name: "Gachibowli S.O (500032)", dist: "3.8 km", score: "0.89" },
      { name: "Kondapur S.O (500084)", dist: "2.9 km", score: "0.84" },
    ],
  },
  {
    label: "Railway Hub",
    query: "Main parcel booking office near Secunderabad station",
    results: [
      { name: "Secunderabad H.O (500003)", dist: "0.9 km", score: "0.97" },
      { name: "MG Road S.O (500003)", dist: "1.6 km", score: "0.85" },
      { name: "Begumpet S.O (500016)", dist: "4.4 km", score: "0.74" },
    ],
  },
];

function PostOfficeVisual({ accent }: { accent: string }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const activeSample = SAMPLE_QUERIES[selectedIdx];

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
          TEST QUERY:
        </span>
        {SAMPLE_QUERIES.map((q, idx) => (
          <button
            key={q.label}
            type="button"
            onClick={() => setSelectedIdx(idx)}
            className="cursor-pointer rounded-full border px-3 py-1 font-mono text-[10px] transition-all"
            style={{
              borderColor:
                selectedIdx === idx ? accent : "rgba(255,255,255,0.12)",
              backgroundColor:
                selectedIdx === idx ? `${accent}26` : "transparent",
              color: selectedIdx === idx ? "#fff" : "rgba(255,255,255,0.5)",
            }}
          >
            {q.label}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-black/35 p-4">
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
          NATURAL LANGUAGE INPUT
        </span>
        <p className="mt-1.5 font-mono text-xs text-white/90">
          &ldquo;{activeSample.query}&rdquo;
        </p>
      </div>

      <div className="my-4 flex items-center gap-3">
        <div
          className="h-px flex-1"
          style={{ backgroundColor: accent, opacity: 0.4 }}
        />
        <span
          className="font-mono text-[9px] uppercase tracking-[0.2em]"
          style={{ color: accent }}
        >
          COSINE SIMILARITY + POSTGIS ST_Distance
        </span>
      </div>

      <div className="space-y-2.5">
        {activeSample.results.map((item, i) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-2.5"
          >
            <div>
              <p className="text-xs font-medium text-white/85">{item.name}</p>
              <p className="font-mono text-[10px] text-white/40">
                Radius: {item.dist}
              </p>
            </div>
            <span
              className="rounded-md px-2.5 py-1 font-mono text-xs font-bold"
              style={{
                color: i === 0 ? "#111318" : "rgba(244,243,238,0.5)",
                backgroundColor: i === 0 ? accent : "rgba(255,255,255,0.05)",
              }}
            >
              {item.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ==================================================================
03. INTERACTIVE SORTING VISUALIZER SANDBOX
================================================================== */
const ALGO_INFO: Record<string, { complexity: string; label: string }> = {
  BUBBLE: { label: "BUBBLE SORT", complexity: "O(n²)" },
  MERGE: { label: "MERGE SORT", complexity: "O(n log n)" },
  QUICK: { label: "QUICK SORT", complexity: "O(n log n)" },
  HEAP: { label: "HEAP SORT", complexity: "O(n log n)" },
};

function SortingVisual({ accent }: { accent: string }) {
  const [bars, setBars] = useState([64, 32, 88, 45, 96, 23, 74, 52, 81, 39]);
  const [algo, setAlgo] = useState<"BUBBLE" | "MERGE" | "QUICK" | "HEAP">("MERGE");
  const [activeIdx, setActiveIdx] = useState<number | null>(4);
  const [isSorting, setIsSorting] = useState(false);

  const shuffleBars = () => {
    if (isSorting) return;
    const randomBars = Array.from(
      { length: 10 },
      () => Math.floor(Math.random() * 75) + 20
    );
    setBars(randomBars);
    setActiveIdx(null);
  };

  const runSortAnimation = () => {
    if (isSorting) return;
    setIsSorting(true);

    const working = [...bars];
    const snapshots: { arr: number[]; highlight: number }[] = [];

    for (let i = 0; i < working.length; i++) {
      for (let j = i + 1; j < working.length; j++) {
        if (working[i] > working[j]) {
          const temp = working[i];
          working[i] = working[j];
          working[j] = temp;
          snapshots.push({ arr: [...working], highlight: j });
        }
      }
    }

    if (snapshots.length === 0) {
      const fresh = [78, 30, 92, 41, 60, 24, 85, 50, 99, 36];
      setBars(fresh);
      setIsSorting(false);
      return;
    }

    snapshots.forEach((snap, idx) => {
      setTimeout(() => {
        setBars(snap.arr);
        setActiveIdx(snap.highlight);
        if (idx === snapshots.length - 1) {
          setIsSorting(false);
          setActiveIdx(working.length - 1);
        }
      }, idx * 75);
    });
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex h-[150px] items-end gap-2 border-b border-white/10 px-2 pt-4">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-[4px] transition-all duration-150"
            style={{
              height: `${height}%`,
              backgroundColor:
                index === activeIdx ? accent : "rgba(244,243,238,0.75)",
            }}
          />
        ))}
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {(["BUBBLE", "MERGE", "QUICK", "HEAP"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setAlgo(item)}
              className="cursor-pointer rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.15em] transition-all"
              style={{
                borderColor:
                  algo === item ? accent : "rgba(244,243,238,0.14)",
                color: algo === item ? accent : "rgba(244,243,238,0.5)",
                backgroundColor:
                  algo === item ? `${accent}1A` : "transparent",
              }}
            >
              [{item}]
            </button>
          ))}
        </div>

        <span className="font-mono text-[10px] text-white/45">
          TIME: <strong className="text-white/85">{ALGO_INFO[algo].complexity}</strong>
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={shuffleBars}
          disabled={isSorting}
          className="cursor-pointer rounded-full border border-white/15 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-white/40 hover:text-white disabled:opacity-40"
        >
          SHUFFLE ↻
        </button>

        <button
          type="button"
          onClick={runSortAnimation}
          disabled={isSorting}
          className="cursor-pointer rounded-full border py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:brightness-110 disabled:opacity-50"
          style={{
            borderColor: accent,
            backgroundColor: accent,
            color: "#111318",
          }}
        >
          {isSorting ? "SORTING..." : "RUN SORT →"}
        </button>
      </div>
    </div>
  );
}