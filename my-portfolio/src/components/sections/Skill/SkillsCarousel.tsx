import React, { useState, useEffect } from 'react'
import { AnimatePresence, LayoutGroup } from 'framer-motion'
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

  // Responsive widths based on screen size
  const [dimensions, setDimensions] = useState({
    baseWidth: typeof window !== 'undefined' ? (window.innerWidth < 640 ? 200 : window.innerWidth < 768 ? 260 : 320) : 320,
    containerWidth: 0,
    selectedWidth: 0
  });

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      const base = isMobile ? 200 : window.innerWidth < 768 ? 260 : 320;
      // For mobile, make selected slide take full width with padding
      const selected = isMobile ? window.innerWidth - 32 : base * 1.5;
      setDimensions({
        baseWidth: base,
        selectedWidth: selected,
        containerWidth: isMobile ? window.innerWidth : base * 2 + selected * 2
      });
    };
    
    handleResize(); // Set initial dimensions
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = (info: any) => {
    if (info.offset.x < -100) setActiveIndex((activeIndex + 1) % slides.length)
    else if (info.offset.x > 100) setActiveIndex((activeIndex - 1 + slides.length) % slides.length)
  }

  return (
    <>
      {/* Carousel Container */}
      <LayoutGroup>
        <div
          className="relative mx-auto sm:ml-10 md:ml-20 lg:ml-55 overflow-hidden"
          style={{ 
            width: dimensions.containerWidth || '90vw', 
            height: window.innerWidth < 640 ? 250 : 400, 
            marginTop: window.innerWidth < 640 ? '2rem' : window.innerWidth < 768 ? '6rem' : '8rem',
            marginBottom: window.innerWidth < 640 ? '1rem' : '2rem'
          }}
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
                baseWidth={dimensions.baseWidth}
                selectedWidth={dimensions.selectedWidth}
                // activeIndex={activeIndex}
                onDragEnd={handleDragEnd}
              />
            ))}
          </AnimatePresence>
        </div>
      </LayoutGroup>

      {/* Pagination */}
      <div
        className="flex w-full items-end justify-center sm:justify-end relative mt-6 sm:mt-8 md:mt-10"
        style={{ 
          minHeight: 30, 
          height: window.innerWidth < 640 ? 40 : 60, 
          maxWidth: dimensions.containerWidth || '90vw', 
          margin: '0 auto' 
        }}
      >
        <div className="flex gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-4 mr-0 sm:mr-[4%] md:mr-[8%]">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-md sm:rounded-lg flex items-center justify-center text-sm sm:text-base md:text-lg font-bold transition border ${
                i === activeIndex
                  ? 'bg-gray-900 text-white border-primary-600'
                  : 'bg-white text-gray-400 border-gray-300 hover:bg-gray-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <div className="absolute right-0 sm:right-50 md:right-100 bottom-3 sm:bottom-5 md:bottom-7 w-full flex justify-center sm:justify-end">
          <div
            className="h-1 bg-primary-600 rounded-full transition-all duration-300"
            style={{
              width: window.innerWidth < 640 ? '50px' : '70px',
              marginRight: window.innerWidth < 640 
                ? `calc(24px * ${slides.length - activeIndex - 1})` 
                : `calc(32px * ${slides.length - activeIndex - 1})`,
            }}
          />
        </div>
      </div>
    </>
  )
}