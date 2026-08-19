"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    category: "NETWORK SECURITY",
    title: "Context-Aware",
    titleAccent: "Firewall.",
    description:
      "A Java-based firewall system that captures network packets and evaluates them using contextual information before deciding whether traffic should be allowed or blocked.",
    tech: ["Java", "Pcap4J"],
    accent: "#ED4059",
    note: "PACKETS → CONTEXT → DECISION",
    noteText: "Security should understand what is happening, not only what is arriving.",
  },
  {
    number: "02",
    category: "AI / POST OFFICE SEARCH",
    title: "AI-Powered",
    titleAccent: "Post Office Search.",
    description:
      "A hybrid semantic and geospatial retrieval system designed to identify the most relevant Indian post office from natural-language queries.",
    tech: ["FastAPI", "PostgreSQL", "PostGIS", "Sentence Transformers"],
    accent: "#4D59E3",
    note: "SEMANTIC ≠ KEYWORD",
    noteText: "Understand intent. Then use geography to make the result useful.",
  },
  {
    number: "03",
    category: "ALGORITHM VISUALIZATION",
    title: "Algorithms,",
    titleAccent: "made visible.",
    description:
      "An interactive sorting visualization built with JavaScript and HTML5 Canvas, designed to make algorithms understandable through motion.",
    tech: ["JavaScript", "HTML5 Canvas"],
    accent: "#C6E354",
    note: "VISUALIZE THE ALGORITHM",
    noteText: "Let people understand what the algorithm is actually doing.",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const progress = progressRef.current;
    const counter = counterRef.current;

    if (!section || !track || !progress || !counter) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");

      /*
       * ============================================================
       * HORIZONTAL PROJECT SCROLL
       * ============================================================
       */

      const horizontalDistance =
        () => window.innerWidth * (panels.length - 1);

      const horizontalTween = gsap.to(track, {
        x: () => -horizontalDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${horizontalDistance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,

          onUpdate: (self) => {
            const progressValue = self.progress;

            /*
             * Progress line
             */
            gsap.set(progress, {
              scaleX: progressValue,
              transformOrigin: "left center",
            });

            /*
             * Project counter
             *
             * 0.00 - 0.33 => 01
             * 0.33 - 0.66 => 02
             * 0.66 - 1.00 => 03
             */
            const currentProject = Math.min(
              projects.length,
              Math.floor(progressValue * projects.length) + 1
            );

            counter.textContent = `0${currentProject}`;

            /*
             * Active panel treatment
             */
            panels.forEach((panel, index) => {
              const panelStart = index / panels.length;
              const panelEnd = (index + 1) / panels.length;

              const active =
                progressValue >= panelStart &&
                progressValue < panelEnd;

              gsap.to(panel, {
                opacity: active ? 1 : 0.72,
                duration: 0.25,
                overwrite: true,
              });
            });
          },
        },
      });

      /*
       * ============================================================
       * PROJECT CONTENT ENTRANCE
       * ============================================================
       */

      panels.forEach((panel) => {
        const title = panel.querySelector(".project-title");
        const description = panel.querySelector(".project-description");
        const meta = panel.querySelector(".project-meta");
        const visual = panel.querySelector(".project-visual");
        const note = panel.querySelector(".project-note");
        const buttons = panel.querySelector(".project-buttons");

        if (title) {
          gsap.fromTo(
            title,
            {
              y: 80,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (description) {
          gsap.fromTo(
            description,
            {
              y: 35,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              delay: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (meta) {
          gsap.fromTo(
            meta,
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.2,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 68%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (visual) {
          gsap.fromTo(
            visual,
            {
              x: 100,
              opacity: 0,
              scale: 0.94,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1.1,
              delay: 0.1,
              ease: "power4.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (note) {
          gsap.fromTo(
            note,
            {
              y: 30,
              opacity: 0,
              rotate: 2,
            },
            {
              y: 0,
              opacity: 1,
              rotate: 0,
              duration: 0.9,
              delay: 0.35,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        if (buttons) {
          gsap.fromTo(
            buttons,
            {
              y: 20,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.3,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                containerAnimation: horizontalTween,
                start: "left 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative h-screen w-full overflow-hidden bg-[#0a0a0a] text-[#F6F6F6]"
    >
      {/* ============================================================
          BACKGROUND GRID
      ============================================================ */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #F6F6F6 1px, transparent 1px),
              linear-gradient(to bottom, #F6F6F6 1px, transparent 1px)
            `,
            backgroundSize: "84px 84px",
          }}
        />

        <div className="absolute right-[-250px] top-[-250px] h-[650px] w-[650px] rounded-full bg-[#C6E354]/[0.025] blur-[150px]" />

        <div className="absolute bottom-[-300px] left-[25%] h-[600px] w-[600px] rounded-full bg-[#4D59E3]/[0.025] blur-[150px]" />
      </div>

      {/* ============================================================
          TOP SECTION LABEL
      ============================================================ */}

      <div className="absolute left-6 right-6 top-7 z-30 flex items-center justify-between md:left-10 md:right-10 lg:left-14 lg:right-14">
        <div className="flex items-center gap-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            02
          </span>

          <span className="h-px w-10 bg-white/15" />

          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/30">
            Selected Work
          </span>
        </div>

        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/20">
          Scroll to explore →
        </span>
      </div>

      {/* ============================================================
          HORIZONTAL TRACK
      ============================================================ */}

      <div
        ref={trackRef}
        className="relative z-10 flex h-full"
        style={{
          width: "300vw",
        }}
      >
        {projects.map((project, index) => (
          <article
            key={project.number}
            className="project-panel relative flex h-screen w-screen shrink-0 items-center overflow-hidden"
            style={{ width: "100vw" }}
          >
            {/* ======================================================
                LARGE PROJECT NUMBER
            ====================================================== */}

            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 left-5 font-black leading-none tracking-[-0.09em] text-white/[0.025] md:left-10 lg:left-14"
              style={{
                fontSize: "clamp(12rem, 28vw, 34rem)",
              }}
            >
              {project.number}
            </div>

            {/* ======================================================
                MAIN CONTENT
            ====================================================== */}

            <div className="relative mx-auto flex w-full max-w-[1500px] flex-col justify-center px-6 pt-12 md:px-10 lg:px-14">
              <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
                {/* ==================================================
                    LEFT
                ================================================== */}

                <div className="relative z-20">
                  {/* Category */}

                  <div className="project-meta mb-6 flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        backgroundColor: project.accent,
                        boxShadow: `0 0 14px ${project.accent}`,
                      }}
                    />

                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}

                  <h2
                    className="project-title max-w-[720px] font-black leading-[0.86] tracking-[-0.075em]"
                    style={{
                      fontSize: "clamp(4rem, 7vw, 8.5rem)",
                    }}
                  >
                    <span className="block text-[#F6F6F6]">
                      {project.title}
                    </span>

                    <span
                      className="block"
                      style={{
                        color: project.accent,
                      }}
                    >
                      {project.titleAccent}
                    </span>
                  </h2>

                  {/* Description */}

                  <p className="project-description mt-8 max-w-[600px] text-base leading-7 text-white/55 md:text-lg md:leading-8">
                    {project.description}
                  </p>

                  {/* Tech */}

                  <div className="project-meta mt-8 flex flex-wrap gap-2">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/45"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* =================================================
                      BUTTONS
                      ONLY THIRD PROJECT HAS LIVE DEMO
                  ================================================= */}

                  {index === 2 && (
                    <div className="project-buttons mt-9 flex flex-wrap gap-3">
                      <a
                        href="#"
                        className="group flex items-center gap-4 rounded-full bg-[#F6F6F6] px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-[#C6E354]"
                      >
                        GitHub

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          ↗
                        </span>
                      </a>

                      <a
                        href="#"
                        className="group flex items-center gap-4 rounded-full border border-[#C6E354]/35 px-6 py-3.5 text-sm font-semibold text-[#C6E354] transition-all duration-300 hover:bg-[#C6E354] hover:text-[#0a0a0a]"
                      >
                        Live Demo

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          ↗
                        </span>
                      </a>
                    </div>
                  )}
                </div>

                {/* ==================================================
                    RIGHT VISUAL
                ================================================== */}

                <div className="relative z-10">
                  <div
                    className="project-visual relative overflow-hidden rounded-[28px] border border-white/[0.09] bg-white/[0.025]"
                    style={{
                      minHeight: "clamp(330px, 42vw, 560px)",
                    }}
                  >
                    {/* Accent glow */}

                    <div
                      className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full opacity-[0.08] blur-[100px]"
                      style={{
                        backgroundColor: project.accent,
                      }}
                    />

                    {/* Visual header */}

                    <div className="absolute left-7 right-7 top-7 flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                        SYSTEM / {project.number}
                      </span>

                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.2em]"
                        style={{
                          color: project.accent,
                        }}
                      >
                        ● READY
                      </span>
                    </div>

                    {/* ==============================================
                        PROJECT-SPECIFIC VISUALS
                    ============================================== */}

                    {index === 0 && (
                      <FirewallVisual accent={project.accent} />
                    )}

                    {index === 1 && (
                      <PostOfficeVisual accent={project.accent} />
                    )}

                    {index === 2 && (
                      <SortingVisual accent={project.accent} />
                    )}
                  </div>

                  {/* =================================================
                      FLOATING NOTE
                  ================================================= */}

                  <div
                    className="project-note absolute -bottom-8 -left-5 hidden max-w-[260px] md:block lg:-left-14"
                  >
                    <div className="flex gap-4">
                      <div
                        className="mt-1 h-10 w-px shrink-0"
                        style={{
                          backgroundColor: project.accent,
                        }}
                      />

                      <div>
                        <p
                          className="font-mono text-[9px] uppercase tracking-[0.2em]"
                          style={{
                            color: project.accent,
                          }}
                        >
                          {project.note}
                        </p>

                        <p className="mt-2 text-xs leading-5 text-white/35">
                          {project.noteText}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* ============================================================
          BOTTOM PROGRESS
      ============================================================ */}

      <div className="absolute bottom-7 left-6 right-6 z-30 md:left-10 md:right-10 lg:left-14 lg:right-14">
        <div className="flex items-end justify-between">
          <div className="flex items-center gap-4">
            <span
              ref={counterRef}
              className="font-mono text-[11px] font-medium tracking-[0.2em] text-[#C6E354]"
            >
              01
            </span>

            <span className="font-mono text-[10px] tracking-[0.2em] text-white/20">
              —
            </span>

            <span className="font-mono text-[11px] tracking-[0.2em] text-white/25">
              03
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.25em] text-white/20 sm:block">
            Selected projects
          </span>
        </div>

        {/* Progress line */}

        <div className="mt-3 h-px w-full bg-white/[0.08]">
          <div
            ref={progressRef}
            className="h-full w-full scale-x-0"
            style={{
              backgroundColor: "#C6E354",
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ==================================================================
   FIREWALL VISUAL
================================================================== */

function FirewallVisual({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
      <div className="relative w-full max-w-[520px]">
        <div className="mb-8 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
          <span>PACKET MONITOR</span>
          <span style={{ color: accent }}>LIVE</span>
        </div>

        <div className="space-y-3">
          {[
            ["192.168.1.14", "TCP", "ALLOW"],
            ["10.0.0.42", "UDP", "BLOCK"],
            ["172.16.4.9", "TCP", "ALLOW"],
            ["192.168.1.88", "HTTP", "BLOCK"],
          ].map(([ip, protocol, status], i) => (
            <div
              key={ip}
              className="flex items-center justify-between border-b border-white/[0.07] pb-3 font-mono text-[10px]"
            >
              <span className="text-white/45">{ip}</span>
              <span className="text-white/20">{protocol}</span>

              <span
                style={{
                  color: status === "BLOCK" ? accent : "#F6F6F6",
                }}
              >
                {status}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between">
          <div
            className="h-px flex-1"
            style={{
              background: `linear-gradient(to right, ${accent}, transparent)`,
            }}
          />

          <div
            className="ml-4 h-2 w-2 rounded-full"
            style={{
              backgroundColor: accent,
              boxShadow: `0 0 18px ${accent}`,
            }}
          />
        </div>

        <div className="mt-6 font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
          CONTEXT ENGINE / DECISION LAYER
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   POST OFFICE VISUAL
================================================================== */

function PostOfficeVisual({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12">
      <div className="w-full max-w-[540px]">
        <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/25">
          SEMANTIC RETRIEVAL
        </div>

        <div className="mt-8 rounded-2xl border border-white/[0.08] p-5">
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-white/25">
            QUERY
          </span>

          <p className="mt-3 text-sm text-white/70">
            "Post office near Hyderabad airport"
          </p>
        </div>

        <div className="my-7 flex items-center gap-3">
          <div
            className="h-px flex-1"
            style={{
              backgroundColor: accent,
              opacity: 0.5,
            }}
          />

          <span
            className="font-mono text-[9px]"
            style={{
              color: accent,
            }}
          >
            HYBRID SCORE
          </span>
        </div>

        <div className="space-y-3">
          {[
            ["Shamshabad S.O", "0.94"],
            ["Rajendranagar S.O", "0.81"],
            ["Gachibowli S.O", "0.73"],
          ].map(([name, score], i) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-xl border border-white/[0.06] px-4 py-3"
            >
              <span className="text-sm text-white/50">{name}</span>

              <span
                className="font-mono text-xs"
                style={{
                  color: i === 0 ? accent : "rgba(246,246,246,0.35)",
                }}
              >
                {score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==================================================================
   SORTING VISUAL
================================================================== */

function SortingVisual({ accent }: { accent: string }) {
  const bars = [35, 48, 62, 44, 76, 91, 57, 83, 68, 100];

  return (
    <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em]">
        <span className="text-white/30">SORTING VISUALIZER</span>

        <span style={{ color: accent }}>READY</span>
      </div>

      <div className="mt-12 flex h-[190px] items-end gap-2 border-b border-white/10 px-2">
        {bars.map((height, index) => (
          <div
            key={index}
            className="flex-1 rounded-t-[5px] transition-all duration-500"
            style={{
              height: `${height}%`,
              backgroundColor:
                index === 5
                  ? accent
                  : "rgba(246,246,246,0.72)",
            }}
          />
        ))}
      </div>

      <div className="mt-7 flex flex-wrap gap-2">
        {["BUBBLE", "MERGE", "QUICK", "HEAP"].map((item, index) => (
          <span
            key={item}
            className="rounded-full border px-4 py-2 font-mono text-[9px] tracking-[0.15em]"
            style={{
              borderColor:
                index === 1 ? `${accent}80` : "rgba(246,246,246,0.1)",
              color:
                index === 1 ? accent : "rgba(246,246,246,0.35)",
            }}
          >
            [{item}]
          </span>
        ))}
      </div>

      <div className="mt-7 grid grid-cols-2 gap-6 border-t border-white/[0.08] pt-5 font-mono text-[9px] uppercase tracking-[0.15em]">
        <div>
          <span className="text-white/20">Algorithm</span>
          <p className="mt-2 text-white/60">MERGE SORT</p>
        </div>

        <div>
          <span className="text-white/20">Elements</span>
          <p className="mt-2 text-white/60">10</p>
        </div>
      </div>

      <div
        className="mt-6 flex items-center justify-center rounded-full border py-3 font-mono text-xs font-medium tracking-[0.2em]"
        style={{
          borderColor: `${accent}70`,
          color: accent,
          backgroundColor: `${accent}08`,
        }}
      >
        RUN →
      </div>
    </div>
  );
}