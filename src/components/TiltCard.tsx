import { useRef, type ReactNode, type PointerEvent } from 'react'

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

export function TiltCard({ children, className = '', maxTilt = 12 }: TiltCardProps) {
  const cardRef = useRef<HTMLElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)

  const handlePointerMove = (e: PointerEvent<HTMLElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height))

    const tiltX = (0.5 - y) * maxTilt
    const tiltY = (x - 0.5) * maxTilt

    card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`

    if (glareRef.current) {
      glareRef.current.style.opacity = '0.35'
      glareRef.current.style.background = `radial-gradient(circle at ${(x * 100).toFixed(1)}% ${(y * 100).toFixed(1)}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 31, 31, 0.15) 35%, transparent 70%)`
    }
  }

  const handlePointerLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
    if (glareRef.current) {
      glareRef.current.style.opacity = '0'
    }
  }

  return (
    <article
      ref={cardRef}
      className={`tilt-card ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div ref={glareRef} className="tilt-glare" aria-hidden="true" />
      <div className="tilt-content">{children}</div>
    </article>
  )
}
