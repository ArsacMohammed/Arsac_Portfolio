import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const useHeroAnimations = () => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Animate elements in sequence
    tl.fromTo('.hero-main-text',
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo('.hero-number',
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-image-container',
      { opacity: 0, scale: 0.9, x: 40 },
      { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out' },
      '-=1.0'
    )
    .fromTo('.hero-nav',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=1.2'
    );

    // Cleanup
    return () => {
      tl.kill();
    };
  }, []);

  return containerRef;
};