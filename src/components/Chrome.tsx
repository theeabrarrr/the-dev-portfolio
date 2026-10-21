import { useEffect, useRef, useState } from 'react'

interface ChromeProps {
  progress: number
}

export function Chrome({ progress }: ChromeProps) {
  const [cursorActive, setCursorActive] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Only activate custom cursor on fine pointer devices (desktop)
    if (window.matchMedia('(pointer: fine)').matches) {
      setCursorActive(true)
    }

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let animId = 0

    const onPointerMove = (e: PointerEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const render = () => {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      animId = requestAnimationFrame(render)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    animId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      {cursorActive && (
        <div className="custom-cursor-container" aria-hidden="true">
          <div ref={dotRef} className="cursor-dot" />
          <div ref={ringRef} className="cursor-ring" />
        </div>
      )}

      <header className="hud">
        <a className="logo" href="#hero">
          ABRAR<span>®</span>
        </a>
        <nav className="pill-nav">
          {['about', 'work', 'journey', 'skills', 'awards', 'contact'].map((item) => (
            <a key={item} href={`#${item}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="progress">
          {String(progress).padStart(2, '0')}%
          <i style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
      </header>
    </>
  )
}
