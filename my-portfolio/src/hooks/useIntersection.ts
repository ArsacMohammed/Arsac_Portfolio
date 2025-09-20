import { useEffect, useRef, useState } from 'react'

interface UseIntersectionOptions extends IntersectionObserverInit {
  freezeOnceVisible?: boolean
}

export function useIntersection<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionOptions = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)
  const ref = useRef<T | null>(null)

  const { freezeOnceVisible = false, ...observerOptions } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...observerOptions
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [hasIntersected, observerOptions])

  return {
    ref,
    isIntersecting: freezeOnceVisible ? hasIntersected : isIntersecting,
    hasIntersected
  }
}
