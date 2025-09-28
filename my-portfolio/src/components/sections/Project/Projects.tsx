import React, { useState, useEffect, useRef } from 'react'
import type { KeyboardEvent } from 'react';
// Optimized imports for tree shaking
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
// Import icons from lucide-react
import { ChevronDown, AlertTriangle, RefreshCw } from 'lucide-react'
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import { useErrorHandler } from '../../../hooks/useErrorHandler'
import Button from '../../../components/ui/Button/Button'
import type { Project } from '../../../types'
import { projectData } from '../../../lib/constants'

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
}

const luxeMetaColors = [
  "#EFE9E1", "#D9D9D9", "#D1C7BD", "#AC9C8D", "#72383D", "#322D29"
]

const fetchProjects = async (): Promise<Project[]> => {
  return new Promise<Project[]>((resolve) => {
    setTimeout(() => resolve(projectData), 800)
  })
}

const ProjectsInner: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })
  const containerRef = useRef<HTMLDivElement>(null)

  const { state, execute, retry } = useErrorHandler<Project[]>({
    maxRetries: 2,
    retryDelay: 1500,
    enableAutoRetry: true,
    logErrors: true
  })

  useEffect(() => {
    execute(fetchProjects)
  }, [execute])

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    if (openIndex !== null) document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [openIndex])

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setOpenIndex(openIndex === index ? null : index)
    }
  }

  if (state.loading) {
    return (
      <section id="Projects" role="region" aria-labelledby="projects-heading" className="min-h-[50vh] flex items-center justify-center">
        <p className="text-lg text-gray-600 animate-pulse">Loading projects…</p>
      </section>
    )
  }

  if (state.error) {
    return (
      <section id="Projects" role="region" aria-labelledby="projects-heading" className="min-h-[50vh] flex flex-col items-center justify-center text-center">
        <AlertTriangle className="text-red-500 w-12 h-12 mb-4" aria-hidden="true" />
        <p className="text-gray-700 mb-2">{state.userFriendlyError?.message || "Something went wrong while loading projects."}</p>
        <Button onClick={retry} className="flex items-center gap-2">
          <RefreshCw size={16} /> Try Again
        </Button>
      </section>
    )
  }

  const projects = state.data ?? []

  return (
    <section id="Projects" role="region" aria-labelledby="projects-heading" className="min-h-[150vh] relative overflow-visible" ref={ref}>
      <a href="#Projects" className="sr-only">Skip to Projects</a>
      <div
        className="h-[150vh] w-screen flex relative"
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      >
        {/* Header */}
        <motion.div
          className="absolute top-0 left-140 right-0 z-20 px-0 pt-40 pb-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <h1 id="projects-heading" className="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight ml-0">
            <span className="text-7xl font-extrabold leading-tight bg-gradient-to-r from-[#560F13] via-[#560F13] to-black bg-clip-text text-transparent [text-stroke:1.5px_black]">
              Projects Completed
            </span>
          </h1>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          className="w-full h-full flex items-start justify-center pt-80 pb-16 overflow-visible"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="w-full px-6 md:px-12 lg:px-16 xl:px-50" ref={containerRef}>
            <div className="relative overflow-visible" role="list">
              <AnimatePresence>
                {projects.map((item, index) => {
                  const isOpen = openIndex === index
                  const shouldShow = openIndex === null || isOpen
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
                        position: openIndex === null ? 'relative' : 'absolute',
                        top: openIndex === null ? 'auto' : 0,
                        left: 0,
                        right: 0
                      }}
                      role="listitem"
                    >
                      <motion.button
                        className="w-full flex items-center rounded-2xl border border-gray-200 shadow-md transition px-0 py-0 mb-6 focus:outline-none focus:ring-2 focus:ring-[#72383D] focus:ring-offset-2 bg-[#F9F8F7]"
                        style={{
                          borderColor: isOpen ? '#72383D' : '#EEE',
                          boxShadow: isOpen ? `0 6px 32px -6px #72383D22` : undefined
                        }}
                        whileHover={{ scale: 1.01, y: -2, boxShadow: "0 12px 32px -6px #322D2920" }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setOpenIndex(isOpen ? null : index)}
                        tabIndex={0}
                        role="button"
                        aria-expanded={isOpen}
                        aria-controls={`project-panel-${index}`}
                        aria-labelledby={`project-title-${index}`}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                      >
                        {/* Meta Box */}
                        <div
                          className="flex flex-col items-center w-40 min-w-[8rem] h-full rounded-l-2xl border-r py-10 px-4 justify-center"
                          style={{
                            background: luxeMetaColors[index % luxeMetaColors.length],
                            borderColor: '#72383D',
                            color: ['#D9D9D9', '#EFE9E1'].includes(luxeMetaColors[index % luxeMetaColors.length]) ? '#322D29' : '#FFF'
                          }}
                          aria-hidden="true"
                        >
                          <div className="text-3xl font-semibold mb-2">{item.number}</div>
                        </div>

                        {/* Title & Actions */}
                        <div className="flex-1 flex flex-row items-center px-7 py-7 justify-between">
                          <div>
                            <h3 id={`project-title-${index}`} className="text-3xl font-semibold leading-tight text-[#322D29] mb-2">
                              {item.title}
                            </h3>
                          </div>
                          <div className="flex gap-3 items-center">
                            <span className="px-4 py-1 border border-[#D1C7BD] rounded-full text-xs font-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
                              VIEW CASE
                            </span>
                            <span className="px-4 py-1 border border-[#D1C7BD] rounded-full text-xs font-medium bg-[#FFF] text-[#72383D] hover:bg-[#f8f2f4] cursor-pointer">
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
                            <div className="px-4 pb-6 pt-2">
                              <ul className="space-y-4" role="list">
                                {item.description?.map((point, idx) => (
                                  <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.1, ease: 'easeOut' }}
                                    className="flex items-start space-x-3 text-gray-700 leading-relaxed"
                                    role="listitem"
                                  >
                                    <div className="w-2 h-2 bg-gradient-to-r from-[#560F13] to-black rounded-full mt-2 flex-shrink-0" aria-hidden="true" />
                                    <p className="text-base lg:text-3 xl">{point}</p>
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

const Projects: React.FC = () => (
  <ErrorBoundary level="section" showDetails>
    <ProjectsInner />
  </ErrorBoundary>
)

export default Projects
