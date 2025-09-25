import React from 'react'
import { Linkedin, Instagram, X, Mail, Phone } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-transparent border-t border-gray-200 dark:border-gray-800 py-10 px-8"style={{ background: 'linear-gradient(to bottom, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left: Contact Info */}
        <div className="flex flex-col space-y-1 text-black text-center md:text-left">
          <p className="font-bold text-lg underline">Contact</p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-[#72383D] font-bold">
            <Mail size={18} />
            hello@yourdomain.com
          </p>
          <p className="flex items-center gap-2 cursor-pointer hover:text-[#72383D] font-bold">
            <Phone size={18} />
            +91-9876543210
          </p>
        </div>

        {/* Center: Social Icons */}
        <div className="flex gap-8 text-black font-bold">
          <a
            href="https://linkedin.com/in/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:opacity-70 transition"
          >
            <Linkedin size={28} />
          </a>
          <a
            href="https://github.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:scale-110 transition-transform"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#181717" />
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C7.58 2 4 5.58 4 10c0 3.54 2.29 6.54 5.47 7.59.4.07.52-.17.52-.38v-1.35c-2.22.48-2.7-1.07-2.7-1.07-.36-.91-.89-1.16-.89-1.16-.72-.5.06-.49.06-.49.8.06 1.22.82 1.22.82.7 1.2 1.83.85 2.28.65.07-.5.28-.85.5-1.04-1.77-.2-3.64-.89-3.64-3.98 0-.88.31-1.6.82-2.16-.08-.2-.36-1.01.08-2.11 0 0 .67-.22 2.2.83a7.6 7.6 0 012-.27c.68 0 1.36.09 2 .27 1.53-1.05 2.2-.83 2.2-.83.44 1.1.16 1.91.08 2.11.5.55.82 1.27.82 2.16 0 3.1-1.88 3.77-3.67 3.98.29.25.53.73.53 1.48v2.2c0 .21.12.45.53.38A8.01 8.01 0 0020 10c0-4.42-3.58-8-8-8z" fill="white"/>
            </svg>
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="hover:opacity-70 transition"
          >
            <Instagram size={28} />
          </a>
          <a
            href="https://twitter.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="hover:opacity-70 transition"
          >
            <X size={28} />
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-black text-center md:text-right text-sm select-none font-bold">
          &copy; {new Date().getFullYear()} Mohammed Arsac. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer
