import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFinePointer || reduced) return
    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0

    const handleMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    let raf: number
    const animate = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      raf = requestAnimationFrame(animate)
    }

    const handleDown = () => ringRef.current?.classList.add('scale-75')
    const handleUp = () => ringRef.current?.classList.remove('scale-75')

    window.addEventListener('pointermove', handleMove)
    window.addEventListener('pointerdown', handleDown)
    window.addEventListener('pointerup', handleUp)
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('pointerdown', handleDown)
      window.removeEventListener('pointerup', handleUp)
      cancelAnimationFrame(raf)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f0ff]"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[200] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#00f0ff]/50 transition-transform duration-150"
      />
    </>
  )
}
