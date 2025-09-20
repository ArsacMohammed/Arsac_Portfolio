import React from 'react'
import { motion } from 'framer-motion'
import { Download, MapPin, Mail, Calendar } from 'lucide-react'
import { Button, Card, CardContent } from '../../../components/ui'
import { useFadeIn } from '../../../hooks'
import { personalInfo } from '../../../data/personal'
import { skillsByCategory } from '../../../data/skills'

const About: React.FC = () => {
  const titleRef = useFadeIn<HTMLDivElement>()
  const contentRef = useFadeIn<HTMLDivElement>(0.2)
  const statsRef = useFadeIn<HTMLDivElement>(0.4)

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gray-900 dark:text-white">About </span>
            <span className="text-gradient-primary">Me</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get to know me better - my journey, skills, and what drives me to create amazing digital experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column - Image & Info */}
          <div className="lg:col-span-5">
            <div ref={contentRef} className="sticky top-24">
              
              {/* Profile Image */}
              <div className="relative mb-8">
                <div className="w-full aspect-square max-w-md mx-auto relative">
                  <div className="absolute inset-0 bg-gradient-primary rounded-2xl transform rotate-6 opacity-20"></div>
                  <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-32 h-32 bg-primary-500 rounded-full mx-auto opacity-30"></div>
                        <p className="text-gray-500 dark:text-gray-400 font-medium">Your Photo Here</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Personal Info */}
              <Card variant="elevated" className="mb-6">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">Personal Info</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-4 h-4 text-primary-500" />
                      <span className="text-gray-600 dark:text-gray-400">{personalInfo.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-primary-500" />
                      <span className="text-gray-600 dark:text-gray-400">{personalInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-primary-500" />
                      <span className="text-gray-600 dark:text-gray-400">{personalInfo.experience.years}+ Years Experience</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Download Resume */}
              <Button 
                size="lg" 
                className="w-full bg-gradient-primary text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Resume
              </Button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">My Story</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {personalInfo.bio}
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {personalInfo.interests.map((interest, index) => (
                  <motion.div
                    key={interest}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  >
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span>{interest}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <div ref={statsRef}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Years Experience', value: `${personalInfo.experience.years}+` },
                  { label: 'Projects Completed', value: `${personalInfo.experience.projectsCompleted}+` },
                  { label: 'Happy Clients', value: `${personalInfo.experience.clientsSatisfied}+` },
                  { label: 'Technologies', value: `${personalInfo.experience.technologiesMastered}+` }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-gradient-primary mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Top Skills Preview */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Core Technologies</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {skillsByCategory['Frontend']?.slice(0, 6).map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
                  >
                    <span className="text-2xl">{skill.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{skill.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{skill.level}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
