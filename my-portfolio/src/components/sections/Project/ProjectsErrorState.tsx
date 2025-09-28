import React from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import Button from '../../../components/ui/Button/Button'

interface ProjectsErrorStateProps {
  error: string | undefined
  onRetry: () => void
}

const ProjectsErrorState: React.FC<ProjectsErrorStateProps> = ({ error, onRetry }) => {
  return (
    <section 
      id="Projects" 
      role="region" 
      aria-labelledby="projects-heading" 
      className="min-h-token-50vh flex flex-col items-center justify-center text-center"
    >
      <AlertTriangle className="text-red-500 w-token-12 h-token-12 mb-token-4" aria-hidden="true" />
      <p className="text-gray-700 mb-token-2">
        {error || "Something went wrong while loading projects."}
      </p>
      <Button onClick={onRetry} className="flex items-center gap-token-2">
        <RefreshCw size={16} /> Try Again
      </Button>
    </section>
  )
}

export default ProjectsErrorState