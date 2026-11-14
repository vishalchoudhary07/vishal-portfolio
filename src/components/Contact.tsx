// src/components/Contact.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "vishalchoudhary7757@gmail.com";

/**
 * Floating blurred gradient orbs drifting slowly in the background
 */
function GradientMesh() {
  const meshRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!meshRef.current) return;
      const orbs = meshRef.current.querySelectorAll(".mesh-orb");

      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: "random(-100, 100)",
          y: "random(-80, 80)",
          duration: "random(8, 15)",
          repeat: -1,
          repeatRefresh: true,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 2,
        });
      });
    },
    { scope: meshRef }
  );

  return (
    <div
      ref={meshRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="mesh-orb absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#c8ff3d]/[0.03] blur-[120px]" />
      <div className="mesh-orb absolute right-[15%] top-[40%] h-[350px] w-[350px] rounded-full bg-[#4d59e3]/[0.04] blur-[100px]" />
      <div className="mesh-orb absolute bottom-[15%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#ed4059]/[0.03] blur-[110px]" />
    </div>
  );
}

/**
 * Typewriter hook that types out text letter-by-letter with a brief pause after "LET'S "
 */
function useTypewriter(fullText: string = "LET'S TALK.", delay: number = 200) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const triggerRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayed(fullText);
      setDone(true);
      return;
    }

    if (!triggerRef.current) return;

    let timerId: ReturnType<typeof setTimeout>;

    const st = ScrollTrigger.create({
      trigger: triggerRef.current,
      start: "top 75%",
      once: true,
      onEnter: () => {
        let i = 0;
        const typeNext = () => {
          if (i < fullText.length) {
            i++;
            setDisplayed(fullText.slice(0, i));

            if (i >= fullText.length) {
              setDone(true);
              return;
            }

            // Pause briefly after "LET'S "
            const pauseDelay = i === 6 ? 260 : 65;
            timerId = setTimeout(typeNext, pauseDelay);
          }
        };

        timerId = setTimeout(typeNext, delay);
      },
    });

    return () => {
      clearTimeout(timerId);
      st.kill();
    };
  }, [fullText, delay]);

  return { displayed, done, triggerRef };
}

interface MagneticButtonProps {
  children: React.ReactNode;
  as?: "button" | "a";
  className?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  href?: string;
  target?: string;
  rel?: string;
  type?: "button" | "submit" | "reset";
}

/**
 * Magnetic button that pulls towards cursor on hover and springs back smoothly on leave
 */
function MagneticButton({
  children,
  as = "button",
  className = "",
  onClick,
  href,
  target,
  rel,
  type = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement | null>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
  };

  if (as === "a") {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement | null>}
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement | null>}
      type={type}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </button>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLSpanElement>(null);

  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");

  const { displayed, triggerRef } = useTypewriter("LET'S TALK.", 200);

  // Live clock in user's timezone
  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Checkmark spring animation on copied status change
  useEffect(() => {
    if (copied && checkmarkRef.current) {
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, rotate: -45, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(2.5)" }
      );
    }
  }, [copied]);

  // Entrance choreography
  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      // 1. Header slides in from left
      tl.from(".contact-header", {
        x: -50,
        opacity: 0,
        duration: 0.8,
      })
        // 2. Subtitle fades in with blur
        .from(
          ".contact-subtitle",
          {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
            duration: 0.7,
          },
          "-=0.4"
        )
        // 3. Gradient divider line draws across
        .from(
          lineRef.current,
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            ease: "power4.out",
          },
          "-=0.2"
        )
        // 4. Shimmer dot appears
        .to(
          ".shimmer-dot",
          {
            opacity: 0.8,
            duration: 0.3,
          },
          "-=0.2"
        )
        // 5. Description fades in
        .from(
          ".contact-desc",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.4"
        )
        // 6. Action buttons stagger in from below with spring easing
        .from(
          ".contact-btn-item",
          {
            y: 35,
            opacity: 0,
            scale: 0.94,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.6)",
          },
          "-=0.4"
        )
        // 7. Footer slides up last
        .from(
          ".contact-footer",
          {
            y: 25,
            opacity: 0,
            duration: 0.7,
          },
          "-=0.3"
        );

      // Shimmer dot continuous moving pulse along the gradient line
      gsap.to(".shimmer-dot", {
        left: "100%",
        duration: 2,
        repeat: -1,
        ease: "none",
        delay: 1.5,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // Repeating bounce animation on Back to Top arrow
      gsap.to(".back-to-top-arrow", {
        y: -4,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: sectionRef }
  );

  const handleCopyEmail = async (e: React.MouseEvent<HTMLElement>) => {
    // Satisfying click bounce animation on button
    const target = e.currentTarget;
    if (target) {
      gsap
        .timeline()
        .to(target, { scale: 0.95, duration: 0.1, ease: "power2.out" })
        .to(target, { scale: 1.0, duration: 0.35, ease: "elastic.out(1.2, 0.4)" });
    }

    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  // Split displayed typewriter text into styled segments
  const part1 = displayed.slice(0, 6); // "LET'S "
  const part2 = displayed.slice(6, 10); // "TALK"
  const part3 = displayed.slice(10, 11); // "."

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-tech-grid relative min-h-screen w-full overflow-hidden border-t border-white/[0.08] bg-[#0a0a0a] text-[#f2f0e9]"
    >
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>

      {/* 1. Animated Gradient Mesh Background */}
      <GradientMesh />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1500px] flex-col px-6 py-20 md:px-10 lg:px-14">
        {/* Section Header */}
        <div className="contact-header flex items-center justify-between border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-medium tracking-[0.3em] text-[#c8ff3d]">
              04 / 04
            </span>
            <span className="h-px w-8 bg-white/15" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              CONTACT
            </span>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-white/50">
            <span className="h-2 w-2 rounded-full bg-[#c8ff3d] shadow-[0_0_12px_#c8ff3d]" />
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </div>

        {/* Main CTA Area */}
        <div className="flex flex-1 flex-col justify-center py-16">
          <div className="contact-subtitle mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            Ready to collaborate?
          </div>

          {/* 2. Typing Cursor Effect on Headline */}
          <h2
            ref={triggerRef}
            className="flex min-h-[0.9em] max-w-6xl flex-wrap items-baseline select-none text-[clamp(3.8rem,10vw,9rem)] font-black leading-[0.84] tracking-[-0.07em]"
            aria-label="LET'S TALK."
          >
            <span>{part1}</span>
            {part2 && <span className="text-white/30">{part2}</span>}
            {part3 && <span className="text-[#c8ff3d]">{part3}</span>}
            <span
              aria-hidden="true"
              className="animate-blink ml-2 inline-block h-[0.75em] w-[4px] md:w-[6px] align-middle bg-[#c8ff3d] shadow-[0_0_10px_#c8ff3d]"
            />
          </h2>

          {/* 4. Enhanced Gradient Divider Line with Shimmer */}
          <div className="relative mt-12 h-px w-full">
            <div
              ref={lineRef}
              className="h-full w-full bg-gradient-to-r from-[#ed4059] via-[#4d59e3] to-[#c8ff3d]"
            />
            <div
              aria-hidden="true"
              className="shimmer-dot pointer-events-none absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_10px_white]"
            />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="contact-desc max-w-2xl">
              <p className="text-lg leading-relaxed text-white/60 md:text-xl">
                I&apos;m currently open to software engineering roles, backend &
                AI systems internships, and ambitious technical collaborations.
              </p>

              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-white/35">
                DIRECT INBOX // {EMAIL}
              </p>
            </div>

            {/* 3 & 5. Magnetic Action Buttons with Enhanced Feedback */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <div className="contact-btn-item">
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={handleCopyEmail}
                  className={`group flex min-w-[240px] cursor-pointer items-center justify-between rounded-full px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] transition-all duration-300 ${
                    copied
                      ? "bg-[#d9ff66] shadow-[0_0_30px_rgba(200,255,61,0.65)] ring-2 ring-white/60"
                      : "bg-[#c8ff3d] hover:brightness-110"
                  }`}
                >
                  <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
                  <span ref={checkmarkRef} className="inline-block text-sm">
                    {copied ? "✓" : "⎘"}
                  </span>
                </MagneticButton>
              </div>

              <div className="contact-btn-item">
                <MagneticButton
                  as="a"
                  href={`mailto:${EMAIL}`}
                  className="group flex min-w-[240px] items-center justify-between rounded-full border border-white/20 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-all duration-300 hover:border-[#c8ff3d] hover:text-[#c8ff3d]"
                >
                  <span>OPEN MAIL APP</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </MagneticButton>
              </div>

              <div className="contact-btn-item">
                <MagneticButton
                  as="a"
                  href="https://github.com/vishalchoudhary07"
                  target="_blank"
                  rel="noreferrer"
                  className="group flex min-w-[240px] items-center justify-between rounded-full border border-white/15 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white/70 transition-all duration-300 hover:border-white/45 hover:text-white"
                >
                  <span>GITHUB PROFILE</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    ↗
                  </span>
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Footer Enhancement with Live Clock and Animated Top Link */}
        <div className="contact-footer border-t border-white/[0.08] pt-6">
          <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <span>VISHAL CHOUDHARY // 2026</span>
            <span suppressHydrationWarning>
              LOCAL TIME: {time || "--:--:--"}
            </span>
            <a
              href="#top"
              className="group flex items-center gap-2 text-white/50 transition-colors hover:text-[#c8ff3d]"
            >
              <span>BACK TO TOP</span>
              <span className="back-to-top-arrow inline-block transition-colors group-hover:text-[#c8ff3d]">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
