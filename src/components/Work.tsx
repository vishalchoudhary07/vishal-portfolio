"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: "01",
    title: "AI POST OFFICE",
    subtitle: "IDENTIFICATION SYSTEM",
    category: "AI / BACKEND",
    description:
      "A hybrid semantic–geospatial search system designed to identify Indian post offices from natural language queries.",
    tech: ["FastAPI", "PostgreSQL", "PostGIS", "Python", "Sentence Transformers"],
    featured: true,
    github: "#",
    demo: "#",
  },
  {
    number: "02",
    title: "CONTEXT-AWARE",
    subtitle: "FIREWALL SYSTEM",
    category: "NETWORK SECURITY",
    description:
      "A context-aware firewall system designed to analyze network traffic and make security decisions based on contextual information.",
    tech: ["Java", "Pcap4J", "Networking"],
    featured: false,
    github: "#",
    demo: "#",
  },
  {
    number: "03",
    title: "SORTING",
    subtitle: "VISUALIZER",
    category: "WEB / INTERACTIVE",
    description:
      "An interactive visualization tool that demonstrates multiple sorting algorithms with live performance analytics.",
    tech: ["JavaScript", "HTML5 Canvas", "CSS3"],
    featured: false,
    github: "#",
    demo: "#",
  },
  {
    number: "04",
    title: "SUPERMARKET",
    subtitle: "BILLING SYSTEM",
    category: "SOFTWARE",
    description:
      "A desktop-based supermarket billing application with product management, shopping cart functionality and invoice generation.",
    tech: ["Java", "Java Swing"],
    featured: false,
    github: "#",
    demo: "#",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelector("[data-work-heading]");
      const intro = section.querySelector("[data-work-intro]");
      const cards = section.querySelectorAll("[data-project-card]");

      // Initial states
      gsap.set(heading, {
        opacity: 0,
        y: 40,
      });

      gsap.set(intro, {
        opacity: 0,
        y: 30,
      });

      gsap.set(cards, {
        opacity: 0,
        y: 70,
      });

      // Section heading
      gsap.to(heading, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: heading,
          start: "top 85%",
          once: true,
        },
      });

      // Intro text
      gsap.to(intro, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: intro,
          start: "top 85%",
          once: true,
        },
      });

      // Project cards
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: index * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-28 md:px-10 md:py-36 lg:px-14"
    >
      <div className="mx-auto max-w-[1500px]">
        {/* =====================================================
            SECTION HEADER
        ===================================================== */}

        <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div data-work-heading>
            <div className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.35em] text-white/35">
              <span className="h-px w-10 bg-[#c8ff3d]" />
              <span>02 / 05</span>
            </div>

            <h2 className="text-[clamp(3rem,7vw,7rem)] font-black leading-[0.85] tracking-[-0.07em]">
              SELECTED
              <br />
              <span className="text-white/30">WORK.</span>
            </h2>
          </div>

          <div
            data-work-intro
            className="max-w-[480px] pb-2 md:justify-self-end"
          >
            <p className="text-base leading-7 text-white/45 md:text-lg md:leading-8">
              A selection of projects spanning{" "}
              <span className="text-white/75">AI systems</span>, backend
              development, network security and interactive web experiences.
            </p>
          </div>
        </div>

        {/* =====================================================
            DIVIDER
        ===================================================== */}

        <div className="my-16 h-px bg-white/[0.08] md:my-20" />

        {/* =====================================================
            PROJECTS
        ===================================================== */}

        <div className="space-y-8">
          {projects.map((project) => (
            <article
              key={project.number}
              data-project-card
              className={`group relative overflow-hidden border border-white/[0.08] bg-white/[0.015] transition-colors duration-500 hover:border-white/[0.18] ${
                project.featured ? "min-h-[500px]" : "min-h-[380px]"
              }`}
            >
              {/* Background number */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -top-12 select-none text-[180px] font-black leading-none tracking-[-0.1em] text-white/[0.025] transition-transform duration-700 group-hover:translate-x-3 group-hover:text-white/[0.04] md:text-[240px]"
              >
                {project.number}
              </div>

              {/* Lime hover line */}
              <div className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#c8ff3d] transition-transform duration-500 group-hover:scale-y-100" />

              <div className="relative flex h-full flex-col justify-between p-7 md:p-10 lg:p-12">
                {/* Top */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex items-center gap-4 font-mono text-[9px] uppercase tracking-[0.25em] text-white/30">
                    <span>{project.number}</span>
                    <span className="h-px w-8 bg-white/10" />
                    <span>{project.category}</span>
                  </div>

                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#c8ff3d]/60">
                    {project.featured ? "FEATURED" : "PROJECT"}
                  </span>
                </div>

                {/* Middle */}
                <div className="mt-20 max-w-[850px]">
                  <h3 className="text-[clamp(2.8rem,6vw,6.5rem)] font-black leading-[0.84] tracking-[-0.07em]">
                    {project.title}
                    <br />
                    <span className="text-white/30">{project.subtitle}</span>
                    <span className="text-[#c8ff3d]">.</span>
                  </h3>

                  <p className="mt-8 max-w-[620px] text-sm leading-6 text-white/40 md:text-base md:leading-7">
                    {project.description}
                  </p>
                </div>

                {/* Bottom */}
                <div className="mt-16 flex flex-col gap-8 border-t border-white/[0.08] pt-6 md:flex-row md:items-end md:justify-between">
                  {/* Technologies */}
                  <div className="flex max-w-[700px] flex-wrap gap-2">
                    {project.tech.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/[0.1] px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.12em] text-white/35 transition-colors duration-300 group-hover:border-white/[0.18] group-hover:text-white/55"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex shrink-0 gap-3">
                    <a
                      href={project.github}
                      className="group/link flex items-center gap-3 rounded-full border border-white/[0.12] px-5 py-2.5 text-xs text-white/50 transition-all duration-300 hover:border-white/30 hover:text-white"
                    >
                      GitHub
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        ↗
                      </span>
                    </a>

                    <a
                      href={project.demo}
                      className="group/link flex items-center gap-3 rounded-full bg-[#f2f0e9] px-5 py-2.5 text-xs font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-[#c8ff3d]"
                    >
                      Live
                      <span className="transition-transform duration-300 group-hover/link:translate-x-1">
                        ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* =====================================================
            FOOTER LINE
        ===================================================== */}

        <div className="mt-12 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
          <span>END OF SELECTED WORK</span>

          <span className="hidden sm:block">
            04 PROJECTS / 2026
          </span>
        </div>
      </div>
    </section>
  );
}