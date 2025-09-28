import React, { useEffect, useRef, createContext, useContext, useState } from 'react'
import Lenis from 'lenis'

interface SmoothScrollContextType {
  lenis: Lenis | null
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({ lenis: null })

interface SmoothScrollProps {
  children: React.ReactNode
  options?: {
    duration?: number
    easing?: (t: number) => number
    smooth?: boolean
    smoothTouch?: boolean
  }
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ 
  children, 
  options = {} 
}) => {
  const lenisRef = useRef<Lenis | null>(null)
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis with custom options
    lenisRef.current = new Lenis({
      duration: 1.5,
      easing: (t) => 1 - Math.pow(1 - t, 3), // easeOutCubic
      smooth: true,
      smoothTouch: false, // Disable on mobile for better performance
      ...options
    })

    // Update state to trigger context re-render
    setLenisInstance(lenisRef.current)

    // Animation loop
    function animate(time: number) {
      lenisRef.current?.raf(time)
      requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)

    // Handle wheel events for better UX
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey) {
        e.preventDefault()
      }
    }
    
    window.addEventListener('wheel', handleWheel, { passive: false })

    // Cleanup
    return () => {
      lenisRef.current?.destroy()
      setLenisInstance(null)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [])

  // Provide lenis instance to child components using state instead of ref
  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisInstance }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

// Custom hook to use Lenis instance
export const useLenis = () => {
  const context = useContext(SmoothScrollContext)
  return context.lenis
}

// Utility function for smooth scrolling to element
export const scrollToElement = (selector: string) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

export default SmoothScroll




// SmoothScroll Component:
// Context provider: shares Lenis instance across components
// Customizable: accepts easing, duration, and other options
// Performance optimized: disabled on mobile touch
// Utility functions: useLenis() hook and scrollToElement() helper
// Clean cleanup: prevents memory leaks