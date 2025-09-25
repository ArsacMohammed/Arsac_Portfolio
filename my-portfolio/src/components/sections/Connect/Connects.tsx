import React from 'react'

import { motion } from 'framer-motion'

const ConnectSection: React.FC = () => {
  return (
    <motion.section
      className="w-full bg-transparent px-8 py-12"
      style={{ background: 'linear-gradient(to top, #ffffff 0%, #ffffff 30%, #f8f8f8 70%, #e0e0e0 100%)' }}
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="flex flex-row w-full h-[500px] overflow-hidden bg-white rounded-3xl shadow-xl">
        {/* Left: Image */}
        <div className="flex-1 h-full">
          <img
            src="/connect.jpg"
            alt="Contact Banner"
            className="w-full h-full object-cover rounded-l-3xl"
          />
        </div>
        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-center items-center px-16 py-16 bg-gradient-to-br from-[#282828] via-[#18171A] to-black rounded-r-3xl">
          <h2 className="text-4xl font-extrabold text-white mb-8 text-center">
            Connect — Your Project,
            <br /> One Message Away.
          </h2>
          <p className="text-lg text-gray-200 mb-8 text-center">
            Ready to collaborate, learn more, or talk tech? Reach out for consulting, freelance, or product design and engineering. Let's build your next big thing.
          </p>
          <a
            href="mailto:hello@yourdomain.com"
            className="
              px-6 py-3 rounded-lg text-lg font-semibold
              bg-white text-black shadow-lg transition hover:bg-gray-100
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
