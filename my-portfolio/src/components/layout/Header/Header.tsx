import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '../../../components/ui'
import { useTheme } from '../../../hooks'
import { NAVIGATION_ITEMS } from '../../..//lib/constants'
import { useLenis } from '../../../components/common'
import { cn } from '../../../lib/utils'
import type { ThemeMode } from '../../../types'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, setTheme } = useTheme();
  const lenis = useLenis()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    // Close mobile menu immediately
    setIsOpen(false)
    
    // Verify target element exists
    const targetElement = document.querySelector(href)
    if (!targetElement) {
      console.warn(`Navigation target not found: ${href}`)
      return
    }

    if (lenis) {
      try {
        // Use Lenis for smooth scrolling with offset to account for fixed header
        lenis.scrollTo(href, { 
          offset: -80, // Offset to account for fixed header height
          duration: 2.8, // Smooth duration
          easing: (t: number) => 1 - Math.pow(1 - t, 3) // easeOutCubic for smooth feel
        })
      } catch (error) {
        console.warn('Lenis scroll failed, using fallback:', error)
        // Fallback to basic scroll if Lenis fails
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }
    } else {
      // Fallback to basic scroll when Lenis is not available
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  const ThemeIcon = theme === 'dark' ? Sun : theme === 'light' ? Moon : Monitor

  return (
<motion.header
  className={cn(
    'fixed top-0 w-full z-50 transition-all duration-300 flex items-center justify-between py-2 sm:py-3 md:py-4',
    scrolled
      ? 'bg-white/60 backdrop-blur-md shadow-sm border-b border-gray-200 text-gray-900'
      : 'bg-transparent text-white'
  )}
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.8, ease: 'easeOut' }}
>
      <div className="w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12">
        <div className={
          cn(
            "flex items-center justify-between transition-all duration-300",
            scrolled
              ? "h-10 sm:h-12 md:h-14 lg:h-10"
              : "h-14 sm:h-16 md:h-20 lg:h-24"
          )
        }>          {/* Left: Logo - Commented out for now */}


          {/* Desktop Navigation */}
          <nav className="hidden sm:hidden md:flex w-full items-center px-4 lg:px-8">
            {/* Left Section */}
            <div className="flex">
              <motion.button
  onClick={() => handleNavClick(NAVIGATION_ITEMS[0].href)} // Home
  className={cn(
    scrolled
      ? 'text-black text-base md:text-lg font-semibold' // Responsive text size
      : 'text-black text-base md:text-lg font-semibold',
    'relative group transition-all duration-300'
  )}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0, duration: 0.5 }}
  whileHover={{ scale: 1.05 }} // Slightly reduced scale for better mobile experience
>
                {NAVIGATION_ITEMS[0].name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </motion.button>
            </div>

            {/* Center Section (Projects) */}
            <div className="absolute left-1/2 transform -translate-x-1/2 md:-ml-8 lg:-ml-12">
              <motion.button
  onClick={() => handleNavClick(NAVIGATION_ITEMS[1].href)} // Projects
  className={cn(
    scrolled
      ? 'text-black text-base md:text-lg font-semibold' // Responsive text size
      : 'text-black text-base md:text-lg font-semibold',
    'relative group transition-all duration-300'
  )}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0, duration: 0.5 }}
  whileHover={{ scale: 1.05 }} // Slightly reduced scale
>
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
              </motion.button>
            </div>

            {/* Right Section */}
            <div className="flex ml-auto space-x-4 md:space-x-6 lg:space-x-8 items-center">
              {NAVIGATION_ITEMS.slice(2).map((item) => (
                <motion.button
  key={item.id}
  onClick={() => handleNavClick(item.href)} // Use correct href for each item
  className={cn(
    scrolled
      ? 'text-black text-base md:text-lg font-semibold' // Responsive text size
      : 'text-black text-base md:text-lg font-semibold',
    'relative group transition-all duration-300'
  )}
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0, duration: 0.5 }}
  whileHover={{ scale: 1.05 }} // Slightly reduced scale
>
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300" />
                </motion.button>
              ))}
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
              className="p-1 md:p-2 rounded-lg ml-2 md:ml-4"
            >
              <ThemeIcon
                className={`w-4 h-4 md:w-5 md:h-5 ${theme === 'light' ? 'text-black' : 'text-white'}`}
              />
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
              className="p-1 sm:p-2"
            >
              <ThemeIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 sm:p-2"
              aria-label="Toggle mobile menu"
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
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
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md rounded-b-lg shadow-md">
                {NAVIGATION_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className="block px-3 py-2.5 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg w-full text-left transition-colors"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.button>
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
