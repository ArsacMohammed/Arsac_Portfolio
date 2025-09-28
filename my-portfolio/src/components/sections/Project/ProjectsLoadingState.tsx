import React from 'react'

const ProjectsLoadingState: React.FC = () => {
  return (
    <section 
      id="Projects" 
      role="region" 
      aria-labelledby="projects-heading" 
      className="min-h-[50vh] flex items-center justify-center"
    >
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        <p className="text-lg text-gray-600 animate-pulse">Loading projects…</p>
      </div>
    </section>
  )
}

export default ProjectsLoadingState