// src/components/Contact.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const EMAIL = "vishalchoudhary7757@gmail.com";
const GITHUB_URL = "https://github.com/vishalchoudhary07";

/* ==================================================================
   SWISS ENGINEERING PALETTE
================================================================== */
const PALETTE = {
  ink: "#111318",
  cobalt: "#1D4ED8",
  signal: "#FF4D2D",
  paper: "#F4F3EE",
} as const;

/* ==================================================================
   INTERACTIVE CONTACT TERMINAL (Dark Instrument Panel)
================================================================== */
interface TerminalLine {
  id: number;
  type: "command" | "output" | "success" | "error" | "info" | "link";
  text: string;
  href?: string;
}

const COMMAND_LIST = ["help", "whoami", "status", "socials", "ping", "copy", "send", "clear"];
const QUICK_COMMANDS = ["whoami", "status", "socials", "ping", "copy", "help"];

const INITIAL_LINES: TerminalLine[] = [
  { id: 1, type: "info", text: "VISHAL_OS v2.6 // DIRECT CONTACT SHELL" },
  { id: 2, type: "output", text: "Type a command or click a chip below. Try 'help' or 'send Hey Vishal!'" },
];

function ContactTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_LINES);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [isPinging, setIsPinging] = useState(false);

  const nextIdRef = useRef(INITIAL_LINES.length + 1);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutsRef = useRef<number[]>([]);

  const pushLines = (newLines: Omit<TerminalLine, "id">[]) => {
    setLines((prev) => [
      ...prev,
      ...newLines.map((line) => ({ ...line, id: nextIdRef.current++ })),
    ]);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const runCommand = async (raw: string) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    const [cmdRaw, ...rest] = trimmed.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = rest.join(" ");

    setHistory((prev) => [trimmed, ...prev.slice(0, 24)]);
    setHistoryIdx(-1);

    if (cmd === "clear") {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
      timeoutsRef.current = [];
      setIsPinging(false);
      setLines(INITIAL_LINES);
      return;
    }

    pushLines([{ type: "command", text: `visitor@portfolio:~$ ${trimmed}` }]);

    switch (cmd) {
      case "help":
        pushLines([
          { type: "info", text: "AVAILABLE COMMANDS:" },
          { type: "output", text: "  whoami          -> Quick bio & focus areas" },
          { type: "output", text: "  status          -> Availability, roles & timezone" },
          { type: "output", text: "  socials         -> Direct email & GitHub links" },
          { type: "output", text: "  copy            -> Copy email address to clipboard" },
          { type: "output", text: "  ping            -> Check inbox response latency" },
          { type: "output", text: "  send <message>  -> Draft & open a direct email" },
          { type: "output", text: "  clear           -> Reset terminal output" },
        ]);
        break;

      case "whoami":
        pushLines([
          { type: "success", text: "Vishal Choudhary — Computer Science Student & Software Engineer" },
          { type: "output", text: "Building backend & AI systems alongside motion-driven web interfaces." },
          { type: "output", text: "Stack: Next.js, TypeScript, React, Tailwind CSS, GSAP, C / Systems." },
        ]);
        break;

      case "status":
        pushLines([
          { type: "success", text: "● STATUS: OPEN FOR OPPORTUNITIES" },
          { type: "output", text: "  Roles     : SWE Internships, Backend / AI Systems, Creative Frontend" },
          { type: "output", text: "  Timezone  : IST (UTC+5:30)" },
          { type: "output", text: "  Response  : Usually within 24 hours" },
        ]);
        break;

      case "socials":
        pushLines([
          { type: "info", text: "DIRECT CHANNELS:" },
          { type: "link", text: `  Email  -> ${EMAIL}`, href: `mailto:${EMAIL}` },
          { type: "link", text: `  GitHub -> ${GITHUB_URL}`, href: GITHUB_URL },
        ]);
        break;

      case "copy":
      case "email":
        try {
          await navigator.clipboard.writeText(EMAIL);
          pushLines([{ type: "success", text: `✓ Copied "${EMAIL}" to clipboard.` }]);
        } catch {
          pushLines([{ type: "info", text: `Direct email: ${EMAIL}` }]);
        }
        break;

      case "ping": {
        if (isPinging) return;
        setIsPinging(true);
        pushLines([{ type: "info", text: `PING ${EMAIL} (direct-inbox): 56 data bytes` }]);

        const steps = [
          { delay: 320, text: "64 bytes from vishal.inbox: seq=1 ttl=64 time=11.4 ms", type: "output" as const },
          { delay: 680, text: "64 bytes from vishal.inbox: seq=2 ttl=64 time=9.8 ms", type: "output" as const },
          { delay: 1040, text: "64 bytes from vishal.inbox: seq=3 ttl=64 time=10.2 ms", type: "output" as const },
          { delay: 1400, text: "✓ 3 packets transmitted, 3 received, 0% packet loss — ready to build.", type: "success" as const },
        ];

        steps.forEach((step, idx) => {
          const timer = window.setTimeout(() => {
            pushLines([{ type: step.type, text: step.text }]);
            if (idx === steps.length - 1) setIsPinging(false);
          }, step.delay);
          timeoutsRef.current.push(timer);
        });
        break;
      }

      case "send":
        if (!arg) {
          pushLines([
            { type: "error", text: "Usage: send <your message>" },
            { type: "output", text: 'Example: send Hey Vishal, let’s talk about an internship.' },
          ]);
        } else {
          const mailto = `mailto:${EMAIL}?subject=${encodeURIComponent(
            "Portfolio Inquiry"
          )}&body=${encodeURIComponent(arg)}`;
          pushLines([
            { type: "success", text: `✓ Dispatching message to ${EMAIL}...` },
            { type: "output", text: `  Payload: "${arg}"` },
          ]);
          window.location.href = mailto;
        }
        break;

      default:
        pushLines([
          { type: "error", text: `Command not found: "${cmd}". Type 'help' to see valid commands.` },
        ]);
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const current = input;
    setInput("");
    runCommand(current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = Math.min(historyIdx + 1, history.length - 1);
      setHistoryIdx(nextIdx);
      setInput(history[nextIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx <= 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(history[nextIdx]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const value = input.trim().toLowerCase();
      if (!value) return;
      const match = COMMAND_LIST.find((c) => c.startsWith(value));
      if (match) setInput(match === "send" ? "send " : match);
    }
  };

  const handleTerminalClick = () => {
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  return (
    <div className="mt-16 lg:mt-20">
      <div className="relative overflow-hidden rounded-[24px] border border-[#111318] bg-[#111318] text-[#F4F3EE] shadow-[0_24px_55px_-20px_rgba(17,19,24,0.3)]">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-[#FF4D2D]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#60A5FA]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#34D399]" />
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              CONTACT_SHELL // INTERACTIVE
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => runCommand("clear")}
              className="cursor-pointer rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-white/55 transition-all hover:border-[#60A5FA]/70 hover:text-white"
            >
              CLEAR
            </button>
            <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#34D399]">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#34D399] opacity-40" />
                <span className="h-2 w-2 rounded-full bg-[#34D399]" />
              </span>
              ONLINE
            </span>
          </div>
        </div>

        {/* Terminal Body */}
        <div
          onClick={handleTerminalClick}
          className="flex h-[320px] cursor-text flex-col justify-between p-6 font-mono text-xs sm:h-[360px] sm:text-[13px]"
        >
          <div
            ref={outputRef}
            data-lenis-prevent
            className="flex-1 space-y-2 overflow-y-auto pr-2 leading-relaxed"
          >
            {lines.map((line) => {
              if (line.type === "link" && line.href) {
                return (
                  <div key={line.id}>
                    <a
                      href={line.href}
                      target={line.href.startsWith("http") ? "_blank" : undefined}
                      rel={line.href.startsWith("http") ? "noreferrer" : undefined}
                      onClick={(e) => e.stopPropagation()}
                      className="text-[#60A5FA] underline decoration-[#60A5FA]/40 underline-offset-4 transition-colors hover:text-white hover:decoration-white"
                    >
                      {line.text}
                    </a>
                  </div>
                );
              }

              const colorClass =
                line.type === "command"
                  ? "text-white font-semibold pt-2"
                  : line.type === "success"
                  ? "text-[#34D399]"
                  : line.type === "error"
                  ? "text-[#FF5E40]"
                  : line.type === "info"
                  ? "text-[#60A5FA]"
                  : "text-white/70";

              return (
                <div key={line.id} className={`whitespace-pre-wrap break-words ${colorClass}`}>
                  {line.text}
                </div>
              );
            })}
          </div>

          <div className="mt-4 border-t border-white/[0.08] pt-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2.5">
              <span className="shrink-0 text-[#FF5E40]">visitor@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or 'send Hello!'"
                autoComplete="off"
                spellCheck={false}
                aria-label="Contact terminal command input"
                className="w-full bg-transparent text-[#F4F3EE] placeholder:text-white/30 focus:outline-none"
              />
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              {QUICK_COMMANDS.map((cmd) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    runCommand(cmd);
                    inputRef.current?.focus();
                  }}
                  className="cursor-pointer rounded-full border border-white/[0.12] bg-white/[0.04] px-3 py-1 font-mono text-[10px] tracking-[0.12em] text-white/65 transition-all hover:border-[#60A5FA]/70 hover:bg-[#60A5FA]/15 hover:text-white"
                >
                  $ {cmd}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 flex items-start gap-3 pl-2">
        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1D4ED8]" />
        <p className="font-mono text-[11px] text-[#5A5E6B]">
          <strong className="mr-2 uppercase tracking-wider text-[#1D4ED8]">
            [INTERACTIVE SHELL]
          </strong>
          Supports Tab autocomplete, ↑/↓ history, clickable commands, and direct mail dispatch via{" "}
          <span className="font-semibold text-[#111318]">send &lt;message&gt;</span>.
        </p>
      </div>
    </div>
  );
}

/* ==================================================================
   GRADIENT MESH BACKGROUND (Subtle Paper Ambient Wash)
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
    <div ref={meshRef} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="mesh-orb absolute left-[8%] top-[15%] h-[420px] w-[420px] rounded-full bg-[#1D4ED8]/[0.05] blur-[120px]" />
      <div className="mesh-orb absolute right-[12%] top-[38%] h-[360px] w-[360px] rounded-full bg-[#FF4D2D]/[0.05] blur-[110px]" />
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
  children, as = "button", className = "", onClick, href, target, rel, type = "button",
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

/* ==================================================================
   MAIN CONTACT COMPONENT
================================================================== */
export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const checkmarkRef = useRef<HTMLSpanElement>(null);

  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState("");
  const [headlineText, setHeadlineText] = useState("");
  const [headlineDone, setHeadlineDone] = useState(false);

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  const headlineRef = useRef<HTMLHeadingElement>(null);
  const hasTyped = useRef(false);

  useEffect(() => {
    const el = headlineRef.current;
    if (!el || hasTyped.current) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHeadlineText("LET'S TALK.");
      setHeadlineDone(true);
      hasTyped.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTyped.current) {
          hasTyped.current = true;
          observer.disconnect();
          const full = "LET'S TALK.";
          let i = 0;
          const type = () => {
            i++;
            setHeadlineText(full.slice(0, i));
            if (i >= full.length) {
              setHeadlineDone(true);
              return;
            }
            setTimeout(type, i === 6 ? 260 : 65);
          };
          setTimeout(type, 300);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useGSAP(
    () => {
      if (lineRef.current) {
        gsap.from(lineRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power4.out",
          delay: 0.3,
        });
      }

      gsap.set(".shimmer-dot", { opacity: 0 });
      gsap.to(".shimmer-dot", {
        opacity: 0.9,
        duration: 0.5,
        delay: 1.5,
      });
      gsap.to(".shimmer-dot", {
        left: "100%",
        duration: 2,
        repeat: -1,
        ease: "none",
        delay: 2,
      });

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

  useEffect(() => {
    if (copied && checkmarkRef.current) {
      gsap.fromTo(
        checkmarkRef.current,
        { scale: 0, rotate: -45, opacity: 0 },
        { scale: 1, rotate: 0, opacity: 1, duration: 0.4, ease: "back.out(2.5)" }
      );
    }
  }, [copied]);

  const handleCopyEmail = async (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget;
    if (target) {
      gsap.timeline()
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

  const part1 = headlineText.slice(0, 6);
  const part2 = headlineText.slice(6, 10);
  const part3 = headlineText.slice(10, 11);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="bg-tech-grid relative w-full overflow-hidden border-t border-[#111318]/[0.1] bg-[#F4F3EE] text-[#111318]"
    >
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink { animation: blink 1s step-end infinite; }
      `}</style>

      <GradientMesh />

      <div className="relative z-10 mx-auto w-full max-w-[1500px] px-6 py-20 md:px-10 lg:px-14">

        {/* ============== SECTION HEADER ============== */}
        <div className="flex items-center justify-between border-b border-[#111318]/[0.1] pb-6">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-semibold tracking-[0.3em] text-[#1D4ED8]">
              04 / 04
            </span>
            <span className="h-px w-8 bg-[#111318]/20" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-[#5A5E6B]">
              CONTACT
            </span>
          </div>
          <div className="flex items-center gap-2.5 font-mono text-xs tracking-[0.2em] text-[#111318]/65">
            <span className="h-2 w-2 rounded-full bg-[#FF4D2D] shadow-[0_0_10px_rgba(255,77,45,0.55)]" />
            AVAILABLE FOR OPPORTUNITIES
          </div>
        </div>

        {/* ============== MAIN CTA ============== */}
        <div className="py-16">
          <div className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-[#5A5E6B]">
            Ready to collaborate?
          </div>

          {/* Typewriter Headline */}
          <h2
            ref={headlineRef}
            className="flex min-h-[1em] max-w-6xl flex-wrap items-baseline select-none text-[clamp(3.8rem,10vw,9rem)] font-black leading-[0.84] tracking-[-0.07em]"
            aria-label="LET'S TALK."
          >
            <span>{part1}</span>
            {part2 && <span className="text-[#111318]/25">{part2}</span>}
            {part3 && <span className="text-[#FF4D2D]">{part3}</span>}
            {headlineDone && (
              <span
                aria-hidden="true"
                className="animate-blink ml-2 inline-block h-[0.75em] w-[4px] align-middle bg-[#FF4D2D] md:w-[6px]"
              />
            )}
          </h2>

          {/* Gradient Line + Shimmer */}
          <div className="relative mt-12 h-[1.5px] w-full">
            <div
              ref={lineRef}
              className="h-full w-full"
              style={{
                background: `linear-gradient(to right, ${PALETTE.ink}, ${PALETTE.cobalt}, ${PALETTE.signal})`,
              }}
            />
            <div
              aria-hidden="true"
              className="shimmer-dot pointer-events-none absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#FF4D2D] opacity-0 shadow-[0_0_10px_rgba(255,77,45,0.65)]"
            />
          </div>

          {/* Description + Buttons */}
          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-2xl">
              <p className="text-lg leading-relaxed text-[#5A5E6B] md:text-xl">
                I&apos;m currently open to software engineering roles, backend &amp;
                AI systems internships, and ambitious technical collaborations.
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[#111318]/50">
                DIRECT INBOX // {EMAIL}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <MagneticButton
                as="button"
                type="button"
                onClick={handleCopyEmail}
                className={`group flex min-w-[240px] cursor-pointer items-center justify-between rounded-full px-6 py-4 font-mono text-xs font-bold uppercase tracking-[0.18em] text-white transition-all duration-300 ${
                  copied
                    ? "bg-[#111318] shadow-[0_12px_28px_rgba(17,19,24,0.28)]"
                    : "bg-[#1D4ED8] hover:bg-[#1e40af]"
                }`}
              >
                <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
                <span ref={checkmarkRef} className="inline-block text-sm">
                  {copied ? "✓" : "⎘"}
                </span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={`mailto:${EMAIL}`}
                className="group flex min-w-[240px] items-center justify-between rounded-full border border-[#111318]/20 bg-white/75 px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#111318] transition-all duration-300 hover:border-[#FF4D2D] hover:text-[#FF4D2D]"
              >
                <span>OPEN MAIL APP</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer"
                className="group flex min-w-[240px] items-center justify-between rounded-full border border-[#111318]/15 px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-[#111318]/75 transition-all duration-300 hover:border-[#111318] hover:bg-[#111318] hover:text-[#F4F3EE]"
              >
                <span>GITHUB PROFILE</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </MagneticButton>
            </div>
          </div>

          {/* ============== INTERACTIVE TERMINAL ============== */}
          <ContactTerminal />
        </div>

        {/* ============== FOOTER ============== */}
        <div className="border-t border-[#111318]/[0.1] pt-6">
          <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#5A5E6B] sm:flex-row sm:items-center sm:justify-between">
            <span>VISHAL CHOUDHARY // 2026</span>
            <span suppressHydrationWarning>LOCAL TIME: {time || "--:--:--"}</span>
            <a href="#top" className="group flex items-center gap-2 text-[#111318]/70 transition-colors hover:text-[#1D4ED8]">
              <span>BACK TO TOP</span>
              <span className="back-to-top-arrow inline-block transition-colors group-hover:text-[#1D4ED8]">↑</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}