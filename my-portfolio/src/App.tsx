import React from 'react'
import { Layout } from './components/layout'
import { ErrorBoundary } from './components/common'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'
import Skills from './components/sections/Skill/Skills'
// import Skills from './components/sections/Extra/Skills'
import Connect from './components/sections/Connect/Connects'
import Projects from './components/sections/Project/Projects'

import '@/styles/globals.css'

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
        {/* <Skills /> */}
        <ErrorBoundary level="section">
          <Connect />
        </ErrorBoundary>
      </Layout>
    </ErrorBoundary>
  )
}

export default App
