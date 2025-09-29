import React, { useEffect, useState, useMemo } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AboutImages } from './AboutImages'
import { AboutContent } from './AboutContent'

const About: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const leftVariants = useMemo(() => ({
    hidden: isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.8, ease: easeInOut, delay: 0.2 }
    }
  }), [isMobile])

  const rightVariants = useMemo(() => ({
    hidden: isMobile ? { opacity: 0, y: 100 } : { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 1.8, ease: easeInOut, delay: 0.2 }
    }
  }), [isMobile])

  return (
    <section id="about" className="min-h-screen relative overflow-hidden" ref={ref}>
      <div
        className="min-h-screen w-screen flex flex-col lg:flex-row relative"
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 20%, #f8f8f8 100%, #e0e0e0 70%)' }}
      >
        {/* Desktop images */}
        <motion.div
          key={`left-${isMobile}`}
          className="hidden md:block w-full lg:w-1/2 h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-full relative z-token-docked"
          initial="hidden"
          animate={controls}
          variants={leftVariants}
        >
          <AboutImages isMobile={false} />
        </motion.div>

        <motion.div
          key={`right-${isMobile}`}
          className="w-full lg:w-1/2 h-auto lg:h-full relative z-token-docked flex items-center py-8 lg:py-0 pt-2 md:pt-24 xl:pt-27"
          initial="hidden"
          animate={controls}
          variants={rightVariants}
        >
          <AboutContent />
        </motion.div>
      </div>
    </section>
  )
}

export default About