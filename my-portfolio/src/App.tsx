import React from 'react'
import { Layout } from './components/layout'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'
import Skills from './components/sections/Skill/Skills'
// import Skills from './components/sections/Extra/Skills'
import Connect from './components/sections/Connect/Connects'
import Projects from './components/sections/Project/Projects'

import '@/styles/globals.css'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Skills />
      <Projects />
      {/* <Skills /> */}
      <Connect />
    </Layout>
  )
}

export default App
