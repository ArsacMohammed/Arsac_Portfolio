import React from 'react'
import { motion } from 'framer-motion'
import { Github, Linkedin, Twitter, Mail, ArrowUp } from 'lucide-react'
import { Button } from '../../../components/ui'
import { SITE_CONFIG } from '../../../lib/constants'
import { scrollToElement } from '../../../components/common'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: SITE_CONFIG.author.github },
    { name: 'LinkedIn', icon: Linkedin, href: SITE_CONFIG.author.linkedin },
    { name: 'Twitter', icon: Twitter, href: `https://twitter.com/${SITE_CONFIG.author.twitter}` },
    { name: 'Email', icon: Mail, href: `mailto:${SITE_CONFIG.author.email}` }
  ]

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {SITE_CONFIG.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-sm">
              {SITE_CONFIG.description}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => scrollToElement('#about')}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-left transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToElement('#projects')}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-left transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToElement('#contact')}
                className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 text-left transition-colors"
              >
                Contact
              </button>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900 dark:text-white">Connect</h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon className="w-5 h-5" />
                  <span className="sr-only">{social.name}</span>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            © {currentYear} {SITE_CONFIG.name}. All rights reserved.
          </p>
          
          {/* Back to Top */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => scrollToElement('#home')}
            className="group"
          >
            <ArrowUp className="w-4 h-4 mr-2 transition-transform group-hover:-translate-y-1" />
            Back to Top
          </Button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
