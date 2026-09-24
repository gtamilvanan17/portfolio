import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleClick = (id: string) => {
    setMenuOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 z-[80] w-full transition-all duration-300 ${
        scrolled ? 'glass py-3 shadow-[0_0_30px_rgba(0,240,255,0.08)]' : 'py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <button
          onClick={() => handleClick('home')}
          className="font-display text-sm font-bold tracking-wider text-white"
        >
          <span className="text-[#22ff88]">$</span> tamilvanan<span className="text-[#00f0ff]">.gowran</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className={`relative rounded-full px-4 py-2 font-display text-xs uppercase tracking-wider transition-colors ${
                active === link.id ? 'text-[#00f0ff]' : 'text-gray-400 hover:text-white'
              }`}
            >
              {active === link.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-full bg-white/5 ring-1 ring-[#00f0ff]/40"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative">{link.label}</span>
            </button>
          ))}
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-white transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass mx-4 mt-3 flex flex-col gap-1 rounded-2xl p-3 md:hidden"
        >
          {LINKS.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className={`rounded-lg px-4 py-3 text-left font-display text-xs uppercase tracking-wider ${
                active === link.id ? 'bg-white/5 text-[#00f0ff]' : 'text-gray-400'
              }`}
            >
              {link.label}
            </button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  )
}
