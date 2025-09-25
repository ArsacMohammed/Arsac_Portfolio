import React from 'react'
import { Layout } from './components/layout'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'
import Exposure from './components/sections/Exposure/Exposure'
import Skills from './components/sections/Skills/Skills'
import Contact from './components/sections/Contact/Contact'
import ExposureSection from './components/sections/Projects/ExposureSection'

import '@/styles/globals.css'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Exposure />
      <ExposureSection />
      <Skills />
      <Contact />
    </Layout>
  )
}

export default App
