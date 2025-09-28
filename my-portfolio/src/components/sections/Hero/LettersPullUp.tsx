import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface LettersPullUpProps {
  text: string;
  className?: string;
  delay?: number;
}

const LettersPullUp: React.FC<LettersPullUpProps> = ({ 
  text, 
  className = '', 
  delay = 0.05 
}) => {
  const splittedText = text.split('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const pullupVariant = {
    initial: { y: 10, opacity: 0 },
    animate: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * delay,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    }),
  };
  
  return (
    <div className={`flex justify-start ${className}`}>
      {splittedText.map((current, i) => (
        <motion.div
          key={`${current}-${i}`}
          ref={i === 0 ? ref : null}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? 'animate' : ''}
          custom={i}
        >
          {current === ' ' ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
};

export default LettersPullUp;