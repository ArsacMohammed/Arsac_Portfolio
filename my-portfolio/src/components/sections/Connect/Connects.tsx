import React from 'react'

import { motion } from 'framer-motion'

const ConnectSection: React.FC = () => {
  return (
    <motion.section
      id="contact"
      className="w-full bg-transparent px-token-8 py-token-12"
      style={{ background: 'linear-gradient(to top, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex flex-row w-full h-[500px] overflow-hidden bg-white rounded-token-3xl shadow-token-xl">
        {/* Left: Image */}
        <div className="flex-1 h-full">
          <img
            src="/connect.jpg"
            alt="Contact Banner"
            className="w-full h-full object-cover rounded-l-token-3xl"
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-token-16 py-token-16 bg-gradient-to-br from-[#282828] via-[#18171A] to-black rounded-r-token-3xl">
          <h2 className="text-token-4xl font-token-extrabold text-white mb-token-8 text-center">
            Connect — Your Project,
            <br /> One Message Away.
          </h2>
          <p className="text-token-lg text-gray-200 mb-token-8 text-center">
            Ready to collaborate, learn more, or talk tech? Reach out for consulting, freelance, or product design and engineering. Let's build your next big thing.
          </p>
          <a
            href="mailto:hello@yourdomain.com"
            className="
              px-token-6 py-token-3 rounded-token-lg text-token-lg font-token-semibold
              bg-white text-black shadow-token-lg transition hover:bg-gray-100
              focus:outline-none focus:ring-4 focus:ring-gray-300
            "
            style={{ minWidth: 160, textAlign: 'center' }}
          >
            Say Hello
          </a>
        </div>
      </div>
    </motion.section>
  )
}


export default ConnectSection
