// src/app/page.tsx
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-zinc-950">
      <Hero />
      <Projects />
      
      {/* A spacer section just so we have room to scroll past the projects */}
      <section className="h-screen flex items-center justify-center bg-zinc-950 text-zinc-500 font-mono">
        <p>End of portfolio (for now)</p>
      </section>
    </main>
  );
}