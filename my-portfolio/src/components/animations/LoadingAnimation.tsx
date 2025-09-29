import React, { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

// Modern loader: animated logo + dots + fadeout
const LoadingAnimation: React.FC = () => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(false), 3500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7 } }}
          transition={{ duration: 0.7 }}
        >
          {/* Modern logo or initials */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 190, damping: 23 }}
            className="flex flex-col items-center text-center"
          >
            {/* Portfolio logo or initials (stylize as you want) */}
            <motion.span
              className="text-white font-extrabold text-6xl lg:text-7xl tracking-tight"
              animate={{ 
                textShadow: [
                  "0 0 20px #7f1d1d", 
                  "0 0 40px #a21caf"
                ] 
              }}
              transition={{ repeat: Infinity, duration: 1.4, repeatType: "reverse" }}
              style={{ letterSpacing: "0.08em" }}
            >
              Arsac
            </motion.span>

            {/* Loader dots */}
            <motion.div className="pt-6 flex gap-2.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block w-3.5 h-3.5 rounded-full bg-white"
                  animate={{ y: [0, -16, 0] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "easeInOut",
                    delay: i * 0.15
                  }}
                />
              ))}
            </motion.div>
            <div className="text-gray-400 pt-8 text-sm tracking-wider font-light">Loading your experience...</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default LoadingAnimation