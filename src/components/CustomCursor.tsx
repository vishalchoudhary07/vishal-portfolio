"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only mount cursor if pointer is fine (not mobile/touch) and not reduced-motion
    if (typeof window === "undefined") return;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isTouch && !prefersReducedMotion) {
      setMounted(true);
    }
  }, []);

  useEffect(() => {
    if (!mounted || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Initial setup: centered on coordinates and hidden until first movement
    gsap.set([dot, ring], {
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
    });

    // gsap.quickTo for smooth follow physics (dot is fast, ring trails smoothly)
    const setDotX = gsap.quickTo(dot, "x", { duration: 0.15, ease: "power3.out" });
    const setDotY = gsap.quickTo(dot, "y", { duration: 0.15, ease: "power3.out" });
    const setRingX = gsap.quickTo(ring, "x", { duration: 0.4, ease: "power3.out" });
    const setRingY = gsap.quickTo(ring, "y", { duration: 0.4, ease: "power3.out" });

    let isVisible = false;
    let currentState: "default" | "interactive" | "heading" = "default";

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, overwrite: "auto" });
        isVisible = true;
      }
      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.2, overwrite: "auto" });
      isVisible = false;
    };

    const onMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });
      isVisible = true;
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = !!target.closest(
        "a, button, [data-cursor-hover], input, textarea, select, [role='button']"
      );
      const isHeading = !isInteractive && !!target.closest("h1, h2, h3");

      if (isInteractive) {
        if (currentState !== "interactive") {
          currentState = "interactive";
          gsap.to(ring, {
            scale: 1.5,
            borderColor: "rgba(200, 255, 61, 0.6)",
            backgroundColor: "rgba(200, 255, 61, 0.05)",
            mixBlendMode: "normal",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      } else if (isHeading) {
        if (currentState !== "heading") {
          currentState = "heading";
          gsap.to(ring, {
            scale: 1.8,
            borderColor: "transparent",
            backgroundColor: "#f2f0e9",
            mixBlendMode: "difference",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(dot, {
            scale: 0,
            opacity: 0,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      } else {
        if (currentState !== "default") {
          currentState = "default";
          gsap.to(ring, {
            scale: 1,
            borderColor: "rgba(242, 240, 233, 0.4)",
            backgroundColor: "transparent",
            mixBlendMode: "normal",
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          gsap.to(dot, {
            scale: 1,
            opacity: 1,
            duration: 0.2,
            overwrite: "auto",
          });
        }
      }
    };

    const onMouseDown = () => {
      const targetScale =
        currentState === "interactive" ? 1.2 : currentState === "heading" ? 1.4 : 0.75;
      gsap.to(ring, {
        scale: targetScale,
        duration: 0.15,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onMouseUp = () => {
      const targetScale =
        currentState === "interactive" ? 1.5 : currentState === "heading" ? 1.8 : 1;
      gsap.to(ring, {
        scale: targetScale,
        duration: 0.45,
        ease: "elastic.out(1.2, 0.5)",
        overwrite: "auto",
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <>
      {/* Trailing Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-[rgba(242,240,233,0.4)] pointer-events-none z-[9999] will-change-transform"
      />
      {/* Leading Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#c8ff3d] pointer-events-none z-[9999] shadow-[0_0_8px_rgba(200,255,61,0.6)] will-change-transform"
      />
    </>
  );
}
