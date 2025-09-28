import React from 'react'

import { motion } from 'framer-motion'

const ConnectSection: React.FC = () => {
  return (
    <motion.section
      id="contact"
      className="w-full bg-transparent px-4 sm:px-6 md:px-token-8 py-8 sm:py-10 md:py-token-12"
      style={{ background: 'linear-gradient(to top, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex flex-col md:flex-row w-full h-auto md:h-[500px] overflow-hidden bg-white rounded-2xl sm:rounded-3xl md:rounded-token-3xl shadow-token-xl">
        {/* Left: Image */}
        <div className="w-full md:flex-1 h-[200px] sm:h-[250px] md:h-full">
          <img
            src="/connect.jpg"
            alt="Contact Banner"
            className="w-full h-full object-cover rounded-t-2xl sm:rounded-t-3xl md:rounded-t-none md:rounded-l-token-3xl"
          />
        </div>
        {/* Right: Content */}
        <div className="w-full md:flex-1 flex flex-col justify-center items-center px-6 sm:px-10 md:px-token-16 py-8 sm:py-10 md:py-token-16 bg-gradient-to-br from-[#282828] via-[#18171A] to-black rounded-b-2xl sm:rounded-b-3xl md:rounded-b-none md:rounded-r-token-3xl">
          <h2 className="text-2xl sm:text-3xl md:text-token-4xl font-token-extrabold text-white mb-4 sm:mb-6 md:mb-token-8 text-center">
            Connect — Your Project,
            <br /> One Message Away.
          </h2>
          <p className="text-base sm:text-lg md:text-token-lg text-gray-200 mb-6 sm:mb-8 md:mb-token-8 text-center">
            Ready to collaborate, learn more, or talk tech? Reach out for consulting, freelance, or product design and engineering. Let's build your next big thing.
          </p>
          <a
            href="mailto:hello@yourdomain.com"
            className="
              px-4 sm:px-5 md:px-token-6 py-2 sm:py-2.5 md:py-token-3 rounded-lg md:rounded-token-lg text-base sm:text-lg md:text-token-lg font-token-semibold
              bg-white text-black shadow-token-lg transition hover:bg-gray-100
              focus:outline-none focus:ring-4 focus:ring-gray-300
              w-full sm:w-auto
            "
            style={{ minWidth: 'auto', textAlign: 'center', maxWidth: '90%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            Say Hello
          </a>
        </div>
      </div>
    </motion.section>
  )
}


export default ConnectSection
