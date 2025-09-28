import React from 'react';
import LettersPullUp from './LettersPullUp';

interface HeroContentProps {
  onDownloadResume: () => void;
}

const HeroContent: React.FC<HeroContentProps> = ({ onDownloadResume }) => {
  return (
    <div className="grid grid-cols-12 gap-6 lg:gap-8 xl:gap-12 items-center h-full">
      {/* Left Column - Text Content */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-6 relative z-20">
        <div className="hero-main-text mb-6 lg:mb-8">
          <div className="flex flex-col justify-center h-full pl-8">
            <h1 id="hero-title">
              <LettersPullUp 
                text="Mohammed Arsac"
                className="text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight mb-4 
                  bg-gradient-to-r from-black to-white 
                  bg-clip-text text-transparent 
                  [text-stroke:2px_black]"
              />
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 mb-4 max-w-md">
              Building seamless digital experiences for modern businesses.
            </p>
            
            <button 
              className="mt-4 py-3 px-8 bg-black text-white rounded-xl hover:bg-gray-800 transition font-medium w-fit"
              onClick={onDownloadResume}
              aria-label="Download resume"
              tabIndex={0}
            >
              Resume
            </button>
          </div>
        </div>
      </div>

      {/* Right Column - Image */}
      <div className="col-span-12 lg:col-span-6 xl:col-span-6 relative mt-8 lg:mt-32 xl:mt-32 z-20">
        <div className="hero-image-container absolute inset-0 flex items-center justify-end pr-0 lg:pr-25 z-20">
          <img
            src="/arsac_latest_2.png"
            alt="Mohammed Arsac - Portfolio profile"
            loading="eager"
            aria-describedby="profile-description"
            className="w-full max-w-md lg:max-w-lg xl:max-w-xl"
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