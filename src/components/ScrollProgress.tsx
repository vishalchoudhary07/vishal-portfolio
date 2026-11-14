"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    // Set initial transform state
    gsap.set(barRef.current, { scaleX: 0, transformOrigin: "left center" });

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        if (barRef.current) {
          gsap.set(barRef.current, { scaleX: self.progress });
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div
      ref={barRef}
      aria-hidden="true"
      className="fixed top-0 left-0 w-full h-[2px] z-[9998] pointer-events-none will-change-transform"
      style={{
        background: "linear-gradient(to right, #c8ff3d, #4d59e3, #ed4059)",
        boxShadow: "0 0 10px rgba(200, 255, 61, 0.4), 0 0 20px rgba(77, 89, 227, 0.2)",
        transformOrigin: "left center",
      }}
    />
  );
}
