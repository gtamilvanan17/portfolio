import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HeroScene from '../components/HeroScene'
import { roles } from '../data'

function useTypewriter(words: string[]) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    const speed = deleting ? 35 : 65
    const pause = 1400

    const timer = setTimeout(() => {
      if (!deleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1))
        } else {
          setTimeout(() => setDeleting(true), pause)
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1))
        } else {
          setDeleting(false)
          setWordIndex((i) => i + 1)
        }
      }
    }, speed)

    return () => clearTimeout(timer)
  }, [text, deleting, wordIndex, words])

  return text
}

export default function Hero({ reducedMotion }: { reducedMotion: boolean }) {
  const typed = useTypewriter(roles)

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden grid-bg"
    >
      <HeroScene reducedMotion={reducedMotion} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e17]/40 to-[#0a0e17]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-4 font-display text-xs uppercase tracking-[0.3em] text-[#22ff88]"
        >
          // system status: online
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.7 }}
          className="font-display text-4xl font-extrabold text-white sm:text-6xl md:text-7xl"
        >
          Tamilvanan <span className="text-gradient">Gowran</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-6 flex h-8 items-center justify-center font-display text-lg text-[#00f0ff] sm:text-2xl"
        >
          {typed}
          <span className="ml-1 inline-block h-6 w-[2px] animate-pulse bg-[#00f0ff]" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mx-auto mt-6 max-w-2xl text-balance text-base text-gray-300 sm:text-lg"
        >
          Architecting production-grade infrastructure across{' '}
          <span className="text-white">Azure, AWS &amp; GCP</span> — 40% faster deployments,
          99.9%+ stability.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-[#00f0ff] to-[#7c3aed] px-8 py-3 font-display text-sm font-semibold text-[#0a0e17] transition-transform hover:scale-105"
          >
            View Projects
          </button>
          <a
            href="/resume.pdf"
            download
            className="glass glass-hover rounded-full px-8 py-3 font-display text-sm font-semibold text-white"
          >
            Download Resume
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex h-10 w-6 justify-center rounded-full border border-white/20 pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-1.5 w-1.5 rounded-full bg-[#00f0ff]"
          />
        </div>
      </motion.div>
    </section>
  )
}
