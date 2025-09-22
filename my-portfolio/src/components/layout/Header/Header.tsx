import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '../../../components/ui'
import { useTheme } from '../../../hooks'
import { NAVIGATION_ITEMS, SITE_CONFIG } from '../../..//lib/constants'
import { scrollToElement } from '../../../components/common'
import { cn } from '../../../lib/utils'
import type { ThemeMode } from '../../../types'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    scrollToElement(href)
    setIsOpen(false)
  }

  const ThemeIcon = theme === 'dark' ? Sun : theme === 'light' ? Moon : Monitor

  return (
    <motion.header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 flex items-center justify-between px-6 py-4',
        scrolled
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-gray-800/50'
          : 'bg-transparent'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20 lg:h-24 lab">
          {/* Left: Logo 
          <motion.button
            onClick={() => handleNavClick('#home')}
            className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all"
          >

            {SITE_CONFIG.name.split(' ')[0]}
          </motion.button> */}
          {/* <motion.button
            onClick={() => handleNavClick('#home')}
            className="text-lg font-medium text-black relative group transition-transform duration-300"
            whileHover={{ scale: 1.05 }}
          >
             {SITE_CONFIG.name.split(' ')[0]}
            {/* Underline 
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
          </motion.button> */}


          {/* Desktop Navigation */}
          <nav className="hidden md:flex lg:flex xl:flex w-full items-center px-14">
            {/* Left Section */}
            <div className="flex">
              <motion.button
                onClick={() => handleNavClick(NAVIGATION_ITEMS[0].href)} // Home
                className="text-black font-medium relative group transition-colors duration-300 group-hover:text-orange-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                {NAVIGATION_ITEMS[0].name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </motion.button>
            </div>


            {/* Center Section (Projects) */}
            <div className="absolute left-1/2 transform -translate-x-1/2  -ml-120">
              <motion.button
                onClick={() => handleNavClick('/projects')}
                className="text-black font-medium relative group transition-colors duration-300 group-hover:text-orange-500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </motion.button>
            </div>

            {/* Right Section */}
            <div className="flex ml-auto space-x-8 items-center">
              {NAVIGATION_ITEMS.slice(2).map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className="text-black font-medium relative group transition-colors duration-300 group-hover:text-orange-500"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}

              {/* Hamburger Menu SVG */}
              <button className="text-black transition-colors duration-300 hover:text-orange-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const themes: ThemeMode[] = ['light', 'dark', 'system']
                const currentIndex = themes.indexOf(theme)
                const nextTheme = themes[(currentIndex + 1) % themes.length]
                setTheme(nextTheme)
              }}
              className="p-2 rounded-lg"
            >
              <ThemeIcon className="w-5 h-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav>


          {/* Theme Toggle 
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const themes: ThemeMode[] = ['light', 'dark', 'system']
                const currentIndex = themes.indexOf(theme)
                const nextTheme = themes[(currentIndex + 1) % themes.length]
                setTheme(nextTheme)
              }}
              className="p-2 rounded-lg"
            >
              <ThemeIcon className="w-5 h-5" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </nav> */}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const themes: ThemeMode[] = ['light', 'dark', 'system']
                const currentIndex = themes.indexOf(theme)
                const nextTheme = themes[(currentIndex + 1) % themes.length]
                setTheme(nextTheme)
              }}
              className="p-2"
            >
              <ThemeIcon className="w-5 h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="md:hidden border-t border-gray-200 dark:border-gray-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md">
                {NAVIGATION_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg w-full text-left transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header
