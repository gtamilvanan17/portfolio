import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './sections/Hero'
import About from './sections/About'
import Experience from './sections/Experience'
import Projects from './sections/Projects'
import Achievements from './sections/Achievements'
import Contact from './sections/Contact'
import { useReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const [loading, setLoading] = useState(true)
  const reducedMotion = useReducedMotion()

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <main className="relative bg-[#0a0e17]">
        <Hero reducedMotion={reducedMotion} />
        <About />
        <Experience />
        <Projects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
