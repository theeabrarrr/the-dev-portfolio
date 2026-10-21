import { useEffect, useRef, useState } from 'react'

interface OdometerProps {
  value: number
  suffix?: string
}

function DigitStrip({ digit, animate }: { digit: string; animate: boolean }) {
  const num = parseInt(digit, 10)
  if (isNaN(num)) {
    return <span className="odometer-char">{digit}</span>
  }

  return (
    <span className="odometer-digit-col" aria-hidden="true">
      <span
        className="odometer-digit-rail"
        style={{
          transform: animate ? `translateY(-${num * 10}%)` : 'translateY(0%)',
          transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="odometer-num">
            {i}
          </span>
        ))}
      </span>
    </span>
  )
}

export function Odometer({ value, suffix = '' }: OdometerProps) {
  const [inView, setInView] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const digits = String(value).split('')

  return (
    <strong ref={containerRef} className="odometer" aria-label={`${value}${suffix}`}>
      <span className="odometer-viewport">
        {digits.map((d, index) => (
          <DigitStrip key={index} digit={d} animate={inView} />
        ))}
      </span>
      {suffix && <sup className="odometer-suffix">{suffix}</sup>}
    </strong>
  )
}
