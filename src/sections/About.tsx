import { motion } from 'framer-motion'
import { Reveal, staggerContainer, staggerItem } from '../components/Reveal'
import CountUp from '../components/CountUp'
import { competencies, stats } from '../data'

const colorMap: Record<string, string> = {
  cyan: 'border-[#00f0ff]/30 text-[#00f0ff] hover:shadow-[0_0_16px_rgba(0,240,255,0.4)]',
  purple: 'border-[#7c3aed]/40 text-[#a78bfa] hover:shadow-[0_0_16px_rgba(124,58,237,0.4)]',
  lime: 'border-[#22ff88]/30 text-[#22ff88] hover:shadow-[0_0_16px_rgba(34,255,136,0.4)]',
}

export default function About() {
  return (
    <section id="about" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-3 text-center font-display text-xs uppercase tracking-[0.3em] text-[#7c3aed]">
            01 // about
          </p>
          <h2 className="mb-12 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Who I <span className="text-gradient">Am</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-300">
            Results-driven DevOps/SRE Engineer with 4 years of experience architecting and owning
            production-grade infrastructure across{' '}
            <span className="text-white">Azure, AWS and GCP</span>. Proven track record of
            building GitOps-driven CI/CD pipelines with{' '}
            <span className="text-[#00f0ff]">ArgoCD</span>, and driving Infrastructure-as-Code
            adoption with <span className="text-[#22ff88]">Terraform</span>.
          </p>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={staggerItem}
              className="glass glass-hover rounded-2xl p-5 text-center"
            >
              <div className="font-display text-3xl font-extrabold text-white sm:text-4xl">
                {stat.prefix}
                <CountUp value={stat.value} />
                {stat.suffix}
              </div>
              <div className="mt-2 text-xs text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {competencies.map((group, i) => (
            <Reveal key={group.category} delay={i * 0.08}>
              <div className="glass glass-hover h-full rounded-2xl p-6">
                <h3 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, j) => (
                    <motion.span
                      key={skill}
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 3 + (j % 3),
                        delay: j * 0.15,
                        ease: 'easeInOut',
                      }}
                      className={`rounded-full border bg-white/5 px-3 py-1 text-xs ${colorMap[group.color]}`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
