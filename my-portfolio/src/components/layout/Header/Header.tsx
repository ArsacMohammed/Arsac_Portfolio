import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '../../../components/ui'
// import { useTheme } from '../../../hooks'
import { NAVIGATION_ITEMS } from '../../..//lib/constants'
import { useLenis } from '../../../components/common'
import { cn } from '../../../lib/utils'

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  // const { theme } = useTheme();
  const lenis = useLenis()
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!isOpen) return

      const target = event.target as Node
      
      // Check if click is outside both the mobile menu and menu button
      const clickedOutsideMenu = mobileMenuRef.current && !mobileMenuRef.current.contains(target)
      const clickedOutsideButton = menuButtonRef.current && !menuButtonRef.current.contains(target)
      
      if (clickedOutsideMenu && clickedOutsideButton) {
        setIsOpen(false)
      }
    }

    // Close menu on scroll (optional - improves UX)
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false)
      }
    }

    // Close menu on escape key
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('scroll', handleScroll, { passive: true })
      document.addEventListener('keydown', handleEscapeKey)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('scroll', handleScroll)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [isOpen])

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

  // const ThemeIcon = theme === 'dark' ? Sun : theme === 'light' ? Moon : Monitor

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
        }>
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
          </nav>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Portfolio Title - Fixed visibility */}
            <motion.h1 
              className={cn(
                "text-xl sm:text-2xl font-display font-bold transition-all duration-300",
                scrolled 
                  ? "text-gray-900" 
                  : "text-gray-900 drop-shadow-sm" // Always dark with optional shadow for visibility
              )}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Portfolio
            </motion.h1>
            
            {/* Menu Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Button
                variant="ghost"
                size="sm"
                ref={menuButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                  "p-1 sm:p-2 mr-2 transition-all duration-300 rounded-lg",
                  scrolled 
                    ? "hover:bg-gray-100 text-gray-900" 
                    : "hover:bg-black/10 text-gray-900"
                )}
                aria-label="Toggle mobile menu"
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              className="md:hidden border-t border-gray-500/20"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              id="mobile-navigation"
              ref={mobileMenuRef}
            >
              <motion.div 
                className="px-2 pt-3 pb-4 space-y-1 bg-white/95 backdrop-blur-md rounded-b-xl shadow-lg border border-gray-200/50 mt-1 mx-2"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {NAVIGATION_ITEMS.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.href)}
                    className="block px-4 py-3 text-sm sm:text-base font-medium text-gray-800 hover:text-blue-600 hover:bg-blue-50 rounded-lg w-full text-left transition-all duration-200 border-b border-gray-100 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 4, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center justify-between">
                      {item.name}
                      <span className="text-gray-400 text-xs">→</span>
                    </span>
                  </motion.button>
                ))}
              </motion.div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header