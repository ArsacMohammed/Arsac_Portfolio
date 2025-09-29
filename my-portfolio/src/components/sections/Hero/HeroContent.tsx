import React from 'react';
import LettersPullUp from './LettersPullUp';

interface HeroContentProps {
  onDownloadResume: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onDownloadResume }) => {
  return (
    <div className="grid grid-cols-12 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 items-center h-full pt-8 sm:pt-12 md:pt-16">
      {/* Left Column - Text Content */}
      <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 relative z-20 order-2 md:order-1">
        <div className="hero-main-text mb-4 sm:mb-6 lg:mb-8">
          <div className="flex flex-col justify-center items-center md:items-start h-full pl-2 sm:pl-4 md:pl-8">
            <h1 id="hero-title" className="text-center md:text-left">
              <LettersPullUp 
                text="Mohammed Arsac"
                className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-2 sm:mb-4 
                  text-black
                  md:text-black
                  md:[text-stroke:1px_black] lg:[text-stroke:2px_black]"
              />
            </h1>

            <p className="text-xl sm:text-2xl lg:text-2xl text-gray-600 mb-3 sm:mb-4 max-w-md text-center md:text-left">
              Building seamless digital experiences for modern businesses.
            </p>
            
            <button 
              className="mt-0 sm:mt-4 py-2 sm:py-4 px-6 sm:px-10 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium w-fit text-lg sm:text-2xl lg:text-2xl xl:text-2xl"
              onClick={onDownloadResume}
              aria-label="Download resume"
              tabIndex={0}
            >
              Download Resume
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6 relative mt-4 sm:mt-6 md:mt-0 lg:mt-32 xl:mt-32 z-20 order-1 md:order-2">
        <div className="hero-image-container flex items-center justify-center md:justify-end md:absolute md:inset-0 pr-0 md:pr-4 lg:pr-25 z-20">
          <img
            src="/arsac_latest_2.avif"
            alt="Mohammed Arsac - Portfolio profile"
            loading="eager"
            aria-describedby="profile-description"
            className="w-full sm:w-[95%] md:w-full max-w-lg sm:max-w-xl md:max-w-xl lg:max-w-2xl xl:max-w-2xl"
          />
          <span id="profile-description" className="sr-only">
            Professional portrait of Mohammed Arsac, a web developer
          </span>
        </div>
      </div>
    </div>
  );
};

export default HeroContent;