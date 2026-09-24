import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import type { ReactNode } from 'react'

export default function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 })
  const glowX = useMotionValue(50)
  const glowY = useMotionValue(50)
  const background = useMotionTemplate`radial-gradient(320px circle at ${glowX}% ${glowY}%, rgba(0,240,255,0.12), transparent 70%)`

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    x.set(px)
    y.set(py)
    rotateY.set((px - 0.5) * 14)
    rotateX.set((0.5 - py) * 14)
    glowX.set(px * 100)
    glowY.set(py * 100)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className={`glass glass-hover relative overflow-hidden rounded-2xl ${className}`}
    >
      <motion.div className="pointer-events-none absolute inset-0" style={{ background }} />
      <div className="relative">{children}</div>
    </motion.div>
  )
}
