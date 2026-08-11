// src/components/Hero.tsx
export default function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-center bg-zinc-950 text-zinc-300 font-mono overflow-hidden">
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800/20 via-zinc-950 to-zinc-950"></div>

      <div className="z-10 max-w-3xl w-full px-8">
        <div className="flex flex-col gap-4 text-lg md:text-2xl leading-relaxed">
          
          <div className="flex items-center gap-2">
            <span className="text-emerald-500">{">"}</span>
            <span className="text-zinc-100 font-bold">System.init()</span>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-emerald-500">{">"}</span>
            <p>Hello, I am a Computer Science student.</p>
          </div>

          <div className="flex items-start gap-2">
            <span className="text-emerald-500">{">"}</span>
            <p>
              Specializing in <span className="text-cyan-400">Python</span>, systems architecture, 
              and <span className="text-cyan-400">financial data modeling</span>.
            </p>
          </div>

          {/* Blinking cursor effect */}
          <div className="flex items-center gap-2 mt-4">
            <span className="text-emerald-500">{">"}</span>
            <span className="w-3 h-6 bg-emerald-500 animate-pulse"></span>
          </div>

        </div>
      </div>
    </section>
  );
}