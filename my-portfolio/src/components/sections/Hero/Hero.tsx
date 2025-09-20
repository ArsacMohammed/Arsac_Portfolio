import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, ExternalLink, Play } from 'lucide-react'
import { Button } from '../../../components/ui'
import { useGSAP } from '../../../hooks'
import { useLenis } from '../../../components/common'
import { SITE_CONFIG } from '../../../lib/constants'
import { scrollToElement } from '../../../components/common'
import { gsap } from 'gsap'

const Hero: React.FC = () => {
  const lenis = useLenis()
  
  // GSAP animations
  const heroRef = useGSAP<HTMLElement>((element) => {
    const tl = gsap.timeline()
    
    // Animate main elements in sequence
    tl.fromTo('.hero-number', 
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo('.hero-title', 
      { opacity: 0, y: 80 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-subtitle', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )
    .fromTo('.hero-description', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.3'
    )
    .fromTo('.hero-buttons', 
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)' },
      '-=0.2'
    )
    .fromTo('.hero-image-container', 
      { opacity: 0, scale: 0.8, x: 50 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=1.0'
    )
    .fromTo('.hero-geometric', 
      { opacity: 0, rotate: -45 },
      { opacity: 1, rotate: 0, duration: 1.5, ease: 'power2.out' },
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

  const scrollToAbout = () => {
    if (lenis) {
      lenis.scrollTo('#about', { offset: -100 })
    } else {
      scrollToElement('#about')
    }
  }

  return (
    <section 
      ref={heroRef}
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden bg-gray-50 dark:bg-gray-900"
    >
      {/* Geometric Background Pattern */}
      <div className="absolute inset-0 geometric-pattern"></div>
      
      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-geometric absolute top-20 left-10 w-4 h-4 bg-primary-500 opacity-60 rounded-sm rotate-45"></div>
        <div className="hero-geometric absolute top-40 right-20 w-3 h-3 bg-accent-500 opacity-40 rounded-full"></div>
        <div className="hero-geometric absolute bottom-32 left-1/4 w-2 h-8 bg-primary-600 opacity-30"></div>
        <div className="hero-geometric absolute top-1/3 left-1/3 w-6 h-6 border-2 border-primary-500 opacity-50 rotate-12"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column - Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Large Number - Like your design */}
            <div className="hero-number">
              <span className="text-8xl md:text-9xl lg:text-[12rem] font-black text-gray-200 dark:text-gray-800 leading-none select-none">
                01
              </span>
            </div>
            
            {/* Main Content */}
            <div className="space-y-6 -mt-16 md:-mt-20 lg:-mt-24">
              
              {/* Main Title */}
              <div className="hero-title">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight">
                  <span className="block text-gray-900 dark:text-white">
                    Creative
                  </span>
                  <span className="block text-gradient-primary">
                    Developer
                  </span>
                </h1>
              </div>
              
              {/* Subtitle */}
              <div className="hero-subtitle">
                <p className="text-xl md:text-2xl font-medium text-gray-600 dark:text-gray-400">
                  {SITE_CONFIG.title}
                </p>
              </div>
              
              {/* Description */}
              <div className="hero-description">
                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl leading-relaxed">
                  {SITE_CONFIG.description}. I specialize in creating 
                  <span className="text-primary-600 dark:text-primary-400 font-medium"> modern web experiences </span>
                  that blend creativity with cutting-edge technology.
                </p>
              </div>
              
              {/* CTA Buttons */}
              <div className="hero-buttons flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  onClick={scrollToProjects}
                  size="lg"
                  className="bg-gradient-primary text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  View My Work
                </Button>
                
                <Button
                  onClick={scrollToAbout}
                  variant="outline"
                  size="lg"
                  className="border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 px-8 py-4 text-lg font-semibold group"
                >
                  <Play className="w-5 h-5 mr-2 group-hover:text-primary-500 transition-colors" />
                  About Me
                </Button>
                
                <Button
                  variant="ghost"
                  size="lg"
                  className="hover:bg-primary-50 dark:hover:bg-primary-950 px-8 py-4 text-lg font-semibold group"
                >
                  <Download className="w-5 h-5 mr-2 group-hover:text-primary-500 transition-colors" />
                  Resume
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image/Visual */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="hero-image-container relative">
              
              {/* Main Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem]">
                
                {/* Background Shape */}
                <div className="absolute inset-0 bg-gradient-primary rounded-2xl transform rotate-6 opacity-20"></div>
                <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                  
                  {/* Placeholder for your image */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 bg-primary-500 rounded-full mx-auto opacity-30"></div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium">
                        Your Profile Image
                      </p>
                    </div>
                  </div>
                  
                  {/* Orange accent bar - like your design */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-primary"></div>
                </div>
                
                {/* Floating elements around image */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary-500 rounded-lg shadow-lg"></div>
                <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-accent-500 rounded-full shadow-lg"></div>
                <div className="absolute top-1/2 -left-8 w-4 h-12 bg-primary-600 rounded-sm shadow-md"></div>
              </div>
              
              {/* Stats/Info Cards - like your design */}
              <motion.div
                className="absolute -bottom-6 -left-6 glass-morphism rounded-xl p-4 shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">2+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Years Exp</div>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute -top-6 -right-6 glass-morphism rounded-xl p-4 shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Projects</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-primary-500 transition-colors cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => scrollToElement('#about')}
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm font-medium">Scroll Down</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
