import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink } from 'lucide-react'
import { Button } from '../../ui'
import { easeInOut } from 'framer-motion'

interface Slide {
  image: string
  title: string
  subtitle: string
  description: string
  link: string
}

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeInOut,
      staggerChildren: 0.15
    }
  }
};
const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80',
    title: 'Salomon',
    subtitle: 'Time to play',
    description: 'Trail running shoes built for adventure.',
    link: 'https://www.salomon.com/'
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80',
    title: 'Smart Travel',
    subtitle: '',
    description: 'Travel smarter, easier, greener.',
    link: 'https://example.com'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?fit=crop&w=600&q=80',
    title: 'Vans',
    subtitle: '"Off The Wall"',
    description: 'Iconic street sneakers for everyone.',
    link: 'https://www.vans.com/'
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=600&q=80',
    title: 'North Face',
    subtitle: '',
    description: 'Gear for the toughest outdoors.',
    link: 'https://www.thenorthface.com/'
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80',
    title: 'Sample',
    subtitle: '',
    description: 'Sample project.',
    link: 'https://www.example.com/'
  }
]
const containerVariants_ = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeInOut,
      staggerChildren: 0.15
    }
  }
};
function getSliderWindow(slidesArr: Slide[], selectedIndex: number): Slide[] {
  const total = slidesArr.length
  return [
    slidesArr[(selectedIndex - 1 + total) % total],
    slidesArr[selectedIndex],
    slidesArr[(selectedIndex + 1) % total],
    slidesArr[(selectedIndex + 2) % total]
  ]
}

const Skills: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })

  const displayedSlides = getSliderWindow(slides, activeIndex)

  // Animation variants for the bottom frame
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        staggerChildren: 0.15
      }
    }
  }

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  // Autoplay effect with pause on hover
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [paused])

  const baseWidth = 320
  const selectedWidth = baseWidth * 1.5
  const containerWidth = baseWidth * 2 + selectedWidth * 2

  return (
    <section
      id="Skills"
      className="w-full min-h-screen pt-50 relative"
      ref={ref}
      style={{
        background:
          'linear-gradient(to bottom, #e0e0e0 25%, #f8f8f8 60%, #ffffff 100%, #ffffff 100%)',
        height: '100vh',
        overflowX: 'hidden'
      }}
    >
      <div className="w-full flex items-center justify-between px-4 py-2 absolute top-0 left-0 right-0 z-20 bg-transparent">
        {/* Left: Heading */}
        <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight mt-0 mb-0 ml-180">
          <span className="text-7xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-[#560F13] via-[#560F13] to-black bg-clip-text text-transparent [text-stroke:1.5px_black]">Skills</span>
        </h1>

        {/* Right: Top-right '7' Frame with gradient */}
        <div className="relative mr-4" style={{ width: 200, height: 200 }}>
          <div className="absolute top-0 right-0 h-20 w-100 bg-gradient-to-r bg-black rounded" />
          {/* <div className="absolute top-0 right-0 h-10 w-100 bg-gradient-to-r from-[#560F13] via-[#560F13] to-black rounded" /> */}

          <div className="absolute top-0 right-0 w-20 h-100 bg-gradient-to-t bg-black to-black rounded" />
        </div>
      </div>

      {/* Carousel Container */}
      <LayoutGroup>
        <div
          className="relative ml-55"
          style={{ width: containerWidth, height: 400, marginTop: '8rem' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            {displayedSlides.map((slide, i) => {
              let left = 0
              if (i === 0) left = 0
              else if (i === 1) left = baseWidth
              else if (i === 2) left = baseWidth + selectedWidth
              else if (i === 3) left = baseWidth + selectedWidth + baseWidth

              return (
                <motion.div
                  key={slide.title + i}
                  initial={{ opacity: 0, x: 50, scale: i === 1 ? 1.07 : 1, y: i === 1 ? -30 : 0 }}
                  animate={{
                    opacity: 1,
                    x: left,
                    scale: i === 1 ? 1.07 : 1,
                    y: i === 1 ? -30 : 0,
                    rotateY: i === 1 ? 0 : i === 0 ? 8 : -8,
                    boxShadow: i === 1
                      ? "0 30px 40px rgba(0,0,0,0.35)"
                      : "0 10px 15px rgba(0,0,0,0.15)",
                  }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.5,
                    opacity: { duration: 0.4 },
                  }}
                  whileHover={{
                    scale: i === 1 ? 1.15 : 1.07,
                    rotateY: 0,
                    boxShadow: "0 40px 60px rgba(0,0,0,0.45)",
                    transition: { duration: 0.3 },
                    cursor: 'grab',
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.15}
                  onDragEnd={(event, info) => {
                    if (info.offset.x < -100) setActiveIndex((activeIndex + 1) % slides.length)
                    else if (info.offset.x > 100) setActiveIndex((activeIndex - 1 + slides.length) % slides.length)
                  }}
                  className="absolute top-0"
                  style={{
                    width: i === 1 ? selectedWidth : baseWidth,
                    height: i === 1 ? 400 : 320,
                    borderRadius: i === 1 ? 20 : 12,
                    overflow: 'hidden',
                    zIndex: i === 1 ? 2 : 1,
                    perspective: 1000,
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      i === 1 ? 'brightness-110' : 'brightness-90'
                    }`}
                    draggable={false}
                    style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  />
                  {(i === 0 || i === 1) && (
                    <div
                      className="absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-full blur-lg"
                      style={{
                        width: i === 1 ? 240 : 190,
                        height: i === 1 ? 54 : 44,
                        background:
                          'radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)',
                        zIndex: 0,
                      }}
                    />
                  )}
                  {i === 1 && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
                      <div className="absolute left-8 bottom-8 z-20 text-white">
                        <h2 className="text-2xl font-bold leading-tight mb-1 drop-shadow">
                          {slide.title}
                        </h2>
                        {slide.subtitle && (
                          <div className="text-white text-base font-medium mb-2 opacity-85">
                            {slide.subtitle}
                          </div>
                        )}
                        <div className="text-gray-200 text-base mb-3 opacity-70 max-w-xs">
                          {slide.description}
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => window.open(slide.link, '_blank')}
                          className="bg-white text-gray-800 font-semibold rounded-full px-4 py-2 hover:bg-gray-100"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      {/* Pagination */}
      <div
        className="flex w-full items-end justify-end relative mt-10"
        style={{ minHeight: 40, height: 60, maxWidth: containerWidth, margin: '0 auto' }}
      >
        <div className="flex gap-4 mb-4 mr-[8%]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition border ${
                i === activeIndex
                  ? 'bg-gray-900 text-white border-primary-600'
                  : 'bg-white text-gray-400 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="absolute right-100 bottom-7 w-full flex justify-end">
          <div
            className="h-1 bg-primary-600 rounded-full transition-all duration-300"
            style={{
              width: '70px',
              marginRight: `calc(32px * ${slides.length - activeIndex - 1})`,
            }}
          />
        </div>
      </div>

      {/* Bottom Frame - positioned at the very bottom of the section */}
      <motion.div
        className="absolute bottom-0 left-0 z-20"
        initial="hidden"
        animate={controls}
        variants={containerVariants_}
      >
        <div className="relative" style={{ width: 200, height: 200 }}>
          <div className="absolute bottom-0 left-0 h-20 w-100 bg-gradient-to-r bg-black to-black rounded" />
          <div className="absolute bottom-0 left-0 w-20 h-100 bg-gradient-to-t bg-black to-black rounded" />
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
