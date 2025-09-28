import React, { useEffect } from 'react'
import { useAnimation } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { SkillsCarousel } from './SkillsCarousel'
import { SkillsFrames } from './SkillsFrames'
import type { Slide } from './SkillSlide'

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
};
const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80',
    title: 'Salomon',
    subtitle: 'Time to play',
    description: 'Trail running shoes built for adventure.',
    link: 'https://www.salomon.com/'
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80',
    title: 'Smart Travel',
    subtitle: '',
    description: 'Travel smarter, easier, greener.',
    link: 'https://example.com'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?fit=crop&w=600&q=80',
    title: 'Vans',
    subtitle: '"Off The Wall"',
    description: 'Iconic street sneakers for everyone.',
    link: 'https://www.vans.com/'
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=600&q=80',
    title: 'North Face',
    subtitle: '',
    description: 'Gear for the toughest outdoors.',
    link: 'https://www.thenorthface.com/'
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80',
    title: 'Sample',
    subtitle: '',
    description: 'Sample project.',
    link: 'https://www.example.com/'
  }
]

const Skills: React.FC = () => {
  const controls = useAnimation()
  const [ref, inView] = useInView({ threshold: 0.2 })

  useEffect(() => {
    if (inView) controls.start('visible')
  }, [controls, inView])

  return (
    <section
      id="Skills"
      className="w-full min-h-screen pt-50 relative"
      ref={ref}
      style={{
        background:
          'linear-gradient(to bottom, #e0e0e0 25%, #f8f8f8 60%, #ffffff 100%, #ffffff 100%)',
        height: '100vh',
        overflowX: 'hidden'
      }}
    >
      <div className="w-full flex items-center justify-between px-token-4 py-token-2 absolute top-0 left-0 right-0 z-token-sticky bg-transparent">
        {/* Left: Heading */}
        <h1 className="text-token-4xl lg:text-token-6xl xl:text-token-7xl font-token-bold text-gray-900 tracking-tight mt-0 mb-0 ml-180">
          <span className="text-token-7xl font-token-extrabold leading-token-tight mb-token-2 bg-gradient-to-r from-[#560F13] via-[#560F13] to-black bg-clip-text text-transparent [text-stroke:1.5px_black]">Skills</span>
        </h1>
      </div>

      <SkillsCarousel slides={slides} />
      <SkillsFrames controls={controls} containerVariants={containerVariants} />
    </section>
  )
}

export default Skills
