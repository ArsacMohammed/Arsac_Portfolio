import React from 'react'
import { motion, useAnimation } from 'framer-motion'

interface SkillsFramesProps {
  controls: any
  containerVariants: any
}

export const SkillsFrames: React.FC<SkillsFramesProps> = ({ controls, containerVariants }) => {
  return (
    <>
      {/* Top-right Frame */}
      <div className="absolute top-0 right-0 mr-token-4" style={{ width: 200, height: 200 }}>
        <div className="absolute top-0 right-0 h-token-20 w-100 bg-gradient-to-r bg-black rounded" />
        <div className="absolute top-0 right-0 w-token-20 h-100 bg-gradient-to-t bg-black to-black rounded" />
      </div>

      {/* Bottom-left Frame */}
      <motion.div
        className="absolute bottom-0 left-0 z-token-sticky"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="relative" style={{ width: 200, height: 200 }}>
          <div className="absolute bottom-0 left-0 h-token-20 w-100 bg-gradient-to-r bg-black to-black rounded" />
          <div className="absolute bottom-0 left-0 w-token-20 h-100 bg-gradient-to-t bg-black to-black rounded" />
        </div>
      </motion.div>
    </>
  )
}