"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const ctx = gsap.context(() => {
      const nav = hero.querySelector("[data-hero-nav]");
      const label = hero.querySelector("[data-hero-label]");
      const titleLines = hero.querySelectorAll("[data-hero-line]");
      const description = hero.querySelector("[data-hero-description]");
      const ctas = hero.querySelectorAll("[data-hero-cta]");
      const bottomBar = hero.querySelector("[data-hero-bottom]");
      const marker = hero.querySelector("[data-tech-marker]");

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Initial states
      gsap.set(
        [
          nav,
          label,
          description,
          bottomBar,
          marker,
          ...Array.from(ctas),
        ].filter(Boolean),
        {
          opacity: 0,
          y: 20,
        }
      );

      gsap.set(titleLines, {
        opacity: 0,
        y: 70,
        rotateX: -20,
        transformOrigin: "50% 100%",
      });

      // Navigation
      if (nav) {
        tl.to(nav, {
          opacity: 1,
          y: 0,
          duration: 0.7,
        });
      }

      // Small label
      if (label) {
        tl.to(
          label,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.4"
        );
      }

      // Main hero text
      if (titleLines.length) {
        tl.to(
          titleLines,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
          },
          "-=0.2"
        );
      }

      // Technical marker
      if (marker) {
        tl.to(
          marker,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.65"
        );
      }

      // Description
      if (description) {
        tl.to(
          description,
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.45"
        );
      }

      // Buttons
      if (ctas.length) {
        tl.to(
          ctas,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "-=0.5"
        );
      }

      // Bottom bar
      if (bottomBar) {
        tl.to(
          bottomBar,
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
          },
          "-=0.35"
        );
      }
    }, hero);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen flex-col overflow-hidden bg-[#0a0a0a]"
    >
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #ffffff 1px, transparent 1px),
              linear-gradient(to bottom, #ffffff 1px, transparent 1px)
            `,
            backgroundSize: "72px 72px",
          }}
        />

        {/* Accent glow */}
        <div className="absolute -right-40 -top-40 h-[650px] w-[650px] rounded-full bg-[#c8ff3d]/[0.035] blur-[150px]" />

        {/* Small ambient glow */}
        <div className="absolute bottom-[-250px] left-[20%] h-[500px] w-[500px] rounded-full bg-white/[0.015] blur-[130px]" />
      </div>

      {/* =========================================================
          NAVIGATION
      ========================================================= */}

      <header
        data-hero-nav
        className="relative z-20 flex items-center justify-between border-b border-white/[0.08] px-6 py-5 md:px-10 lg:px-14"
      >
        {/* Logo */}
        <a
          href="#"
          className="group flex items-center gap-1 text-lg font-bold tracking-[-0.04em]"
        >
          VC
          <span className="text-[#c8ff3d] transition-transform duration-300 group-hover:translate-x-1">
            .
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-9 text-[13px] text-white/45 md:flex">
          <a
            href="#work"
            className="transition-colors duration-300 hover:text-white"
          >
            Work
          </a>

          <a
            href="#about"
            className="transition-colors duration-300 hover:text-white"
          >
            About
          </a>

          <a
            href="#stack"
            className="transition-colors duration-300 hover:text-white"
          >
            Stack
          </a>

          <a
            href="#contact"
            className="transition-colors duration-300 hover:text-white"
          >
            Contact
          </a>
        </nav>

        {/* Contact */}
        <a
          href="mailto:vishalchoudhary7757@gmail.com"
          className="group hidden items-center gap-2 text-[13px] text-white/55 sm:flex"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d] shadow-[0_0_10px_rgba(200,255,61,0.5)]" />

          <span className="transition-colors duration-300 group-hover:text-white">
            Available for opportunities
          </span>
        </a>

        {/* Mobile indicator */}
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/35 sm:hidden">
          <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d]" />
          Available
        </div>
      </header>

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}

      <div className="relative z-10 flex flex-1 items-center px-6 py-16 md:px-10 md:py-20 lg:px-14">
        <div className="mx-auto w-full max-w-[1500px]">
          {/* Top label */}
          <div
            data-hero-label
            className="mb-8 flex items-center gap-4 text-[10px] uppercase tracking-[0.35em] text-white/35 md:text-xs"
          >
            <span className="h-px w-10 bg-[#c8ff3d]" />

            <span>Software Developer</span>

            <span className="hidden text-white/15 sm:inline">
              / Hyderabad, IN
            </span>
          </div>

          {/* =====================================================
              MAIN TITLE
          ===================================================== */}

          <div className="relative">
            <h1
              className="max-w-[1100px] text-[clamp(3.2rem,8.5vw,8.5rem)] font-black leading-[0.84] tracking-[-0.075em]"
              style={{ perspective: "1000px" }}
            >
              {/* LINE 1 */}
              <span
                data-hero-line
                className="block"
              >
                I BUILD
              </span>

              {/* LINE 2 */}
              <span
                data-hero-line
                className="block text-white/30"
              >
                SYSTEMS
                <span className="text-[#c8ff3d]">.</span>
              </span>

              {/* LINE 3 */}
              <span
                data-hero-line
                className="block"
              >
                THAT MAKE
              </span>

              {/* LINE 4 */}
              <span
                data-hero-line
                className="block text-white/30"
              >
                SENSE
                <span className="text-[#c8ff3d]">.</span>
              </span>
            </h1>

            {/* ===================================================
                TECHNICAL MARKER
            =================================================== */}

            <div
              data-tech-marker
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            >
              <div className="flex flex-col items-end gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
                <span>BUILD_001</span>

                <span>STATUS: ONLINE</span>

                <span className="flex items-center gap-2 text-[#c8ff3d]/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#c8ff3d]" />
                  READY
                </span>
              </div>
            </div>
          </div>

          {/* =====================================================
              BOTTOM CONTENT
          ===================================================== */}

          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto] md:items-end lg:mt-20">
            {/* Description */}
            <div
              data-hero-description
              className="max-w-[570px]"
            >
              <p className="text-base leading-7 text-white/50 md:text-lg md:leading-8">
                I build software across{" "}
                <span className="text-white/80">backend systems</span>,{" "}
                <span className="text-white/80">
                  AI-powered applications
                </span>
                , network security, and interactive web experiences.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3">
              <a
                data-hero-cta
                href="#work"
                className="group flex items-center gap-4 rounded-full bg-[#f2f0e9] px-6 py-3.5 text-sm font-semibold text-[#0a0a0a] transition-all duration-300 hover:bg-[#c8ff3d]"
              >
                View my work

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                data-hero-cta
                href="mailto:vishalchoudhary7757@gmail.com"
                className="flex items-center gap-3 rounded-full border border-white/15 px-6 py-3.5 text-sm text-white/65 transition-all duration-300 hover:border-white/35 hover:text-white"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM BAR
      ========================================================= */}

      <div
        data-hero-bottom
        className="relative z-10 flex flex-col gap-4 border-t border-white/[0.08] px-6 py-5 font-mono text-[9px] uppercase tracking-[0.2em] text-white/25 sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-14"
      >
        <div className="flex items-center gap-6">
          <span>01 / 05</span>

          <span className="hidden h-px w-12 bg-white/15 sm:block" />

          <span>Selected work</span>
        </div>

        <div className="flex items-center gap-6">
          <span>Java</span>
          <span>Python</span>
          <span>Next.js</span>
          <span className="hidden sm:inline">FastAPI</span>
        </div>

        <a
          href="#work"
          className="group flex items-center gap-2 transition-colors hover:text-white/60"
        >
          Scroll

          <span className="inline-block transition-transform duration-300 group-hover:translate-y-1">
            ↓
          </span>
        </a>
      </div>

      {/* =========================================================
          CORNER MARK
      ========================================================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-24 right-6 hidden font-mono text-[9px] uppercase tracking-[0.25em] text-white/15 lg:block"
      >
        VISHAL / 2026
      </div>
    </section>
  );
}