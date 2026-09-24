import { motion } from 'framer-motion'
import { Reveal, staggerContainer, staggerItem } from '../components/Reveal'
import Badge from '../components/Badge'
import { achievementBadges, achievements, certificationBadges, education } from '../data'

export default function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-3 text-center font-display text-xs uppercase tracking-[0.3em] text-[#7c3aed]">
            04 // credentials
          </p>
          <h2 className="mb-16 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Achievements &amp; <span className="text-gradient">Certifications</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2">
          {achievements.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="group relative overflow-hidden rounded-2xl glass glass-hover p-6">
                <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <div className="relative flex items-start gap-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h3 className="font-display text-base font-bold text-white">{item.title}</h3>
                    {item.subtitle && (
                      <p className="mt-1 text-xs uppercase tracking-wider text-[#00f0ff]">
                        {item.subtitle}
                      </p>
                    )}
                    {item.description && (
                      <p className="mt-2 text-sm text-gray-300">{item.description}</p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <h3 className="mb-6 mt-16 text-center font-display text-xs uppercase tracking-[0.3em] text-[#00f0ff]">
            Achievement Badges
          </h3>
        </Reveal>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-8"
        >
          {achievementBadges.map((badge) => (
            <motion.div key={badge.label} variants={staggerItem}>
              <Badge icon={badge.icon} label={badge.label} subtitle={badge.subtitle} />
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.2}>
          <h3 className="mb-6 mt-16 text-center font-display text-xs uppercase tracking-[0.3em] text-[#22ff88]">
            Certification Badges
          </h3>
        </Reveal>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-wrap justify-center gap-x-6 gap-y-8"
        >
          {certificationBadges.map((badge) => (
            <motion.div key={badge.label} variants={staggerItem}>
              <Badge icon={badge.icon} label={badge.label} />
            </motion.div>
          ))}
        </motion.div>

        <Reveal delay={0.3}>
          <div className="mt-16 glass glass-hover rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <span className="text-3xl">🎓</span>
              <div>
                <h3 className="font-display text-base font-bold text-white">{education.degree}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-[#22ff88]">
                  {education.school}
                </p>
                <p className="mt-2 text-sm text-gray-400">{education.period}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
