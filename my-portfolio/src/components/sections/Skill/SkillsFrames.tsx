import React from 'react'
import { motion } from 'framer-motion'

interface SkillsFramesProps {
  controls: any
  containerVariants: any
}

export const SkillsFrames: React.FC<SkillsFramesProps> = ({ controls, containerVariants }) => {
  return (
    <>
      {/* Top Frame */}
      <div className="absolute top-0 right-0 mr-token-4" style={{ width: 150, height: 150 }}>
        {/* Horizontal bar for mobile (top) */}
        <div className="absolute top-0 left-0 w-full h-token-10 bg-black rounded md:hidden" />
        
        {/* Desktop frame elements */}
        <div className="absolute top-0 right-0 h-token-20 w-100 bg-gradient-to-r bg-black rounded hidden md:block" />
        <div className="absolute top-0 right-0 w-token-20 h-100 bg-gradient-to-t bg-black to-black rounded hidden md:block" />
      </div>

      {/* Bottom Frame */}
      <motion.div
        className="absolute bottom-0 left-0 z-token-sticky"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="relative" style={{ width: 150, height: 150 }}>
          {/* Horizontal bar for mobile (bottom) */}
          <div className="absolute bottom-0 left-0 w-full h-token-10 bg-black rounded md:hidden" />
          
          {/* Desktop frame elements */}
          <div className="absolute bottom-0 left-0 h-token-20 w-100 bg-gradient-to-r bg-black to-black rounded hidden md:block" />
          <div className="absolute bottom-0 left-0 w-token-20 h-100 bg-gradient-to-t bg-black to-black rounded hidden md:block" />
        </div>
      </motion.div>
    </>
  )
}