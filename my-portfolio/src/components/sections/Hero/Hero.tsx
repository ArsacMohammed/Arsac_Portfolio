import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { useGSAP } from '../../../hooks'
import { useLenis } from '../../../components/common/'
import { scrollToElement } from '../../../components/common'
import MetaBalls from './Metaballs'   // Import MetaBalls

const Hero: React.FC = () => {
  const lenis = useLenis()

  // GSAP animations matching the design
  const heroRef = useGSAP<HTMLElement>((element) => {
    const tl = gsap.timeline()

    // Animate elements in sequence
    tl.fromTo('.hero-main-text',
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
    )
      .fromTo('.hero-number',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo('.hero-image-container',
        { opacity: 0, scale: 0.9, x: 40 },
        { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo('.hero-nav',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=1.2'
      )
  })

  const scrollToProjects = () => {
    if (lenis) {
      lenis.scrollTo('#projects', { offset: -100 })
    } else {
      scrollToElement('#projects')
    }
  }

  return (
    <section
      ref={heroRef}
      id="home"
      className="min-h-screen relative overflow-hidden"
    >
      {/* Top Navigation */}
      <nav className="hero-nav absolute top-0 left-0 right-0 z-30">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-gray-50">+1</div>
            <div className="text-sm font-medium text-gray-50">
              <div className="flex flex-col space-y-1">
                <div className="w-4 h-0.5 bg-gray-50"></div>
                <div className="w-4 h-0.5 bg-gray-50"></div>
                <div className="w-4 h-0.5 bg-gray-50"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div
        className="h-screen flex items-center relative"
        style={{ backgroundColor: 'var(--color-background)' }}
      >
        {/* Black Ribbon Bar - full width, lowest layer */}
        <div
          className="absolute bottom-9 left-0 right-0 transform -translate-y-1/2 bg-black z-0"
          style={{ height: '152px' }}
        ></div>

        {/* MetaBalls above both columns but below image */}
        <div
          className="absolute top-1/2 left-8/9 transform -translate-x-1/2 -translate-y-1/2 z-5 pointer-events-none"
          style={{ width: '1500px', height: '600px' }}
        >
          <MetaBalls
            color="#000000"
            cursorBallColor="#000000"
            cursorBallSize={1}
            ballCount={10}
            animationSize={15}
            enableMouseInteraction={true}
            enableTransparency={true}
            hoverSmoothness={0.05}
            clumpFactor={1}
            speed={1.0}
          />
        </div>

        {/* Content container */}
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative z-10">
          <div className="grid grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center h-full">

            {/* Left Column - Text Content */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-6 relative z-10">
              <div className="hero-main-text mb-6 lg:mb-8">
                <h1 className="absolute bottom-10 left-4 text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[16rem] theme-text lab">
                  lab.
                </h1>
              </div>
            </div>

            {/* Right Column - Image */}
            <div
              className="col-span-12 lg:col-span-6 xl:col-span-6 relative mt-8 lg:mt-32 xl:mt-32 z-10"
              style={{ backgroundColor: 'var(--color-background)' }}
            >

              {/* Image - highest layer, above everything */}
              <div className="hero-image-container absolute inset-0 flex items-center justify-end pr-25 z-20 ">
                <img
                  src="public/arsac_latest_2.png"
                  alt="Person in hero section"
                // className="w-auto h-full object-cover mix-blend-multiply"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-8 text-gray-400 cursor-pointer z-20"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => scrollToElement('#about')}
      >
        <div className="flex items-center space-x-2 text-sm">
          <div className="w-px h-8 bg-gray-400"></div>
          <span className="transform -rotate-90 origin-center whitespace-nowrap">SCROLL DOWN</span>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
