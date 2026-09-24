import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left bg-gradient-to-r from-[#00f0ff] via-[#7c3aed] to-[#22ff88]"
      style={{ scaleX }}
    />
  )
}
