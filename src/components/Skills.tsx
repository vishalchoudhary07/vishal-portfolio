"use client";

import { useEffect, useRef } from "react";
import Matter from "matter-js";

const skills = [
  "Python", 
  "Financial Analysis", 
  "Next.js", 
  "GSAP", 
  "Three.js", 
  "PostgreSQL", 
  "C++", 
  "React", 
  "TypeScript", 
  "Tailwind CSS"
];

export default function Skills() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef(Matter.Engine.create());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = engineRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    const ground = Matter.Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true });
    const wallLeft = Matter.Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true });
    const wallRight = Matter.Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true });
    const ceiling = Matter.Bodies.rectangle(width / 2, -500, width * 2, 50, { isStatic: true });

    const bodies = skills.map(() => {
      return Matter.Bodies.rectangle(
        Math.random() * (width - 200) + 100,
        Math.random() * -500 - 100,
        200, 
        60,
        { 
          restitution: 0.6, 
          friction: 0.1,
          render: { visible: false } 
        }
      );
    });

    Matter.World.add(engine.world, [ground, wallLeft, wallRight, ceiling, ...bodies]);

    const mouse = Matter.Mouse.create(sceneRef.current);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    
    Matter.World.add(engine.world, mouseConstraint);
    Matter.Runner.run(Matter.Runner.create(), engine);

    Matter.Events.on(engine, "afterUpdate", () => {
      bodies.forEach((body, i) => {
        const el = itemRefs.current[i];
        if (el) {
          el.style.transform = `translate(-50%, -50%) translate(${body.position.x}px, ${body.position.y}px) rotate(${body.angle}rad)`;
        }
      });
    });

    const handleResize = () => {
      render.canvas.width = window.innerWidth;
      render.canvas.height = window.innerHeight;
      Matter.Body.setPosition(ground, { x: window.innerWidth / 2, y: window.innerHeight + 25 });
      Matter.Body.setPosition(wallRight, { x: window.innerWidth + 25, y: window.innerHeight / 2 });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      Matter.Render.stop(render);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
      if (render.canvas) render.canvas.remove();
    };
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-950 text-white flex flex-col items-center justify-center">
      <h2 className="absolute top-24 text-4xl md:text-6xl font-bold z-10 pointer-events-none text-zinc-700">
        Tech & Skills
      </h2>
      
      <div ref={sceneRef} className="absolute inset-0 z-10" />
      
      {skills.map((skill, i) => (
        <div
          key={skill}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          className="absolute top-0 left-0 px-6 py-4 bg-zinc-900 border border-emerald-500/30 rounded-full font-mono text-emerald-400 select-none pointer-events-none z-20 flex items-center justify-center min-w-[200px]"
        >
          {skill}
        </div>
      ))}
    </section>
  );
}