import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { contact } from '../data'

export default function Contact() {
  const [toast, setToast] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setToast(true)
      setTimeout(() => setToast(false), 3200)
      ;(e.target as HTMLFormElement).reset()
    }, 900)
  }

  return (
    <section id="contact" className="relative px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="mb-3 text-center font-display text-xs uppercase tracking-[0.3em] text-[#22ff88]">
            05 // connect
          </p>
          <h2 className="mb-16 text-center font-display text-3xl font-bold text-white sm:text-4xl">
            Let's <span className="text-gradient">Build Something</span>
          </h2>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2">
          <Reveal>
            <div className="glass glass-hover flex h-full flex-col justify-between rounded-2xl p-8">
              <div>
                <h3 className="mb-6 font-display text-lg font-bold text-white">Reach me directly</h3>
                <div className="space-y-5 text-sm">
                  <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-gray-300 hover:text-[#00f0ff]">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5">📞</span>
                    {contact.phone}
                  </a>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-gray-300 hover:text-[#00f0ff]">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5">✉️</span>
                    {contact.email}
                  </a>
                  <a href={contact.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#00f0ff]">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5">in</span>
                    {contact.linkedin}
                  </a>
                  <a href={contact.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-[#00f0ff]">
                    <span className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/5">gh</span>
                    {contact.github}
                  </a>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {[
                  { label: 'GitHub', url: contact.githubUrl, icon: 'gh' },
                  { label: 'LinkedIn', url: contact.linkedinUrl, icon: 'in' },
                  { label: 'Email', url: `mailto:${contact.email}`, icon: '@' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target={s.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 font-display text-xs text-gray-300 transition-all hover:border-[#00f0ff]/60 hover:text-[#00f0ff] hover:shadow-[0_0_16px_rgba(0,240,255,0.4)]"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="glass glass-hover flex h-full flex-col gap-4 rounded-2xl p-8">
              <div>
                <label className="mb-1.5 block font-display text-xs uppercase tracking-wider text-gray-400">Name</label>
                <input
                  required
                  type="text"
                  placeholder="Jane Doe"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#00f0ff]/60 focus:outline-none"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-display text-xs uppercase tracking-wider text-gray-400">Email</label>
                <input
                  required
                  type="email"
                  placeholder="jane@company.com"
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#00f0ff]/60 focus:outline-none"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1.5 block font-display text-xs uppercase tracking-wider text-gray-400">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Let's talk infrastructure..."
                  className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:border-[#00f0ff]/60 focus:outline-none"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="group relative mt-2 overflow-hidden rounded-full bg-gradient-to-r from-[#00f0ff] via-[#7c3aed] to-[#22ff88] px-6 py-3 font-display text-sm font-semibold text-[#0a0e17] transition-transform hover:scale-[1.02] disabled:opacity-70"
              >
                {sending ? 'Transmitting...' : 'Send Message ↗'}
              </button>
            </form>
          </Reveal>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 40, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 40, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-[95] glass flex items-center gap-3 rounded-full border border-[#22ff88]/40 px-6 py-3 shadow-[0_0_30px_rgba(34,255,136,0.25)]"
          >
            <span className="text-[#22ff88]">✔</span>
            <span className="font-display text-sm text-white">Message sent — I'll get back to you soon!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
