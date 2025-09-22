import React from 'react'

export const ThreeDAnimation = () => {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ perspective: '1000px' }}>
      <div className="relative">
        {/* Animated 3D Cube */}
        <div 
          className="w-24 h-24 relative transform-gpu"
          style={{
            animation: 'floatRotate 4s ease-in-out infinite',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg shadow-2xl transform rotate-12 animate-pulse"></div>
          <div className="absolute inset-2 bg-gradient-to-tr from-orange-500 to-red-500 rounded-md shadow-lg transform -rotate-6 animate-bounce"></div>
          <div className="absolute inset-4 bg-gradient-to-bl from-red-400 to-pink-500 rounded shadow-md transform rotate-3"></div>
        </div>
        
        {/* Floating particles */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
        <div className="absolute -bottom-2 -right-2 w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce"></div>
      </div>
      
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes floatRotate {
            0% {
              transform: translateY(0px) rotateX(0deg) rotateY(0deg);
            }
            33% {
              transform: translateY(-10px) rotateX(120deg) rotateY(120deg);
            }
            66% {
              transform: translateY(5px) rotateX(240deg) rotateY(240deg);
            }
            100% {
              transform: translateY(0px) rotateX(360deg) rotateY(360deg);
            }
          }
        `
      }} />
    </div>
  )
}