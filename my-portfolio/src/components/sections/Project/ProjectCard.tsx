import React from 'react'
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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  isOpen,
  onToggle,
  onKeyDown,
  luxeMetaColors,
  containerVariants
}) => {
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
        className="w-full flex items-center rounded-token-2xl border border-gray-200 shadow-token-md transition px-0 py-0 mb-token-6 focus:outline-none focus:ring-2 focus:ring-[#72383D] focus:ring-offset-2 bg-[#F9F8F7]"
        style={{
          borderColor: isOpen ? '#72383D' : '#EEE',
          boxShadow: isOpen ? `0 6px 32px -6px #72383D22` : undefined
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
          className="flex flex-col items-center w-token-40 min-w-[8rem] h-full rounded-l-token-2xl border-r py-token-10 px-token-4 justify-center"
          style={{
            background: luxeMetaColors[index % luxeMetaColors.length],
            borderColor: '#72383D',
            color: ['#D9D9D9', '#EFE9E1'].includes(luxeMetaColors[index % luxeMetaColors.length]) ? '#322D29' : '#FFF'
          }}
          aria-hidden="true"
        >
          <div className="text-token-3xl font-token-semibold mb-token-2">{project.number}</div>
        </div>

        {/* Title & Actions */}
        <div className="flex-1 flex flex-row items-center px-token-7 py-token-7 justify-between">
          <div>
            <h3 id={`project-title-${index}`} className="text-token-3xl font-token-semibold leading-token-tight text-[#322D29] mb-token-2">
              {project.title}
            </h3>
          </div>
          <div className="flex gap-token-3 items-center">
            <span className="px-token-4 py-token-1 border border-[#D1C7BD] rounded-token-full text-token-xs font-token-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
              VIEW CASE
            </span>
            <span className="px-token-4 py-token-1 border border-[#D1C7BD] rounded-token-full text-token-xs font-token-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
              LIVE WEBSITE
            </span>
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.34, ease: 'easeInOut' }}
              className="ml-2 text-[#72383D]"
              aria-hidden="true"
            >
              <ChevronDown size={28} />
            </motion.div>
          </div>
        </div>
      </motion.button>

      {/* Expanded Details */}
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
            className="overflow-hidden origin-top"
            style={{ transformOrigin: 'top' }}
          >
            <div className="px-token-4 pb-token-6 pt-token-2">
              <ul className="gap-token-4 flex flex-col" role="list">
                {project.description?.map((point, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                    className="flex items-start gap-token-3 text-gray-700 leading-token-relaxed"
                    role="listitem"
                  >
                    <div className="w-token-2 h-token-2 bg-gradient-to-r from-[#560F13] to-black rounded-token-full mt-token-2 flex-shrink-0" aria-hidden="true" />
                    <p className="text-token-base lg:text-3 xl">{point}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ProjectCard