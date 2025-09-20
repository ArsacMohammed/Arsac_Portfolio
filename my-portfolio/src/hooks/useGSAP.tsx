import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

export function useGSAP<T extends HTMLElement = HTMLDivElement>(
  animationCallback: (element: T) => void,
  dependencies: React.DependencyList = []
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      animationCallback(el)
    }, el)


    return () => ctx.revert()
  }, [animationCallback, ...dependencies])

  return ref
}

// Specialized hook for scroll-triggered animations
export function useScrollAnimation<T extends HTMLElement = HTMLDivElement>(
  animation: (element: T) => gsap.core.Timeline | gsap.core.Tween,
  options: ScrollTrigger.Vars = {}
): RefObject<T | null> {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const element = ref.current
    const tl = animation(element)

    ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      end: 'bottom 20%',
      animation: tl,
      toggleActions: 'play none none reverse',
      ...options
    })

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [animation])

  return ref
}

// Quick fade-in animation hook
export function useFadeIn<T extends HTMLElement = HTMLDivElement>(
  delay: number = 0
): RefObject<T | null> {
  return useScrollAnimation<T>((element) => {
    return gsap.fromTo(element, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, delay, ease: 'power2.out' }
    )
  })
}
