// src/components/Projects.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const getScrollAmount = () => -(trackRef.current!.scrollWidth - window.innerWidth);

    // Create the animation (move horizontally)
    const tween = gsap.to(trackRef.current, {
      x: getScrollAmount,
      ease: "none", 
    });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top", 
      end: () => `+=${getScrollAmount() * -1}`, 
      pin: true, 
      animation: tween, 
      scrub: 1, 
      invalidateOnRefresh: true, 
    });
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen w-full overflow-hidden bg-zinc-900 text-white"
    >
      <div 
        ref={trackRef} 
        className="flex w-[300vw] h-full" 
      >
        
        {/* Project 1 */}
        <div className="w-screen h-full flex flex-col items-center justify-center p-12 border-r border-zinc-800">
          <h2 className="text-5xl font-bold mb-4">Project 01</h2>
          <p className="text-xl text-zinc-400 max-w-xl text-center">
            Python-based data analysis pipeline parsing complex datasets into structured models.
          </p>
        </div>

        {/* Project 2 */}
        <div className="w-screen h-full flex flex-col items-center justify-center p-12 border-r border-zinc-800 bg-zinc-800/30">
          <h2 className="text-5xl font-bold mb-4">Project 02</h2>
          <p className="text-xl text-zinc-400 max-w-xl text-center">
            Interactive physics sandbox modeling orbital mechanics and gravitational forces.
          </p>
        </div>

        {/* Project 3 */}
        <div className="w-screen h-full flex flex-col items-center justify-center p-12">
          <h2 className="text-5xl font-bold mb-4">Project 03</h2>
          <p className="text-xl text-zinc-400 max-w-xl text-center">
            Automated financial expense tracker utilizing predictive algorithms.
          </p>
        </div>

      </div>
    </section>
  );
}