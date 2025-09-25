import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Palette, Settings, Database } from 'lucide-react'
import { Button } from '../../ui'
import { skillsByCategory } from '../../../data/skills'
import { useFadeIn } from '../../../hooks'

const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Frontend')
  
  const categoryIcons = {
    Frontend: Code,
    Backend: Database,
    Tools: Settings,
    Design: Palette
  }

  const titleRef = useFadeIn<HTMLDivElement>()

  return (
    <section id="skills" className="py-20" style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">My </span>
            <span className="text-gradient-primary">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life - constantly learning and evolving.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(skillsByCategory).map((category) => {
            const Icon = categoryIcons[category as keyof typeof categoryIcons]
            return (
              <Button
                key={category}
                variant={activeCategory === category ? 'primary' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-3 transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-gradient-primary text-white shadow-lg transform scale-105' 
                    : 'hover:border-primary-500 hover:text-primary-600'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category}
              </Button>
            )
          })}
        </div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillsByCategory[activeCategory]?.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 group"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
            >
              {/* Skill Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{skill.icon}</span>
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{skill.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{skill.experience}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gradient-primary">{skill.level}%</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="h-2 bg-gradient-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                  />
                </div>
                
                {/* Animated dots */}
                <motion.div
                  className="absolute top-0 h-2 w-2 bg-white rounded-full shadow-lg"
                  initial={{ left: 0 }}
                  animate={{ left: `calc(${skill.level}% - 4px)` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                />
              </div>

              {/* Skill Level Indicator */}
              <div className="mt-4 text-center">
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                  skill.level >= 90 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                    : skill.level >= 75
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                }`}>
                  {skill.level >= 90 ? 'Expert' : skill.level >= 75 ? 'Advanced' : 'Intermediate'}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">20+</div>
              <div className="text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">2.5+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient-primary mb-2">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Built</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
