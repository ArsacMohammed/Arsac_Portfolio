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
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <section id="Projects" role="region" aria-labelledby="projects-heading" className="min-h-[120vh] sm:min-h-[130vh] md:min-h-[140vh] lg:min-h-[150vh] relative overflow-visible" ref={ref}>
      <a href="#Projects" className="sr-only">Skip to Projects</a>
      <div
        className="h-[120vh] sm:h-[130vh] md:h-[140vh] lg:h-[150vh] w-screen flex relative"
        style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      >
        {/* Header */}
        <motion.div
          className="absolute top-0 left-0 sm:left-4 md:left-8 lg:left-140 right-0 z-token-sticky px-4 sm:px-6 md:px-8 pt-token-20 sm:pt-token-30 md:pt-token-40 pb-token-8 sm:pb-token-12 md:pb-token-16"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <h1 id="projects-heading" className="text-token-3xl sm:text-token-4xl md:text-token-5xl lg:text-token-6xl xl:text-token-7xl font-token-bold text-gray-900 tracking-tight ml-0">
            <span className="text-token-3xl sm:text-token-4xl md:text-token-5xl lg:text-token-6xl xl:text-token-7xl font-token-extrabold leading-token-tight bg-gradient-to-r from-[#560F13] via-[#560F13] to-black bg-clip-text text-transparent [text-stroke:1px_black] sm:[text-stroke:1.5px_black]">
              Projects Completed
            </span>
          </h1>
        </motion.div>

        {/* Accordion List */}
        <motion.div
          className="w-full h-full flex items-start justify-center pt-token-40 sm:pt-token-60 md:pt-token-80 pb-token-8 sm:pb-token-12 md:pb-token-16 overflow-visible"
          initial="hidden"
          animate={controls}
          variants={containerVariants}
        >
          <div className="w-full px-4 sm:px-token-6 md:px-token-12 lg:px-token-16 xl:px-50" ref={containerRef}>
            <div className="relative overflow-visible" role="list">
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
                    />
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

export default ProjectsList