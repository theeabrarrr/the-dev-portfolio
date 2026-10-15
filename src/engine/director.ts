import Lenis from 'lenis'
import gsap from 'gsap'

export const SCENES = [
  { id: 'hero', from: 0, to: 1, label: 'Hello' },
  { id: 'about', from: 0, to: 1, label: 'About' },
  { id: 'work', from: 0, to: 1, label: 'Work' },
  { id: 'journey', from: 0, to: 1, label: 'Journey' },
  { id: 'skills', from: 0, to: 1, label: 'Toolkit' },
  { id: 'awards', from: 0, to: 1, label: 'Awards' },
  { id: 'contact', from: 1, to: 0, label: 'Contact' },
] as const

export const lenis = new Lenis({
  lerp: 0.075,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.4,
})

gsap.ticker.lagSmoothing(100, 16)
let lenisRunning = false

export function setupScrollEngine(onProgress?: (progress: number) => void) {
  if (!lenisRunning) {
    lenisRunning = true
    gsap.ticker.add((time) => lenis.raf(time * 1000))
  }
  history.scrollRestoration = 'manual'
  const sections = SCENES.map(({ id }) => document.getElementById(id)).filter(
    (section): section is HTMLElement => section !== null,
  )
  const update = () => {
    const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
    onProgress?.(Math.round((window.scrollY / max) * 100))
  }
  const observer = new ResizeObserver(update)
  sections.forEach((section) => observer.observe(section))
  window.addEventListener('scroll', update, { passive: true })
  window.addEventListener('resize', update)
  update()
  return () => {
    observer.disconnect()
    window.removeEventListener('scroll', update)
    window.removeEventListener('resize', update)
  }
}
