// src/components/Projects.tsx
export default function Projects() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-zinc-900 text-white">
      
      <div className="flex w-[300vw] h-full" id="projects-track">
        
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