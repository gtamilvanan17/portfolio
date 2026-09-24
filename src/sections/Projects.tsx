import { Reveal } from '../components/Reveal'
import TiltCard from '../components/TiltCard'
import { projects } from '../data'

const colorMap: Record<string, string> = {
  cyan: 'text-[#00f0ff] border-[#00f0ff]/30',
  purple: 'text-[#a78bfa] border-[#7c3aed]/40',
  lime: 'text-[#22ff88] border-[#22ff88]/30',
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-center font-display text-xs uppercase tracking-[0.3em] text-[#00f0ff]">
            03 // deployments
          </p>
          <h2 className="mb-16 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Key <span className="text-gradient">Projects</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={(i % 3) * 0.1}>
              <TiltCard className="h-full p-6">
                <div
                  className={`mb-4 inline-flex rounded-full border px-3 py-1 font-display text-[10px] uppercase tracking-wider ${colorMap[project.color]}`}
                >
                  {project.stack}
                </div>
                <h3 className="mb-3 font-display text-lg font-bold text-white">{project.title}</h3>
                <p className="text-sm leading-relaxed text-gray-300">{project.description}</p>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
