import React from 'react'

interface AboutImagesProps {
  squareImage?: string
  rectangleImage?: string
  isMobile?: boolean
}

export const AboutImages: React.FC<AboutImagesProps> = ({
  squareImage = "/image_green.png",
  rectangleImage = "/image_green.png",
  isMobile = false
}) => {
  if (isMobile) {
    return (
      <div className="w-full px-4 mb-6">
        <div className="aspect-square w-full">
          <img 
            src={squareImage} 
            alt="About Square" 
            className="w-full h-full object-cover rounded-4xl" 
          />
        </div>
      </div>
    )
  }
  
  return (
    <div className="relative h-full w-full">
      <div className="tilted-square-container absolute top-10 sm:top-14 md:top-17 left-10 sm:left-20 md:left-50 z-token-sticky">
        <img src={squareImage} alt="Diamond Square" className="tilted-square-img w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] md:w-auto md:h-auto" />
      </div>
      <div className="tilted-rectangle-container absolute top-20 sm:top-30 md:top-55 right-10 sm:right-40 md:right-100 z-token-docked">
        <img src={rectangleImage} alt="Diamond Rectangle" className="tilted-rectangle-img w-[150px] h-[100px] sm:w-[180px] sm:h-[120px] md:w-auto md:h-auto" />
      </div>
    </div>
  )
}