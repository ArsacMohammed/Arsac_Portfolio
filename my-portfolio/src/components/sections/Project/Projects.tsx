import React, { useEffect } from 'react'
import { easeInOut } from 'framer-motion'
import ErrorBoundary from '../../common/ErrorBoundary/ErrorBoundary'
import { useErrorHandler } from '../../../hooks/useErrorHandler'
import type { Project } from '../../../types'
import { projectData } from '../../../lib/constants'
import ProjectsLoadingState from './ProjectsLoadingState'
import  ProjectsErrorState  from './ProjectsErrorState'
import  ProjectsList  from './ProjectsList'

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
  const { state, execute, retry } = useErrorHandler<Project[]>({
    maxRetries: 2,
    retryDelay: 1500,
    enableAutoRetry: true,
    logErrors: true
  })

  useEffect(() => {
    execute(fetchProjects)
  }, [execute])

  if (state.loading) {
    return <ProjectsLoadingState />
  }

  if (state.error) {
    return (
      <ProjectsErrorState 
        error={state.userFriendlyError?.message} 
        onRetry={retry} 
      />
    )
  }

  const projects = state.data ?? []

  return (
    <ProjectsList 
      projects={projects} 
      containerVariants={containerVariants}
      luxeMetaColors={luxeMetaColors}
    />
  )
}

const Projects: React.FC = () => (
  <ErrorBoundary level="section" showDetails>
    <ProjectsInner />
  </ErrorBoundary>
)

export default Projects
