// ProjectsCarousel.tsx

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Button } from '../../../components/ui'

const slides = [
  {
    title: "Salomon",
    subtitle: "Time to play",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80", // add your own
    bg: "from-red-700 to-red-900",
    description: "Trail running shoes built for adventure.",
    link: "https://www.salomon.com/",
  },
  {
    title: "Smart Travel",
    subtitle: "",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80",
    bg: "from-green-700 to-green-900",
    description: "Travel smarter, easier, greener.",
    link: "https://example.com",
  },
  {
    title: "Vans",
    subtitle: '"Off The Wall"',
    image: "https://images.unsplash.com/photo-1465101162946-4377e57745c3?fit=crop&w=600&q=80",
    bg: "from-cyan-400 to-cyan-700",
    description: "Iconic street sneakers for everyone.",
    link: "https://www.vans.com/",
  },
  {
    title: "North Face",
    subtitle: "",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=600&q=80",
    bg: "from-gray-800 to-gray-900",
    description: "Gear for the toughest outdoors.",
    link: "https://www.thenorthface.com/",
  },
]

const Projects: React.FC = () => {
  const [index, setIndex] = useState(0)

  const goToPrev = () => setIndex(i => (i === 0 ? slides.length - 1 : i - 1))
  const goToNext = () => setIndex(i => (i === slides.length - 1 ? 0 : i + 1))

  return (
    <section
      id="projects"
      className="w-full h-screen flex flex-col justify-center items-center px-0 py-0"
      style={{
        background: 'linear-gradient(to bottom, #ececec 0%, #f9f9f9 50%, #ffffff 100%)'
      }}
    >
      {/* Carousel Container */}
      <div className="relative w-full h-[500px] flex items-center justify-center">
        {/* Prev Arrow */}
        <button
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-4 shadow hover:bg-white"
          onClick={goToPrev}
        >
          <span className="sr-only">Previous</span>
          <svg width={18} height={18} fill="none"><path stroke="currentColor" strokeWidth="2" d="M13 9H5m0 0l4-4m-4 4l4 4" /></svg>
        </button>

        {/* Next Arrow */}
        <button
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 rounded-full p-4 shadow hover:bg-white"
          onClick={goToNext}
        >
          <span className="sr-only">Next</span>
          <svg width={18} height={18} fill="none"><path stroke="currentColor" strokeWidth="2" d="M5 9h8m0 0l-4-4m4 4l-4 4" /></svg>
        </button>

        {/* Slides */}
        <div className="w-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[index].title}
              initial={{ opacity: 0, x: 80 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -80 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-[360px] h-[340px] bg-white rounded-xl overflow-hidden shadow-xl relative flex-shrink-0 flex items-end justify-start"
              style={{
                boxShadow: "0 24px 64px rgba(0,0,0,0.11)",
              }}
            >
              {/* Color overlay */}
              <div
                className={`absolute inset-0 z-0 bg-gradient-to-br ${slides[index].bg} opacity-90`}
              ></div>
              <img
                src={slides[index].image}
                alt={slides[index].title}
                className="absolute z-10 inset-0 w-full h-full object-cover mix-blend-multiply"
                draggable={false}
              />

              {/* Card content */}
              <div className="relative z-20 p-8 text-left w-full">
                <h2 className="text-white text-3xl font-bold leading-tight mb-2 drop-shadow">{slides[index].title}</h2>
                {slides[index].subtitle && (
                  <div className="text-white text-lg font-medium mb-4 opacity-80">{slides[index].subtitle}</div>
                )}
                <div className="text-gray-200 text-base mb-4 opacity-80">{slides[index].description}</div>
                <div>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => window.open(slides[index].link, "_blank")}
                    className="bg-white text-gray-800 font-semibold rounded-full px-4 py-2 hover:bg-gray-100"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit
                  </Button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pagination (dots/numbers) */}
      <div className="flex items-center justify-center gap-6 mt-10">
        {slides.map((slide, i) => (
          <button
            key={slide.title}
            onClick={() => setIndex(i)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold transition border 
              ${i === index ? "bg-primary-600 text-white border-primary-600" : "bg-white text-gray-400 border-gray-300 hover:bg-gray-100"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Projects
