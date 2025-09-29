import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import type { KeyboardEvent } from 'react'
import type { Project } from '../../../types'

interface ProjectCardProps {
  project: Project
  index: number
  isOpen: boolean
  onToggle: () => void
  onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void
  luxeMetaColors: string[]
  containerVariants: any
  className?: string
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isOpen,
  onToggle,
  onKeyDown,
  luxeMetaColors,
  containerVariants,
  className = ''
}) => {
  const expandedRef = useRef<HTMLDivElement>(null)
  const [maxExpandedHeight, setMaxExpandedHeight] = useState<number>(300)

  useEffect(() => {
    const calculateMaxHeight = () => {
      // Calculate available space for expanded content
      const viewportHeight = window.innerHeight
      const isMobile = window.innerWidth < 768
      
      if (isMobile) {
        // On mobile, limit expanded height to prevent overflow
        // Leave space for header, button, and some padding
        setMaxExpandedHeight(Math.min(viewportHeight * 0.4, 400))
      } else {
        // On desktop/laptop, use almost full screen height (leaving space for header/margins)
        setMaxExpandedHeight(viewportHeight - 200)
      }
    }

    calculateMaxHeight()
    window.addEventListener('resize', calculateMaxHeight)
    return () => window.removeEventListener('resize', calculateMaxHeight)
  }, [])

  const shouldShow = true // Always show for now, can be controlled by parent

  if (!shouldShow) return null

  return (
    <motion.div
      key={index}
      variants={containerVariants}
      className="relative overflow-visible"
      layout
      initial={{ opacity: 1, scale: 1, y: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        scale: isOpen ? 1.02 : 1,
        zIndex: isOpen ? 1000 : 10 - index
      }}
      exit={{ opacity: 0, scale: 0.95, y: -20, transition: { duration: 0.3, ease: 'easeInOut' } }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], layout: { duration: 0.6 } }}
      style={{
        position: 'relative',
        top: 'auto',
        left: 0,
        right: 0
      }}
      role="listitem"
    >
      <motion.button
        className={`w-full flex items-center rounded-token-2xl border border-black shadow-token-md transition px-0 py-0 mb-token-6 focus:outline-none focus:ring-2 focus:ring-[#72383D] focus:ring-offset-2 bg-[#F9F8F7] md:max-w-[95%] lg:max-w-[98%] mx-auto md:py-4 ${className}`}
        style={{
          borderColor: isOpen ? '#72383D' : '#000',
          borderWidth: '1px',
          boxShadow: isOpen ? `0 6px 32px -6px #72383D22` : undefined,
          minHeight: isOpen ? 'auto' : '120px',
          borderRadius: '12px'
        }}
        whileHover={{ scale: 1.01, y: -2, boxShadow: "0 12px 32px -6px #322D2920" }}
        whileTap={{ scale: 0.99 }}
        onClick={onToggle}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`project-panel-${index}`}
        aria-labelledby={`project-title-${index}`}
        onKeyDown={onKeyDown}
      >
        {/* Meta Box */}
        <div
          className="flex flex-col items-center w-14 sm:w-20 md:w-32 lg:w-token-40 min-w-[3.5rem] sm:min-w-[5rem] md:min-w-[8rem] h-full rounded-l-token-2xl border-r py-2 sm:py-4 md:py-token-10 px-1 sm:px-2 md:px-token-4 justify-center"
          style={{
            background: luxeMetaColors[index % luxeMetaColors.length],
            borderColor: '#72383D',
            color: ['#D9D9D9', '#EFE9E1'].includes(luxeMetaColors[index % luxeMetaColors.length]) ? '#322D29' : '#FFF'
          }}
          aria-hidden="true"
        >
          <div className="text-lg sm:text-xl md:text-token-3xl font-token-semibold mb-1 sm:mb-token-2">{project.number}</div>
        </div>

        {/* Title & Actions */}
        <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center px-3 sm:px-4 md:px-token-7 py-3 sm:py-4 md:py-token-7 justify-between">
          <div>
            <h3 id={`project-title-${index}`} className="text-base sm:text-xl md:text-token-2xl lg:text-token-3xl font-token-semibold leading-token-tight text-[#322D29] mb-2 sm:mb-token-2">
              {project.title}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-token-3 items-center mt-2 sm:mt-0">
            <span className="px-2 sm:px-token-4 py-1 border border-[#D1C7BD] rounded-token-full text-[10px] sm:text-xs font-token-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
              VIEW CASE
            </span>
            <span className="px-2 sm:px-token-4 py-1 border border-[#D1C7BD] rounded-token-full text-[10px] sm:text-xs font-token-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
              LIVE WEBSITE
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.34, ease: 'easeInOut' }}
              className="ml-1 sm:ml-2 text-[#72383D]"
              aria-hidden="true"
            >
              <ChevronDown size={28} />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Expanded Details - Now with Scrollable Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`project-panel-${index}`}
            role="region"
            aria-labelledby={`project-title-${index}`}
            initial={{ opacity: 0, height: 0, scaleY: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              scaleY: 1,
              transition: {
                height: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
                opacity: { duration: 0.3, delay: 0.1 },
                scaleY: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
              }
            }}
            exit={{
              opacity: 0,
              height: 0,
              scaleY: 0,
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] },
                scaleY: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
              }
            }}
            className="overflow-hidden origin-top border border-black rounded-lg"
            style={{ 
              transformOrigin: 'top',
              borderWidth: '1px',
              marginTop: '8px',
              marginBottom: '8px'
            }}
            ref={expandedRef}
          >
            {/* Scrollable Content Container */}
            <div 
              className="overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
              style={{ 
                maxHeight: maxExpandedHeight,
                height: maxExpandedHeight,
                paddingRight: '8px',
                marginRight: '-8px',
                scrollBehavior: 'smooth'
              }}
              onClick={onToggle}
            >
              <div className="px-token-4 pb-token-6 pt-token-2 md:pl-token-8 lg:pl-token-12 xl:pl-token-12 lg:pr-16 xl:pr-20 h-full flex flex-col">
                <ul className="gap-4 md:gap-6 lg:gap-10 xl:gap-12 flex flex-col flex-1 justify-evenly py-4 lg:py-8" role="list">
                  {project.description?.map((point, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                      className="flex items-start gap-token-3 text-gray-700 leading-token-relaxed"
                      role="listitem"
                    >
                      <div className="w-2 h-2 lg:w-3 lg:h-3 xl:w-4 xl:h-4 bg-gradient-to-r from-[#560F13] to-black rounded-token-full mt-1 lg:mt-2 xl:mt-3 flex-shrink-0" aria-hidden="true" />
                      <p className="text-sm md:text-base lg:text-3xl xl:text-2xl pr-2 leading-relaxed lg:leading-loose">{point}</p>
                    </motion.li>
                  ))}
                </ul>
                
                {/* Scroll Indicator */}
                {project.description && project.description.length > 3 && (
                  <div className="mt-4 pt-2 text-center">
                    <div className="inline-flex items-center text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1">
                      <span>Scroll for more details</span>
                      <motion.div
                        animate={{ y: [0, 2, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        className="ml-1"
                      >
                        ↓
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Fade Out Gradient at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectCard