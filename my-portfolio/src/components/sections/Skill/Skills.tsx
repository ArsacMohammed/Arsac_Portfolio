import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { easeInOut } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ExternalLink } from 'lucide-react'
import type { Slide } from './SkillSlide'

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: easeInOut,
      staggerChildren: 0.15
    }
  }
};

const slides: Slide[] = [
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80',
    title: 'Salomon',
    subtitle: 'Time to play',
    description: 'Trail running shoes built for adventure.',
    link: 'https://www.salomon.com/',
    color: '#8B2635'
  },
  {
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?fit=crop&w=600&q=80',
    title: 'Smart Travel',
    subtitle: 'Travel smarter, easier, greener',
    description: 'Travel smarter, easier, greener.',
    link: 'https://example.com',
    color: '#4A7C59'
  },
  {
    image: 'https://images.unsplash.com/photo-1465101162946-4377e57745c3?fit=crop&w=600&q=80',
    title: 'Vans',
    subtitle: '"Off The Wall"',
    description: 'Iconic street sneakers for everyone.',
    link: 'https://www.vans.com/',
    color: '#5DADE2'
  },
  {
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?fit=crop&w=600&q=80',
    title: 'North Face',
    subtitle: 'Never Stop Exploring',
    description: 'Gear for the toughest outdoors.',
    link: 'https://www.thenorthface.com/',
    color: '#2C3E50'
  },
  {
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?fit=crop&w=600&q=80',
    title: 'Sample Project',
    subtitle: 'Innovation First',
    description: 'Sample project showcase.',
    link: 'https://www.example.com/',
    color: '#E74C3C'
  }
]
type SkillSlideProps = {
  slide: Slide;
  isActive: boolean;
  isPrev: boolean;
  isNext: boolean;
  index: number;
  onClick: (index: number) => void;
};
// SkillSlide Component
const SkillSlide: React.FC<SkillSlideProps> = ({ slide, isActive, isPrev, isNext, index, onClick }) => {
  const isMobile = window.innerWidth < 768;

  const getPosition = () => {
    if (isActive) return { x: 0, scale: 1, zIndex: 30, opacity: 1 };
    if (isPrev) return { x: isMobile ? -100 : -280, scale: 0.85, zIndex: 20, opacity: isMobile ? 0 : 0.7 };
    if (isNext) return { x: isMobile ? 100 : 280, scale: 0.85, zIndex: 20, opacity: isMobile ? 0 : 0.7 };
    return { x: isNext ? 500 : -500, scale: 0.7, zIndex: 10, opacity: 0 };
  };

  const position = getPosition();

  return (
    <motion.div
      layout
      initial={false}
      animate={{
        x: position.x,
        scale: position.scale,
        opacity: position.opacity,
        rotateY: isActive ? 0 : isPrev ? 15 : isNext ? -15 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{
        zIndex: position.zIndex,
        perspective: 1000,
      }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      onClick={() => onClick(index)}
    >
      <div
        className={`relative overflow-hidden rounded-2xl ${isActive ? 'w-[85vw] h-[50vh] sm:w-[450px] sm:h-[280px] md:w-[600px] md:h-[380px] lg:w-[700px] lg:h-[420px]' :
            'w-[70vw] h-[40vh] sm:w-[350px] sm:h-[220px] md:w-[480px] md:h-[300px] lg:w-[550px] lg:h-[330px]'
          }`}
        style={{
          boxShadow: isActive
            ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            : '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
          background: slide.color,
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full object-cover"
          draggable={false}
        />

        {isActive && (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2">
                {slide.title}
              </h2>
              {slide.subtitle && (
                <p className="text-lg sm:text-xl text-white/90 mb-3">
                  {slide.subtitle}
                </p>
              )}
              <p className="text-sm sm:text-base text-white/80 mb-4 max-w-md">
                {slide.description}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(slide.link, '_blank');
                }}
                className="inline-flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                Visit
              </button>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

const Skills: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2 });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  useEffect(() => {
    // Always enable autoplay regardless of device
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="Skills"
      className="relative w-full min-h-screen overflow-hidden"
      ref={ref}
      style={{
        background: 'linear-gradient(180deg, #e0e0e0 0%, #f0f0f0 50%, #ffffff 100%)',
      }}
    >
      {/* Header */}
      <div className="absolute top-20 sm:top-12 md:top-16 xl:top-30 left-0 right-0 text-center z-40"> 
        <h1 className="text-7xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold">
          <span 
            className="bg-gradient-to-r from-[#560F13] to-black bg-clip-text text-transparent"
            style={{ WebkitTextStroke: '1px rgba(0,0,0,0.1)' }}
          >
            Skills
          </span>
        </h1>
      </div>



      {/* Carousel Container */}
      <motion.div
        className="relative h-screen flex items-center justify-center"
        initial="hidden"
        animate={controls}
        variants={containerVariants}
      >
        <div className="relative w-full h-[60vh] sm:h-[400px] md:h-[600px] lg:h-[700px]">
          {/* Frame Elements for all screen sizes */}
          <div className="absolute top-0 right-0 w-20 sm:w-24 md:w-32 h-2 sm:h-3 bg-black" />
          <div className="absolute top-0 right-0 w-2 sm:w-3 h-20 sm:h-24 md:h-32 bg-black" />
          <div className="absolute bottom-0 left-2 sm:left-12 md:left-0 w-20 sm:w-24 md:w-32 h-2 sm:h-3 bg-black" />
           <div className="absolute bottom-0 left-2 sm:left-12 md:left-0 w-2 sm:w-3 h-20 sm:h-24 md:h-32 bg-black" />
          
          {/* Additional frame for carousel container */}
          {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[55vh] sm:w-[500px] sm:h-[350px] md:w-[650px] md:h-[430px] lg:w-[750px] lg:h-[470px] border-3 sm:border-4 border-black rounded-2xl sm:rounded-3xl" /> */}
          <AnimatePresence mode="popLayout">
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + slides.length) % slides.length;
              const isNext = index === (activeIndex + 1) % slides.length;

              return (
                <SkillSlide
                  key={`${slide.title}-${index}`}
                  slide={slide}
                  isActive={isActive}
                  isPrev={isPrev}
                  isNext={isNext}
                  index={index}
                  onClick={setActiveIndex}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 flex justify-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center font-bold transition-all ${index === activeIndex
                  ? 'bg-black text-white scale-110'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-300'
                }`}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-300 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-black"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{
              duration: 3,
              ease: 'linear',
              repeat: Infinity,
            }}
            key={activeIndex}
          />
        </div>
      </motion.div>
    </section>
  )
}

export default Skills
