// src/components/ScrollProgress.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

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
      className="pointer-events-none fixed left-0 top-0 z-[9998] h-[3px] w-full will-change-transform"
      style={{
        background: "linear-gradient(to right, #1D4ED8, #FF4D2D)",
        boxShadow: "0 1px 6px rgba(29, 78, 216, 0.2)",
        transformOrigin: "left center",
      }}
    />
  );
}