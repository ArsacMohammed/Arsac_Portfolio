import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import type { KeyboardEvent } from 'react'
import type { Project } from '../../../types'
import ProjectCard from './ProjectCard'

interface ProjectsListProps {
  projects: Project[]
  containerVariants: any
  luxeMetaColors: string[]
}

const ProjectsList: React.FC<ProjectsListProps> = ({ 
  projects, 
  containerVariants, 
  luxeMetaColors 
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })
  const containerRef = useRef<HTMLDivElement>(null)
  const projectsContainerRef = useRef<HTMLDivElement>(null)

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

  const handleViewMore = () => {
    setShowAllProjects(true)
    // Scroll to make the projects list visible
    setTimeout(() => {
      if (projectsContainerRef.current) {
        projectsContainerRef.current.scrollTop = 0
      }
    }, 100)
  }

  const handleShowLess = () => {
    setShowAllProjects(false)
    setOpenIndex(null) // Close any open accordion
    // Scroll back to top of projects container
    setTimeout(() => {
      if (projectsContainerRef.current) {
        projectsContainerRef.current.scrollTop = 0
      }
    }, 100)
  }

  // For mobile view, show limited projects unless expanded
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 3);

  return (
    <section id="Projects" role="region" aria-labelledby="projects-heading" className="min-h-[80vh] sm:min-h-[90vh] md:min-h-[100vh] lg:min-h-[120vh] xl:min-h-[120vh] relative overflow-hidden" ref={ref}>
      <a href="#Projects" className="sr-only">Skip to Projects</a>
      <div
        className="h-[80vh] sm:h-[90vh] md:h-[100vh] lg:h-[120vh] xl:h-[120vh] w-screen flex flex-col relative"  
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      >
        {/* Header */}
        <motion.div
          className="flex-shrink-0 z-token-sticky px-4 sm:px-6 md:px-8 pt-token-20 sm:pt-token-30 md:pt-token-40 pb-token-8 sm:pb-token-12 md:pb-token-16 flex justify-center"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <h1 id="projects-heading" className="text-2xl sm:text-token-3xl md:text-token-4xl lg:text-token-6xl xl:text-token-7xl font-token-bold text-gray-900 tracking-tight text-center">
            <span className="text-2xl sm:text-token-3xl md:text-token-4xl lg:text-token-6xl xl:text-token-7xl font-token-extrabold leading-token-tight bg-gradient-to-r from-[#560F13] via-[#560F13] to-black bg-clip-text text-transparent [text-stroke:1px_black] sm:[text-stroke:1.5px_black]">
              Projects
            </span>
          </h1>
        </motion.div>

        {/* Projects Container */}
        <motion.div
          className="flex-1 flex items-start justify-center overflow-hidden"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
<div className="w-full h-full px-4 sm:px-token-6 md:px-token-8 lg:px-token-12 xl:px-20 mx-auto" ref={containerRef}>
            
            {/* Desktop View - Full height scrollable */}
            <div className="hidden md:block h-full">
              <div 
                className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                style={{ 
                  paddingRight: '8px',
                  marginRight: '-8px'
                }}
              >
                <div className="relative py-4" role="list">
                  <AnimatePresence>
                    {projects.map((project, index) => {
                      const isOpen = openIndex === index
                      const shouldShow = openIndex === null || isOpen
                      if (!shouldShow) return null

                      return (
                        <ProjectCard
                          key={index}
                          project={project}
                          index={index}
                          isOpen={isOpen}
                          onToggle={() => setOpenIndex(isOpen ? null : index)}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          luxeMetaColors={luxeMetaColors}
                          containerVariants={containerVariants}
                          className="md:w-full md:max-w-none md:mx-0 md:mb-6"
                        />
                      )
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            
            {/* Mobile View - Controlled scrollable area */}
            <div className="block md:hidden h-full flex flex-col">
              <AnimatePresence mode="wait">
                {!showAllProjects ? (
                  // Limited view - no scroll needed
                  <motion.div 
                    key="limited-view"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-1 flex flex-col justify-center py-4"
                  >
                    <div className="relative" role="list">
                      <AnimatePresence>
                        {visibleProjects.map((project, index) => {
                          const isOpen = openIndex === index
                          const shouldShow = openIndex === null || isOpen
                          if (!shouldShow) return null

                          return (
                            <div key={index} className="mb-4">
                              <ProjectCard
                                project={project}
                                index={index}
                                isOpen={isOpen}
                                onToggle={() => setOpenIndex(isOpen ? null : index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                luxeMetaColors={luxeMetaColors}
                                containerVariants={containerVariants}
                              />
                            </div>
                          )
                        })}
                      </AnimatePresence>
                    </div>
                    
                    {/* View More Button */}
                    {projects.length > 3 && (
                      <div className="flex-shrink-0 mt-6 flex justify-center">
                        <motion.button
                          onClick={handleViewMore}
                          className="px-6 py-3 bg-[#72383D] text-white rounded-lg font-medium shadow-md hover:bg-[#560F13] transition-all duration-200 hover:shadow-lg active:transform active:scale-95"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View More Projects
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  // Expanded view - scrollable
                  <motion.div 
                    key="expanded-view"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col py-4 overflow-hidden"
                  >
                    <div 
                      ref={projectsContainerRef}
                      className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent"
                      style={{ 
                        paddingRight: '8px',
                        marginRight: '-8px'
                      }}
                    >
                      <div className="relative" role="list">
                        <AnimatePresence>
                          {projects.map((project, index) => {
                            const isOpen = openIndex === index
                            const shouldShow = openIndex === null || isOpen
                            if (!shouldShow) return null

                            return (
                              <motion.div 
                                key={index} 
                                className="mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ 
                                  duration: 0.4, 
                                  delay: index * 0.1,
                                  ease: "easeOut"
                                }}
                              >
                                <ProjectCard
                                  project={project}
                                  index={index}
                                  isOpen={isOpen}
                                  onToggle={() => setOpenIndex(isOpen ? null : index)}
                                  onKeyDown={(e) => handleKeyDown(e, index)}
                                  luxeMetaColors={luxeMetaColors}
                                  containerVariants={containerVariants}
                                />
                              </motion.div>
                            )
                          })}
                        </AnimatePresence>
                      </div>
                    </div>
                    
                    {/* Show Less Button */}
                    <div className="flex-shrink-0 mt-4 pt-4 border-t border-gray-200 flex justify-center bg-gradient-to-t from-white/90 to-transparent">
                      <motion.button
                        onClick={handleShowLess}
                        className="px-6 py-3 bg-gray-600 text-white rounded-lg font-medium shadow-md hover:bg-gray-700 transition-all duration-200 hover:shadow-lg active:transform active:scale-95"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Show Less
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ProjectsList