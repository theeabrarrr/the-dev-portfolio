import { useEffect, useRef } from 'react'
import type { FrameManifest } from '../engine/frames'

export function Stage({ manifest }: { manifest: FrameManifest | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!manifest || !canvasRef.current) return
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return
    const images = new Map<string, HTMLImageElement>()
    const loading = new Set<string>()
    let animation = 0
    let currentIndex = 0
    let currentMode = ''
    let dirty = true
    let targetParallaxX = 0
    let targetParallaxY = 0
    let parallaxX = 0
    let parallaxY = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      dirty = true
    }
    const getShot = (index: number) => manifest.shots.find((shot) => index >= shot.from && index <= shot.to) ?? manifest.shots[0]
    const load = (index: number, mode: string) => {
      const key = `${mode}:${index}`
      if (images.has(key) || loading.has(key)) return
      loading.add(key)
      const image = new Image()
      image.decoding = 'async'
      image.onload = () => {
        loading.delete(key)
        images.set(key, image)
        dirty = true
        if (!animation) animation = requestAnimationFrame(draw)
      }
      image.onerror = () => loading.delete(key)
      image.src = `./frames/${mode}/f${String(index).padStart(3, '0')}.webp`
    }
    const nearestLoaded = (index: number, mode: string) => {
      for (let distance = 0; distance < 24; distance += 1) {
        const candidates = [index - distance, index + distance]
        const found = candidates.find((candidate) => candidate >= 0 && candidate < manifest.count && images.has(`${mode}:${candidate}`))
        if (found !== undefined) return images.get(`${mode}:${found}`)
      }
      return undefined
    }
    const onPointerMove = (event: PointerEvent) => {
      targetParallaxX = (event.clientX / window.innerWidth - 0.5) * 28
      targetParallaxY = (event.clientY / window.innerHeight - 0.5) * 28
      dirty = true
      if (!animation) animation = requestAnimationFrame(draw)
    }
    const onPointerLeave = () => {
      targetParallaxX = 0
      targetParallaxY = 0
      dirty = true
      if (!animation) animation = requestAnimationFrame(draw)
    }
    const draw = () => {
      animation = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const index = Math.min(manifest.count - 1, Math.floor((window.scrollY / Math.max(max, 1)) * manifest.count))
      const mode = window.innerWidth < 820 ? 'sm' : 'lg'
      if (index !== currentIndex || mode !== currentMode) dirty = true
      currentIndex = index
      currentMode = mode
      load(index, mode)
      load(Math.min(manifest.count - 1, index + 1), mode)
      load(Math.max(0, index - 1), mode)
      parallaxX += (targetParallaxX - parallaxX) * 0.06
      parallaxY += (targetParallaxY - parallaxY) * 0.06
      const image = nearestLoaded(index, mode)
      if (dirty && image?.naturalWidth) {
        const shot = getShot(index)
        const scale = Math.min(window.innerHeight / manifest.h, window.innerWidth / manifest.w)
        const [boxX, boxY, boxWidth, boxHeight] = shot.box
        const targetCenter = window.innerWidth < 820 ? window.innerWidth * 0.58 : window.innerWidth * 0.7
        const x = targetCenter - (shot.cx * manifest.w - boxX) * scale + parallaxX
        const y = window.innerHeight - manifest.h * scale + boxY * scale + parallaxY
        context.clearRect(0, 0, window.innerWidth, window.innerHeight)
        context.globalAlpha = 0.74
        context.drawImage(image, x, y, boxWidth * scale, boxHeight * scale)
        context.globalAlpha = 1
      }
      if (Math.abs(targetParallaxX - parallaxX) > 0.1 || Math.abs(targetParallaxY - parallaxY) > 0.1 || dirty || loading.size > 0) {
        animation = requestAnimationFrame(draw)
      } else {
        dirty = false
      }
    }
    const invalidate = () => {
      dirty = true
      if (!animation) animation = requestAnimationFrame(draw)
    }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('scroll', invalidate, { passive: true })
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('pointerleave', onPointerLeave)
    animation = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animation)
      window.removeEventListener('resize', resize)
      window.removeEventListener('scroll', invalidate)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
    }
  }, [manifest])

  return <canvas className="stage" ref={canvasRef} aria-hidden="true" />
}
