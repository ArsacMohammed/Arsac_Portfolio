import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { gsap } from 'gsap'
import { useGSAP } from '../../../hooks'
import { useLenis } from '../../../components/common/'
import { scrollToElement } from '../../../components/common'

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
      {/* Top Navigation - Matching the design */}
      <nav className="hero-nav absolute top-0 left-0 right-0 z-10">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-6">
          <div className="flex items-center justify-between">
            {/* Logo placeholder */}
            <div className="text-sm font-medium text-gray-50">
              +1
            </div>
            
            
            {/* Menu icon */}
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
      <div className="h-screen flex items-center background-color">
        <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16">
          <div className="grid grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center h-full">
            
            {/* Left Column - Text Content */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-4 relative">
              
              {/* Main Title */}
              <div className="hero-main-text mb-6 lg:mb-8">
                <h1 className="absolute bottom-10 left-4  text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[16rem]  theme-text lab">
                  lab.
                </h1>
                
                
                <span className="absolute top-90 left-20 text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[4rem] font-black leading-none theme-text rotate-90 numeric-style">
                  001
                </span>
                
                {/* Small decorative elements */}
                <div className="absolute -right-4 lg:-right-8 top-8 w-2 h-8 accent"></div>
                <div className="absolute -left-2 lg:-left-4 bottom-8 w-4 h-4 accent rounded-sm"></div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="col-span-12 lg:col-span-6 xl:col-span-8 relative mt-8 lg:mt-32 xl:mt-32">
              <div className="hero-image-container relative h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[100vh] max-h-[900px] ">
                
                {/* Main Image Container */}
                <div className="relative w-full h-full">
                  
                  {/* Background Shape */}
                  <div className="absolute inset-0 surface"></div>
                  
                  {/* Orange Accent Block - Matching the design */}
                  <div className="absolute bottom-15 left-0 right-0 h-100  #FF512F"></div>
                  
                  {/* Image Placeholder - Replace with your actual image */}
                  <div className="absolute inset-0 flex items-center justify-center">
                     <img
                        src="public/arsac_latest_2.png"
                        alt="Person in orange jacket"
                        className="w-auto h-full object-cover mix-blend-multiply"
                        style={{ zIndex: 1 }}
                      />
                  </div>
                  
                  {/* Geometric Overlay Elements */}
                  <div className="absolute top-8 right-8">
                    <div className="text-xs font-mono text-gray-50 transform rotate-90 origin-bottom-left">
                      DESIGNED OF BT™
                    </div>
                  </div>
                  
                  {/* Corner geometric elements */}
                  <div className="absolute top-4 left-4 w-6 h-6 border-2 border-accent"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-gray-900"></div>
                </div>
                
                {/* Information Cards/Text */}
                <div className="hidden lg:block absolute -left-8 xl:-left-12 top-1/4 text-xs text-gray-400 max-w-32 leading-relaxed">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Sed do eiusmod tempor incididunt ut labore.
                  </p>
                </div>
                
                <div className="hidden lg:block absolute -right-12 xl:-right-16 bottom-1/4 text-xs text-gray-400 max-w-32 leading-relaxed">
                  <p>
                    Ut enim ad minim veniam, quis nostrud exercitation 
                    ullamco laboris nisi ut aliquip.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-8 text-gray-400 cursor-pointer"
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
