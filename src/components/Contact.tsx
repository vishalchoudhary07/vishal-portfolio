"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const elements = gsap.utils.toArray<HTMLElement>(".contact-reveal");

      gsap.from(elements, {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      gsap.from(lineRef.current, {
        scaleX: 0,
        transformOrigin: "left center",
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-[#0b0b0b] text-[#F6F6F6]"
    >
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #F6F6F6 1px, transparent 1px),
            linear-gradient(to bottom, #F6F6F6 1px, transparent 1px)
          `,
          backgroundSize: "84px 84px",
        }}
      />

      {/* Top line */}
      <div className="absolute left-0 right-0 top-0 h-px bg-white/10" />

      <div
        ref={contentRef}
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1400px] flex-col px-6 py-10 sm:px-10 lg:px-16"
      >
        {/* Header */}
        <div className="contact-reveal flex items-center justify-between border-b border-white/10 pb-6">
          <div className="font-mono text-xs tracking-[0.25em] text-[#C6E354]">
            05 / CONTACT
          </div>

          <div className="flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-white/40">
            <span className="h-2 w-2 rounded-full bg-[#C6E354] shadow-[0_0_12px_#C6E354]" />
            AVAILABLE FOR WORK
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col justify-center py-20">
          <div className="contact-reveal mb-8 font-mono text-xs uppercase tracking-[0.3em] text-white/35">
            Have an idea?
          </div>

          <h2 className="contact-reveal max-w-6xl text-[clamp(4rem,10vw,9.5rem)] font-black leading-[0.82] tracking-[-0.07em]">
            LET&apos;S
            <br />
            <span className="text-white/30">TALK.</span>
          </h2>

          <div
            ref={lineRef}
            className="mt-12 h-px w-full bg-gradient-to-r from-[#ED4059] via-[#4D59E3] to-[#C6E354]"
          />

          {/* Contact panel */}
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="contact-reveal max-w-2xl">
              <p className="text-lg leading-relaxed text-white/50 md:text-xl">
                I&apos;m always interested in building useful things,
                solving interesting problems, and working with people who care
                about what they create.
              </p>

              <p className="mt-5 font-mono text-sm leading-relaxed text-white/30">
                Whether it&apos;s a project, opportunity, collaboration, or
                simply a conversation about technology — send me a message.
              </p>
            </div>

            {/* Actions */}
            <div className="contact-reveal flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a
                href="mailto:vishalchoudhary7757@gmail.com"
                className="group relative flex min-w-[220px] items-center justify-between overflow-hidden rounded-full border border-[#C6E354] px-6 py-4 font-mono text-sm text-[#C6E354] transition-all duration-300 hover:bg-[#C6E354] hover:text-[#0b0b0b]"
              >
                <span>EMAIL ME</span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="group flex min-w-[220px] items-center justify-between rounded-full border border-white/15 px-6 py-4 font-mono text-sm text-white/70 transition-all duration-300 hover:border-white/40 hover:text-white"
              >
                <span>GITHUB</span>

                <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom information */}
        <div className="contact-reveal border-t border-white/10 pt-6">
          <div className="flex flex-col gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>VISHAL / 2026</span>

            <span>BUILT WITH NEXT.JS + TYPESCRIPT</span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ED4059]" />
              END OF SYSTEM
            </span>
          </div>
        </div>
      </div>

      {/* Decorative corner labels */}
      <div className="pointer-events-none absolute bottom-24 left-6 hidden font-mono text-[9px] tracking-[0.3em] text-white/20 lg:block">
        CONTACT_INTERFACE
      </div>

      <div className="pointer-events-none absolute right-6 top-32 hidden font-mono text-[9px] tracking-[0.3em] text-white/20 lg:block [writing-mode:vertical-rl]">
        CONNECTION_READY
      </div>
    </section>
  );
}