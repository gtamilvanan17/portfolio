import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Reveal } from '../components/Reveal'
import { experience } from '../data'

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.4'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="experience" className="relative px-6 py-28">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-3 text-center font-display text-xs uppercase tracking-[0.3em] text-[#22ff88]">
            02 // career log
          </p>
          <h2 className="mb-16 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Professional <span className="text-gradient">Experience</span>
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative pl-10 sm:pl-14">
          <div className="absolute left-[7px] top-0 h-full w-[2px] bg-white/10 sm:left-[11px]" />
          <motion.div
            className="absolute left-[7px] top-0 w-[2px] bg-gradient-to-b from-[#00f0ff] via-[#7c3aed] to-[#22ff88] sm:left-[11px]"
            style={{ height: lineHeight }}
          />

          <div className="flex flex-col gap-16">
            {experience.map((job, i) => (
              <Reveal key={job.company} delay={i * 0.1}>
                <div className="relative">
                  <span className="absolute -left-10 top-1 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[#00f0ff] bg-[#0a0e17] shadow-[0_0_12px_rgba(0,240,255,0.7)] sm:-left-14" />
                  <div className="glass glass-hover rounded-2xl p-6 sm:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl font-bold text-white">{job.role}</h3>
                      <span className="font-display text-xs uppercase tracking-wider text-[#22ff88]">
                        {job.period}
                      </span>
                    </div>
                    <p className="mb-4 font-display text-sm text-[#00f0ff]">{job.company}</p>
                    <ul className="space-y-2.5">
                      {job.points.map((point, j) => (
                        <li key={j} className="flex gap-3 text-sm leading-relaxed text-gray-300">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#7c3aed]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
