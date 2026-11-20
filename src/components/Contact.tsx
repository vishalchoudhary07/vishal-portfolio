// src/components/Contact.tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Matter from "matter-js";

gsap.registerPlugin(ScrollTrigger);

const EMAIL = "vishalchoudhary7757@gmail.com";

/* ==================================================================
   COLOR PALETTE — the 4 user-specified accent colors
================================================================== */
const PALETTE = {
  red: "#ED4059",
  blue: "#4D59E3",
  lime: "#C6E354",
  light: "#F6F6F6",
} as const;

const PALETTE_ARR = [PALETTE.red, PALETTE.blue, PALETTE.lime, PALETTE.light];

/* ==================================================================
   TECH BLOCKS DATA
================================================================== */
const TECH_LABELS = [
  "{ }",
  "< />",
  "fn()",
  "=>",
  "0x1F",
  "[ ]",
  "//",
  "&&",
  "||",
  "import",
  "async",
  "const",
  "type",
  "null",
  ".map()",
  "git",
];

/* ==================================================================
   INTERACTIVE PHYSICS SANDBOX (Matter.js)
================================================================== */
function PhysicsSandbox() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const blocksRef = useRef<Matter.Body[]>([]);

  const initPhysics = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Cleanup previous instance
    if (renderRef.current) Matter.Render.stop(renderRef.current);
    if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
    if (engineRef.current) Matter.Engine.clear(engineRef.current);

    const w = container.clientWidth;
    const h = container.clientHeight;

    canvas.width = w * window.devicePixelRatio;
    canvas.height = h * window.devicePixelRatio;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.2 } });
    engineRef.current = engine;

    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width: w,
        height: h,
        pixelRatio: window.devicePixelRatio,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // Walls (invisible)
    const wallOpts: Matter.IChamferableBodyDefinition = {
      isStatic: true,
      render: { visible: false },
      friction: 0.3,
    };
    const walls = [
      Matter.Bodies.rectangle(w / 2, h + 10, w + 40, 20, wallOpts), // floor
      Matter.Bodies.rectangle(-10, h / 2, 20, h + 40, wallOpts), // left
      Matter.Bodies.rectangle(w + 10, h / 2, 20, h + 40, wallOpts), // right
      Matter.Bodies.rectangle(w / 2, -10, w + 40, 20, wallOpts), // ceiling
    ];

    // Create tech blocks
    const blocks: Matter.Body[] = TECH_LABELS.map((label, i) => {
      const blockW = 36 + label.length * 9;
      const blockH = 32;
      const color = PALETTE_ARR[i % PALETTE_ARR.length];

      return Matter.Bodies.rectangle(
        50 + Math.random() * (w - 100),
        -40 - Math.random() * h * 0.6,
        blockW,
        blockH,
        {
          chamfer: { radius: 8 },
          restitution: 0.45,
          friction: 0.4,
          frictionAir: 0.01,
          render: { fillStyle: color },
          label,
        }
      );
    });
    blocksRef.current = blocks;

    Matter.Composite.add(engine.world, [...walls, ...blocks]);

    // Mouse constraint for drag interaction
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);

    // Fix HiDPI mouse offset
    mouse.pixelRatio = window.devicePixelRatio;

    // Custom text rendering on top of blocks
    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;
      if (!ctx) return;

      blocks.forEach((block) => {
        const { x, y } = block.position;
        const fillColor = block.render.fillStyle as string;
        // Dark text on light backgrounds, light text on dark backgrounds
        const textColor =
          fillColor === PALETTE.light || fillColor === PALETTE.lime
            ? "#0a0a0a"
            : "#ffffff";

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(block.angle);
        ctx.font = `bold 11px "JetBrains Mono", ui-monospace, monospace`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(block.label, 0, 1);
        ctx.restore();
      });
    });

    const runner = Matter.Runner.create();
    runnerRef.current = runner;

    Matter.Render.run(render);
    Matter.Runner.run(runner, engine);
  }, []);

  useEffect(() => {
    // Small delay to ensure container has rendered with final size
    const timeout = setTimeout(initPhysics, 100);

    const handleResize = () => {
      clearTimeout(timeout);
      initPhysics();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
      if (renderRef.current) Matter.Render.stop(renderRef.current);
      if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
      if (engineRef.current) {
        Matter.Composite.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
      }
    };
  }, [initPhysics]);

  // Shake / reset on button click
  const handleShake = () => {
    blocksRef.current.forEach((block) => {
      Matter.Body.applyForce(block, block.position, {
        x: (Math.random() - 0.5) * 0.08,
        y: -(Math.random() * 0.12 + 0.04),
      });
    });
  };

  return (
    <div className="mt-16 lg:mt-20">
      {/* Module card container */}
      <div className="relative overflow-hidden rounded-[24px] border border-white/[0.1] bg-[#111111]/90">
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-white/[0.07] px-6 py-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
            PHYSICS_LAB // INTERACTIVE
          </span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleShake}
              className="cursor-pointer rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/50 transition-all hover:border-[#C6E354]/50 hover:text-white"
            >
              SHAKE ↻
            </button>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C6E354]">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#C6E354] opacity-40" />
                <span className="h-2 w-2 rounded-full bg-[#C6E354]" />
              </span>
              LIVE
            </span>
          </div>
        </div>

        {/* Canvas area */}
        <div
          ref={containerRef}
          className="relative h-[300px] w-full sm:h-[350px]"
        >
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
            style={{ touchAction: "none" }}
          />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 flex items-start gap-3 pl-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C6E354]" />
        <p className="font-mono text-[11px] text-white/40">
          <strong className="mr-2 uppercase tracking-wider text-[#C6E354]">
            [MATTER.JS PHYSICS]
          </strong>
          Built with real physics — go on, drag them around. Hit SHAKE to toss
          them up.
        </p>
      </div>
    </div>
  );
}

/* ==================================================================
   GRADIENT MESH BACKGROUND
================================================================== */
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
      <div className="mesh-orb absolute left-[10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#C6E354]/[0.03] blur-[120px]" />
      <div className="mesh-orb absolute right-[15%] top-[40%] h-[350px] w-[350px] rounded-full bg-[#4D59E3]/[0.04] blur-[100px]" />
      <div className="mesh-orb absolute bottom-[15%] left-[30%] h-[300px] w-[300px] rounded-full bg-[#ED4059]/[0.03] blur-[110px]" />
    </div>
  );
}

/* ==================================================================
   MAGNETIC BUTTON
================================================================== */
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
    gsap.to(el, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: "power2.out",
    });
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

/* ==================================================================
   MAIN CONTACT COMPONENT
================================================================== */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLSpanElement>(null);

  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const [headlineReady, setHeadlineReady] = useState(false);
  const [headlineText, setHeadlineText] = useState("");

  // Live clock
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
    const id = setInterval(updateTime, 1000);
    return () => clearInterval(id);
  }, []);

  // Typewriter headline — fires via IntersectionObserver (more reliable than ScrollTrigger with Lenis)
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const hasTyped = useRef(false);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el || hasTyped.current) return;

    // Reduced motion check
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeadlineText("LET'S TALK.");
      setHeadlineReady(true);
      hasTyped.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTyped.current) {
          hasTyped.current = true;
          const full = "LET'S TALK.";
          let i = 0;

          const type = () => {
            i++;
            setHeadlineText(full.slice(0, i));
            if (i >= full.length) {
              setHeadlineReady(true);
              return;
            }
            const delay = i === 6 ? 260 : 65; // pause after "LET'S "
            setTimeout(type, delay);
          };

          setTimeout(type, 300);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Checkmark animation on copy
  useEffect(() => {
    if (copied && checkmarkRef.current) {
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, rotate: -45, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(2.5)" }
      );
    }
  }, [copied]);

  // Entrance animations — using IntersectionObserver trigger to be safe with Lenis
  const hasAnimated = useRef(false);

  useGSAP(
    () => {
      if (!sectionRef.current || hasAnimated.current) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            observer.disconnect();

            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.from(".contact-header", { x: -50, opacity: 0, duration: 0.8 })
              .from(
                ".contact-subtitle",
                { opacity: 0, y: 20, filter: "blur(8px)", duration: 0.7 },
                "-=0.4"
              )
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
              .to(".shimmer-dot", { opacity: 0.8, duration: 0.3 }, "-=0.2")
              .from(
                ".contact-desc",
                { y: 25, opacity: 0, duration: 0.7 },
                "-=0.4"
              )
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
              .from(
                ".contact-physics",
                { y: 40, opacity: 0, duration: 0.8 },
                "-=0.4"
              )
              .from(
                ".contact-footer",
                { y: 25, opacity: 0, duration: 0.7 },
                "-=0.3"
              );

            // Shimmer dot continuous loop
            gsap.to(".shimmer-dot", {
              left: "100%",
              duration: 2,
              repeat: -1,
              ease: "none",
              delay: 1.5,
            });

            // Back to top bounce
            gsap.to(".back-to-top-arrow", {
              y: -4,
              duration: 0.8,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        },
        { threshold: 0.1 }
      );

      observer.observe(sectionRef.current);
    },
    { scope: sectionRef }
  );

  const handleCopyEmail = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (target) {
      gsap
        .timeline()
        .to(target, { scale: 0.95, duration: 0.1, ease: "power2.out" })
        .to(target, {
          scale: 1.0,
          duration: 0.35,
          ease: "elastic.out(1.2, 0.4)",
        });
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
  const part1 = headlineText.slice(0, 6); // "LET'S "
  const part2 = headlineText.slice(6, 10); // "TALK"
  const part3 = headlineText.slice(10, 11); // "."

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-tech-grid relative w-full overflow-hidden border-t border-white/[0.08] bg-[#0a0a0a] text-[#f2f0e9]"
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

      <GradientMesh />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-20 md:px-10 lg:px-14">
        {/* ============== SECTION HEADER ============== */}
        <div className="contact-header flex items-center justify-between border-b border-white/[0.08] pb-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-medium tracking-[0.3em] text-[#C6E354]">
              04 / 04
            </span>
            <span className="h-px w-8 bg-white/15" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">
              CONTACT
            </span>
          </div>

          <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-white/50">
            <span className="h-2 w-2 rounded-full bg-[#C6E354] shadow-[0_0_12px_#C6E354]" />
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </div>

        {/* ============== MAIN CTA AREA ============== */}
        <div className="py-16">
          <div className="contact-subtitle mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/40">
            Ready to collaborate?
          </div>

          {/* Typewriter Headline */}
          <h2
            ref={headlineRef}
            className="flex min-h-[0.9em] max-w-6xl flex-wrap items-baseline select-none text-[clamp(3.8rem,10vw,9rem)] font-black leading-[0.84] tracking-[-0.07em]"
            aria-label="LET'S TALK."
          >
            <span>{part1}</span>
            {part2 && <span className="text-white/30">{part2}</span>}
            {part3 && <span className="text-[#C6E354]">{part3}</span>}
            {headlineReady && (
              <span
                aria-hidden="true"
                className="animate-blink ml-2 inline-block h-[0.75em] w-[4px] align-middle bg-[#C6E354] shadow-[0_0_10px_#C6E354] md:w-[6px]"
              />
            )}
          </h2>

          {/* Gradient Divider with Shimmer */}
          <div className="relative mt-12 h-px w-full">
            <div
              ref={lineRef}
              className="h-full w-full"
              style={{
                background: `linear-gradient(to right, ${PALETTE.red}, ${PALETTE.blue}, ${PALETTE.lime})`,
              }}
            />
            <div
              aria-hidden="true"
              className="shimmer-dot pointer-events-none absolute left-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-white opacity-0 shadow-[0_0_10px_white]"
            />
          </div>

          {/* Description + Action Buttons */}
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

            {/* Magnetic Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <div className="contact-btn-item">
                <MagneticButton
                  as="button"
                  type="button"
                  onClick={handleCopyEmail}
                  className={`group flex min-w-[240px] cursor-pointer items-center justify-between rounded-full px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#0a0a0a] transition-all duration-300 ${
                    copied
                      ? "bg-[#d9ff66] shadow-[0_0_30px_rgba(198,227,84,0.65)] ring-2 ring-white/60"
                      : "bg-[#C6E354] hover:brightness-110"
                  }`}
                >
                  <span>
                    {copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}
                  </span>
                  <span ref={checkmarkRef} className="inline-block text-sm">
                    {copied ? "✓" : "⎘"}
                  </span>
                </MagneticButton>
              </div>

              <div className="contact-btn-item">
                <MagneticButton
                  as="a"
                  href={`mailto:${EMAIL}`}
                  className="group flex min-w-[240px] items-center justify-between rounded-full border border-white/20 px-6 py-4 font-mono text-xs uppercase tracking-[0.18em] text-white/80 transition-all duration-300 hover:border-[#C6E354] hover:text-[#C6E354]"
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

          {/* ============== INTERACTIVE PHYSICS SANDBOX ============== */}
          <div className="contact-physics">
            <PhysicsSandbox />
          </div>
        </div>

        {/* ============== FOOTER ============== */}
        <div className="contact-footer border-t border-white/[0.08] pt-6">
          <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35 sm:flex-row sm:items-center sm:justify-between">
            <span>VISHAL CHOUDHARY // 2026</span>
            <span suppressHydrationWarning>
              LOCAL TIME: {time || "--:--:--"}
            </span>
            <a
              href="#top"
              className="group flex items-center gap-2 text-white/50 transition-colors hover:text-[#C6E354]"
            >
              <span>BACK TO TOP</span>
              <span className="back-to-top-arrow inline-block transition-colors group-hover:text-[#C6E354]">
                ↑
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
