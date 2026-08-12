"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;

    if (!section || !track) return;

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".project-panel");

      const animation = gsap.to(track, {
        x: () => -(window.innerWidth * (panels.length - 1)),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${window.innerWidth * (panels.length - 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        animation.kill();
      };
    }, section);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-zinc-900 text-white"
    >
      <div
        ref={trackRef}
        className="flex h-full"
        style={{
          width: "300vw",
        }}
      >
        <div
          className="project-panel flex h-screen shrink-0 flex-col items-center justify-center border-r border-zinc-800 p-12"
          style={{ width: "100vw" }}
        >
          <h2 className="mb-4 text-5xl font-bold">
            Project 01
          </h2>

          <p className="max-w-xl text-center text-xl text-zinc-400">
            Python-based data analysis pipeline parsing complex datasets into
            structured models.
          </p>
        </div>

        <div
          className="project-panel flex h-screen shrink-0 flex-col items-center justify-center border-r border-zinc-800 bg-zinc-800/30 p-12"
          style={{ width: "100vw" }}
        >
          <h2 className="mb-4 text-5xl font-bold">
            Project 02
          </h2>

          <p className="max-w-xl text-center text-xl text-zinc-400">
            Interactive physics sandbox modeling orbital mechanics and
            gravitational forces.
          </p>
        </div>

        <div
          className="project-panel flex h-screen shrink-0 flex-col items-center justify-center p-12"
          style={{ width: "100vw" }}
        >
          <h2 className="mb-4 text-5xl font-bold">
            Project 03
          </h2>

          <p className="max-w-xl text-center text-xl text-zinc-400">
            Automated financial expense tracker utilizing predictive
            algorithms.
          </p>
        </div>
      </div>
    </section>
  );
}