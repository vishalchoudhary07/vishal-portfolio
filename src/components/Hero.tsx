// src/components/Hero.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { num: "01", label: "About", href: "#about" },
  { num: "02", label: "Work", href: "#work" },
  { num: "03", label: "Stack", href: "#stack" },
  { num: "04", label: "Contact", href: "#contact" },
];

/**
 * Text scramble animation hook.
 * Rapidly cycles through tech symbols before resolving character-by-character.
 */
function useTextScramble(text: string, trigger: boolean, delay: number = 0) {
  const [display, setDisplay] = useState(text);
  const chars = "!<>-_\\/[]{}=+*^?#_ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const totalFrames = Math.max(text.length * 6, 60);
    let rafId: number;
    let isResolving = false;

    const cyclePreResolve = () => {
      let output = "";
      for (let i = 0; i < text.length; i++) {
        if (text[i] === " ") {
          output += " ";
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      setDisplay(output);
      if (!isResolving) {
        rafId = requestAnimationFrame(cyclePreResolve);
      }
    };
    rafId = requestAnimationFrame(cyclePreResolve);

    const timeout = setTimeout(() => {
      isResolving = true;
      const update = () => {
        let output = "";
        const progress = frame / totalFrames;
        const resolvedCount = Math.floor(progress * text.length);

        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            output += " ";
            continue;
          }
          if (i < resolvedCount) {
            output += text[i];
          } else {
            output += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        setDisplay(output);
        frame++;
        if (frame <= totalFrames) {
          rafId = requestAnimationFrame(update);
        } else {
          setDisplay(text);
        }
      };
      rafId = requestAnimationFrame(update);
    }, delay);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafId);
    };
  }, [trigger, text, delay]);

  return display;
}

/**
 * Magnetic button wrapper for CTA links.
 * Gently pulls towards the cursor on hover and springs back on leave.
 */
interface MagneticButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
}

function MagneticButton({
  children,
  className = "",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  };

  return (
    <a
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrambleTrigger, setScrambleTrigger] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeSection, setActiveSection] = useState("top");
  const [scrolled, setScrolled] = useState(false);

  // Trigger text scramble shortly after mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setScrambleTrigger(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  // Text scramble states for headline lines
  const line1Text = useTextScramble("I BUILD", scrambleTrigger, 0);
  const line2Text = useTextScramble("SYSTEMS.", scrambleTrigger, 150);
  const line3Text = useTextScramble("THAT MAKE", scrambleTrigger, 300);
  const line4Text = useTextScramble("SENSE.", scrambleTrigger, 450);

  // Parallax mouse tracking for ambient washes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Scroll detection & section tracking with ScrollTrigger
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
      if (window.scrollY < 200) {
        setActiveSection("top");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const sections = ["about", "work", "stack", "contact"];
    const triggers: ScrollTrigger[] = [];

    const timer = setTimeout(() => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          const st = ScrollTrigger.create({
            trigger: el,
            start: "top center",
            end: "bottom center",
            onEnter: () => setActiveSection(id),
            onEnterBack: () => setActiveSection(id),
          });
          triggers.push(st);
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
      triggers.forEach((st) => st.kill());
    };
  }, []);

  // Choreographed GSAP entrance animation
  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set("[data-hero-nav]", { opacity: 0, y: -20 });
      gsap.set("[data-hero-label]", { opacity: 0, x: -30 });
      gsap.set("[data-tech-marker]", { opacity: 0, x: 40 });
      gsap.set("[data-hero-description]", {
        opacity: 0,
        y: 20,
        filter: "blur(8px)",
      });
      gsap.set("[data-hero-cta]", { opacity: 0, scale: 0.8, y: 15 });
      gsap.set("[data-hero-bottom]", { opacity: 0, y: 30 });

      tl.to("[data-hero-nav]", {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
      })
        .to("[data-hero-label]", { opacity: 1, x: 0, duration: 0.6 }, "-=0.3")
        .to("[data-tech-marker]", { opacity: 1, x: 0, duration: 0.7 }, "-=0.4")
        .to(
          "[data-hero-description]",
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
          },
          "-=0.4"
        )
        .to(
          "[data-hero-cta]",
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "elastic.out(1, 0.5)",
          },
          "-=0.4"
        )
        .to("[data-hero-bottom]", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3");

      gsap.to("[data-scroll-indicator]", {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    },
    { scope: heroRef }
  );

  return (
    <section
      ref={heroRef}
      id="top"
      className="bg-tech-grid relative flex min-h-screen flex-col overflow-hidden bg-[#F4F3EE] pt-20 text-[#111318]"
    >
      {/* Subtle Architectural Color Washes with Parallax Mouse Tracking */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute -right-40 -top-40 h-[620px] w-[620px] rounded-full bg-[#1D4ED8]/[0.055] blur-[140px] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 20}px)`,
          }}
        />
        <div
          className="absolute bottom-[-220px] left-[18%] h-[480px] w-[480px] rounded-full bg-[#FF4D2D]/[0.045] blur-[130px] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `translate(${-mousePos.x * 25}px, ${-mousePos.y * 18}px)`,
          }}
        />
      </div>

      {/* =========================================================
          FIXED HUD NAVIGATION BAR (SCROLL-AWARE)
      ========================================================= */}
      <header
        data-hero-nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-[#111318]/[0.1] bg-[#F4F3EE]/85 backdrop-blur-md shadow-[0_8px_28px_-14px_rgba(17,19,24,0.14)]"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-10 lg:px-14">
          {/* Brand Logo */}
          <a
            href="#top"
            className="group flex items-center gap-1 text-lg font-black tracking-[-0.04em] text-[#111318]"
          >
            VC
            <span className="text-[#FF4D2D] transition-transform duration-300 group-hover:translate-x-1">
              .
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.2em] text-[#5A5E6B] md:flex"
          >
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative flex items-center gap-2 py-1 transition-colors duration-300 ${
                    isActive
                      ? "font-semibold text-[#111318]"
                      : "hover:text-[#111318]"
                  }`}
                >
                  <span
                    className={`text-[10px] font-semibold transition-colors ${
                      isActive
                        ? "text-[#1D4ED8]"
                        : "text-[#1D4ED8]/70 group-hover:text-[#1D4ED8]"
                    }`}
                  >
                    {link.num}
                  </span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#1D4ED8]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Status + Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a
              href="#contact"
              className="gradient-border group hidden items-center gap-2.5 rounded-full px-4 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-[#111318]/80 shadow-[0_6px_18px_-10px_rgba(17,19,24,0.2)] transition-all hover:text-[#1D4ED8] sm:flex"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF4D2D] opacity-65" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF4D2D]" />
              </span>
              <span>Available for work</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
              className="flex h-9 items-center justify-center rounded-full border border-[#111318]/20 bg-white/70 px-3.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#111318]/80 md:hidden"
            >
              {mobileMenuOpen ? "CLOSE [×]" : "MENU [≡]"}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <nav
            aria-label="Mobile Navigation"
            className="border-t border-[#111318]/[0.1] bg-[#F4F3EE]/95 px-6 py-6 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 font-mono text-sm uppercase tracking-[0.2em]">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between border-b border-[#111318]/[0.08] pb-3 transition-colors ${
                      isActive
                        ? "font-semibold text-[#1D4ED8]"
                        : "text-[#111318]/75 hover:text-[#1D4ED8]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isActive && (
                        <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D2D]" />
                      )}
                      <span>{link.label}</span>
                    </div>
                    <span className="text-xs font-semibold text-[#1D4ED8]">
                      {link.num}
                    </span>
                  </a>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* =========================================================
          HERO CONTENT
      ========================================================= */}
      <div className="relative z-10 flex flex-1 items-center px-6 py-16 md:px-10 md:py-20 lg:px-14">
        <div className="mx-auto w-full max-w-[1500px]">
          {/* Top Label */}
          <div
            data-hero-label
            className="mb-8 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.35em] text-[#5A5E6B] md:text-xs"
          >
            <span className="h-[1.5px] w-10 bg-[#1D4ED8]" />
            <span className="font-medium text-[#111318]/80">
              Software Engineer
            </span>
            <span className="hidden text-[#5A5E6B]/70 sm:inline">
              // Hyderabad, IN
            </span>
          </div>

          {/* Main Headline with Text Scramble */}
          <div className="relative">
            <h1
              className="max-w-[1100px] text-[clamp(3.2rem,8.5vw,8.5rem)] font-black leading-[0.84] tracking-[-0.075em] text-[#111318]"
              style={{ perspective: "1000px" }}
            >
              <span data-hero-line className="block">
                {line1Text}
              </span>
              <span data-hero-line className="block text-[#111318]/25">
                {line2Text.slice(0, -1)}
                <span className="text-[#FF4D2D]">{line2Text.slice(-1)}</span>
              </span>
              <span data-hero-line className="block">
                {line3Text}
              </span>
              <span data-hero-line className="block text-[#111318]/25">
                {line4Text.slice(0, -1)}
                <span className="text-[#1D4ED8]">{line4Text.slice(-1)}</span>
              </span>
            </h1>

            {/* Technical Side Marker */}
            <div
              data-tech-marker
              className="absolute right-0 top-1/2 hidden -translate-y-1/2 lg:block"
            >
              <div className="flex flex-col items-end gap-3 border-r-2 border-[#111318]/15 pr-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A5E6B]">
                <span>SYS_BUILD // 2026</span>
                <span>B.TECH CSIT @ MLRITM</span>
                <span className="flex items-center gap-2 font-semibold text-[#111318]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF4D2D]" />
                  STATUS: ONLINE
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Description + Magnetic CTAs */}
          <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-[1fr_auto] md:items-end lg:mt-20">
            <div data-hero-description className="max-w-[580px]">
              <p className="text-base leading-7 text-[#5A5E6B] md:text-lg md:leading-8">
                I engineer software across{" "}
                <span className="font-semibold text-[#111318]">
                  backend architectures
                </span>
                ,{" "}
                <span className="font-semibold text-[#111318]">
                  AI-powered geospatial retrieval
                </span>
                , packet-level network security, and high-motion web interfaces.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <MagneticButton
                data-hero-cta
                href="#work"
                className="group flex items-center gap-4 rounded-full bg-[#111318] px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-[0.15em] text-[#F4F3EE] transition-all duration-300 hover:bg-[#1D4ED8]"
              >
                Explore Work
                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </MagneticButton>

              <MagneticButton
                data-hero-cta
                href="#contact"
                className="flex items-center gap-3 rounded-full border border-[#111318]/20 bg-white/75 px-6 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.15em] text-[#111318] transition-all duration-300 hover:border-[#FF4D2D] hover:text-[#FF4D2D]"
              >
                Get in touch
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================
          BOTTOM TELEMETRY BAR
      ========================================================= */}
      <div
        data-hero-bottom
        className="relative z-10 border-t border-[#111318]/[0.1]"
      >
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-6 py-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A5E6B] sm:flex-row sm:items-center sm:justify-between md:px-10 lg:px-14">
          <div className="flex items-center gap-5">
            <span className="font-semibold text-[#1D4ED8]">00 // INTRO</span>
            <span className="hidden h-px w-10 bg-[#111318]/20 sm:block" />
            <span>SYSTEM OVERVIEW</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 font-medium text-[#111318]/70">
            <span>Java</span>
            <span>Python</span>
            <span>FastAPI</span>
            <span>PostGIS</span>
            <span>Next.js</span>
          </div>

          <a
            href="#about"
            className="group flex items-center gap-2 font-medium text-[#111318]/75 transition-colors hover:text-[#1D4ED8]"
          >
            <span>Scroll Down</span>
            <span
              data-scroll-indicator
              className="inline-block transition-transform duration-300 group-hover:translate-y-1"
            >
              ↓
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}