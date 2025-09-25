import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Button } from '../../../components/ui'

interface Slide {
  image: string
  title: string
  subtitle: string
  description: string
  link: string
}
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

// Ensures selected slide always appears in the second (index 1) position
// function getDisplayedSlides(slides: typeof slides, activeIndex: number) {
//   const result = []
//   const total = slides.length
//   // Get prev, active, next1, next2 wrapping around slide array
//   result[0] = slides[(activeIndex - 1 + total) % total]
//   result[1] = slides[activeIndex]
//   result[2] = slides[(activeIndex + 1) % total]
//   result[3] = slides[(activeIndex + 2) % total]
//   return result
// }

function getSliderWindow(slidesArr: Slide[], selectedIndex: number): Slide[] {
  const total = slidesArr.length
  return [
    slidesArr[(selectedIndex - 1 + total) % total],
    slidesArr[selectedIndex],
    slidesArr[(selectedIndex + 1) % total],
    slidesArr[(selectedIndex + 2) % total]
  ]
}

const Projects: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const displayedSlides = getSliderWindow(slides, activeIndex)

  return (
    <section id="projects" className="w-full h-screen flex flex-col justify-center items-center bg-[#f5f6f7] px-0 py-0">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Carousel Images */}
        <div className="flex w-full h-[340px] mt-8">
          {displayedSlides.map((slide, i) => (
            <motion.div
              key={slide.title + i}
              layout
              className="relative flex-shrink-0"
              style={{
                zIndex: i === 1 ? 2 : 1
              }}
              animate={{
                flex: i === 1 ? 1.5 : 1,
                scale: i === 1 ? 1.07 : 1,
                marginLeft: 0,
                marginRight: 0
              }}
              transition={{ duration: 0.35, layout: { duration: 0.34 } }}
            >
              <div
                className={`w-full h-full overflow-hidden transition-all duration-300`}
                style={{
                  borderRadius: i === 1 ? "20px" : "12px",
                  height: i === 1 ? 340 : 270,
                  transition: "height 0.5s"
                }}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className={`w-full h-full object-cover ${i === 1 ? 'brightness-110' : 'brightness-90'} transition-all`}
                  draggable={false}
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                />
                {/* Overlay for selected slide */}
                {i === 1 && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                )}
                {/* Title and description for active slide */}
                {i === 1 && (
                  <div className="absolute left-8 bottom-8 z-20 text-white">
                    <h2 className="text-2xl font-bold leading-tight mb-1 drop-shadow">{slide.title}</h2>
                    {slide.subtitle && (
                      <div className="text-white text-base font-medium mb-2 opacity-85">{slide.subtitle}</div>
                    )}
                    <div className="text-gray-200 text-base mb-3 opacity-70 max-w-xs">{slide.description}</div>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => window.open(slide.link, "_blank")}
                      className="bg-white text-gray-800 font-semibold rounded-full px-4 py-2 hover:bg-gray-100"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Visit
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        {/* Pagination under unselected images, aligned to bottom of large card */}
        <div className="flex w-full items-end justify-end relative" style={{ height: 60, minHeight: 40 }}>
          <div className="flex gap-4 mb-2 mr-[18%]">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition border
                  ${i === activeIndex ? "bg-gray-900 text-white border-primary-600" : "bg-white text-gray-400 border-gray-300 hover:bg-gray-100"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          {/* Highlight bar directly under active index */}
          <div className="absolute left-0 bottom-1 w-full flex justify-end">
            <div
              className="h-1 bg-primary-600 rounded-full transition-all duration-300"
              style={{
                width: '48px',
                marginRight: `calc(32px * ${slides.length - activeIndex - 1})`
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects
