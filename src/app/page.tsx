// src/app/page.tsx
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <section className="h-screen flex items-center justify-center bg-zinc-900 text-white">
        <h1 className="text-6xl font-bold">Section 1: The Hero</h1>
      </section>
      
      <section className="h-screen flex items-center justify-center bg-zinc-800 text-white">
        <h2 className="text-5xl font-bold">Section 2: Projects</h2>
      </section>
      
      <section className="h-[150vh] flex items-center justify-center bg-zinc-700 text-white">
        <h2 className="text-5xl font-bold">Section 3: The Deep Scroll</h2>
      </section>
    </main>
  );
}