import React from 'react'
import { Layout } from './components/layout'
import Hero from './components/sections/Hero/Hero'
import About from './components/sections/About/About'
import Projects from './components/sections/Projects/Projects'
import Skills from './components/sections/Skills/Skills'
import Contact from './components/sections/Contact/Contact'
import '@/styles/globals.css'

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  )
}

export default App
