import React from 'react';

interface HeroNavigationProps {
  onProjectsClick: () => void;
}

const HeroNavigation: React.FC<HeroNavigationProps> = ({ onProjectsClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="hero-nav absolute top-0 left-0 right-0 z-50" aria-label="Main navigation">
      <div className="w-full px-6 sm:px-8 lg:px-12 xl:px-16 py-6">
        <div className="flex items-center justify-between">
          <a href="#home" className="text-sm font-medium text-gray-50" aria-label="Home">
            +1
          </a>
          
          {/* Desktop Navigation */}
          <ul className="hidden md:flex gap-8">
            <li>
              <button 
                className="text-sm font-medium text-gray-50 hover:text-gray-200 transition-colors" 
                onClick={onProjectsClick} 
                tabIndex={0} 
                aria-label="View projects"
              >
                Projects
              </button>
            </li>
            <li>
              <a 
                href="#about" 
                className="text-sm font-medium text-gray-50 hover:text-gray-200 transition-colors" 
                tabIndex={0}
              >
                About
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="text-sm font-medium text-gray-50 hover:text-gray-200 transition-colors" 
                tabIndex={0}
              >
                Contact
              </a>
            </li>
          </ul>
          
          {/* Mobile Menu Button */}
          <button 
            className="text-sm font-medium text-gray-50 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            tabIndex={0}
          >
            <div className="flex flex-col gap-1">
              <div className="w-6 h-0.5 bg-gray-50"></div>
              <div className="w-6 h-0.5 bg-gray-50"></div>
              <div className="w-6 h-0.5 bg-gray-50"></div>
            </div>
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4">
            <ul className="flex flex-col gap-4">
              <li>
                <button 
                  className="text-sm font-medium text-gray-50 hover:text-gray-200 transition-colors" 
                  onClick={() => {
                    onProjectsClick();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Projects
                </button>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-sm font-medium text-gray-50 hover:text-gray-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-sm font-medium text-gray-50 hover:text-gray-200 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default HeroNavigation;