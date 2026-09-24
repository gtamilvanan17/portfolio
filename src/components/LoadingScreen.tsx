import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const LINES = [
  '$ initializing infrastructure...',
  '$ provisioning cluster...',
  '$ syncing gitops state...',
  '$ deploying portfolio...',
]

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true)
  const [lineIndex, setLineIndex] = useState(0)

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex((i) => Math.min(i + 1, LINES.length))
    }, 400)

    const doneTimer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDone, 500)
    }, 1800)

    return () => {
      clearInterval(lineTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0e17]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-[min(90vw,480px)] font-display text-sm text-[#22ff88]">
            {LINES.slice(0, lineIndex).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-2"
              >
                {line}
                {i === lineIndex - 1 && <span className="animate-pulse">_</span>}
              </motion.div>
            ))}
            <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-[#00f0ff] via-[#7c3aed] to-[#22ff88]"
                initial={{ width: '0%' }}
                animate={{ width: `${(lineIndex / LINES.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
