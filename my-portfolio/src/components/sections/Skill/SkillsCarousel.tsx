import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { SkillSlide, type Slide } from './SkillSlide'

interface SkillsCarouselProps {
  slides: Slide[]
}

function getSliderWindow(slidesArr: Slide[], selectedIndex: number): Slide[] {
  const total = slidesArr.length
  return [
    slidesArr[(selectedIndex - 1 + total) % total],
    slidesArr[selectedIndex],
    slidesArr[(selectedIndex + 1) % total],
    slidesArr[(selectedIndex + 2) % total]
  ]
}

export const SkillsCarousel: React.FC<SkillsCarouselProps> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  const displayedSlides = getSliderWindow(slides, activeIndex)

  // Autoplay effect with pause on hover
  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 1800)
    return () => clearInterval(interval)
  }, [paused, slides.length])

  const baseWidth = 320
  const selectedWidth = baseWidth * 1.5
  const containerWidth = baseWidth * 2 + selectedWidth * 2

  const handleDragEnd = (info: any) => {
    if (info.offset.x < -100) setActiveIndex((activeIndex + 1) % slides.length)
    else if (info.offset.x > 100) setActiveIndex((activeIndex - 1 + slides.length) % slides.length)
  }

  return (
    <>
      {/* Carousel Container */}
      <LayoutGroup>
        <div
          className="relative ml-55"
          style={{ width: containerWidth, height: 400, marginTop: '8rem' }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence initial={false}>
            {displayedSlides.map((slide, i) => (
              <SkillSlide
                key={slide.title + i}
                slide={slide}
                index={i}
                position={i}
                baseWidth={baseWidth}
                selectedWidth={selectedWidth}
                activeIndex={activeIndex}
                onDragEnd={handleDragEnd}
              />
            ))}
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
    </>
  )
}