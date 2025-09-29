import React from 'react'
import { Layout } from './components/layout'
import { ErrorBoundary } from './components/common'
import { withIntersectionLazyLoading, preloadComponent } from './lib/lazyLoad'

import '@/styles/globals.css'

// Critical component - load immediately
import Hero from './components/sections/Hero/Hero'

// Lazy load non-critical components
const About = withIntersectionLazyLoading(() => import('./components/sections/About/About'))
const Skills = withIntersectionLazyLoading(() => import('./components/sections/Skill/Skills'))
const Projects = withIntersectionLazyLoading(() => import('./components/sections/Project/Projects'))
const Connect = withIntersectionLazyLoading(() => import('./components/sections/Connect/Connects'))

// Preload components that are likely to be viewed soon
React.startTransition(() => {
  preloadComponent(() => import('./components/sections/About/About'))
})

function App() {
  return (
    <ErrorBoundary level="page" showDetails={true}>
      <Layout>
        <ErrorBoundary level="section">
          <Hero />
        </ErrorBoundary>
        <ErrorBoundary level="section">
          <About />
        </ErrorBoundary>
        <ErrorBoundary level="section">
          <Skills />
        </ErrorBoundary>
        <ErrorBoundary level="section">
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary level="section">
          <Connect />
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
