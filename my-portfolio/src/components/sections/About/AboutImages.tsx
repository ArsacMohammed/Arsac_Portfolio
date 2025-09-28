import React from 'react'

interface AboutImagesProps {
  squareImage?: string
  rectangleImage?: string
}

export const AboutImages: React.FC<AboutImagesProps> = ({
  squareImage = "/image_green.png",
  rectangleImage = "/image_green.png"
}) => {
  return (
    <div className="relative h-full w-full">
      <div className="tilted-square-container absolute top-17 left-50 z-token-sticky">
        <img src={squareImage} alt="Diamond Square" className="tilted-square-img" />
      </div>
      <div className="tilted-rectangle-container absolute top-55 right-100 z-token-docked">
        <img src={rectangleImage} alt="Diamond Rectangle" className="tilted-rectangle-img" />
      </div>
    </div>
  )
}