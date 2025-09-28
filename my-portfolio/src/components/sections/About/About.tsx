import React, { useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { AboutImages } from './AboutImages'
import { AboutContent } from './AboutContent'

const About: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  const leftVariants = {
    hidden: { opacity: 0, x: -200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.8, ease: easeInOut, delay: 0.2 }
    }
  }

  const rightVariants = {
    hidden: { opacity: 0, x: 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1.8, ease: easeInOut, delay: 0.2 }
    }
  }

  return (
    <section id="about" className="min-h-screen relative overflow-hidden" ref={ref}>
      <div
        className="min-h-screen w-screen flex flex-col lg:flex-row relative"
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      >
        <motion.div
          className="w-full lg:w-1/2 h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-full relative z-token-docked"
          initial="hidden"
          animate={controls}
          variants={leftVariants}
        >
          <AboutImages />
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 h-auto lg:h-full relative z-token-docked flex items-center py-8 lg:py-0"
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
