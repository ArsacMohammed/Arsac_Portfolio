import React from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { Button } from '../../ui'

export interface Slide {
  image: string
  title: string
  subtitle: string
  description: string
  link: string
  color: string
}

interface SkillSlideProps {
  slide: Slide
  index: number
  position: number
  baseWidth: number
  selectedWidth: number
  // activeIndex: number
  onDragEnd: (info: any) => void
}

export const SkillSlide: React.FC<SkillSlideProps> = ({
  slide,
  position,
  baseWidth,
  selectedWidth,
  onDragEnd
}) => {
  const isSelected = position === 1
  
  let left = 0
  if (position === 0) left = 0
  else if (position === 1) left = baseWidth
  else if (position === 2) left = baseWidth + selectedWidth
  else if (position === 3) left = baseWidth + selectedWidth + baseWidth

  return (
    <motion.div
      key={slide.title + position}
      initial={{ opacity: 0, x: 50, scale: isSelected ? 1.07 : 1, y: isSelected ? -30 : 0 }}
      animate={{
        opacity: 1,
        x: left,
        scale: isSelected ? 1.07 : 1,
        y: isSelected ? -30 : 0,
        rotateY: isSelected ? 0 : position === 0 ? 8 : -8,
        boxShadow: isSelected
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
        scale: isSelected ? 1.15 : 1.07,
        rotateY: 0,
        boxShadow: "0 40px 60px rgba(0,0,0,0.45)",
        transition: { duration: 0.3 },
        cursor: 'grab',
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.15}
      onDragEnd={(_, info) => onDragEnd(info)}
      className="absolute top-0"
      style={{
        width: isSelected ? selectedWidth : baseWidth,
        height: isSelected ? (window.innerWidth < 640 ? 250 : 400) : 320,
        borderRadius: isSelected ? (window.innerWidth < 640 ? 16 : 20) : 12,
        overflow: 'hidden',
        zIndex: isSelected ? 2 : 1,
        perspective: 1000,
        display: window.innerWidth < 640 && !isSelected ? 'none' : 'block'
      }}
    >
      <img
        src={slide.image}
        alt={slide.title}
        className={`w-full h-full object-cover transition-all duration-300 ${
          isSelected ? 'brightness-110' : 'brightness-90'
        }`}
        draggable={false}
        style={{ height: '100%', width: '100%', objectFit: 'cover' }}
      />
      
      {/* Shadow for first two slides */}
      {(position === 0 || position === 1) && (
        <div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 rounded-full blur-lg"
          style={{
            width: isSelected ? 240 : 190,
            height: isSelected ? 54 : 44,
            background:
              'radial-gradient(circle, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0) 100%)',
            zIndex: 0,
          }}
        />
      )}
      
      {/* Content overlay for selected slide */}
      {isSelected && (
        <>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-token-docked" />
          <div className="absolute left-4 sm:left-6 md:left-8 bottom-4 sm:bottom-6 md:bottom-8 z-token-sticky text-white">
            <h2 className="text-lg sm:text-xl md:text-token-2xl font-token-bold leading-token-tight mb-1 sm:mb-token-1 drop-shadow">
              {slide.title}
            </h2>
            {slide.subtitle && (
              <div className="text-white text-sm sm:text-base font-token-medium mb-1 sm:mb-token-2 opacity-85">
                {slide.subtitle}
              </div>
            )}
            <div className="text-gray-200 text-xs sm:text-sm md:text-token-base mb-2 sm:mb-token-3 opacity-70 max-w-[200px] sm:max-w-xs">
              {slide.description}
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => window.open(slide.link, '_blank')}
              className="bg-white text-gray-800 font-token-semibold rounded-token-full px-token-4 py-token-2 hover:bg-gray-100"
            >
              <ExternalLink className="w-token-4 h-token-4 mr-token-2" />
              Visit
            </Button>
          </div>
        </>
      )}
    </motion.div>
  )
}