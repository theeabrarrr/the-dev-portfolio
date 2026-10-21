import { createRoot } from 'react-dom/client'
import { useEffect, useState } from 'react'
import '@fontsource/anton'
import '@fontsource-variable/inter-tight'
import '@fontsource/jetbrains-mono'
import './styles.css'
import { portfolio } from './data'
import type { FrameManifest } from './engine/frames'
import { setupScrollEngine } from './engine/director'
import { Stage } from './components/Stage'
import { Chrome } from './components/Chrome'
import { Hero } from './scenes/Hero'
import { About } from './scenes/About'
import { Work } from './scenes/Work'
import { Journey } from './scenes/Journey'
import { Skills } from './scenes/Skills'
import { Awards } from './scenes/Awards'
import { Contact } from './scenes/Contact'

function App() {
  const [manifest, setManifest] = useState<FrameManifest | null>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    fetch('./frames/manifest.json')
      .then((response) => response.json())
      .then(setManifest)
      .catch(() => undefined)
    return setupScrollEngine(setProgress)
  }, [])

  return (
    <>
      <div className="layer-back" aria-hidden="true">
        <div className="hero-name-back">{portfolio.firstName}</div>
      </div>
      <Stage manifest={manifest} />
      <Chrome progress={progress} />
      <main>
        <Hero />
        <About />
        <Work />
        <Journey />
        <Skills />
        <Awards />
        <Contact />
      </main>
    </>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
