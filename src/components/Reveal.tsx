import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]

export function Reveal({
  children,
  delay = 0,
  className = '',
  y = 32,
}: {
  children: ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  )
}

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
}
