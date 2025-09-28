import React from 'react';
import { useLenis } from '../../../components/common/';
import { scrollToElement } from '../../../components/common';
import { useHeroAnimations } from './HeroAnimations';
import ErrorBoundary from './ErrorBoundary';
import HeroNavigation from './HeroNavigation';
import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

const Hero: React.FC = () => {
  const lenis = useLenis();
  const heroRef = useHeroAnimations();

  // Navigation handler
  const scrollToProjects = () => {
    if (lenis) {
      lenis.scrollTo('#projects', { offset: -100 });
    } else {
      scrollToElement('#projects');
    }
  };

  // Resume download handler
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/Mohammed Arsac - Latest resume.pdf';
    link.download = 'Mohammed Arsac - Latest resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ErrorBoundary fallbackMessage="Unable to load the hero section. Please refresh the page.">
      {/* Skip link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:shadow-lg focus:rounded"
      >
        Skip to main content
      </a>
      
      <section
        ref={heroRef}
        id="home"
        className="min-h-screen relative overflow-hidden"
        role="region"
        aria-labelledby="hero-title"
      >
        {/* Navigation */}
        <HeroNavigation onProjectsClick={scrollToProjects} />

        {/* Main Content Container */}
        <div
          id="main-content"
          className="h-screen flex items-center relative"
          role="main"
        >
          {/* Background Elements */}
          <HeroBackground />

          {/* Content */}
          <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 relative z-20">
            <HeroContent onDownloadResume={handleDownloadResume} />
          </div>
        </div>
      </section>
    </ErrorBoundary>
  );
};

export default Hero;