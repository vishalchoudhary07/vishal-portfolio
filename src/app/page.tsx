import Hero from "@/components/Hero";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950">
      <Hero />

      <Projects />

      <section className="flex h-screen items-center justify-center bg-zinc-950 text-zinc-500 font-mono">
        <p>End of portfolio (for now)</p>
      </section>
    </main>
  );
}