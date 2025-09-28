import React from 'react'
import { AboutStats } from './AboutStats'

interface AboutContentProps {
  title?: string
  subtitle?: string
  description?: string
}

export const AboutContent: React.FC<AboutContentProps> = ({
  title = "About Me",
  subtitle = "Cloud, AI & Full Stack Software Developer",
  description = "Crafting modern digital solutions leveraging cloud technologies, AI, and full stack development."
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-token-12">
      <div className="mb-6 sm:mb-8 md:mb-token-12 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-token-5xl xl:text-token-6xl font-token-bold mb-0">
          <span className="text-4xl sm:text-5xl md:text-6xl xl:text-token-7xl font-token-extrabold leading-token-tight mb-token-2 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300 bg-clip-text text-transparent [text-stroke:1px_black] sm:[text-stroke:1.5px_black]">
            {title}
          </span>
        </h1>
      </div>

      <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-token-7xl font-token-bold mb-4 sm:mb-token-4 text-[#222222] leading-token-tight">
        {subtitle.split(' ').slice(0, 4).join(' ')}<br />
        <span className="text-gray-600">{subtitle.split(' ').slice(4).join(' ')}</span>
      </h1>

      <p className="text-lg sm:text-xl md:text-token-xl text-[#4B5563] mb-8 sm:mb-token-12 leading-token-relaxed">
        {description}
      </p>

      <AboutStats />
    </div>
  )
}