import React, { useEffect } from 'react'
import { motion, useAnimation, easeInOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

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
        className="h-screen w-screen flex relative"
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      >
        <motion.div
          className="w-5/9 h-full relative z-10"
          initial="hidden"
          animate={controls}
          variants={leftVariants}
        >
          <div className="relative h-full w-full">
            <div className="tilted-square-container absolute top-17 left-50 z-20">
              <img src="/image_green.png" alt="Diamond Square" className="tilted-square-img" />
            </div>
            <div className="tilted-rectangle-container absolute top-55 right-100 z-10">
              <img src="/image_green.png" alt="Diamond Rectangle" className="tilted-rectangle-img" />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="w-5/9 h-full relative z-10 flex items-center"
          initial="hidden"
          animate={controls}
          variants={rightVariants}
        >
          <div className="w-full h-full flex flex-col justify-center px-12">
            <div className="mb-12 text-center">
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold mb-0">
                <span className="text-7xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent [text-stroke:1.5px_black]">About Me</span>
              </h1>
            </div>

            <h1 className="text-7xl font-bold mb-4 text-[#222222] leading-tight">
              Cloud, AI & Full Stack<br /><span className="text-gray-600">Software Developer</span>
            </h1>

            <p className="text-xl text-[#4B5563] mb-12 leading-relaxed">
              Crafting modern digital solutions leveraging cloud technologies, AI, and full stack development.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="stat-button">
                <div className="stat-circle"></div>
                <div className="stat-content">
                  <h3 className="text-4xl font-bold text-[#222222] mb-1">25+</h3>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">Projects Completed</p>
                </div>
              </div>
              <div className="stat-button">
                <div className="stat-circle"></div>
                <div className="stat-content">
                  <h3 className="text-4xl font-bold text-[#222222] mb-1">4+</h3>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">Years Experience</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="stat-button">
                <div className="stat-circle"></div>
                <div className="stat-content">
                  <h3 className="text-4xl font-bold text-[#222222] mb-1">10+</h3>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">Clients Served</p>
                </div>
              </div>
              <div className="stat-button">
                <div className="stat-circle"></div>
                <div className="stat-content">
                  <h3 className="text-4xl font-bold text-[#222222] mb-1">7+</h3>
                  <p className="text-gray-500 text-sm uppercase tracking-wider">Technologies Mastered</p>
                </div>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
